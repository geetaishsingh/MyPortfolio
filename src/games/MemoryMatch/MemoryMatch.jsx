import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import reactIcon from '../../assets/icons/react.svg';
import jsIcon from '../../assets/icons/javaS.svg';
import htmlIcon from '../../assets/icons/html.svg';
import cssIcon from '../../assets/icons/css.svg';
import nodeIcon from '../../assets/icons/js.svg';
import gitIcon from '../../assets/icons/git hub.svg';
import './MemoryMatch.scss';
import './MemoryMatch.media.scss';

const CARD_DATA = [
  { id: 'react', name: 'React', icon: reactIcon },
  { id: 'js', name: 'JavaScript', icon: jsIcon },
  { id: 'html', name: 'HTML5', icon: htmlIcon },
  { id: 'css', name: 'CSS3', icon: cssIcon },
  { id: 'node', name: 'Node.js', icon: nodeIcon },
  { id: 'git', name: 'Git', icon: gitIcon },
];

export default function MemoryMatch() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isWon, setIsWon] = useState(false);

  const initGame = useCallback(() => {
    // Duplicate and shuffle
    const paired = [...CARD_DATA, ...CARD_DATA].map((item, index) => ({
      uniqueId: `${item.id}-${index}`,
      id: item.id,
      name: item.name,
      icon: item.icon,
    }));

    // Fisher-Yates shuffle
    for (let i = paired.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [paired[i], paired[j]] = [paired[j], paired[i]];
    }

    setCards(paired);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setIsLocked(false);
    setIsWon(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCardClick = (card) => {
    if (isLocked) return;
    if (flippedCards.some((c) => c.uniqueId === card.uniqueId)) return;
    if (matchedCards.includes(card.id)) return;

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves((prev) => prev + 1);

      const [first, second] = newFlipped;
      if (first.id === second.id) {
        // Matched!
        const nextMatched = [...matchedCards, first.id];
        setMatchedCards(nextMatched);
        setFlippedCards([]);
        setIsLocked(false);

        if (nextMatched.length === CARD_DATA.length) {
          setIsWon(true);
          try {
            confetti({
              particleCount: 70,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#4ea3a3', '#06b6d4', '#10b981', '#f59e0b'],
            });
          } catch {
            // safe fallback
          }
        }
      } else {
        // Not matched, flip back after brief delay
        setTimeout(() => {
          setFlippedCards([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  return (
    <div className="memory-match">
      <div className="memory-match__header">
        <h3 className="memory-match__title">Dev Stack Memory Match</h3>
        <p className="memory-match__subtitle">
          Test your memory by flipping and pairing identical developer tech badges.
        </p>
      </div>

      <div className="memory-match__dashboard">
        <div className="memory-match__stat">
          <span className="memory-match__stat-label">Moves</span>
          <span className="memory-match__stat-value">{moves}</span>
        </div>
        <div className="memory-match__stat">
          <span className="memory-match__stat-label">Matched Pairs</span>
          <span className="memory-match__stat-value">
            {matchedCards.length} / {CARD_DATA.length}
          </span>
        </div>
      </div>

      {isWon && (
        <div className="memory-match__win-banner" role="alert">
          <span className="memory-match__win-icon">🎉</span>
          <div>
            <strong>Magnificent!</strong> You matched all {CARD_DATA.length} pairs in {moves} moves.
          </div>
        </div>
      )}

      {/* 3x4 Grid */}
      <div className="memory-match__grid" role="grid" aria-label="12 Card Memory Grid">
        {cards.map((card) => {
          const isFlipped =
            flippedCards.some((c) => c.uniqueId === card.uniqueId) ||
            matchedCards.includes(card.id);

          return (
            <button
              key={card.uniqueId}
              type="button"
              className={`memory-match__card ${isFlipped ? 'memory-match__card--flipped' : ''} ${
                matchedCards.includes(card.id) ? 'memory-match__card--matched' : ''
              }`}
              onClick={() => handleCardClick(card)}
              disabled={isFlipped || isLocked}
              aria-label={isFlipped ? `${card.name} card revealed` : 'Hidden card, click to reveal'}
            >
              <div className="memory-match__card-inner">
                {/* Back of Card (Hidden) */}
                <div className="memory-match__card-front">
                  <span className="memory-match__card-icon">⚡</span>
                </div>

                {/* Face of Card (Revealed) */}
                <div className="memory-match__card-back">
                  <img src={card.icon} alt={card.name} className="memory-match__card-img" />
                  <span className="memory-match__card-name">{card.name}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="memory-match__controls">
        <button type="button" className="memory-match__reset-btn" onClick={initGame}>
          {isWon ? 'Play Again' : 'Reset & Reshuffle'}
        </button>
      </div>
    </div>
  );
}
