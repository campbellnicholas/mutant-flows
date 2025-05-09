import { useState } from 'react';
import Die from './Die';
import './DieExample.css';

/**
 * DieExample Component
 * Demonstrates the usage of the Die component with controls
 */
const DieExample: React.FC = () => {
  const [dieValue, setDieValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [rollHistory, setRollHistory] = useState<number[]>([]);
  const [dieColor, setDieColor] = useState<'green' | 'yellow' | 'black'>('green');

  /**
   * Handles the die roll action
   * @returns {void}
   */
  const handleRoll = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    // Simulate a random roll after animation
    setTimeout(() => {
      const newValue = Math.floor(Math.random() * 6) + 1;
      setDieValue(newValue);
      setRollHistory(prev => [newValue, ...prev].slice(0, 10));
    }, 1000);
  };

  /**
   * Handles changing the die color
   * @param {string} color - The new color to set
   * @returns {void}
   */
  const handleColorChange = (color: 'green' | 'yellow' | 'black') => {
    setDieColor(color);
  };

  return (
    <div className="die-example">
      <h1>Die Roller Example</h1>
      
      <div className="die-controls">
        <button 
          className={`color-button ${dieColor === 'green' ? 'active' : ''}`}
          onClick={() => handleColorChange('green')}
        >
          Green
        </button>
        <button 
          className={`color-button ${dieColor === 'yellow' ? 'active' : ''}`}
          onClick={() => handleColorChange('yellow')}
        >
          Yellow
        </button>
        <button 
          className={`color-button ${dieColor === 'black' ? 'active' : ''}`}
          onClick={() => handleColorChange('black')}
        >
          Black
        </button>
      </div>

      <div className="die-container">
        <Die 
          value={dieValue}
          isRolling={isRolling}
          onRollComplete={() => setIsRolling(false)}
          color={dieColor}
        />
        <button 
          className="roll-button"
          onClick={handleRoll}
          disabled={isRolling}
        >
          {isRolling ? 'Rolling...' : 'Roll Die'}
        </button>
      </div>

      <div className="roll-history">
        <h2>Roll History</h2>
        <div className="history-list">
          {rollHistory.length > 0 ? (
            rollHistory.map((value, index) => (
              <div key={index} className="history-item">
                Roll {rollHistory.length - index}: {value}
              </div>
            ))
          ) : (
            <div className="no-rolls">No rolls yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DieExample; 