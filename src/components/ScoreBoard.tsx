import { cn } from "@/lib/utils";
import { XIcon, OIcon, ComputerIcon, UserIcon } from "./Icons";
import AnimatedScoreCard from "./AnimatedScoreCard";
import { useState, useEffect } from "react";

interface ScoreBoardProps {
  xWins: number;
  oWins: number;
  draws: number;
  currentPlayer: "X" | "O";
  isDraw?: boolean;
  gameMode: "human" | "computer";
  canToggle: boolean;
  onToggleGameMode: () => void;
  onFlippingChange?: (isFlipping: boolean) => void;
}

const ScoreBoard = ({ xWins, oWins, draws, currentPlayer, isDraw, gameMode, canToggle, onToggleGameMode, onFlippingChange }: ScoreBoardProps) => {
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    onFlippingChange?.(isFlipping);
  }, [isFlipping, onFlippingChange]);

  const handleToggle = () => {
    if (!canToggle) return;

    setIsFlipping(true);

    // Change mode at 50% of animation (300ms) when card is edge-on
    setTimeout(() => {
      onToggleGameMode();
    }, 300);

    // Reset flip animation after it completes
    setTimeout(() => {
      setIsFlipping(false);
    }, 600);
  };

  return (
    <div className="flex justify-center gap-4 w-full max-w-sm">
      <AnimatedScoreCard
        triggerValue={xWins}
        active={currentPlayer === "X" && !isDraw}
        activeClassName="glow-x"
      >
        <XIcon className="w-8 h-8 text-x" />
        <div className="text-foreground text-2xl font-bold">{xWins}</div>
      </AnimatedScoreCard>

      <AnimatedScoreCard
        triggerValue={draws}
        active={isDraw}
        activeClassName="shadow-[0_0_35px_hsl(215_25%_65%_/_0.6)]"
      >
        <div className="text-muted-foreground text-xl font-extrabold pt-2">DRAW</div>
        <div className="text-foreground text-2xl font-bold">{draws}</div>
      </AnimatedScoreCard>

      <AnimatedScoreCard
        triggerValue={oWins}
        active={currentPlayer === "O" && !isDraw}
        activeClassName="glow-o"
        className={cn(
          isFlipping && "animate-flip",
          canToggle && "cursor-pointer hover:scale-105 transition-transform duration-200"
        )}
        onClick={handleToggle}
        staticContent={
          <div className="absolute top-0.5 right-0.5 z-10">
            {gameMode === "computer" ? (
              <ComputerIcon className="w-8 h-8 text-o" />
            ) : (
              <UserIcon className="w-8 h-8 text-o" />
            )}
          </div>
        }
      >
        <OIcon className="w-8 h-8 text-o" />
        <div className="text-foreground text-2xl font-bold">{oWins}</div>
      </AnimatedScoreCard>
    </div>
  );
};

export default ScoreBoard;
