import { cn } from "@/lib/utils";
import { XIcon, OIcon, ComputerIcon, UserIcon } from "./Icons";
import AnimatedScoreCard from "./AnimatedScoreCard";

interface ScoreBoardProps {
  xWins: number;
  oWins: number;
  draws: number;
  currentPlayer: "X" | "O";
  isDraw?: boolean;
  gameMode: "human" | "computer";
}

const ScoreBoard = ({ xWins, oWins, draws, currentPlayer, isDraw, gameMode }: ScoreBoardProps) => {
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
      >
        {/* Game Mode Icon - positioned relative to the card */}
        <div className="absolute top-0.5 right-0.5 z-10">
          {gameMode === "computer" ? (
            <ComputerIcon className="w-8 h-8 text-o" />
          ) : (
            <UserIcon className="w-8 h-8 text-o" />
          )}
        </div>

        <OIcon className="w-8 h-8 text-o" />
        <div className="text-foreground text-2xl font-bold">{oWins}</div>
      </AnimatedScoreCard>
    </div>
  );
};

export default ScoreBoard;
