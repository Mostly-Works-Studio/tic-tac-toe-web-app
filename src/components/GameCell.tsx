import { cn } from "@/lib/utils";
import { XIcon, OIcon } from "./Icons";

interface GameCellProps {
  value: "X" | "O" | null;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
  currentPlayer?: "X" | "O";
}

const GameCell = ({ value, onClick, isWinning, disabled, currentPlayer }: GameCellProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={cn(
        "game-cell aspect-square group relative",
        value === "X" && "game-cell-x",
        value === "O" && "game-cell-o",
        isWinning && "win-cell animate-pulse-glow",
        !value && !disabled && "hover:scale-[1.02]"
      )}
    >
      {value === "X" && <XIcon className="w-12 h-12 sm:w-16 sm:h-16 animate-pop-in" />}
      {value === "O" && <OIcon className="w-12 h-12 sm:w-16 sm:h-16 animate-pop-in" />}

      {/* Hover Hint */}
      {!value && !disabled && currentPlayer === "X" && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 transition-opacity duration-200">
          <XIcon className="w-12 h-12 sm:w-16 sm:h-16" />
        </div>
      )}
      {!value && !disabled && currentPlayer === "O" && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 transition-opacity duration-200">
          <OIcon className="w-12 h-12 sm:w-16 sm:h-16" />
        </div>
      )}
    </button>
  );
};

export default GameCell;
