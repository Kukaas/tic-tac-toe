"use client";
import React, { useState, useEffect, useCallback } from "react";
import Board, { CellValue } from "../components/Board";
import ScoreBoard from "../components/ScoreBoard";
import Controls from "../components/Controls";
import TurnIndicator from "../components/TurnIndicator";

const BOARD_KEY = "ttt-board";
const TURN_KEY = "ttt-turn";
const SCORE_KEY = "ttt-score";

const emptyBoard: CellValue[] = Array(9).fill(null);
const initialScore = { xWins: 0, oWins: 0, draws: 0 };

type Winner = "X" | "O" | "draw" | null;

function getWinner(board: CellValue[]): { winner: Winner; line: number[] | null } {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  if (board.every(cell => cell)) return { winner: "draw", line: null };
  return { winner: null, line: null };
}

export default function Home() {
  const [board, setBoard] = useState<CellValue[]>(emptyBoard);
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [score, setScore] = useState(initialScore);
  const [winner, setWinner] = useState<Winner>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  // Load from localStorage
  useEffect(() => {
    const savedBoard = localStorage.getItem(BOARD_KEY);
    const savedTurn = localStorage.getItem(TURN_KEY);
    const savedScore = localStorage.getItem(SCORE_KEY);
    if (savedBoard) setBoard(JSON.parse(savedBoard));
    if (savedTurn) setTurn(savedTurn as "X" | "O");
    if (savedScore) setScore(JSON.parse(savedScore));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(BOARD_KEY, JSON.stringify(board));
    localStorage.setItem(TURN_KEY, turn);
    localStorage.setItem(SCORE_KEY, JSON.stringify(score));
  }, [board, turn, score]);

  // Check for winner
  useEffect(() => {
    const { winner, line } = getWinner(board);
    setWinner(winner);
    setWinningLine(line);
    if (winner && winner !== "draw") {
      setScore(s => ({ ...s, [winner === "X" ? "xWins" : "oWins"]: s[winner === "X" ? "xWins" : "oWins"] + 1 }));
    } else if (winner === "draw") {
      setScore(s => ({ ...s, draws: s.draws + 1 }));
    }
  }, [board]);

  const handleCellClick = useCallback((idx: number) => {
    if (board[idx] || winner) return;
    setBoard(prev => {
      const next = [...prev];
      next[idx] = turn;
      return next;
    });
    setTurn(prev => (prev === "X" ? "O" : "X"));
  }, [board, turn, winner]);

  const handleNewGame = useCallback(() => {
    setBoard(emptyBoard);
    setWinner(null);
    setWinningLine(null);
  }, []);

  const handleResetAll = useCallback(() => {
    setBoard(emptyBoard);
    setTurn("X");
    setScore(initialScore);
    setWinner(null);
    setWinningLine(null);
    localStorage.removeItem(BOARD_KEY);
    localStorage.removeItem(TURN_KEY);
    localStorage.removeItem(SCORE_KEY);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">Tic-Tac-Toe</h1>
          <div className="bg-white/80 rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col sm:flex-row gap-8">
            {/* Left: TurnIndicator + Board */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              <TurnIndicator turn={turn} winner={winner} />
              <Board
                board={board}
                onCellClick={handleCellClick}
                winningLine={winningLine}
                disabled={!!winner}
              />
            </div>
            {/* Right: Info */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 min-w-[220px] max-w-xs mx-auto">
              <ScoreBoard xWins={score.xWins} oWins={score.oWins} draws={score.draws} />
              <Controls onNewGame={handleNewGame} onResetAll={handleResetAll} disabled={!winner} />
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full text-center text-gray-400 text-sm mt-8 mb-2 select-none">
        Built with React 19, Next.js 15, Tailwind CSS, and shadcn/ui
      </footer>
    </div>
  );
}
