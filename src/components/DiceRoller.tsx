import { useState, useCallback } from 'react';
import Die from './Die';
import './DiceRoller.css';

/**
 * Single die roll result
 */
interface DieResult {
  id: string;
  value: number;
  color: 'green' | 'yellow' | 'black';
  pushed?: boolean;
}

/**
 * Roll results summary
 */
interface RollSummary {
  successes: number;
  failures: number;
  brokenGear: number;
}

/**
 * Dice configuration
 */
interface DiceConfig {
  green: number;
  yellow: number;
  black: number;
}

/**
 * DiceRoller Component
 * @param {Object} props
 * @param {string} props.label - Label for this group of dice
 */
interface DiceRollerProps {
  label?: string;
}

const DiceRoller: React.FC<DiceRollerProps> = ({ label }) => {
  const [diceConfig, setDiceConfig] = useState<DiceConfig>({ green: 0, yellow: 0, black: 0 });
  const [diceResults, setDiceResults] = useState<DieResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [rollHistory, setRollHistory] = useState<Array<{ results: DieResult[]; description?: string }>>([]);
  const [currentSummary, setCurrentSummary] = useState<RollSummary>({ successes: 0, failures: 0, brokenGear: 0 });
  const [canPush, setCanPush] = useState(false);
  const [rollDescription, setRollDescription] = useState('');
  const [lastRollDescription, setLastRollDescription] = useState<string | undefined>();

  /**
   * Generates a new die result
   * @param {string} color - The color of the die
   * @returns {DieResult} A new die result with random value
   */
  const generateDieResult = useCallback((color: 'green' | 'yellow' | 'black'): DieResult => ({
    id: Math.random().toString(36).substr(2, 9),
    value: Math.floor(Math.random() * 6) + 1,
    color
  }), []);

  /**
   * Checks if a die is eligible for pushing
   * @param {DieResult} die - The die to check
   * @returns {boolean} Whether the die can be pushed
   */
  const isDiePushable = useCallback((die: DieResult): boolean => {
    if (die.pushed) return false;
    
    switch (die.color) {
      case 'green':
        return die.value !== 6;
      case 'yellow':
        return die.value >= 2 && die.value <= 5;
      case 'black':
        return die.value >= 2 && die.value <= 5;
      default:
        return false;
    }
  }, []);

  /**
   * Calculates the summary of a roll
   * @param {DieResult[]} results - The results of the roll
   * @returns {RollSummary} The summary of successes, failures, and broken gear
   */
  const calculateRollSummary = useCallback((results: DieResult[]): RollSummary => {
    return results.reduce((summary, die) => {
      if (die.value === 6) {
        summary.successes++;
      }
      if ((die.color === 'yellow' || die.color === 'black') && die.value === 1) {
        summary.failures++;
      }
      if (die.color === 'black' && die.value === 1) {
        summary.brokenGear++;
      }
      return summary;
    }, { successes: 0, failures: 0, brokenGear: 0 });
  }, []);

  /**
   * Updates the quantity of a specific color of dice
   * @param {string} color - The color to update
   * @param {number} value - The new quantity
   */
  const updateDiceQuantity = (color: keyof DiceConfig, value: number) => {
    setDiceConfig(prev => ({
      ...prev,
      [color]: Math.max(0, value)
    }));
  };

  /**
   * Handles the dice roll action
   * @returns {void}
   */
  const handleRoll = useCallback(() => {
    if (isRolling) return;
    
    const totalDice = diceConfig.green + diceConfig.yellow + diceConfig.black;
    if (totalDice === 0) return;
    
    setIsRolling(true);
    setCanPush(false);
    
    // Generate initial random values for animation
    const initialResults: DieResult[] = [];
    Object.entries(diceConfig).forEach(([color, count]) => {
      for (let i = 0; i < count; i++) {
        initialResults.push(generateDieResult(color as 'green' | 'yellow' | 'black'));
      }
    });
    setDiceResults(initialResults);

    // After animation, set final values
    setTimeout(() => {
      const finalResults: DieResult[] = [];
      Object.entries(diceConfig).forEach(([color, count]) => {
        for (let i = 0; i < count; i++) {
          finalResults.push(generateDieResult(color as 'green' | 'yellow' | 'black'));
        }
      });
      const description = rollDescription.trim() || `Roll ${rollHistory.length + 1}`;
      setDiceResults(finalResults);
      setRollHistory(prev => [{
        results: finalResults,
        description
      }, ...prev].slice(0, 10));
      setCurrentSummary(calculateRollSummary(finalResults));
      setCanPush(finalResults.some(isDiePushable));
      setIsRolling(false);
      setRollDescription(''); // Clear the description after roll
      setLastRollDescription(description); // Store the description for potential push
    }, 1000);
  }, [isRolling, diceConfig, generateDieResult, calculateRollSummary, isDiePushable, rollDescription, rollHistory.length]);

  /**
   * Handles pushing the roll
   * @returns {void}
   */
  const handlePush = useCallback(() => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    // Keep non-pushable dice, re-roll pushable ones
    const newResults = diceResults.map(die => {
      if (isDiePushable(die)) {
        return { ...generateDieResult(die.color), pushed: true };
      }
      return die;
    });

    // After animation, set final values
    setTimeout(() => {
      setDiceResults(newResults);
      setRollHistory(prev => [{
        results: newResults,
        description: lastRollDescription ? `${lastRollDescription} (Push)` : `Roll ${prev.length + 1} (Push)`
      }, ...prev].slice(0, 10));
      setCurrentSummary(calculateRollSummary(newResults));
      setCanPush(false); // Can't push again
      setIsRolling(false);
      setRollDescription(''); // Clear the description after push
    }, 1000);
  }, [isRolling, diceResults, generateDieResult, calculateRollSummary, isDiePushable, lastRollDescription]);

  const renderValue = (val: number, color: 'green' | 'yellow' | 'black') => {
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

  const totalDice = diceConfig.green + diceConfig.yellow + diceConfig.black;

  return (
    <div className="dice-roller">
      {label && <h2 className="dice-label">{label}</h2>}
      
      <div className="dice-controls">
        <div className="dice-control-group">
          <label>Green Dice:</label>
          <div className="quantity-control">
            <button onClick={() => updateDiceQuantity('green', diceConfig.green - 1)}>-</button>
            <span>{diceConfig.green}</span>
            <button onClick={() => updateDiceQuantity('green', diceConfig.green + 1)}>+</button>
          </div>
        </div>
        <div className="dice-control-group">
          <label>Yellow Dice:</label>
          <div className="quantity-control">
            <button onClick={() => updateDiceQuantity('yellow', diceConfig.yellow - 1)}>-</button>
            <span>{diceConfig.yellow}</span>
            <button onClick={() => updateDiceQuantity('yellow', diceConfig.yellow + 1)}>+</button>
          </div>
        </div>
        <div className="dice-control-group">
          <label>Black Dice:</label>
          <div className="quantity-control">
            <button onClick={() => updateDiceQuantity('black', diceConfig.black - 1)}>-</button>
            <span>{diceConfig.black}</span>
            <button onClick={() => updateDiceQuantity('black', diceConfig.black + 1)}>+</button>
          </div>
        </div>
      </div>
      
      <div className="dice-container">
        {diceResults.map((die) => (
          <Die
            key={die.id}
            value={die.value}
            isRolling={isRolling}
            onRollComplete={() => {}}
            color={die.color}
          />
        ))}
      </div>

      {!isRolling && diceResults.length > 0 && (
        <div className="roll-summary">
          <div className="summary-item success">
            <span className="summary-label">Successes:</span>
            <span className="summary-value">{currentSummary.successes}</span>
          </div>
          <div className="summary-item failure">
            <span className="summary-label">Failures:</span>
            <span className="summary-value">{currentSummary.failures}</span>
          </div>
          {diceResults.some(die => die.color === 'black') && (
            <div className="summary-item broken">
              <span className="summary-label">Broken Gear:</span>
              <span className="summary-value">{currentSummary.brokenGear}</span>
            </div>
          )}
        </div>
      )}

      <div className="roll-controls">
        <input
          type="text"
          value={rollDescription}
          onChange={(e) => setRollDescription(e.target.value)}
          placeholder="What are you rolling for?"
          className="roll-description-input"
          disabled={isRolling}
        />
        <div className="action-buttons">
          <button 
            className="roll-button"
            onClick={handleRoll}
            disabled={isRolling || totalDice === 0}
          >
            {isRolling ? 'Rolling...' : `Roll ${totalDice} Dice`}
          </button>

          {canPush && !isRolling && (
            <button 
              className="push-button"
              onClick={handlePush}
            >
              Push Roll
            </button>
          )}
        </div>
      </div>

      <div className="roll-history">
        <h3>Roll History</h3>
        <div className="history-list">
          {rollHistory.length > 0 ? (
            rollHistory.map((roll, rollIndex) => (
              <div 
                key={rollIndex} 
                className={`history-item ${roll.results.some(die => die.pushed) ? 'pushed' : ''}`}
              >
                <div className="history-dice">
                  {roll.description}:{' '}
                  {roll.results.map(die => (
                    <span key={die.id} className={`die-value die-value-${die.color} ${die.pushed ? 'pushed' : ''}`}>
                      {renderValue(die.value, die.color)}
                    </span>
                  ))}
                </div>
                <div className="history-summary">
                  <span className="summary-badge success">Successes: {calculateRollSummary(roll.results).successes}</span>
                  <span className="summary-badge failure">Failures: {calculateRollSummary(roll.results).failures}</span>
                  {roll.results.some(die => die.color === 'black') && (
                    <span className="summary-badge broken">Broken: {calculateRollSummary(roll.results).brokenGear}</span>
                  )}
                </div>
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

export default DiceRoller; 