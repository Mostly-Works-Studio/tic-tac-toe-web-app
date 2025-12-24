import { RotateCcw, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import GameBoard from "@/components/GameBoard";
import ScoreBoard from "@/components/ScoreBoard";
import GameStatus from "@/components/GameStatus";
import { useTicTacToe } from "@/hooks/useTicTacToe";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { cn } from "@/lib/utils";

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
    isResetting,
  } = useTicTacToe();

  const { deferredPrompt, install } = usePWAInstall();

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-4 gap-6">
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
        isDraw={isDraw}
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
          gameOver={gameOver || isResetting}
          isDraw={isDraw}
          currentPlayer={currentPlayer}
          winner={winner}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="game" size="lg" onClick={resetGame} disabled={isResetting}>
          <RotateCcw className={cn("w-5 h-5", isResetting && "animate-spin")} strokeWidth={3} />
          New Game
        </Button>
        <Button variant="outline" size="lg" onClick={resetAll} disabled={isResetting}>
          <Trash2 className="w-5 h-5" strokeWidth={3} />
          Reset All
        </Button>
      </div>

      {/* Manual Install Button */}
      {deferredPrompt && (
        <Button onClick={install} className="gap-2 shadow-lg animate-pulse-glow" variant="default" disabled={isResetting}>
          <Download className="w-4 h-4" />
          Install App
        </Button>
      )}
    </div>
  );
};

export default Index;
