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
  const validatedValue = useMemo(() => {
    const numValue = Number(bubblesValue ?? bubblesMin);
    if (isNaN(numValue)) return bubblesMin;
    return Math.max(bubblesMin, Math.min(bubblesMax, numValue));
  }, [bubblesValue, bubblesMin, bubblesMax]);

  const handleKeyPress = useCallback((newValue: number) => {
    bubblesSetCharacter(prev => ({
      ...prev,
      [bubblesField]: newValue
    }));
  }, [bubblesField, bubblesSetCharacter]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const parsedValue = inputValue === '' ? bubblesMin : parseInt(inputValue);
    
    if (!isNaN(parsedValue)) {
      const newValue = Math.max(bubblesMin, Math.min(bubblesMax, parsedValue));
      bubblesSetCharacter(prev => ({
        ...prev,
        [bubblesField]: newValue
      }));
    }
  }, [bubblesMin, bubblesMax, bubblesField, bubblesSetCharacter]);

  const memoizedBubbles = useMemo(() => 
    renderPointsBubbles(validatedValue, bubblesMax, bubblesSetCharacter, bubblesField, handleKeyPress),
    [validatedValue, bubblesMax, bubblesSetCharacter, bubblesField, handleKeyPress]
  );

  // Validate props
  if (bubblesMin >= bubblesMax) {
    console.error('PointsBubbles: min must be less than max');
    return null;
  }

  return (
    <div className="points-row">
      <label htmlFor={`${bubblesField}-input`}>{bubblesFieldLabel}:</label>
      <div className="points-input">
        <input
          id={`${bubblesField}-input`}
          type="range"
          min={bubblesMin}
          max={bubblesMax}
          step="1"
          value={validatedValue}
          onChange={handleInputChange}
          aria-label={`${bubblesFieldLabel} value`}
        />
        {memoizedBubbles}
        <span className="points-value" aria-live="polite">
          {validatedValue}
        </span>
      </div>
    </div>
  );
};