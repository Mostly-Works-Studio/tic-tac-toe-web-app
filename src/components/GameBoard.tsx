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
}

const GameBoard = ({ board, onCellClick, winningCells, gameOver, isDraw, currentPlayer, winner, isBotMoving = false }: GameBoardProps) => {
  return (
    <div className="relative">
      <div
        className={cn(
          "grid grid-cols-3 gap-3 p-4 bg-card rounded-3xl transition-opacity duration-500",
          isDraw && "animate-shake",
          gameOver && "opacity-40"
        )}
      >
        {board.map((cell, index) => (
          <GameCell
            key={index}
            value={cell as "X" | "O" | null}
            onClick={() => onCellClick(index)}
            isWinning={winningCells.includes(index)}
            disabled={gameOver || isBotMoving}
            currentPlayer={currentPlayer}
          />
        ))}
      </div>

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
