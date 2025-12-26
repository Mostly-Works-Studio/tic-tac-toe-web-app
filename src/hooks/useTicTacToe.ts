import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "tic-tac-toe-state";

const WINNING_COMBINATIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6], // anti-diagonal
];

interface GameState {
  board: (string | null)[];
  currentPlayer: "X" | "O";
  winner: "X" | "O" | null;
  winningCells: number[];
  isDraw: boolean;
  xWins: number;
  oWins: number;
  draws: number;
  gameMode: "human" | "computer";
}

const isValidGameState = (state: any): state is GameState => {
  if (!state || typeof state !== "object") return false;

  const validBoard = Array.isArray(state.board) &&
    state.board.length === 9 &&
    state.board.every((cell: any) => cell === null || cell === "X" || cell === "O");

  const validPlayers = (state.currentPlayer === "X" || state.currentPlayer === "O") &&
    (state.winner === null || state.winner === "X" || state.winner === "O");

  const validStats = typeof state.xWins === "number" &&
    typeof state.oWins === "number" &&
    typeof state.draws === "number" &&
    typeof state.isDraw === "boolean" &&
    Array.isArray(state.winningCells);

  const validGameMode = state.gameMode === "human" || state.gameMode === "computer";

  return validBoard && validPlayers && validStats && validGameMode;
};

export const useTicTacToe = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (isValidGameState(parsed)) {
          // Check if the game was completed (has a winner or is a draw)
          const isGameCompleted = parsed.winner !== null || parsed.isDraw;

          if (isGameCompleted) {
            // Clear the board but preserve scores
            return {
              board: Array(9).fill(null),
              currentPlayer: "X",
              winner: null,
              winningCells: [],
              isDraw: false,
              xWins: parsed.xWins,
              oWins: parsed.oWins,
              draws: parsed.draws,
              gameMode: parsed.gameMode,
            };
          }

          // Game is in progress, restore it completely
          return parsed;
        }
        console.warn("Saved game state is invalid, resetting...");
      } catch (e) {
        console.error("Failed to parse saved game state:", e);
      }
    }
    return {
      board: Array(9).fill(null),
      currentPlayer: "X",
      winner: null,
      winningCells: [],
      isDraw: false,
      xWins: 0,
      oWins: 0,
      draws: 0,
      gameMode: "human",
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  const [isResetting, setIsResetting] = useState(false);
  const [resetType, setResetType] = useState<"game" | "all" | "draw" | null>(null);
  const [wasGameOver, setWasGameOver] = useState(false);

  const checkWinner = useCallback((board: (string | null)[]) => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a] as "X" | "O", winningCells: combo };
      }
    }
    return null;
  }, []);

  const checkDraw = useCallback((board: (string | null)[], currentPlayer: "X" | "O") => {
    // Helper function to check if a win is possible from the current state
    const canWin = (currentBoard: (string | null)[], player: "X" | "O"): boolean => {
      const emptyIndices = currentBoard.map((c, i) => c === null ? i : -1).filter(i => i !== -1);

      if (emptyIndices.length === 0) return false;

      // Try every empty cell
      for (const index of emptyIndices) {
        const nextBoard = [...currentBoard];
        nextBoard[index] = player;

        // Check if this move wins
        let won = false;
        for (const combo of WINNING_COMBINATIONS) {
          const [a, b, c] = combo;
          if (nextBoard[a] && nextBoard[a] === nextBoard[b] && nextBoard[a] === nextBoard[c]) {
            won = true;
            break;
          }
        }

        if (won) return true;

        // If not, recurse
        const nextPlayer = player === "X" ? "O" : "X";
        if (canWin(nextBoard, nextPlayer)) return true;
      }

      return false;
    };

    // If no one can win from this state, it's a draw
    return !canWin(board, currentPlayer);
  }, []);

  const handleCellClick = useCallback((index: number) => {
    if (isResetting) return;
    setGameState((prev) => {
      if (prev.board[index] || prev.winner || prev.isDraw) {
        return prev;
      }

      const newBoard = [...prev.board];
      newBoard[index] = prev.currentPlayer;

      const result = checkWinner(newBoard);

      if (result) {
        return {
          ...prev,
          board: newBoard,
          winner: result.winner,
          winningCells: result.winningCells,
          xWins: result.winner === "X" ? prev.xWins + 1 : prev.xWins,
          oWins: result.winner === "O" ? prev.oWins + 1 : prev.oWins,
        };
      }

      const nextPlayer = prev.currentPlayer === "X" ? "O" : "X";
      const isDraw = checkDraw(newBoard, nextPlayer);

      if (isDraw) {
        return {
          ...prev,
          board: newBoard,
          isDraw: true,
          draws: prev.draws + 1,
        };
      }

      return {
        ...prev,
        board: newBoard,
        currentPlayer: prev.currentPlayer === "X" ? "O" : "X",
      };
    });
  }, [checkWinner, checkDraw, isResetting]);

  const clearBoardStaggered = useCallback(async (type: "game" | "all" | "draw") => {
    setIsResetting(true);
    setResetType(type);
    setWasGameOver(gameState.winner !== null || gameState.isDraw);

    const resetScores = type === "all";

    // Update draws immediately if it's a normal reset (abandoned game)
    if (type === "draw") {
      setGameState(prev => {
        const isGameInProgress = prev.board.some((cell) => cell !== null) && !prev.winner && !prev.isDraw;
        return {
          ...prev,
          draws: isGameInProgress ? prev.draws + 1 : prev.draws,
        };
      });
    }

    const boardResetPromise = (async () => {
      const isBoardEmpty = gameState.board.every(cell => cell === null);

      // If board is already empty and we're just resetting scores, 
      // just wait a bit for the trash animation to play
      if (isBoardEmpty && type === "all") {
        await new Promise(resolve => setTimeout(resolve, 500));
        return;
      }

      for (let i = 0; i < 9; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setGameState(prev => {
          const newBoard = [...prev.board];
          newBoard[i] = null;
          return { ...prev, board: newBoard };
        });
      }
    })();

    const scoresResetPromise = (async () => {
      if (resetScores) {
        // Wait a bit before starting score reset to sync better with board clearing
        await new Promise(resolve => setTimeout(resolve, 100));
        setGameState(prev => ({ ...prev, xWins: 0 }));
        await new Promise(resolve => setTimeout(resolve, 150));
        setGameState(prev => ({ ...prev, draws: 0 }));
        await new Promise(resolve => setTimeout(resolve, 200));
        setGameState(prev => ({ ...prev, oWins: 0 }));
      }
    })();

    await Promise.all([boardResetPromise, scoresResetPromise]);

    // Final reset of game state
    setGameState(prev => ({
      ...prev,
      currentPlayer: "X",
      winner: null,
      winningCells: [],
      isDraw: false,
    }));

    setIsResetting(false);
    setResetType(null);
    setWasGameOver(false);
  }, [gameState.winner, gameState.isDraw, gameState.board]);

  const resetGame = useCallback(() => {
    clearBoardStaggered("game");
  }, [clearBoardStaggered]);

  const resetAll = useCallback(() => {
    clearBoardStaggered("all");
  }, [clearBoardStaggered]);

  const declareDraw = useCallback(() => {
    clearBoardStaggered("draw");
  }, [clearBoardStaggered]);

  return {
    ...gameState,
    handleCellClick,
    resetGame,
    resetAll,
    declareDraw,
    isResetting,
    resetType,
    wasGameOver,
    gameOver: (gameState.winner !== null || gameState.isDraw) && !isResetting,
  };
};
