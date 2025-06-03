import { useState, useRef, useEffect } from 'react'
import DiceRoller from './DiceRoller'
import './DiceRoller.css'
import './RotRoller.css'

// Types for the rot roller
type ProtectionType = {
  hasRotResistant: boolean
  hasRotSuit: boolean
  rotSuitRating: number
}

type RollResult = {
  absorbedPoints: number
  remainingPoints: number
  damage: number
  protectionReduced: boolean
  newSuitRating?: number
}

type ProtectionRoll = {
  rotPointNumber: number
  absorbed: boolean
  brokenGear?: number
}

/**
 * RotRoller component for handling rot-related dice rolls
 * @returns {JSX.Element} The RotRoller component
 */
const RotRoller = () => {
  const [rotPoints, setRotPoints] = useState<number>(1)
  const [rotPointsInput, setRotPointsInput] = useState<string>('1')
  const [protection, setProtection] = useState<ProtectionType>({
    hasRotResistant: false,
    hasRotSuit: false,
    rotSuitRating: 3
  })
  const [result, setResult] = useState<RollResult | null>(null)
  const [protectionRolls, setProtectionRolls] = useState<ProtectionRoll[]>([])
  const [currentRotPoint, setCurrentRotPoint] = useState<number>(1)
  const [completedRolls, setCompletedRolls] = useState<number>(0)
  const [damageRollCompleted, setDamageRollCompleted] = useState<boolean>(false)
  const damageRollRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Add effect to scroll to damage roll when protection rolls are complete
  useEffect(() => {
    if (completedRolls === rotPoints && damageRollRef.current) {
      damageRollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [completedRolls, rotPoints])

  // Add effect to scroll to results when damage roll is complete
  useEffect(() => {
    if (damageRollCompleted && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [damageRollCompleted])

  const handleReset = () => {
    setProtectionRolls([])
    setCurrentRotPoint(1)
    setResult(null)
    setCompletedRolls(0)
    setDamageRollCompleted(false)
    setProtection({
      hasRotResistant: false,
      hasRotSuit: false,
      rotSuitRating: 3
    })
  }

  const handleResetRolls = () => {
    setProtectionRolls([])
    setCurrentRotPoint(1)
    setResult(null)
    setCompletedRolls(0)
    setDamageRollCompleted(false)
  }

  const handleProtectionRollComplete = (summary: { successes: number, failures: number, brokenGear: number }) => {
    const absorbed = summary.successes > 0
    
    // Calculate new state based on current values
    const newRoll = {
      rotPointNumber: currentRotPoint,
      absorbed,
      brokenGear: summary.brokenGear
    }
    
    const newProtectionRolls = [...protectionRolls, newRoll]
    const totalAbsorbed = newProtectionRolls.filter(roll => roll.absorbed).length
    const remainingPoints = Math.max(0, rotPoints - totalAbsorbed)
    
    // Track cumulative armor reduction
    const protectionReduced = protection.hasRotSuit && summary.brokenGear > 0
    const totalBrokenGear = newProtectionRolls.reduce((total, roll) => total + (roll.brokenGear ?? 0), 0)
    const newSuitRating = protection.hasRotSuit ? 
      Math.max(0, protection.rotSuitRating - totalBrokenGear) : 
      undefined

    // Update protection state immediately if armor rating is reduced
    if (protectionReduced && newSuitRating !== undefined) {
      setProtection(prev => {
        return {
          ...prev,
          rotSuitRating: newSuitRating
        }
      })
    }

    // Update all state at once
    setProtectionRolls(newProtectionRolls)
    setCompletedRolls(prev => prev + 1)

    // Check if we should move on to damage rolls
    const hasProtection = (protection.hasRotResistant || (protection.hasRotSuit && newSuitRating && newSuitRating > 0))

    // Only increment currentRotPoint if we haven't reached the total and still have protection
    if (currentRotPoint < rotPoints && hasProtection) {
      setCurrentRotPoint(prev => prev + 1)
    } else {
      // All protection rolls are complete or protection is gone
      const finalResult = {
        absorbedPoints: totalAbsorbed,
        remainingPoints,
        damage: 0, // Will be updated after damage roll
        protectionReduced,
        newSuitRating
      }
      setResult(finalResult)
    }
  }

  /**
   * Handles the completion of a damage roll
   * @param {Object} summary - The roll summary
   * @returns {void}
   */
  const handleDamageRollComplete = (summary: { successes: number, failures: number, brokenGear: number }) => {
    const damage = summary.failures
    setResult(prev => prev ? {
      ...prev,
      damage
    } : null)
    setDamageRollCompleted(true)
  }

  return (
    <div className="rot-roller">
      <div className="roller-header">
        <h2>Rot Roller</h2>
        <button 
          className="reset-button"
          onClick={handleReset}
          title="Reset all rolls"
        >
          Reset Rolls
        </button>
      </div>
      
      <div className="input-section">
        <div className="input-group">
          <label htmlFor="rotPoints">Current Rot Points:</label>
          <input
            type="number"
            id="rotPoints"
            min="1"
            value={rotPointsInput}
            onChange={(e) => {
              const value = e.target.value;
              setRotPointsInput(value);
              if (value === '') {
                return;
              }
              const numValue = parseInt(value);
              if (!isNaN(numValue)) {
                setRotPoints(Math.max(1, numValue));
              }
            }}
            onBlur={(e) => {
              if (e.target.value === '') {
                setRotPointsInput('1');
                setRotPoints(1);
                handleResetRolls();
              }
            }}
          />
        </div>

        <div className="protection-section">
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={protection.hasRotResistant}
                onChange={(e) => setProtection(prev => ({
                  ...prev,
                  hasRotResistant: e.target.checked
                }))}
              />
              Has Rot Resistant Talent
            </label>
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={protection.hasRotSuit}
                onChange={(e) => setProtection(prev => ({
                  ...prev,
                  hasRotSuit: e.target.checked
                }))}
              />
              Wearing Rot Suit
            </label>
          </div>

          {protection.hasRotSuit && (
            <div className="input-group">
              <label htmlFor="suitRating">Rot Suit Rating:</label>
              <input
                type="number"
                id="suitRating"
                min="1"
                max="6"
                value={protection.rotSuitRating}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '') {
                    setProtection(prev => ({
                      ...prev,
                      rotSuitRating: 3
                    }));
                  } else {
                    const numValue = parseInt(value);
                    if (!isNaN(numValue)) {
                      setProtection(prev => ({
                        ...prev,
                        rotSuitRating: Math.max(1, Math.min(6, numValue))
                      }));
                    }
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === '') {
                    setProtection(prev => ({
                      ...prev,
                      rotSuitRating: 3
                    }));
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="dice-rollers">
        {(protection.hasRotResistant || protection.hasRotSuit) && (
          <div className="roll-step">
            <div className="step-header">
              <span className="step-number">1</span>
              <h3>Roll for Protection</h3>
            </div>
            <p className="step-description">
              Roll protection for Rot Point {currentRotPoint} of {rotPoints}. This includes {protection.hasRotResistant ? '3 green dice from Rot Resistant talent' : ''}
              {protection.hasRotResistant && protection.hasRotSuit ? ' and ' : ''}
              {protection.hasRotSuit ? `${protection.rotSuitRating} black dice from your Rot Suit` : ''}.
            </p>
            <div className="protection-progress">
              Protection Rolls: {completedRolls} of {rotPoints}
            </div>
            <DiceRoller
              label="Rolling for Protection"
              initialDice={{
                green: protection.hasRotResistant ? 3 : 0,
                yellow: 0,
                black: protection.hasRotSuit ? protection.rotSuitRating : 0
              }}
              onRollSummary={handleProtectionRollComplete}
              showHistory={true}
              storageKey="rotProtectionHistory"
              allowPush={false}
              disabled={completedRolls === rotPoints}
            />
          </div>
        )}

        {(!protection.hasRotResistant && !protection.hasRotSuit || completedRolls === rotPoints) && (
          <div className="roll-step" ref={damageRollRef}>
            <div className="step-header">
              <span className="step-number">
                {(protection.hasRotResistant || protection.hasRotSuit) ? '2' : '1'}
              </span>
              <h3>Roll for Rot Damage</h3>
            </div>
            {result?.remainingPoints === 0 ? (
              <p className="step-description success-message">
                Rot has been absorbed by your rot protection!
              </p>
            ) : (
              <p className="step-description">
                {result?.remainingPoints ? 
                  `Roll ${result.remainingPoints} green dice for the remaining rot points.` :
                  `Roll ${rotPoints} green dice for your rot points.`
                }
              </p>
            )}
            <DiceRoller
              label="Rolling for Rot Damage"
              initialDice={{ 
                green: result?.remainingPoints ?? rotPoints, 
                yellow: 0, 
                black: 0 
              }}
              onRollSummary={handleDamageRollComplete}
              showHistory={true}
              storageKey="rotDamageHistory"
              allowPush={false}
              disabled={damageRollCompleted || result?.remainingPoints === 0}
              countGreenFailures={true}
            />
          </div>
        )}
      </div>

      {result && (
        <div className="result-section" ref={resultsRef}>
          <h3>Results</h3>
          {(protection.hasRotResistant || protection.hasRotSuit) && (
            <>
              <p>Rot Points Absorbed: {result.absorbedPoints}</p>
              <p>Remaining Rot Points: {result.remainingPoints}</p>
            </>
          )}
          <p>Damage Taken: {result.damage}</p>
          {result.protectionReduced && result.newSuitRating !== undefined && (
            <p>New Rot Suit Rating: {result.newSuitRating}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default RotRoller 