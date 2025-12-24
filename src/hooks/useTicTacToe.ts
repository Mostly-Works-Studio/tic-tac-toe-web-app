import { useState, useCallback } from "react";

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
}

export const useTicTacToe = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: "X",
    winner: null,
    winningCells: [],
    isDraw: false,
    xWins: 0,
    oWins: 0,
    draws: 0,
  });

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
  }, [checkWinner, checkDraw]);

  const resetGame = useCallback(() => {
    setGameState((prev) => {
      // Check if game is in progress (moves made, but no result yet)
      const isGameInProgress = prev.board.some((cell) => cell !== null) && !prev.winner && !prev.isDraw;

      return {
        ...prev,
        board: Array(9).fill(null),
        currentPlayer: "X",
        winner: null,
        winningCells: [],
        isDraw: false,
        draws: isGameInProgress ? prev.draws + 1 : prev.draws,
      };
    });
  }, []);

  const resetAll = useCallback(() => {
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: "X",
      winner: null,
      winningCells: [],
      isDraw: false,
      xWins: 0,
      oWins: 0,
      draws: 0,
    });
  }, []);

  return {
    ...gameState,
    handleCellClick,
    resetGame,
    resetAll,
    gameOver: gameState.winner !== null || gameState.isDraw,
  };
};
