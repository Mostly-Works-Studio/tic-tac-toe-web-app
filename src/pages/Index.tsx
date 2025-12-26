import { RotateCcw, Trash2, Download, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import GameBoard from "@/components/GameBoard";
import ScoreBoard from "@/components/ScoreBoard";
import GameStatus from "@/components/GameStatus";
import { useTicTacToe } from "@/hooks/useTicTacToe";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
    declareDraw,
    gameOver,
    isResetting,
    resetType,
    wasGameOver,
    gameMode,
    toggleGameMode,
    isBotMoving,
  } = useTicTacToe();

  const { deferredPrompt, install } = usePWAInstall();

  // Track flipping state from ScoreBoard
  const [isFlipping, setIsFlipping] = useState(false);

  // Can only toggle game mode when board is empty
  const canToggle = board.every(cell => cell === null);

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center p-4">
      {/* Main Game Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full">
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
          gameMode={gameMode}
          canToggle={canToggle}
          onToggleGameMode={toggleGameMode}
          onFlippingChange={setIsFlipping}
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
            gameOver={gameOver || isResetting || isFlipping}
            isDraw={isDraw}
            currentPlayer={currentPlayer}
            winner={winner}
            isBotMoving={isBotMoving}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 h-14">
          {(gameOver || (isResetting && (resetType === "game" || (resetType === "all" && wasGameOver)))) ? (
            <>
              <Button variant="game" size="lg" onClick={resetGame} disabled={isResetting} className="animate-pop-in">
                <RotateCcw className={cn("w-5 h-5", (isResetting && resetType === "game") && "animate-spin")} strokeWidth={3} />
                PLAY AGAIN
              </Button>
              <Button variant="outline" size="lg" onClick={resetAll} disabled={isResetting} className="animate-pop-in">
                <Trash2 className={cn("w-5 h-5", (isResetting && resetType === "all") && "animate-trash-lid")} strokeWidth={3} />
                RESET ALL
              </Button>
            </>
          ) : (board.some(cell => cell !== null) || (isResetting && resetType === "draw")) ? (
            <Button variant="game" size="lg" onClick={declareDraw} disabled={isResetting} className="animate-pop-in">
              <Minus className={cn("w-5 h-5", (isResetting && resetType === "draw") && "animate-spin")} strokeWidth={3} />
              DECLARE DRAW
            </Button>
          ) : (
            <Button variant="outline" size="lg" onClick={resetAll} disabled={isResetting} className="animate-pop-in">
              <Trash2 className={cn("w-5 h-5", (isResetting && resetType === "all") && "animate-trash-lid")} strokeWidth={3} />
              RESET SCORES
            </Button>
          )}
        </div>

        {/* Manual Install Button */}
        {deferredPrompt && (
          <Button onClick={install} className="gap-2 shadow-lg animate-pulse-glow" variant="default" disabled={isResetting}>
            <Download className="w-4 h-4" />
            Install App
          </Button>
        )}
      </div>

      {/* Branding Footer */}
      <footer className="pt-4 pb-2 text-center text-sm text-muted-foreground">
        Made with ❤ by Mostly Works Studio
      </footer>
    </div>
  );
};

export default Index;
