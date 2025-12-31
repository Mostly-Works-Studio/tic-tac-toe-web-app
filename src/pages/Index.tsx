import { RotateCcw, Trash2, Download, Minus, Play } from "lucide-react";
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
    resign,
    gameOver,
    isResetting,
    resetType,
    wasGameOver,
    gameMode,
    difficulty,
    toggleGameMode,
    setDifficulty,
    isBotMoving,
    startGame,
    isGameStarted,
    isTossing,
    tossWinner,
  } = useTicTacToe();

  const { deferredPrompt, install } = usePWAInstall();

  // Track flipping state from ScoreBoard
  const [isFlipping, setIsFlipping] = useState(false);

  // Can only toggle game mode and difficulty when game hasn't started or when game is over (but not during toss)
  const canToggle = (!isGameStarted || gameOver) && !isTossing && !tossWinner;

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
          currentPlayer={isGameStarted ? currentPlayer : null}
          isDraw={isDraw}
          gameMode={gameMode}
          difficulty={difficulty}
          canToggle={canToggle}
          onToggleGameMode={toggleGameMode}
          onSetDifficulty={setDifficulty}
          onFlippingChange={setIsFlipping}
        />

        {/* Game Status */}
        <GameStatus
          winner={winner}
          isDraw={isDraw}
          currentPlayer={isGameStarted ? currentPlayer : null}
          isTossing={isTossing}
          tossWinner={tossWinner}
        />

        {/* Game Board */}
        <div className="w-full max-w-sm">
          <GameBoard
            board={board}
            onCellClick={handleCellClick}
            winningCells={winningCells}
            gameOver={gameOver || isResetting || isFlipping || !isGameStarted}
            isDraw={isDraw}
            currentPlayer={currentPlayer}
            winner={winner}
            isBotMoving={isBotMoving}
            isTossing={isTossing}
            tossWinner={tossWinner}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-sm min-h-[128px]">
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
          ) : (isGameStarted || (isResetting && resetType === "resign")) ? (
            <Button
              variant="game"
              size="lg"
              onClick={resign}
              disabled={isResetting || isBotMoving || (gameMode === "bot" && currentPlayer === "O")}
              className={cn(
                "animate-pop-in",
                (isResetting || isBotMoving || (gameMode === "bot" && currentPlayer === "O")) && "!opacity-50 cursor-not-allowed"
              )}
            >
              <Minus className={cn("w-5 h-5", (isResetting && resetType === "resign") && "animate-spin")} strokeWidth={3} />
              RESIGN
            </Button>
          ) : (
            <>
              <Button
                variant="game"
                size="lg"
                onClick={startGame}
                disabled={isTossing || !!tossWinner}
                className={cn("animate-pop-in", (isTossing || tossWinner) && "!opacity-50 cursor-not-allowed")}
              >
                <Play className="w-5 h-5" strokeWidth={3} />
                TOSS & START
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={resetAll}
                disabled={isResetting || isTossing || !!tossWinner}
                className={cn("animate-pop-in", (isResetting || isTossing || tossWinner) && "!opacity-50 cursor-not-allowed")}
              >
                <Trash2 className={cn("w-5 h-5", (isResetting && resetType === "all") && "animate-trash-lid")} strokeWidth={3} />
                RESET SCORES
              </Button>
            </>
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
      <footer className="pt-4 pb-2 text-center text-sm text-muted-foreground select-none">
        Made with ❤ by Mostly Works Studio
      </footer>
    </div>
  );
};

export default Index;
