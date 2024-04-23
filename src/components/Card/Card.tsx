import { useState } from 'react';
import './Card.scss';

function Card({ recto, verso }: { recto: string; verso: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="recto">{isFlipped ? verso : recto}</div>
      <div className="verso">{isFlipped ? recto : verso}</div>
    </div>
  );
}

export default Card;
