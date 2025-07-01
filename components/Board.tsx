import React from "react";
import { cn } from "../lib/utils";

export type CellValue = "X" | "O" | null;

export interface BoardProps {
    board: CellValue[];
    onCellClick: (idx: number) => void;
    winningLine: number[] | null;
    disabled: boolean;
}

export const Board: React.FC<BoardProps> = ({ board, onCellClick, winningLine, disabled }) => {
    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-2 aspect-square w-full max-w-xs">
            {board.map((cell, idx) => {
                const isWinning = winningLine?.includes(idx);
                return (
                    <button
                        key={idx}
                        className={cn(
                            "flex items-center justify-center text-3xl sm:text-4xl font-bold rounded-lg bg-white shadow transition-all h-20 sm:h-24 w-full aspect-square border border-gray-200 focus:outline-none",
                            isWinning && "bg-green-100 ring-2 ring-green-400",
                            !cell && !disabled && "hover:ring-2 hover:ring-blue-300 hover:scale-105",
                            disabled && "cursor-not-allowed opacity-60"
                        )}
                        style={{ transition: "transform 0.1s" }}
                        onClick={() => !cell && !disabled && onCellClick(idx)}
                        disabled={!!cell || disabled}
                        aria-label={`Cell ${idx + 1}`}
                    >
                        {cell && (
                            <span
                                className={cn(
                                    cell === "X" ? "text-blue-600" : "text-pink-500",
                                    "transition-colors duration-150"
                                )}
                            >
                                {cell}
                            </span>
                        )}
                        {!cell && null}
                    </button>
                );
            })}
        </div>
    );
};

export default Board;
