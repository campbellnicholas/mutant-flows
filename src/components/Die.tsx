import { useState, useEffect } from 'react';
import './Die.css';

/**
 * Die Component
 * @param {Object} props
 * @param {number} props.value - The current value of the die (1-6)
 * @param {boolean} props.isRolling - Whether the die is currently rolling
 * @param {() => void} props.onRollComplete - Callback when rolling animation completes
 * @param {string} props.color - The color of the die (green, yellow, or black)
 */
interface DieProps {
  value: number;
  isRolling: boolean;
  onRollComplete: () => void;
  color: 'green' | 'yellow' | 'black';
}

const Die: React.FC<DieProps> = ({ value, isRolling, onRollComplete, color }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (isRolling) {
      const rollInterval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 6) + 1);
      }, 100);

      const rollDuration = setTimeout(() => {
        clearInterval(rollInterval);
        setDisplayValue(value);
        onRollComplete();
      }, 1000);

      return () => {
        clearInterval(rollInterval);
        clearTimeout(rollDuration);
      };
    }
  }, [isRolling, value, onRollComplete]);

  const renderValue = (val: number) => {
    switch (val) {
      case 1:
        switch (color) {
          case 'black':
            return '💥';
          case 'yellow':
            return '☣️';
          default:
            return '1';
        }
      case 6:
        return '☢️';
      default:
        return val.toString();
    }
  };

  return (
    <div className={`die die-${color} ${isRolling ? 'rolling' : ''}`}>
      <div className="die-inner">
        {renderValue(displayValue)}
      </div>
    </div>
  );
};

export default Die; 