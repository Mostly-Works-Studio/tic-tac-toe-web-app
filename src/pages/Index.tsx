import { RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import GameBoard from "@/components/GameBoard";
import ScoreBoard from "@/components/ScoreBoard";
import GameStatus from "@/components/GameStatus";
import { useTicTacToe } from "@/hooks/useTicTacToe";

const Index = () => {
  const {
    board,
    currentPlayer,
    winner,
    winningCells,
    isDraw,
    xWins,
    oWins,
    draws,
    handleCellClick,
    resetGame,
    resetAll,
    gameOver,
  } = useTicTacToe();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 gap-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold tracking-tight">
        <span className="text-x">Tic</span>
        <span className="text-foreground"> Tac </span>
        <span className="text-o">Toe</span>
      </h1>

      {/* Score Board */}
      <ScoreBoard
        xWins={xWins}
        oWins={oWins}
        draws={draws}
        currentPlayer={currentPlayer}
      />

      {/* Game Status */}
      <GameStatus
        winner={winner}
        isDraw={isDraw}
        currentPlayer={currentPlayer}
      />

      {/* Game Board */}
      <div className="w-full max-w-sm">
        <GameBoard
          board={board}
          onCellClick={handleCellClick}
          winningCells={winningCells}
          gameOver={gameOver}
          isDraw={isDraw}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="game" size="lg" onClick={resetGame}>
          <RotateCcw className="w-5 h-5" />
          New Game
        </Button>
        <Button variant="outline" size="lg" onClick={resetAll}>
          <Trash2 className="w-5 h-5" />
          Reset All
        </Button>
      </div>
    </div>
  );
};

export default Index;
