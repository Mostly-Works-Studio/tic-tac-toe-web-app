import { useState, useEffect } from "react";
import GameCell from "./GameCell";
import { cn } from "@/lib/utils";
import { XIcon, OIcon } from "./Icons";
import { Minus } from "lucide-react";

interface GameBoardProps {
  board: (string | null)[];
  onCellClick: (index: number) => void;
  winningCells: number[];
  gameOver: boolean;
  isDraw: boolean;
  currentPlayer: "X" | "O";
  winner: "X" | "O" | null;
  isBotMoving?: boolean;
  isTossing?: boolean;
  tossWinner?: "X" | "O" | null;
}

const GameBoard = ({
  board,
  onCellClick,
  winningCells,
  gameOver,
  isDraw,
  currentPlayer,
  winner,
  isBotMoving = false,
  isTossing = false,
  tossWinner = null
}: GameBoardProps) => {
  // Slot machine animation state
  const [slotBoard, setSlotBoard] = useState<("X" | "O")[]>(Array(9).fill("X"));

  // Randomize board during toss animation
  useEffect(() => {
    if (!isTossing) return;

    const interval = setInterval(() => {
      setSlotBoard(Array(9).fill(null).map(() =>
        Math.random() < 0.5 ? "X" : "O"
      ));
    }, 100); // Update every 100ms for fast flashing

    return () => clearInterval(interval);
  }, [isTossing]);

  // Determine what to display in cells
  const displayBoard = isTossing ? slotBoard : board;

  return (
    <div className="relative">
      <div
        className={cn(
          "grid grid-cols-3 gap-3 p-4 bg-card rounded-3xl transition-opacity duration-500",
          isDraw && "animate-shake",
          gameOver && "opacity-40"
        )}
      >
        {displayBoard.map((cell, index) => (
          <GameCell
            key={index}
            value={cell as "X" | "O" | null}
            onClick={() => onCellClick(index)}
            isWinning={winningCells.includes(index)}
            disabled={gameOver || isBotMoving || isTossing}
            currentPlayer={currentPlayer}
            className={isTossing ? "animate-slot-flash" : ""}
          />
        ))}
      </div>

      {/* Toss Winner Overlay */}
      {tossWinner && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          {tossWinner === "X" && (
            <XIcon className="w-64 h-64 text-x opacity-100 animate-pop-in" />
          )}
          {tossWinner === "O" && (
            <OIcon className="w-64 h-64 text-o opacity-100 animate-pop-in" />
          )}
        </div>
      )}

      {/* Stamp Overlay */}
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          {winner === "X" && (
            <XIcon className="w-64 h-64 text-x opacity-100 animate-stamp" />
          )}
          {winner === "O" && (
            <OIcon className="w-64 h-64 text-o opacity-100 animate-stamp" />
          )}
          {isDraw && !winner && (
            <div className="flex flex-col items-center animate-stamp">
              <Minus className="w-64 h-64 text-muted-foreground opacity-100" />
              <span className="text-4xl font-black text-muted-foreground opacity-100 -mt-16">DRAW</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameBoard;
