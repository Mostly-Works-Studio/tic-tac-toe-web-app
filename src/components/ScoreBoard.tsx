import { cn } from "@/lib/utils";

interface ScoreBoardProps {
  xWins: number;
  oWins: number;
  draws: number;
  currentPlayer: "X" | "O";
}

const ScoreBoard = ({ xWins, oWins, draws, currentPlayer }: ScoreBoardProps) => {
  return (
    <div className="flex justify-center gap-4 w-full max-w-sm">
      <div
        className={cn(
          "flex-1 bg-card rounded-2xl p-4 text-center transition-all duration-300",
          currentPlayer === "X" && "ring-2 ring-primary glow-x"
        )}
      >
        <div className="text-x text-3xl font-extrabold">X</div>
        <div className="text-foreground text-2xl font-bold">{xWins}</div>
      </div>

      <div className="flex-1 bg-card rounded-2xl p-4 text-center">
        <div className="text-muted-foreground text-xl font-extrabold pt-1">DRAW</div>
        <div className="text-foreground text-2xl font-bold">{draws}</div>
      </div>

      <div
        className={cn(
          "flex-1 bg-card rounded-2xl p-4 text-center transition-all duration-300",
          currentPlayer === "O" && "ring-2 ring-secondary glow-o"
        )}
      >
        <div className="text-o text-3xl font-extrabold">O</div>
        <div className="text-foreground text-2xl font-bold">{oWins}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
