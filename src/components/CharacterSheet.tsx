import React, { useState, useEffect } from 'react';
import type { Character, Role, Skill, Attribute } from '../types/character';
import { createEmptyCharacter, getBaseSkills, getSpecialistSkillForRole } from '../types/character';
import { EquipmentSection } from './EquipmentSection';
import { PointsBubbles } from './PointsBubbles';

const defaultAttributes: Record<keyof Character['attributes'], Attribute> = {
  strength: { name: 'strength', value: 0, trauma: { value: 0 }, traumaName: 'Damage' },
  agility: { name: 'agility', value: 0, trauma: { value: 0 }, traumaName: 'Fatigue' },
  wits: { name: 'wits', value: 0, trauma: { value: 0 }, traumaName: 'Confusion' },
  empathy: { name: 'empathy', value: 0, trauma: { value: 0 }, traumaName: 'Doubt' },
};

export const CharacterSheet: React.FC = () => {
  const [character, setCharacter] = useState<Character>(() => {
    const savedCharacter = localStorage.getItem('character');
    if (savedCharacter) {
      const parsed = JSON.parse(savedCharacter);
      // Defensive: ensure all attributes are present
      parsed.attributes = { ...defaultAttributes, ...parsed.attributes };
      // Ensure appearance exists with default values if missing
      if (!parsed.appearance) {
        parsed.appearance = {
          face: '',
          body: '',
          clothing: ''
        };
      }
      // Initialize skills with base skills and specialist skill
      const baseSkills = getBaseSkills().reduce((acc, skill) => ({
        ...acc,
        [skill]: parsed.skills?.[skill] ?? 0
      }), {});
      const specialistSkill = getSpecialistSkillForRole(parsed.role);
      parsed.skills = {
        ...baseSkills,
        [specialistSkill]: parsed.skills?.[specialistSkill] ?? 1 // Specialist skills start at 1
      };
      return parsed;
    }
    return createEmptyCharacter();
  });

  // Update skills when role changes
  useEffect(() => {
    const specialistSkill = getSpecialistSkillForRole(character.role);
    setCharacter(prev => {
      // Get all base skills
      const baseSkills = getBaseSkills().reduce((acc, skill) => ({
        ...acc,
        [skill]: prev.skills[skill] ?? 0
      }), {} as Record<Skill, number>);
      
      // Add the specialist skill
      return {
        ...prev,
        skills: {
          ...baseSkills,
          [specialistSkill]: prev.skills[specialistSkill] ?? 1
        }
      };
    });
  }, [character.role]);

  useEffect(() => {
    localStorage.setItem('character', JSON.stringify(character));
  }, [character]);

  const getTraumaLabel = (attributeName: keyof Character['attributes']): string => {
    switch (attributeName) {
      case 'strength': return 'Damage';
      case 'agility': return 'Fatigue';
      case 'wits': return 'Confusion';
      case 'empathy': return 'Doubt';
      default: return '';
    }
  };

  const updateTraumaValue = (attrKey: keyof Character['attributes'], value: number) => {
    setCharacter(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attrKey]: {
          ...prev.attributes[attrKey],
          trauma: {
            ...prev.attributes[attrKey].trauma,
            value
          }
        }
      }
    }));
  };

  const updateAppearance = (field: keyof Character['appearance'], value: string) => {
    setCharacter(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [field]: value
      }
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
            {Object.entries(character.attributes).map(([attrKey, attribute]) => {
              if (!attribute) return null; // Defensive: skip if undefined
              // Ensure trauma property exists with default value
              const trauma = attribute.trauma || { value: 0 };
              return (
                <div key={attrKey} className="attribute-item">
                  <label>{attribute.name || attrKey.charAt(0).toUpperCase() + attrKey.slice(1)}:</label>
                  <input
                    type="number"
                    value={attribute.value}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      setCharacter(prev => ({
                        ...prev,
                        attributes: {
                          ...prev.attributes,
                          [attrKey as keyof typeof character.attributes]: {
                            ...prev.attributes[attrKey as keyof typeof character.attributes],
                            value: inputValue === '' ? null : parseInt(inputValue)
                          }
                        }
                      }));
                    }}
                    onBlur={(e) => {
                      const inputValue = e.target.value;
                      const parsedValue = inputValue === '' ? 0 : parseInt(inputValue);
                      setCharacter(prev => ({
                        ...prev,
                        attributes: {
                          ...prev.attributes,
                          [attrKey as keyof typeof character.attributes]: {
                            ...prev.attributes[attrKey as keyof typeof character.attributes],
                            value: isNaN(parsedValue) || parsedValue < 0 ? 0 : parsedValue
                          }
                        }
                      }));
                    }}
                  />
                  <PointsBubbles 
                    bubblesValue={attribute.value === null ? null : trauma.value} 
                    bubblesMin={0} 
                    bubblesMax={attribute.value === null ? 0 : attribute.value} 
                    bubblesFieldLabel={attribute.traumaName || getTraumaLabel(attrKey as keyof Character['attributes'])} 
                    bubblesSetCharacter={(value: number) => updateTraumaValue(attrKey as keyof Character['attributes'], value)} 
                    bubblesField={`${attribute.traumaName}Points`} 
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <h2>Skills</h2>
        <div className="skills-section">
          <h3>Base Skills</h3>
          {getBaseSkills().map(skill => (
            <div key={skill} className="skill-row">
              <label>{skill}:</label>
              <input
                type="number"
                value={character.skills[skill] ?? 0}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setCharacter(prev => ({
                    ...prev,
                    skills: {
                      ...prev.skills,
                      [skill]: inputValue === '' ? '' : parseInt(inputValue)
                    }
                  }));
                }}
                onBlur={(e) => {
                  const inputValue = e.target.value;
                  const parsedValue = inputValue === '' ? 0 : parseInt(inputValue);
                  setCharacter(prev => ({
                    ...prev,
                    skills: {
                      ...prev.skills,
                      [skill]: isNaN(parsedValue) || parsedValue < 0 ? 0 : parsedValue
                    }
                  }));
                }}
              />
            </div>
          ))}
          
          <h3>Specialist Skill</h3>
          <div className="skill-row">
            <label>{getSpecialistSkillForRole(character.role)}:</label>
            <input
              type="number"
              value={character.skills[getSpecialistSkillForRole(character.role)] ?? 1}
              onChange={(e) => {
                const inputValue = e.target.value;
                setCharacter(prev => ({
                  ...prev,
                  skills: {
                    ...prev.skills,
                    [getSpecialistSkillForRole(character.role)]: inputValue === '' ? '' : parseInt(inputValue)
                  }
                }));
              }}
              onBlur={(e) => {
                const inputValue = e.target.value;
                const parsedValue = inputValue === '' ? 1 : parseInt(inputValue);
                setCharacter(prev => ({
                  ...prev,
                  skills: {
                    ...prev.skills,
                    [getSpecialistSkillForRole(character.role)]: isNaN(parsedValue) || parsedValue < 1 ? 1 : parsedValue
                  }
                }));
              }}
            />
          </div>
        </div>
      </section>

    <section className="section-points">
        <h2>Points</h2>
        <PointsBubbles 
          bubblesValue={character.rotPoints} 
          bubblesMin={0} 
          bubblesMax={10} 
          bubblesFieldLabel="Rot Points" 
          bubblesSetCharacter={(value) => setCharacter(prev => ({ ...prev, rotPoints: value }))} 
          bubblesField="rotPoints" 
        />  
        <PointsBubbles 
          bubblesValue={character.experiencePoints} 
          bubblesMin={0} 
          bubblesMax={10} 
          bubblesFieldLabel="Experience Points" 
          bubblesSetCharacter={(value) => setCharacter(prev => ({ ...prev, experiencePoints: value }))} 
          bubblesField="experiencePoints" 
        />
        <PointsBubbles 
          bubblesValue={character.mutationPoints} 
          bubblesMin={0} 
          bubblesMax={10} 
          bubblesFieldLabel="Mutation Points" 
          bubblesSetCharacter={(value) => setCharacter(prev => ({ ...prev, mutationPoints: value }))} 
          bubblesField="mutationPoints" 
        />
    </section>

      <section>
        <h2>Equipment</h2>
        <EquipmentSection
          weapons={character.weapons}
          armor={character.armor}
          gear={character.gear}
          strength={character.attributes.strength.value}
          onWeaponsChange={(weapons) => setCharacter(prev => ({ ...prev, weapons }))}
          onArmorChange={(armor) => setCharacter(prev => ({ ...prev, armor }))}
          onGearChange={(gear) => setCharacter(prev => ({ ...prev, gear }))}
        />
      </section>
    </div>
  );
}; 