import { cn } from "@/lib/utils";
import { XIcon, OIcon, BotIcon, UserIcon } from "./Icons";
import AnimatedScoreCard from "./AnimatedScoreCard";
import DifficultyMenu from "./DifficultyMenu";
import { useState, useEffect, useRef } from "react";

interface ScoreBoardProps {
  xWins: number;
  oWins: number;
  draws: number;
  currentPlayer: "X" | "O";
  isDraw?: boolean;
  gameMode: "human" | "bot";
  difficulty: "easy" | "medium" | "hard";
  canToggle: boolean;
  onToggleGameMode: () => void;
  onSetDifficulty: (difficulty: "easy" | "medium" | "hard") => void;
  onFlippingChange?: (isFlipping: boolean) => void;
}

const ScoreBoard = ({ xWins, oWins, draws, currentPlayer, isDraw, gameMode, difficulty, canToggle, onToggleGameMode, onSetDifficulty, onFlippingChange }: ScoreBoardProps) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [showDifficultyMenu, setShowDifficultyMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleContextMenu = (e: React.MouseEvent) => {
    if (gameMode === "bot") {
      e.preventDefault();
      setMenuPosition({ x: e.clientX, y: e.clientY });
      setShowDifficultyMenu(true);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (gameMode !== "bot") return;

    // Long press detection
    longPressTimerRef.current = setTimeout(() => {
      const touch = e.touches[0];
      setMenuPosition({ x: touch.clientX, y: touch.clientY });
      setShowDifficultyMenu(true);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
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
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        staticContent={
          <div className="absolute top-0.5 right-0.5 z-10">
            {gameMode === "bot" ? (
              <BotIcon
                className="w-8 h-8"
                style={{
                  color: difficulty === "easy" ? "#4ADE80" :
                    difficulty === "medium" ? "#FACC15" : "#D2190B"
                }}
              />
            ) : (
              <UserIcon className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
        }
      >
        <OIcon className="w-8 h-8 text-o" />
        <div className="text-foreground text-2xl font-bold">{oWins}</div>
      </AnimatedScoreCard>

      {showDifficultyMenu && (
        <DifficultyMenu
          position={menuPosition}
          currentDifficulty={difficulty}
          onSelect={onSetDifficulty}
          onClose={() => setShowDifficultyMenu(false)}
        />
      )}
    </div>
  );
};

export default ScoreBoard;
