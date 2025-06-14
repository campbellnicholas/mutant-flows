import React, { useCallback, useMemo } from 'react';
import type { Character } from '../types/character';

type PointsBubblesProps = {
  bubblesValue: number | null;
  bubblesMin: number;
  bubblesMax: number;
  bubblesFieldLabel: string;
  bubblesSetCharacter: React.Dispatch<React.SetStateAction<Character>>;
  bubblesField: keyof Character;
};

const renderPointsBubbles = (
  value: number,
  max: number,
  setCharacter: React.Dispatch<React.SetStateAction<Character>>,
  field: keyof Character,
  onKeyPress: (value: number) => void
) => (
  <div 
    className="points-bubbles" 
    role="radiogroup" 
    aria-label={`Select value from 0 to ${max}`}
  >
    <div
      className={`points-bubble x-bubble ${value === 0 ? 'filled' : ''}`}
      onClick={() => setCharacter(prev => ({
        ...prev,
        [field]: 0
      }))}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onKeyPress(0);
        }
      }}
      role="radio"
      aria-checked={value === 0}
      tabIndex={0}
      title="0"
    />
    {Array.from({ length: max }, (_, i) => (
      <div
        key={i}
        className={`points-bubble ${i < value ? 'filled' : ''}`}
        onClick={() => setCharacter(prev => ({
          ...prev,
          [field]: i + 1
        }))}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onKeyPress(i + 1);
          }
        }}
        role="radio"
        aria-checked={i < value}
        tabIndex={0}
        title={`${i + 1}`}
      />
    ))}
  </div>
);

export const PointsBubbles: React.FC<PointsBubblesProps> = ({ 
  bubblesValue, 
  bubblesMin, 
  bubblesMax, 
  bubblesFieldLabel, 
  bubblesSetCharacter, 
  bubblesField 
}) => {
  // Validate and ensure value is a number
  const validatedValue = typeof bubblesValue === 'number' ? bubblesValue : bubblesMin;
  const safeValue = isNaN(validatedValue) ? bubblesMin : validatedValue;

  // Ensure value is within bounds
  const boundedValue = Math.max(bubblesMin, Math.min(bubblesMax, safeValue));

  // Calculate number of filled bubbles
  const filledBubbles = Math.floor(boundedValue);

  const handleKeyPress = useCallback((newValue: number) => {
    const boundedNewValue = Math.max(bubblesMin, Math.min(bubblesMax, newValue));
    bubblesSetCharacter(prev => ({
      ...prev,
      [bubblesField]: boundedNewValue
    }));
  }, [bubblesMin, bubblesMax, bubblesSetCharacter, bubblesField]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      handleKeyPress(newValue);
    }
  }, [handleKeyPress]);

  const memoizedBubbles = useMemo(() => 
    renderPointsBubbles(filledBubbles, bubblesMax, bubblesSetCharacter, bubblesField, handleKeyPress),
    [filledBubbles, bubblesMax, bubblesSetCharacter, bubblesField, handleKeyPress]
  );

  // Validate props
  if (bubblesMin >= bubblesMax) {
    console.error('PointsBubbles: min must be less than max');
    return null;
  }

  return (
    <div className="points-bubbles-row">
      <div className="points-header">
        <label>{bubblesFieldLabel}</label>
        <input
          id={`${bubblesField}-input`}
          className="points-input"
          type="range"
          min={bubblesMin}
          max={bubblesMax}
          step="1"
          value={boundedValue}
          onChange={handleInputChange}
          aria-label={`${bubblesFieldLabel} value`}
        />
        {memoizedBubbles}
        <span className="points-value" aria-live="polite">
          {boundedValue}
        </span>
      </div>
    </div>
  );
};