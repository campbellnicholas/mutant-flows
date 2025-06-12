import { useState, useEffect } from 'react';
import type { 
  Character, 
  Role, 
  Attribute, 
  GearItem
} from '../types/character';
import { 
  defaultAttributes,
  defaultBaseSkills,
  getSpecialistSkillForRole
} from '../types/character';

const CharacterSheet = () => {
  const [character, setCharacter] = useState<Character>(() => {
    const savedCharacter = localStorage.getItem('mutantCharacter');
    if (savedCharacter) {
      return JSON.parse(savedCharacter);
    }
    return {
      name: '',
      role: 'Enforcer',
      appearance: {
        face: '',
        body: '',
        clothing: ''
      },
      attributes: defaultAttributes,
      baseSkills: defaultBaseSkills,
      specialistSkills: [getSpecialistSkillForRole('Enforcer')],
      rotPoints: 0,
      experiencePoints: 0,
      mutationPoints: 0,
      gear: [],
      weapons: [],
      armor: null,
      rotSuit: null,
      talents: [],
      mutations: []
    };
  });

  useEffect(() => {
    localStorage.setItem('mutantCharacter', JSON.stringify(character));
  }, [character]);

  const updateAttribute = (index: number, field: keyof Attribute, value: number) => {
    setCharacter(prev => ({
      ...prev,
      attributes: prev.attributes.map((attr, i) => 
        i === index ? { ...attr, [field]: value } : attr
      )
    }));
  };

  const updateBaseSkill = (index: number, value: number) => {
    setCharacter(prev => ({
      ...prev,
      baseSkills: prev.baseSkills.map((skill, i) => 
        i === index ? { ...skill, value } : skill
      )
    }));
  };

  const updateSpecialistSkill = (index: number, value: number) => {
    setCharacter(prev => ({
      ...prev,
      specialistSkills: prev.specialistSkills.map((skill, i) => 
        i === index ? { ...skill, value } : skill
      )
    }));
  };

  const removeGearItem = (index: number) => {
    setCharacter(prev => ({
      ...prev,
      gear: prev.gear.filter((_, i) => i !== index)
    }));
  };

  const renderPointsBubbles = (value: number, max: number, setCharacter: React.Dispatch<React.SetStateAction<Character>>, field: keyof Character) => (
    <div className="points-bubbles">
      <div
        className={`points-bubble x-bubble ${value === 0 ? 'filled' : ''}`}
        onClick={() => setCharacter(prev => ({
          ...prev,
          [field]: 0
        }))}
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
          title={`${i + 1}`}
        />
      ))}
    </div>
  );

  return (
    <div className="character-sheet">
      <h2>Character Sheet</h2>
      
      {/* Basic Info */}
      <section className="basic-info">
        <h3>Basic Info</h3>
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            value={character.name}
            onChange={(e) => setCharacter(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div className="input-group">
          <label>Role:</label>
          <select
            value={character.role}
            onChange={(e) => {
              const newRole = e.target.value as Role;
              setCharacter(prev => ({
                ...prev,
                role: newRole,
                specialistSkills: [getSpecialistSkillForRole(newRole)]
              }));
            }}
          >
            <option value="Enforcer">Enforcer</option>
            <option value="Gearhead">Gearhead</option>
            <option value="Stalker">Stalker</option>
            <option value="Fixer">Fixer</option>
            <option value="Dog Handler">Dog Handler</option>
            <option value="Chronicler">Chronicler</option>
            <option value="Boss">Boss</option>
            <option value="Grunt">Grunt</option>
          </select>
        </div>
      </section>

      {/* Appearance */}
      <section className="appearance">
        <h3>Appearance</h3>
        <div className="input-group">
          <label>Face:</label>
          <input
            type="text"
            value={character.appearance.face}
            onChange={(e) => setCharacter(prev => ({
              ...prev,
              appearance: { ...prev.appearance, face: e.target.value }
            }))}
          />
        </div>
        <div className="input-group">
          <label>Body:</label>
          <input
            type="text"
            value={character.appearance.body}
            onChange={(e) => setCharacter(prev => ({
              ...prev,
              appearance: { ...prev.appearance, body: e.target.value }
            }))}
          />
        </div>
        <div className="input-group">
          <label>Clothing:</label>
          <input
            type="text"
            value={character.appearance.clothing}
            onChange={(e) => setCharacter(prev => ({
              ...prev,
              appearance: { ...prev.appearance, clothing: e.target.value }
            }))}
          />
        </div>
      </section>

      {/* Attributes */}
      <section className="attributes">
        <h3>Attributes</h3>
        {character.attributes.map((attr, index) => (
          <div key={attr.name} className="attribute-row">
            <span>{attr.name}</span>
            <div className="attribute-values">
              <label>Value:</label>
              <input
                type="number"
                min="1"
                max="5"
                value={attr.value}
                onChange={(e) => updateAttribute(index, 'value', parseInt(e.target.value) || 0)}
              />
              <label>Trauma:</label>
              <input
                type="number"
                min="0"
                max={attr.value}
                value={attr.trauma}
                onChange={(e) => updateAttribute(index, 'trauma', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="skills">
        <h3>Skills</h3>
        <div className="base-skills">
          <h4>Base Skills</h4>
          {character.baseSkills.map((skill, index) => (
            <div key={skill.name} className="skill-row">
              <span>{skill.name} ({skill.attribute})</span>
              <input
                type="number"
                min="0"
                max="3"
                value={skill.value}
                onChange={(e) => updateBaseSkill(index, parseInt(e.target.value) || 0)}
              />
            </div>
          ))}
        </div>
        <div className="specialist-skills">
          <h4>Specialist Skills</h4>
          {character.specialistSkills.map((skill, index) => (
            <div key={skill.name} className="skill-row">
              <span>{skill.name} ({skill.attribute})</span>
              <input
                type="number"
                min="0"
                max="3"
                value={skill.value}
                onChange={(e) => updateSpecialistSkill(index, parseInt(e.target.value) || 0)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Points */}
      <section className="points">
        <h3>Points</h3>
        <div className="points-row">
          <label>Rot Points:</label>
          <div className="points-input">
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={character.rotPoints}
              onChange={(e) => setCharacter(prev => ({
                ...prev,
                rotPoints: parseInt(e.target.value)
              }))}
            />
            {renderPointsBubbles(character.rotPoints, 10, setCharacter, 'rotPoints')}
            <span className="points-value">{character.rotPoints}</span>
          </div>
        </div>
        <div className="points-row">
          <label>Experience Points:</label>
          <div className="points-input">
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={character.experiencePoints}
              onChange={(e) => setCharacter(prev => ({
                ...prev,
                experiencePoints: parseInt(e.target.value)
              }))}
            />
            {renderPointsBubbles(character.experiencePoints, 10, setCharacter, 'experiencePoints')}
            <span className="points-value">{character.experiencePoints}</span>
          </div>
        </div>
        <div className="points-row">
          <label>Mutation Points:</label>
          <div className="points-input">
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={character.mutationPoints}
              onChange={(e) => setCharacter(prev => ({
                ...prev,
                mutationPoints: parseInt(e.target.value)
              }))}
            />
            {renderPointsBubbles(character.mutationPoints, 10, setCharacter, 'mutationPoints')}
            <span className="points-value">{character.mutationPoints}</span>
          </div>
        </div>
      </section>

      {/* Gear */}
      <section className="gear">
        <h3>Gear</h3>
        {character.gear.map((item, index) => (
          <div key={index} className="gear-item">
            <span>{item.name}</span>
            {!item.isTiny && <span>Weight: {item.weight}</span>}
            <button onClick={() => removeGearItem(index)}>Remove</button>
          </div>
        ))}
        <div className="gear-total">
          Total Weight: {character.gear.reduce((sum, item) => sum + (item.weight || 0), 0)} / {(character.attributes.find(attr => attr.name === 'Strength')?.value ?? 0) * 2}
        </div>
      </section>
    </div>
  );
};

export default CharacterSheet; 