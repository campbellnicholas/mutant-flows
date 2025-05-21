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
  const [skillDice, setSkillDice] = useState(0);
  const [gearDice, setGearDice] = useState(0);
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
              <label>Attribute Dice ({selectedSkill.attribute}):</label>
              <input
                type="number"
                className="dice-input-field-attribute"
                min="0"
                value={attributeDice}
                onChange={(e) => setAttributeDice(Math.max(0, parseInt(e.target.value) || 0))}
              />
            </div>
            <div className="dice-input">
              <label>Skill Dice:</label>
              <input
                type="number"
                className="dice-input-field-skill"
                min="0"
                value={skillDice}
                onChange={(e) => setSkillDice(Math.max(0, parseInt(e.target.value) || 0))}
              />
            </div>
            <div className="dice-input">
              <label>Gear Dice:</label>
              <input
                type="number"
                className="dice-input-field-gear"
                min="0"
                value={gearDice}
                onChange={(e) => setGearDice(Math.max(0, parseInt(e.target.value) || 0))}
              />
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