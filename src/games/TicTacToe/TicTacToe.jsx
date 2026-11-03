import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './TicTacToe.scss';
import './TicTacToe.media.scss';

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ x: 0, o: 0, ties: 0 });
  const [winnerInfo, setWinnerInfo] = useState({ winner: null, line: null });

  const checkWinner = (currentBoard) => {
    for (let combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winner: currentBoard[a], line: combo };
      }
    }

    if (currentBoard.every((cell) => cell !== null)) {
      return { winner: 'Tie', line: null };
    }

    return null;
  };

  const handleCellClick = (index) => {
    if (board[index] || winnerInfo.winner) return;

    const newBoard = [...board];
    const currentPlayer = isXNext ? 'X' : 'O';
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinnerInfo(result);
      if (result.winner === 'X') {
        setScores((prev) => ({ ...prev, x: prev.x + 1 }));
        triggerWinCelebration();
      } else if (result.winner === 'O') {
        setScores((prev) => ({ ...prev, o: prev.o + 1 }));
        triggerWinCelebration();
      } else {
        setScores((prev) => ({ ...prev, ties: prev.ties + 1 }));
      }
    } else {
      setIsXNext(!isXNext);
    }
  };

  const triggerWinCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#4ea3a3', '#06b6d4', '#10b981', '#f59e0b'],
      });
    } catch {
      // safe fallback if canvas-confetti is not loaded
    }
  };

  const resetRound = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinnerInfo({ winner: null, line: null });
  };

  const resetScoreboard = () => {
    resetRound();
    setScores({ x: 0, o: 0, ties: 0 });
  };

  return (
    <div className="tic-tac-toe">
      <div className="tic-tac-toe__header">
        <h3 className="tic-tac-toe__title">Tic-Tac-Toe Arena</h3>
        <p className="tic-tac-toe__subtitle">
          Two-player strategic showdown. Connect three in a row to win!
        </p>
      </div>

      {/* Scoreboard */}
      <div className="tic-tac-toe__scoreboard">
        <div className={`tic-tac-toe__score-card ${isXNext && !winnerInfo.winner ? 'tic-tac-toe__score-card--active' : ''}`}>
          <span className="tic-tac-toe__score-label">Player X</span>
          <span className="tic-tac-toe__score-value">{scores.x}</span>
        </div>
        <div className="tic-tac-toe__score-card tic-tac-toe__score-card--ties">
          <span className="tic-tac-toe__score-label">Ties</span>
          <span className="tic-tac-toe__score-value">{scores.ties}</span>
        </div>
        <div className={`tic-tac-toe__score-card ${!isXNext && !winnerInfo.winner ? 'tic-tac-toe__score-card--active' : ''}`}>
          <span className="tic-tac-toe__score-label">Player O</span>
          <span className="tic-tac-toe__score-value">{scores.o}</span>
        </div>
      </div>

      {/* Status Banner */}
      <div className="tic-tac-toe__status-banner" role="status" aria-live="polite">
        {winnerInfo.winner ? (
          winnerInfo.winner === 'Tie' ? (
            <span className="tic-tac-toe__status--tie">It's a Draw! Well played.</span>
          ) : (
            <span className="tic-tac-toe__status--win">🎉 Player {winnerInfo.winner} Wins!</span>
          )
        ) : (
          <span className="tic-tac-toe__status--turn">
            Current Turn: <strong>Player {isXNext ? 'X' : 'O'}</strong>
          </span>
        )}
      </div>

      {/* Board */}
      <div className="tic-tac-toe__board" role="grid" aria-label="Tic-Tac-Toe Grid">
        {board.map((cellValue, idx) => {
          const isWinningCell = winnerInfo.line && winnerInfo.line.includes(idx);
          return (
            <button
              key={idx}
              type="button"
              className={`tic-tac-toe__cell ${
                cellValue === 'X' ? 'tic-tac-toe__cell--x' : cellValue === 'O' ? 'tic-tac-toe__cell--o' : ''
              } ${isWinningCell ? 'tic-tac-toe__cell--winning' : ''}`}
              onClick={() => handleCellClick(idx)}
              disabled={Boolean(cellValue || winnerInfo.winner)}
              aria-label={`Cell ${idx + 1}, ${cellValue ? `contains ${cellValue}` : 'empty'}`}
            >
              {cellValue}
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="tic-tac-toe__controls">
        <button type="button" className="tic-tac-toe__btn tic-tac-toe__btn--primary" onClick={resetRound}>
          {winnerInfo.winner ? 'Play Again' : 'Restart Round'}
        </button>
        <button type="button" className="tic-tac-toe__btn tic-tac-toe__btn--secondary" onClick={resetScoreboard}>
          Reset Scores
        </button>
      </div>
    </div>
  );
}
