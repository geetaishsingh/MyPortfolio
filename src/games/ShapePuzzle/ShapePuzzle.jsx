import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import './ShapePuzzle.scss';
import './ShapePuzzle.media.scss';

const TARGET_PATTERN = [
  { id: 1, label: '▲', name: 'Triangle', color: '#4ea3a3' },
  { id: 2, label: '◼', name: 'Square', color: '#06b6d4' },
  { id: 3, label: '●', name: 'Circle', color: '#3b82f6' },
  { id: 4, label: '◆', name: 'Diamond', color: '#8b5cf6' },
  { id: 5, label: '★', name: 'Star', color: '#f59e0b' },
  { id: 6, label: '⬟', name: 'Pentagon', color: '#ec4899' },
  { id: 7, label: '⬢', name: 'Hexagon', color: '#10b981' },
  { id: 8, label: '✚', name: 'Cross', color: '#f97316' },
  null, // Empty slot
];

export default function ShapePuzzle() {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('shape_puzzle_best') || '0', 10);
  });

  // Check if position is adjacent (up, down, left, right) to empty slot
  const isAdjacent = (idx1, idx2) => {
    const row1 = Math.floor(idx1 / 3);
    const col1 = idx1 % 3;
    const row2 = Math.floor(idx2 / 3);
    const col2 = idx2 % 3;
    return (
      (Math.abs(row1 - row2) === 1 && col1 === col2) ||
      (Math.abs(col1 - col2) === 1 && row1 === row2)
    );
  };

  // Generate a valid, solvable shuffled board
  const generateSolvableBoard = useCallback(() => {
    let board = [...TARGET_PATTERN];
    let emptyIdx = 8;

    // Simulate 35 random valid sliding moves from the solved state
    for (let i = 0; i < 35; i++) {
      const neighbors = [];
      const row = Math.floor(emptyIdx / 3);
      const col = emptyIdx % 3;

      if (row > 0) neighbors.push(emptyIdx - 3); // Up
      if (row < 2) neighbors.push(emptyIdx + 3); // Down
      if (col > 0) neighbors.push(emptyIdx - 1); // Left
      if (col < 2) neighbors.push(emptyIdx + 1); // Right

      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      [board[emptyIdx], board[randomNeighbor]] = [board[randomNeighbor], board[emptyIdx]];
      emptyIdx = randomNeighbor;
    }

    return board;
  }, []);

  const initGame = useCallback(() => {
    const newBoard = generateSolvableBoard();
    setTiles(newBoard);
    setMoves(0);
    setIsCompleted(false);
  }, [generateSolvableBoard]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const checkVictory = (currentTiles) => {
    for (let i = 0; i < TARGET_PATTERN.length - 1; i++) {
      if (!currentTiles[i] || currentTiles[i].id !== TARGET_PATTERN[i].id) {
        return false;
      }
    }
    return currentTiles[8] === null;
  };

  const handleTileClick = (index) => {
    if (isCompleted || !tiles[index]) return;

    const emptyIndex = tiles.findIndex((t) => t === null);
    if (!isAdjacent(index, emptyIndex)) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];

    const newMoves = moves + 1;
    setTiles(newTiles);
    setMoves(newMoves);

    if (checkVictory(newTiles)) {
      setIsCompleted(true);
      if (bestScore === 0 || newMoves < bestScore) {
        setBestScore(newMoves);
        localStorage.setItem('shape_puzzle_best', newMoves.toString());
      }
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4ea3a3', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'],
        });
      } catch {
        // safe fallback
      }
    }
  };

  return (
    <div className="shape-puzzle">
      <div className="shape-puzzle__header">
        <h3 className="shape-puzzle__title">Shape Rearrangement Puzzle</h3>
        <p className="shape-puzzle__subtitle">
          Slide the geometric shape tiles into the target pattern shown below.
        </p>
      </div>

      <div className="shape-puzzle__dashboard">
        <div className="shape-puzzle__stat">
          <span className="shape-puzzle__stat-label">Moves Made</span>
          <span className="shape-puzzle__stat-value">{moves}</span>
        </div>
        <div className="shape-puzzle__stat">
          <span className="shape-puzzle__stat-label">Best Record</span>
          <span className="shape-puzzle__stat-value">{bestScore > 0 ? `${bestScore} moves` : '—'}</span>
        </div>
      </div>

      {isCompleted && (
        <div className="shape-puzzle__win-banner" role="alert">
          <span className="shape-puzzle__win-icon">🏆</span>
          <div>
            <strong>Puzzle Solved!</strong> You completed the target pattern in {moves} moves.
          </div>
        </div>
      )}

      <div className="shape-puzzle__gameplay-row">
        {/* Playable Grid */}
        <div className="shape-puzzle__grid-column">
          <span className="shape-puzzle__grid-label">Active Board (Click tile adjacent to empty space)</span>
          <div className="shape-puzzle__grid" role="grid" aria-label="3x3 Shape Puzzle Grid">
            {tiles.map((tile, idx) => {
              const emptyIdx = tiles.findIndex((t) => t === null);
              const movable = isAdjacent(idx, emptyIdx);

              if (!tile) {
                return (
                  <div key="empty" className="shape-puzzle__slot shape-puzzle__slot--empty" aria-label="Empty space" />
                );
              }

              return (
                <button
                  key={tile.id}
                  type="button"
                  className={`shape-puzzle__tile ${movable ? 'shape-puzzle__tile--movable' : ''}`}
                  onClick={() => handleTileClick(idx)}
                  disabled={!movable || isCompleted}
                  aria-label={`${tile.name} tile at position ${idx + 1}${movable ? ', can move' : ''}`}
                  style={{ '--tile-color': tile.color }}
                >
                  <span className="shape-puzzle__tile-symbol">{tile.label}</span>
                  <span className="shape-puzzle__tile-name">{tile.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Pattern Preview */}
        <div className="shape-puzzle__target-column">
          <span className="shape-puzzle__grid-label">Target Pattern</span>
          <div className="shape-puzzle__target-grid" aria-label="Target Pattern Preview">
            {TARGET_PATTERN.map((item, idx) => (
              <div
                key={idx}
                className="shape-puzzle__target-cell"
                style={{ '--target-color': item ? item.color : 'transparent' }}
              >
                {item ? item.label : ''}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="shape-puzzle__controls">
        <button type="button" className="shape-puzzle__reset-btn" onClick={initGame}>
          {isCompleted ? 'Play Another Game' : 'Shuffle & Reset'}
        </button>
      </div>
    </div>
  );
}
