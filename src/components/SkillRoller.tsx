import { useState, useRef } from 'react';
import DiceRoller from './DiceRoller';
import { skills } from '../data/scenarios/skills';
import { specialistSkills } from '../data/scenarios/specialistSkills';
import type { Skill } from '../data/scenarios/skills';
import './SkillRoller.css';

type SkillCategory = 'basic' | 'specialist';

/**
 * SkillRoller Component
 * Handles skill-based dice rolls and displays available stunts based on successes
 */
const SkillRoller: React.FC = () => {
  const [skillCategory, setSkillCategory] = useState<SkillCategory>('basic');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [attributeDice, setAttributeDice] = useState(0);
  const [attributeDiceInput, setAttributeDiceInput] = useState('0');
  const [skillDice, setSkillDice] = useState(0);
  const [skillDiceInput, setSkillDiceInput] = useState('0');
  const [gearDice, setGearDice] = useState(0);
  const [gearDiceInput, setGearDiceInput] = useState('0');
  const [currentSuccesses, setCurrentSuccesses] = useState(0);
  const [expandedStuntId, setExpandedStuntId] = useState<string | null>(null);
  const [showStuntsModal, setShowStuntsModal] = useState(false);
  const lastRollSuccesses = useRef(0);

  /**
   * Handles the selection of skill category
   * @param {SkillCategory} category - The selected skill category
   */
  const handleCategorySelect = (category: SkillCategory) => {
    setSkillCategory(category);
    setSelectedSkill(null); // Reset selected skill when changing categories
  };

  /**
   * Handles the selection of a skill
   * @param {string} skillId - The ID of the selected skill
   */
  const handleSkillSelect = (skillId: string) => {
    const skillList = skillCategory === 'basic' ? skills : specialistSkills;
    const skill = skillList.find(s => s.id === skillId);
    setSelectedSkill(skill || null);
  };

  /**
   * Handles the roll summary update from the DiceRoller
   * @param {Object} summary - The roll summary containing successes
   */
  const handleRollSummary = (summary: { successes: number }) => {
    // Only show modal if this is a new roll with more successes than the last roll
    if (summary.successes >= 2 && summary.successes !== lastRollSuccesses.current) {
      setShowStuntsModal(true);
    }
    setCurrentSuccesses(summary.successes);
    lastRollSuccesses.current = summary.successes;
  };

  return (
    <div className="skill-roller">
      <h3>Select Skill</h3>
      <div className="skill-selector">
        <div className="skill-type-selector">
          <label className="radio-label">
            <input
              type="radio"
              name="skillType"
              value="basic"
              checked={skillCategory === 'basic'}
              onChange={(e) => handleCategorySelect(e.target.value as SkillCategory)}
            />
            <span>Basic Skills</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="skillType"
              value="specialist"
              checked={skillCategory === 'specialist'}
              onChange={(e) => handleCategorySelect(e.target.value as SkillCategory)}
            />
            <span>Specialist Skills</span>
          </label>
        </div>

        <select 
          value={selectedSkill?.id || ''} 
          onChange={(e) => handleSkillSelect(e.target.value)}
          className="skill-select"
        >
          <option value="">Choose a skill...</option>
          {(skillCategory === 'basic' ? skills : specialistSkills).map(skill => (
            <option key={skill.id} value={skill.id}>
              {skill.name} ({skill.attribute})
            </option>
          ))}
        </select>
      </div>

      {selectedSkill && (
        <div className="skill-info">
          <h4>{selectedSkill.name}</h4>
          <p>{selectedSkill.description}</p>
          <div className="dice-config">
          <div className="dice-input">
              <label>Skill Dice:</label>
              <div className="quantity-control dice-quantity-skill">
                <button
                  type="button"
                  aria-label="Decrement Skill Dice"
                  onClick={() => {
                    const newValue = Math.max(0, skillDice - 1);
                    setSkillDice(newValue);
                    setSkillDiceInput(newValue.toString());
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  className="dice-input-field-skill"
                  min="0"
                  value={skillDiceInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSkillDiceInput(value);
                    if (value === '') {
                      return;
                    }
                    const numValue = parseInt(value);
                    if (!isNaN(numValue)) {
                      setSkillDice(Math.max(0, numValue));
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value === '') {
                      setSkillDiceInput('0');
                      setSkillDice(0);
                    }
                  }}
                />
                <button
                  type="button"
                  aria-label="Increment Skill Dice"
                  onClick={() => {
                    const newValue = skillDice + 1;
                    setSkillDice(newValue);
                    setSkillDiceInput(newValue.toString());
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="dice-input">
              <label>Attribute Dice ({selectedSkill.attribute}):</label>
              <div className="quantity-control dice-quantity-attribute">
                <button
                  type="button"
                  aria-label="Decrement Attribute Dice"
                  onClick={() => {
                    const newValue = Math.max(0, attributeDice - 1);
                    setAttributeDice(newValue);
                    setAttributeDiceInput(newValue.toString());
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  className="dice-input-field-attribute"
                  min="0"
                  value={attributeDiceInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setAttributeDiceInput(value);
                    if (value === '') {
                      return;
                    }
                    const numValue = parseInt(value);
                    if (!isNaN(numValue)) {
                      setAttributeDice(Math.max(0, numValue));
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value === '') {
                      setAttributeDiceInput('0');
                      setAttributeDice(0);
                    }
                  }}
                />
                <button
                  type="button"
                  aria-label="Increment Attribute Dice"
                  onClick={() => {
                    const newValue = attributeDice + 1;
                    setAttributeDice(newValue);
                    setAttributeDiceInput(newValue.toString());
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="dice-input">
              <label>Gear Dice:</label>
              <div className="quantity-control dice-quantity-gear">
                <button
                  type="button"
                  aria-label="Decrement Gear Dice"
                  onClick={() => {
                    const newValue = Math.max(0, gearDice - 1);
                    setGearDice(newValue);
                    setGearDiceInput(newValue.toString());
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  className="dice-input-field-gear"
                  min="0"
                  value={gearDiceInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setGearDiceInput(value);
                    if (value === '') {
                      return;
                    }
                    const numValue = parseInt(value);
                    if (!isNaN(numValue)) {
                      setGearDice(Math.max(0, numValue));
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value === '') {
                      setGearDiceInput('0');
                      setGearDice(0);
                    }
                  }}
                />
                <button
                  type="button"
                  aria-label="Increment Gear Dice"
                  onClick={() => {
                    const newValue = gearDice + 1;
                    setGearDice(newValue);
                    setGearDiceInput(newValue.toString());
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <DiceRoller
        label={`${selectedSkill?.name || 'Skill'} Roll`}
        onRollSummary={handleRollSummary}
        initialDice={{
          green: attributeDice,
          yellow: skillDice,
          black: gearDice
        }}
      />

      {selectedSkill && currentSuccesses >= 2 && !showStuntsModal && (
        <button 
          className="show-stunts-button"
          onClick={() => setShowStuntsModal(true)}
        >
          Show {selectedSkill?.name} Stunts
        </button>
      )}

      {selectedSkill && showStuntsModal && (
        <div className="stunts-modal">
          <div className="stunts-modal-header">
            <h3>{selectedSkill?.name} Stunts</h3>
            <button 
              className="close-button"
              onClick={() => setShowStuntsModal(false)}
            >
              &times;
            </button>
          </div>
          <div className="stunts-list">
            {selectedSkill.stunts.map(stunt => {
              const isExpanded = expandedStuntId === stunt.id;
              
              return (
                <div 
                  key={stunt.id} 
                  className="stunt-card"
                >
                  <button 
                    className="stunt-header"
                    onClick={() => setExpandedStuntId(isExpanded ? null : stunt.id)}
                  >
                    <div className="stunt-title">
                      <h4>{stunt.name}</h4>
                    </div>
                    <span className={`toggle-icon ${isExpanded ? 'expanded' : ''}`}>▼</span>
                  </button>
                  <div className={`stunt-details ${isExpanded ? 'expanded' : ''}`}>
                    {stunt.description.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillRoller; 