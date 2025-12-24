import { cn } from "@/lib/utils";

interface GameCellProps {
  value: "X" | "O" | null;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

const GameCell = ({ value, onClick, isWinning, disabled }: GameCellProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={cn(
        "game-cell aspect-square",
        value === "X" && "game-cell-x",
        value === "O" && "game-cell-o",
        isWinning && "win-cell animate-pulse-glow",
        !value && !disabled && "hover:scale-[1.02]"
      )}
    >
      {value && (
        <span className="animate-pop-in">{value}</span>
      )}
    </button>
  );
};

export default GameCell;
