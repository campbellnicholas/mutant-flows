import React from 'react';
import type { Weapon, Armor, Range, GearItem, ArmorType } from '../types/character';
import { v4 as uuidv4 } from 'uuid';

type EquipmentSectionProps = {
  weapons: Weapon[];
  armor: Armor[];
  gear: GearItem[];
  strength: number;
  onWeaponsChange: (weapons: Weapon[]) => void;
  onArmorChange: (armor: Armor[]) => void;
  onGearChange: (gear: GearItem[]) => void;
};

const RANGES: Range[] = ['Arm\'s Length', 'Near', 'Short', 'Long'];
const ARMOR_TYPES: ArmorType[] = ['Damage', 'Rot'];

export const EquipmentSection: React.FC<EquipmentSectionProps> = ({
  weapons,
  armor,
  gear = [],
  strength = 0,
  onWeaponsChange,
  onArmorChange,
  onGearChange
}) => {
  const addWeapon = () => {
    const newWeapon: Weapon = {
      id: uuidv4(),
      name: '',
      bonus: 0,
      damage: 0,
      weight: 0,
      range: 'Arm\'s Length',
      specialNotes: '',
    };
    onWeaponsChange([...weapons, newWeapon]);
  };

  const updateWeapon = (id: string, field: keyof Weapon, value: Weapon[keyof Weapon]) => {
    onWeaponsChange(
      weapons.map(weapon =>
        weapon.id === id ? { ...weapon, [field]: value } : weapon
      )
    );
  };

  const removeWeapon = (id: string) => {
    onWeaponsChange(weapons.filter(weapon => weapon.id !== id));
  };

  const addArmor = () => {
    const newArmor: Armor = {
      id: uuidv4(),
      name: '',
      rating: 0,
      weight: 0,
      type: 'Damage',
      worn: false,
      specialNotes: '',
    };
    onArmorChange([...armor, newArmor]);
  };

  const updateArmor = (id: string, field: keyof Armor, value: Armor[keyof Armor]) => {
    onArmorChange(
      armor.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeArmor = (id: string) => {
    onArmorChange(armor.filter(item => item.id !== id));
  };

  const addGearItem = () => {
    const newItem: GearItem = {
      id: Date.now().toString(),
      name: '',
      weight: 1,
      isTiny: false
    };

    onGearChange([...(gear || []), newItem]);
  };

  const updateGearItem = (id: string, updates: Partial<GearItem>) => {
    const updatedGear = (gear || []).map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    onGearChange(updatedGear);
  };

  const removeGearItem = (id: string) => {
    const updatedGear = (gear || []).filter(item => item.id !== id);
    onGearChange(updatedGear);
  };

  const totalWeight = (gear || []).reduce((sum, item) => {
    if (item.isTiny) {
      return sum;
    }
    return sum + item.weight;
  }, 0) + weapons.reduce((sum, weapon) => sum + weapon.weight, 0) + 
    armor.reduce((sum, item) => item.worn ? sum : sum + item.weight, 0);

  const maxWeight = strength * 2;
  const isEncumbered = totalWeight > maxWeight;

  return (
    <div className="equipment-section">
      <div className="weapons-section">
        <h3>Weapons</h3>
        <button onClick={addWeapon} className="add-button">+ Add Weapon</button>
        {weapons.map(weapon => (
          <div key={weapon.id} className="equipment-item">
            <div className="input-group">
              <label htmlFor={`weapon-name-${weapon.id}`}>Weapon Name</label>
              <input
                id={`weapon-name-${weapon.id}`}
                type="text"
                value={weapon.name}
                onChange={(e) => updateWeapon(weapon.id, 'name', e.target.value)}
                placeholder="Weapon Name"
              />
            </div>
            <div className="input-group">
              <label htmlFor={`weapon-bonus-${weapon.id}`}>Bonus</label>
              <input
                id={`weapon-bonus-${weapon.id}`}
                type="number"
                value={weapon.bonus}
                onChange={(e) => updateWeapon(weapon.id, 'bonus', parseInt(e.target.value) || 0)}
                min="0"
                max="6"
                placeholder="Bonus"
              />
            </div>
            <div className="input-group">
              <label htmlFor={`weapon-damage-${weapon.id}`}>Damage</label>
              <input
                id={`weapon-damage-${weapon.id}`}
                type="number"
                value={weapon.damage}
                onChange={(e) => updateWeapon(weapon.id, 'damage', parseInt(e.target.value) || 0)}
                min="0"
                placeholder="Damage"
              />
            </div>
            <div className="input-group">
              <label htmlFor={`weapon-weight-${weapon.id}`}>Weight</label>
              <input
                id={`weapon-weight-${weapon.id}`}
                type="number"
                value={weapon.weight}
                onChange={(e) => updateWeapon(weapon.id, 'weight', parseInt(e.target.value) || 0)}
                min="0"
                placeholder="Weight"
              />
            </div>
            <div className="input-group">
              <label htmlFor={`weapon-range-${weapon.id}`}>Range</label>
              <select
                id={`weapon-range-${weapon.id}`}
                value={weapon.range}
                onChange={(e) => updateWeapon(weapon.id, 'range', e.target.value as Range)}
              >
                {RANGES.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor={`weapon-special-notes-${weapon.id}`}>Special Notes</label>
              <input
                id={`weapon-special-notes-${weapon.id}`}
                type="text"
                value={weapon.specialNotes || ''}
                onChange={(e) => updateWeapon(weapon.id, 'specialNotes', e.target.value)}
                placeholder="Special Notes"
              />
            </div>
            <button onClick={() => removeWeapon(weapon.id)} className="remove-button">&times;</button>
          </div>
        ))}
      </div>

      <div className="armor-section">
        <h3>Armor</h3>
        <button onClick={addArmor} className="add-button">+ Add Armor</button>
        {armor.map(item => (
          <div key={item.id} className="equipment-item">
            <div className="input-group">
              <label htmlFor={`armor-name-${item.id}`}>Armor Name</label>
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateArmor(item.id, 'name', e.target.value)}
              placeholder="Armor Name"
            />
            </div>
            <div className="input-group">
              <label htmlFor={`armor-rating-${item.id}`}>Rating</label>
            <input
              type="number"
              value={item.rating}
              onChange={(e) => updateArmor(item.id, 'rating', parseInt(e.target.value) || 0)}
              min="0"
              max="6"
              placeholder="Rating"
            />
            </div>
            <div className="input-group">
              <label htmlFor={`armor-weight-${item.id}`}>Weight</label>
            <input
              type="number"
              value={item.weight}
              onChange={(e) => updateArmor(item.id, 'weight', parseInt(e.target.value) || 0)}
              min="0"
              max="10"
              placeholder="Weight"
            />
            </div>
            <div className="input-group">
              <label htmlFor={`armor-type-${item.id}`}>Type</label>
            <select
                id={`armor-type-${item.id}`}
                value={item.type}
                onChange={(e) => updateArmor(item.id, 'type', e.target.value as ArmorType)}
              >
                {ARMOR_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor={`armor-special-notes-${item.id}`}>Special Notes</label>
              <input
                id={`armor-special-notes-${item.id}`}
                type="text"
                value={item.specialNotes || ''}
                onChange={(e) => updateArmor(item.id, 'specialNotes', e.target.value)}
                placeholder="Special Notes"
              />
            </div>
            <div className="input-group armor-worn">
              <label htmlFor={`armor-worn-${item.id}`}>Worn?</label>
              <input type="checkbox"
                checked={item.worn}
                onChange={(e) => updateArmor(item.id, 'worn', e.target.checked)}
              />
            </div>
            <button onClick={() => removeArmor(item.id)} className="remove-button">&times;</button>
          </div>
        ))}
      </div>

      <div className="gear-section">
        <h3>Gear</h3>
        <div className="gear-header">
          <button onClick={addGearItem} className="add-button">+ Add Gear</button>
          <div className={`gear-total ${isEncumbered ? 'encumbered' : ''}`}>
            Weight: {totalWeight} / {maxWeight}
            {isEncumbered && ' (Encumbered!)'}
          </div>
        </div>

        <div className="gear-list">
          {weapons.map((weapon) => (
            <div key={`weapon-${weapon.id}`} className="gear-item">
              <div className="input-group">
                <label htmlFor={`gear-weapon-name-${weapon.id}`}>Name</label>
                <input
                  id={`gear-weapon-name-${weapon.id}`}
                  type="text"
                  value={weapon.name}
                  disabled
                />
              </div>
              <div className="input-group">
                <label htmlFor={`gear-weapon-weight-${weapon.id}`}>Weight</label>
                <input
                  id={`gear-weapon-weight-${weapon.id}`}
                  type="number"
                  value={weapon.weight}
                  disabled
                />
              </div>
              <div className="input-group">
                <label htmlFor={`gear-weapon-tiny-${weapon.id}`}>Tiny</label>
                <input
                  id={`gear-weapon-tiny-${weapon.id}`}
                  type="checkbox"
                  checked={false}
                  disabled
                />
              </div>
              <span className="gear-type">Weapon</span>
            </div>
          ))}

          {armor.map((item) => (
            <div key={`armor-${item.id}`} className={`gear-item${item.worn ? ' gear-worn' : ''}`}>
              <div className="input-group">
                <label htmlFor={`gear-armor-name-${item.id}`}>Name</label>
                <input
                  id={`gear-armor-name-${item.id}`}
                  type="text"
                  value={item.name}
                  disabled
                />
              </div>
              <div className="input-group">
                <label htmlFor={`gear-armor-weight-${item.id}`}>Weight</label>
                <input
                  id={`gear-armor-weight-${item.id}`}
                  type="number"
                  value={item.weight}
                  disabled
                />
              </div>
              <div className="input-group">
                <label htmlFor={`gear-armor-tiny-${item.id}`}>Tiny</label>
                <input
                  id={`gear-armor-tiny-${item.id}`}
                  type="checkbox"
                  checked={false}
                  disabled
                />
              </div>
              <span className="gear-type">Armor</span>
              <span className="gear-exception">{item.worn ? 'WEARING' : ''}</span>
            </div>
          ))}

          {(gear || []).map((item) => (
            <div key={item.id} className="gear-item">
              <div className="input-group">
                <label htmlFor={`gear-name-${item.id}`}>Name</label>
                <input
                  id={`gear-name-${item.id}`}
                  type="text"
                  value={item.name}
                  onChange={(e) => updateGearItem(item.id, { name: e.target.value })}
                  placeholder="Gear name"
                />
              </div>
              <div className="input-group">
                <label htmlFor={`gear-weight-${item.id}`}>Weight</label>
                <input
                  id={`gear-weight-${item.id}`}
                  type="number"
                  value={item.weight}
                  onChange={(e) => updateGearItem(item.id, { weight: Math.max(1, parseInt(e.target.value) || 1) })}
                  min="1"
                />
              </div>
              <div className="input-group">
                <label htmlFor={`gear-tiny-${item.id}`}>Tiny</label>
                <input
                  id={`gear-tiny-${item.id}`}
                  type="checkbox"
                  checked={item.isTiny}
                  onChange={(e) => updateGearItem(item.id, { isTiny: e.target.checked })}
                />
              </div>
              <button onClick={() => removeGearItem(item.id)} className="remove-button">&times;</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 