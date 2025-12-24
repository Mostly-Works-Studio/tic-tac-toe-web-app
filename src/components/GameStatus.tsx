import { cn } from "@/lib/utils";

interface GameStatusProps {
  winner: "X" | "O" | null;
  isDraw: boolean;
  currentPlayer: "X" | "O";
}

const GameStatus = ({ winner, isDraw, currentPlayer }: GameStatusProps) => {
  if (winner) {
    return (
      <div className="text-center animate-float">
        <span 
          className={cn(
            "text-4xl font-extrabold",
            winner === "X" ? "text-x" : "text-o"
          )}
        >
          {winner} Wins! 🎉
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
    <div className="text-center">
      <span className="text-muted-foreground text-lg">Turn: </span>
      <span 
        className={cn(
          "text-3xl font-extrabold ml-2",
          currentPlayer === "X" ? "text-x" : "text-o"
        )}
      >
        {currentPlayer}
      </span>
    </div>
  );
};

export default GameStatus;
