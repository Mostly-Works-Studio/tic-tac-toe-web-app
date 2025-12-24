import GameCell from "./GameCell";
import { cn } from "@/lib/utils";

interface GameBoardProps {
  board: (string | null)[];
  onCellClick: (index: number) => void;
  winningCells: number[];
  gameOver: boolean;
  isDraw: boolean;
}

const GameBoard = ({ board, onCellClick, winningCells, gameOver, isDraw }: GameBoardProps) => {
  return (
    <div 
      className={cn(
        "grid grid-cols-3 gap-3 p-4 bg-card rounded-3xl",
        isDraw && "animate-shake"
      )}
    >
      {board.map((cell, index) => (
        <GameCell
          key={index}
          value={cell as "X" | "O" | null}
          onClick={() => onCellClick(index)}
          isWinning={winningCells.includes(index)}
          disabled={gameOver}
        />
      ))}
    </div>
  );
};

export default GameBoard;
