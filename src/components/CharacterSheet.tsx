import React, { useState, useEffect } from 'react';
import type { Character, Role, Skill } from '../types/character';
import { createEmptyCharacter } from '../types/character';
import { EquipmentSection } from './EquipmentSection';
import { PointsBubbles } from './PointsBubbles';

export const CharacterSheet: React.FC = () => {
  const [character, setCharacter] = useState<Character>(() => {
    const savedCharacter = localStorage.getItem('character');
    if (savedCharacter) {
      const parsed = JSON.parse(savedCharacter);
      // Ensure appearance exists with default values if missing
      if (!parsed.appearance) {
        parsed.appearance = {
          face: '',
          body: '',
          clothing: ''
        };
      }
      return parsed;
    }
    return createEmptyCharacter();
  });

  useEffect(() => {
    localStorage.setItem('character', JSON.stringify(character));
  }, [character]);

  const handleAttributeChange = (attribute: keyof Character['attributes'], value: number) => {
    setCharacter(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attribute]: value
      }
    }));
  };

  const handleSkillChange = (skill: Skill, value: number) => {
    setCharacter(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skill]: value
      }
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

  const updateAppearance = (field: keyof Character['appearance'], value: string) => {
    setCharacter(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [field]: value
      }
    }));
  };

  const getTraumaLabel = (attributeName: keyof Character['attributes']): string => {
    switch (attributeName) {
      case 'Strength': return 'Damage';
      case 'Agility': return 'Fatigue';
      case 'Wits': return 'Confusion';
      case 'Empathy': return 'Doubt';
      default: return '';
    }
  };

  // Helper function to convert attributes object to array
  const getAttributesArray = (attributes: Character['attributes']): Array<{ name: keyof Character['attributes']; value: number; trauma: number }> => {
    return Object.entries(attributes).map(([name, value]) => ({
      name: name as keyof Character['attributes'],
      value: typeof value === 'number' ? value : 1,
      trauma: 0
    }));
  };

  return (
    <div className="character-sheet">
      <section>
        <h2>Basic Info</h2>
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
            onChange={(e) => setCharacter(prev => ({ ...prev, role: e.target.value as Role }))}
          >
            <option value="Enforcer">Enforcer</option>
            <option value="Gearhead">Gearhead</option>
            <option value="Fixer">Fixer</option>
            <option value="Dog Handler">Dog Handler</option>
            <option value="Stalker">Stalker</option>
            <option value="Chronicler">Chronicler</option>
            <option value="Boss">Boss</option>
            <option value="Grunt">Grunt</option>
          </select>
        </div>
      </section>

      <section>
        <h2>Appearance</h2>
        <div className="appearance-section">
          <div className="appearance-fields">
            <div className="appearance-field">
              <label>Face</label>
              <textarea
                value={character.appearance?.face || ''}
                onChange={(e) => updateAppearance('face', e.target.value)}
                placeholder="Describe the character's face..."
                rows={3}
              />
            </div>
            <div className="appearance-field">
              <label>Body</label>
              <textarea
                value={character.appearance?.body || ''}
                onChange={(e) => updateAppearance('body', e.target.value)}
                placeholder="Describe the character's body..."
                rows={3}
              />
            </div>
            <div className="appearance-field">
              <label>Clothing</label>
              <textarea
                value={character.appearance?.clothing || ''}
                onChange={(e) => updateAppearance('clothing', e.target.value)}
                placeholder="Describe the character's clothing..."
                rows={3}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Attributes</h2>
        <div className="attributes-section">
          <h3>Attributes</h3>
          <div className="attributes-grid">
            {Object.entries(character.attributes).map(([attr, value]) => (
              <div key={attr} className="attribute-item">
                <label>{attr.charAt(0).toUpperCase() + attr.slice(1)}:</label>
                <input
                  type="number"
                  value={value ?? ''}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const parsedValue = inputValue === '' ? null : parseInt(inputValue);
                    if (inputValue === '' || !isNaN(parsedValue!)) {
                      setCharacter(prev => ({
                        ...prev,
                        attributes: {
                          ...prev.attributes,
                          [attr]: parsedValue
                        }
                      }));
                    }
                  }}
                />
                <PointsBubbles 
                  bubblesValue={value ?? 0} 
                  bubblesMin={0} 
                  bubblesMax={value ?? 0} 
                  bubblesFieldLabel={attr} 
                  bubblesSetCharacter={setCharacter} 
                  bubblesField={`attributes.${attr}` as keyof Character} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2>Skills</h2>
        {Object.entries(character.skills).map(([skill, value]) => (
          <div key={skill} className="skill-row">
            <label>{skill}:</label>
            <input
              type="number"
              value={value}
              onChange={(e) => handleSkillChange(skill as Skill, parseInt(e.target.value) || 0)}
              min="0"
              max="5"
            />
          </div>
        ))}
      </section>

    <section>
        <h2>Points</h2>
        <PointsBubbles bubblesValue={character.rotPoints} bubblesMin={0} bubblesMax={10} bubblesFieldLabel="Rot Points" bubblesSetCharacter={setCharacter} bubblesField="rotPoints" />  
        <PointsBubbles bubblesValue={character.experiencePoints} bubblesMin={0} bubblesMax={10} bubblesFieldLabel="Experience Points" bubblesSetCharacter={setCharacter} bubblesField="experiencePoints" />
        <PointsBubbles bubblesValue={character.mutationPoints} bubblesMin={0} bubblesMax={10} bubblesFieldLabel="Mutation Points" bubblesSetCharacter={setCharacter} bubblesField="mutationPoints" />
    </section>

      <section>
        <h2>Equipment</h2>
        <EquipmentSection
          weapons={character.weapons}
          armor={character.armor}
          gear={character.gear}
          strength={character.attributes.strength ?? 0}
          onWeaponsChange={(weapons) => setCharacter(prev => ({ ...prev, weapons }))}
          onArmorChange={(armor) => setCharacter(prev => ({ ...prev, armor }))}
          onGearChange={(gear) => setCharacter(prev => ({ ...prev, gear }))}
        />
      </section>
    </div>
  );
}; 