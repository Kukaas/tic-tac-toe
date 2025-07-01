import React from "react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";

export interface TurnIndicatorProps {
    turn: "X" | "O";
    winner: "X" | "O" | "draw" | null;
}

export const TurnIndicator: React.FC<TurnIndicatorProps> = ({ turn, winner }) => {
    let content;
    if (winner === "draw") {
        content = (
            <Label className="text-2xl font-bold text-gray-700">It's a draw!</Label>
        );
    } else if (winner) {
        content = (
            <div className="flex items-center gap-4">
                <Badge className={winner === "X" ? "bg-blue-100 text-blue-700 text-2xl px-6 py-3 rounded-full" : "bg-pink-100 text-pink-700 text-2xl px-6 py-3 rounded-full"}>{winner}</Badge>
                <Label className="text-2xl font-bold text-gray-700">wins!</Label>
            </div>
        );
    } else {
        content = (
            <div className="flex items-center gap-4">
                <Label className="text-2xl font-bold text-gray-700">Player</Label>
                <Badge className={turn === "X" ? "bg-blue-100 text-blue-700 text-2xl px-6 py-3 rounded-full" : "bg-pink-100 text-pink-700 text-2xl px-6 py-3 rounded-full"}>{turn}</Badge>
                <Label className="text-2xl font-bold text-gray-700">'s turn</Label>
            </div>
        );
    }
    return (
        <div className="mb-8 min-h-[56px] flex items-center justify-center w-full">
            {content}
        </div>
    );
};

export default TurnIndicator;
