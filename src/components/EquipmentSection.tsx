import React, { useState } from 'react';
import type { Weapon, Armor, Range, GearItem } from '../types/character';
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

export const EquipmentSection: React.FC<EquipmentSectionProps> = ({
  weapons,
  armor,
  gear = [],
  strength = 0,
  onWeaponsChange,
  onArmorChange,
  onGearChange
}) => {
  const [newGearName, setNewGearName] = useState('');
  const [newGearWeight, setNewGearWeight] = useState(1);
  const [newGearIsTiny, setNewGearIsTiny] = useState(false);

  const addWeapon = () => {
    const newWeapon: Weapon = {
      id: uuidv4(),
      name: '',
      bonus: 0,
      damage: 0,
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
      condition: 10,
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
    if (!newGearName.trim()) return;

    const newItem: GearItem = {
      id: Date.now().toString(),
      name: newGearName.trim(),
      weight: newGearWeight,
      isTiny: newGearIsTiny
    };

    onGearChange([...(gear || []), newItem]);
    setNewGearName('');
    setNewGearWeight(1);
    setNewGearIsTiny(false);
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
  }, 0);

  const maxWeight = strength * 2;
  const isEncumbered = totalWeight > maxWeight;

  return (
    <div className="equipment-section">
      <div className="weapons-section">
        <h3>Weapons</h3>
        <button onClick={addWeapon} className="add-button">+ Add Weapon</button>
        {weapons.map(weapon => (
          <div key={weapon.id} className="equipment-item">
            <input
              type="text"
              value={weapon.name}
              onChange={(e) => updateWeapon(weapon.id, 'name', e.target.value)}
              placeholder="Weapon Name"
            />
            <input
              type="number"
              value={weapon.bonus}
              onChange={(e) => updateWeapon(weapon.id, 'bonus', parseInt(e.target.value) || 0)}
              min="0"
              max="6"
              placeholder="Bonus"
            />
            <input
              type="number"
              value={weapon.damage}
              onChange={(e) => updateWeapon(weapon.id, 'damage', parseInt(e.target.value) || 0)}
              min="0"
              placeholder="Damage"
            />
            <select
              value={weapon.range}
              onChange={(e) => updateWeapon(weapon.id, 'range', e.target.value as Range)}
            >
              {RANGES.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
            <input
              type="text"
              value={weapon.specialNotes || ''}
              onChange={(e) => updateWeapon(weapon.id, 'specialNotes', e.target.value)}
              placeholder="Special Notes"
            />
            <button onClick={() => removeWeapon(weapon.id)} className="remove-button">×</button>
          </div>
        ))}
      </div>

      <div className="armor-section">
        <h3>Armor</h3>
        <button onClick={addArmor} className="add-button">+ Add Armor</button>
        {armor.map(item => (
          <div key={item.id} className="equipment-item">
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateArmor(item.id, 'name', e.target.value)}
              placeholder="Armor Name"
            />
            <input
              type="number"
              value={item.rating}
              onChange={(e) => updateArmor(item.id, 'rating', parseInt(e.target.value) || 0)}
              min="0"
              max="6"
              placeholder="Rating"
            />
            <input
              type="number"
              value={item.condition}
              onChange={(e) => updateArmor(item.id, 'condition', parseInt(e.target.value) || 0)}
              min="0"
              max="10"
              placeholder="Condition"
            />
            <button onClick={() => removeArmor(item.id)} className="remove-button">×</button>
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

        <div className="add-gear-form">
          <input
            type="text"
            value={newGearName}
            onChange={(e) => setNewGearName(e.target.value)}
            placeholder="Gear name"
          />
          <input
            type="number"
            value={newGearWeight}
            onChange={(e) => setNewGearWeight(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
          />
          <label className="tiny-checkbox">
            <input
              type="checkbox"
              checked={newGearIsTiny}
              onChange={(e) => setNewGearIsTiny(e.target.checked)}
            />
            Tiny Item
          </label>
          <button onClick={addGearItem}>Add Gear</button>
        </div>

        <div className="gear-list">
          {(gear || []).map((item) => (
            <div key={item.id} className="gear-item">
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateGearItem(item.id, { name: e.target.value })}
              />
              <input
                type="number"
                value={item.weight}
                onChange={(e) => updateGearItem(item.id, { weight: Math.max(1, parseInt(e.target.value) || 1) })}
                min="1"
              />
              <label className="tiny-checkbox">
                <input
                  type="checkbox"
                  checked={item.isTiny}
                  onChange={(e) => updateGearItem(item.id, { isTiny: e.target.checked })}
                />
                Tiny
              </label>
              <button onClick={() => removeGearItem(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 