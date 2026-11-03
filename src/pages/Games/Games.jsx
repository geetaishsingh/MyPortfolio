import { useState } from 'react';
import { Link } from 'react-router-dom';
import TicTacToe from '../../games/TicTacToe/TicTacToe';
import ShapePuzzle from '../../games/ShapePuzzle/ShapePuzzle';
import MemoryMatch from '../../games/MemoryMatch/MemoryMatch';
import './Games.scss';
import './Games.media.scss';

export default function Games() {
  const [activeGame, setActiveGame] = useState('tictactoe'); // 'tictactoe' | 'shapepuzzle' | 'memorymatch'

  const gameList = [
    {
      id: 'tictactoe',
      title: 'Tic-Tac-Toe',
      icon: '⚔️',
      badge: '2 Players',
      desc: 'Classic strategy game with live win lines, turn tracking & scoreboard.',
    },
    {
      id: 'shapepuzzle',
      title: 'Shape Puzzle',
      icon: '🧩',
      badge: 'Logic Puzzle',
      desc: 'Slide geometric tiles into the target pattern with minimum moves.',
    },
    {
      id: 'memorymatch',
      title: 'Memory Match',
      icon: '🧠',
      badge: 'Card Matching',
      desc: 'Find all matching pairs of developer tech stack icons.',
    },
  ];

  return (
    <div className="games-page">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="games-page__nav-bar">
          <Link to="/" className="games-page__back-link">
            ← Back to Portfolio
          </Link>
          <span className="games-page__badge">Interactive Arcade</span>
        </div>

        {/* Page Header */}
        <div className="games-page__header">
          <h1 className="games-page__title">
            Developer <span className="text-gradient">Mini-Games Arcade</span>
          </h1>
          <p className="games-page__subtitle">
            Take a breather and play interactive games built purely with React state logic, CSS Grid, and custom Sass styling.
          </p>
        </div>

        {/* Game Selector Dashboard */}
        <div className="games-page__dashboard" role="tablist" aria-label="Game Selection">
          {gameList.map((game) => (
            <button
              key={game.id}
              type="button"
              role="tab"
              aria-selected={activeGame === game.id}
              className={`games-page__card ${activeGame === game.id ? 'games-page__card--active' : ''}`}
              onClick={() => setActiveGame(game.id)}
            >
              <div className="games-page__card-icon">{game.icon}</div>
              <div className="games-page__card-meta">
                <div className="games-page__card-header">
                  <h2 className="games-page__card-title">{game.title}</h2>
                  <span className="games-page__card-badge">{game.badge}</span>
                </div>
                <p className="games-page__card-desc">{game.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Active Game Container */}
        <div className="games-page__active-arena" tabIndex={0} role="tabpanel">
          {activeGame === 'tictactoe' && <TicTacToe />}
          {activeGame === 'shapepuzzle' && <ShapePuzzle />}
          {activeGame === 'memorymatch' && <MemoryMatch />}
        </div>
      </div>
    </div>
  );
}
