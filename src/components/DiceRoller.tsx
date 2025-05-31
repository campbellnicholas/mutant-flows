import { useState, useCallback, useEffect } from 'react';
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
  isRolling: boolean;
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
 * @param {Object} props.initialDice - Initial dice configuration
 * @param {Function} props.onRollSummary - Callback when roll summary changes
 * @param {boolean} props.showHistory - Whether to show the roll history
 * @param {string} props.storageKey - Unique key for sessionStorage
 * @param {boolean} props.allowPush - Whether to allow pushing the roll
 * @param {boolean} props.disabled - Whether the dice roller is disabled
 */
interface DiceRollerProps {
  label?: string;
  initialDice?: DiceConfig;
  onRollSummary?: (summary: RollSummary) => void;
  showHistory?: boolean;
  storageKey?: string;
  allowPush?: boolean;
  disabled?: boolean;
}

const DiceRoller: React.FC<DiceRollerProps> = ({ 
  label, 
  initialDice = { green: 0, yellow: 0, black: 0 },
  onRollSummary,
  showHistory = true,
  storageKey = 'defaultRollHistory',
  allowPush = true,
  disabled = false
}) => {
  const [diceConfig, setDiceConfig] = useState<DiceConfig>(initialDice);
  const [diceResults, setDiceResults] = useState<DieResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [rollHistory, setRollHistory] = useState<Array<{ results: DieResult[]; description?: string }>>(() => {
    const saved = sessionStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });
  const [currentSummary, setCurrentSummary] = useState<RollSummary>({ successes: 0, failures: 0, brokenGear: 0 });
  const [canPush, setCanPush] = useState(false);
  const [rollDescription, setRollDescription] = useState('');
  const [lastRollDescription, setLastRollDescription] = useState<string | undefined>();

  // Update dice config when initialDice changes
  useEffect(() => {
    setDiceConfig(initialDice);
  }, [initialDice]);

  // Add useEffect for sessionStorage persistence
  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(rollHistory));
  }, [rollHistory, storageKey]);

  /**
   * Generates a new die result
   * @param {string} color - The color of the die
   * @returns {DieResult} A new die result with random value
   */
  const generateDieResult = useCallback((color: 'green' | 'yellow' | 'black'): DieResult => ({
    id: Math.random().toString(36).substr(2, 9),
    value: Math.floor(Math.random() * 6) + 1,
    color,
    isRolling: false
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
        initialResults.push({ ...generateDieResult(color as 'green' | 'yellow' | 'black'), isRolling: true });
      }
    });
    setDiceResults(initialResults);

    // After animation, set final values
    setTimeout(() => {
      const finalResults: DieResult[] = [];
      Object.entries(diceConfig).forEach(([color, count]) => {
        for (let i = 0; i < count; i++) {
          finalResults.push({ ...generateDieResult(color as 'green' | 'yellow' | 'black'), isRolling: false });
        }
      });
      const description = rollDescription.trim() || `Roll ${rollHistory.length + 1}`;
      setDiceResults(finalResults);
      setRollHistory(prev => [{
        results: finalResults,
        description
      }, ...prev].slice(0, 10));
      const newSummary = calculateRollSummary(finalResults);
      setCurrentSummary(newSummary);
      if (onRollSummary) {
        onRollSummary(newSummary);
      }
      setCanPush(finalResults.some(isDiePushable));
      setIsRolling(false);
      setRollDescription(''); // Clear the description after roll
      setLastRollDescription(description); // Store the description for potential push
    }, 1000);
  }, [isRolling, diceConfig, generateDieResult, calculateRollSummary, isDiePushable, rollDescription, rollHistory.length, onRollSummary]);

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
        return { ...die, isRolling: true };
      }
      return { ...die, isRolling: false };
    });
    setDiceResults(newResults);

    // After animation, set final values
    setTimeout(() => {
      const finalResults = newResults.map(die => {
        if (die.isRolling) {
          return { ...generateDieResult(die.color), pushed: true, isRolling: false };
        }
        return die;
      });
      setDiceResults(finalResults);
      setRollHistory(prev => [{
        results: finalResults,
        description: lastRollDescription ? `${lastRollDescription} (Push)` : `Roll ${prev.length + 1} (Push)`
      }, ...prev].slice(0, 10));
      const newSummary = calculateRollSummary(finalResults);
      setCurrentSummary(newSummary);
      if (onRollSummary) {
        onRollSummary(newSummary);
      }
      setCanPush(false); // Can't push again
      setIsRolling(false);
      setRollDescription(''); // Clear the description after push
    }, 1000);
  }, [isRolling, diceResults, generateDieResult, calculateRollSummary, isDiePushable, lastRollDescription, onRollSummary]);

  // Add clearHistory function
  const clearHistory = () => {
    setRollHistory([]);
    sessionStorage.removeItem(storageKey);
  };

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
      
      <div className="dice-container">
        {diceResults.map((die) => (
          <Die
            key={die.id}
            value={die.value}
            isRolling={die.isRolling}
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
          placeholder="Optional: What is this roll for?"
          className="roll-description-input"
          disabled={isRolling}
        />
        <div className="action-buttons">
          <button 
            className="roll-button"
            onClick={handleRoll}
            disabled={isRolling || totalDice === 0 || disabled}
          >
            {isRolling ? 'Rolling...' : `Roll ${totalDice} Dice`}
          </button>

          {canPush && !isRolling && allowPush && (
            <button 
              className="push-button"
              onClick={handlePush}
            >
              Push Roll
            </button>
          )}
        </div>
      </div>

      {showHistory && (
        <div className="roll-history">
          <div className="history-header">
            <h3>Roll History</h3>
            {rollHistory.length > 0 && (
              <button 
                onClick={clearHistory}
                className="clear-history-button"
                title="Clear roll history"
              >
                Clear History
              </button>
            )}
          </div>
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
      )}
    </div>
  );
};

export default DiceRoller; 