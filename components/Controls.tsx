import React from "react";
import { Button } from "./ui/button";

export interface ControlsProps {
    onNewGame: () => void;
    onResetAll: () => void;
    disabled: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ onNewGame, onResetAll, disabled }) => (
    <div className="flex flex-col gap-3 w-full">
        <Button onClick={onNewGame} disabled={disabled} className="w-full">
            New Game
        </Button>
        <Button onClick={onResetAll} variant="outline" className="w-full">
            Reset All
        </Button>
    </div>
);

export default Controls;
