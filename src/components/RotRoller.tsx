import { useState } from 'react'
import DiceRoller from './DiceRoller'
import './DiceRoller.css'

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

/**
 * RotRoller component for handling rot-related dice rolls
 * @returns {JSX.Element} The RotRoller component
 */
const RotRoller = () => {
  const [rotPoints, setRotPoints] = useState<number>(1)
  const [protection, setProtection] = useState<ProtectionType>({
    hasRotResistant: false,
    hasRotSuit: false,
    rotSuitRating: 3
  })
  const [result, setResult] = useState<RollResult | null>(null)

  /**
   * Handles the completion of a protection roll
   * @param {Object} summary - The roll summary
   * @returns {void}
   */
  const handleProtectionRollComplete = (summary: { successes: number, failures: number, brokenGear: number }) => {
    const absorbedPoints = summary.successes
    const remainingPoints = Math.max(0, rotPoints - absorbedPoints)
    const protectionReduced = protection.hasRotSuit && summary.brokenGear > 0
    const newSuitRating = protection.hasRotSuit ? 
      Math.max(0, protection.rotSuitRating - summary.brokenGear) : 
      undefined

    setResult({
      absorbedPoints,
      remainingPoints,
      damage: 0, // Will be updated after damage roll
      protectionReduced,
      newSuitRating
    })
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
  }

  return (
    <div className="rot-roller">
      <h2>Rot Roller</h2>
      
      <div className="input-section">
        <div className="input-group">
          <label htmlFor="rotPoints">Current Rot Points:</label>
          <input
            type="number"
            id="rotPoints"
            min="1"
            value={rotPoints}
            onChange={(e) => {
              const value = e.target.value;
              // Allow empty input
              if (value === '') {
                setRotPoints(1);
                return;
              }
              // Parse the number and ensure it's at least 1
              const numValue = parseInt(value);
              if (!isNaN(numValue)) {
                setRotPoints(Math.max(1, numValue));
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
                onChange={(e) => setProtection(prev => ({
                  ...prev,
                  rotSuitRating: Math.max(1, Math.min(6, parseInt(e.target.value) || 3))
                }))}
              />
            </div>
          )}
        </div>
      </div>

      <div className="dice-rollers">
        {(protection.hasRotResistant || protection.hasRotSuit) && (
          <DiceRoller
            label="Rolling for Protection"
            initialDice={{
              green: protection.hasRotResistant ? 3 : 0,
              yellow: 0,
              black: protection.hasRotSuit ? protection.rotSuitRating : 0
            }}
            onRollSummary={handleProtectionRollComplete}
          />
        )}

        {(!protection.hasRotResistant && !protection.hasRotSuit || (result?.remainingPoints ?? 0) > 0) && (
          <DiceRoller
            label="Rolling for Rot Damage"
            initialDice={{ 
              green: result?.remainingPoints ?? rotPoints, 
              yellow: 0, 
              black: 0 
            }}
            onRollSummary={handleDamageRollComplete}
          />
        )}
      </div>

      {result && (
        <div className="result-section">
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