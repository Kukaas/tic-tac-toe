import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";

export interface ScoreBoardProps {
    xWins: number;
    oWins: number;
    draws: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ xWins, oWins, draws }) => (
    <Card className="p-8 flex flex-col gap-6 items-center shadow-md rounded-2xl bg-white min-w-[260px] max-w-full">
        <h3 className="text-2xl font-bold mb-4">Scoreboard</h3>
        <div className="flex gap-8">
            <div className="flex flex-col items-center">
                <Badge className="mb-2 bg-blue-100 text-blue-700 text-lg px-4 py-2 rounded-full">X</Badge>
                <Label className="text-2xl font-semibold">{xWins}</Label>
            </div>
            <div className="flex flex-col items-center">
                <Badge className="mb-2 bg-pink-100 text-pink-700 text-lg px-4 py-2 rounded-full">O</Badge>
                <Label className="text-2xl font-semibold">{oWins}</Label>
            </div>
            <div className="flex flex-col items-center">
                <Badge className="mb-2 bg-gray-100 text-gray-700 text-lg px-4 py-2 rounded-full">Draw</Badge>
                <Label className="text-2xl font-semibold">{draws}</Label>
            </div>
        </div>
    </Card>
);

export default ScoreBoard;
