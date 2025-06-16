import React, { useCallback, useMemo } from 'react';

type PointsBubblesProps = {
  bubblesValue: number | null;
  bubblesMin: number;
  bubblesMax: number;
  bubblesFieldLabel: string;
  bubblesSetCharacter: (value: number) => void;
  bubblesField: string;
};

const MIN_PLACEHOLDER_BUBBLES = 2;

const renderPointsBubbles = (
  value: number,
  max: number,
  setCharacter: (value: number) => void,
  field: string,
  onKeyPress: (value: number) => void,
  isDisabled: boolean = false
) => {
  // When disabled, show at least MIN_PLACEHOLDER_BUBBLES bubbles
  const numBubbles = isDisabled ? Math.max(MIN_PLACEHOLDER_BUBBLES, max) : max;

  return (
    <div 
      className="points-bubbles" 
      role="radiogroup" 
      aria-label={`Select value from 0 to ${max}`}
    >
      <div
        className={`points-bubble x-bubble ${value === 0 ? 'filled' : ''}`}
        onClick={() => {
          if (isDisabled) return;
          console.log('X bubble clicked');
          console.log('Field:', field);
          setCharacter(0);
        }}
        onKeyPress={(e) => {
          if (isDisabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onKeyPress(0);
          }
        }}
        role="radio"
        aria-checked={value === 0}
        tabIndex={isDisabled ? -1 : 0}
        title="0"
      />
      {Array.from({ length: numBubbles }, (_, i) => (
        <div
          key={i}
          className={`points-bubble ${i < value ? 'filled' : ''} ${isDisabled ? 'disabled' : ''}`}
          onClick={() => {
            if (isDisabled) return;
            console.log(`Bubble ${i + 1} clicked`);
            console.log('Field:', field);
            setCharacter(i + 1);
          }}
          onKeyPress={(e) => {
            if (isDisabled) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onKeyPress(i + 1);
            }
          }}
          role="radio"
          aria-checked={i < value}
          tabIndex={isDisabled ? -1 : 0}
          title={`${i + 1}`}
        />
      ))}
    </div>
  );
};

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

  // Determine if bubbles should be disabled (when max is 0 or value is null/undefined)
  const isDisabled = bubblesMax === 0 || bubblesValue === null || bubblesValue === undefined;

  const handleKeyPress = useCallback((newValue: number) => {
    if (isDisabled) return;
    console.log('handleKeyPress called with:', newValue);
    console.log('bubblesField:', bubblesField);
    const boundedNewValue = Math.max(bubblesMin, Math.min(bubblesMax, newValue));
    bubblesSetCharacter(boundedNewValue);
  }, [bubblesMin, bubblesMax, bubblesSetCharacter, bubblesField, isDisabled]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      handleKeyPress(newValue);
    }
  }, [handleKeyPress, isDisabled]);

  const memoizedBubbles = useMemo(() => 
    renderPointsBubbles(filledBubbles, bubblesMax, bubblesSetCharacter, bubblesField, handleKeyPress, isDisabled),
    [filledBubbles, bubblesMax, bubblesSetCharacter, bubblesField, handleKeyPress, isDisabled]
  );

  // Validate props
  if (bubblesMin >= bubblesMax && bubblesMax !== 0) {
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
          disabled={isDisabled}
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