import { cn } from "@/lib/utils";
import { XIcon, OIcon } from "./Icons";

interface GameStatusProps {
  winner: "X" | "O" | null;
  isDraw: boolean;
  currentPlayer: "X" | "O";
}

const GameStatus = ({ winner, isDraw, currentPlayer }: GameStatusProps) => {
  if (winner) {
    return (
      <div className="text-center animate-float flex items-center justify-center gap-3">
        {winner === "X" ? <XIcon className="w-10 h-10 text-x" /> : <OIcon className="w-10 h-10 text-o" />}
        <span className="text-4xl font-extrabold text-foreground">
          Wins! 🎉
        </span>
      </div>
    );
  }

  if (isDraw) {
    return (
      <div className="text-center">
        <span className="text-3xl font-bold text-muted-foreground">
          It's a Draw! 🤝
        </span>
      </div>
    );
  }

  return (
    <div className="text-center flex items-center justify-center gap-2">
      <span className="text-muted-foreground text-lg">Turn: </span>
      <span
        className={cn(
          "ml-2",
          currentPlayer === "X" ? "text-x" : "text-o"
        )}
      >
        {currentPlayer === "X" ? <XIcon className="w-8 h-8" /> : <OIcon className="w-8 h-8" />}
      </span>
    </div>
  );
};

export default GameStatus;
