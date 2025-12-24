import { cn } from "@/lib/utils";
import { XIcon, OIcon } from "./Icons";

interface ScoreBoardProps {
  xWins: number;
  oWins: number;
  draws: number;
  currentPlayer: "X" | "O";
  isDraw?: boolean;
}

const ScoreBoard = ({ xWins, oWins, draws, currentPlayer, isDraw }: ScoreBoardProps) => {
  return (
    <div className="flex justify-center gap-4 w-full max-w-sm">
      <div
        className={cn(
          "flex-1 bg-card rounded-2xl p-4 text-center transition-all duration-300 flex flex-col items-center justify-center gap-2",
          currentPlayer === "X" && !isDraw && "glow-x"
        )}
      >
        <XIcon className="w-8 h-8 text-x" />
        <div className="text-foreground text-2xl font-bold">{xWins}</div>
      </div>

      <div
        className={cn(
          "flex-1 bg-card rounded-2xl p-4 text-center transition-all duration-300 flex flex-col items-center justify-center gap-2",
          isDraw && "shadow-[0_0_35px_hsl(215_20%_65%_/_0.6)]"
        )}
      >
        <div className="text-muted-foreground text-xl font-extrabold pt-2">DRAW</div>
        <div className="text-foreground text-2xl font-bold">{draws}</div>
      </div>

      <div
        className={cn(
          "flex-1 bg-card rounded-2xl p-4 text-center transition-all duration-300 flex flex-col items-center justify-center gap-2",
          currentPlayer === "O" && !isDraw && "glow-o"
        )}
      >
        <OIcon className="w-8 h-8 text-o" />
        <div className="text-foreground text-2xl font-bold">{oWins}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
