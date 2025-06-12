export type Role = 
  | 'Enforcer'
  | 'Gearhead'
  | 'Stalker'
  | 'Fixer'
  | 'Dog Handler'
  | 'Chronicler'
  | 'Boss'
  | 'Grunt';

export type Attribute = {
  name: 'Strength' | 'Agility' | 'Wits' | 'Empathy';
  value: number;
  trauma: number;
};

export type BaseSkill = {
  name: 'Endure' | 'Force' | 'Fight' | 'Sneak' | 'Move' | 'Shoot' | 
        'Scout' | 'Comprehend' | 'Know the Zone' | 'Sense Emotion' | 
        'Manipulate' | 'Heal';
  attribute: 'Strength' | 'Agility' | 'Wits' | 'Empathy';
  value: number;
};

export type SpecialistSkill = {
  name: 'Intimidate' | 'Jury Rig' | 'Find the Path' | 'Make a Deal' | 
        'Sic a Dog' | 'Inspire' | 'Command' | 'Shake It Off';
  role: Role;
  attribute: 'Strength' | 'Agility' | 'Wits' | 'Empathy';
  value: number;
};

export type GearItem = {
  name: string;
  weight: number;
  isTiny?: boolean;
};

export type Weapon = {
  name: string;
  bonus: number;
  damage: number;
  range: 'Arm\'s Length' | 'Near' | 'Short' | 'Long';
  special: string;
};

export type Armor = {
  name: string;
  rating: number;
};

export type RotSuit = {
  name: string;
  rating: number;
};

export type Character = {
  // Basic Info
  name: string;
  role: Role;
  appearance: {
    face: string;
    body: string;
    clothing: string;
  };
  
  // Attributes and Skills
  attributes: Attribute[];
  baseSkills: BaseSkill[];
  specialistSkills: SpecialistSkill[];
  
  // Points
  rotPoints: number;
  experiencePoints: number;
  mutationPoints: number;
  
  // Equipment
  gear: GearItem[];
  weapons: Weapon[];
  armor: Armor | null;
  rotSuit: RotSuit | null;
  
  // Special Abilities
  talents: string[];
  mutations: string[];
};

// Default values for new characters
export const defaultAttributes: Attribute[] = [
  { name: 'Strength', value: 4, trauma: 0 },
  { name: 'Agility', value: 4, trauma: 0 },
  { name: 'Wits', value: 4, trauma: 0 },
  { name: 'Empathy', value: 4, trauma: 0 },
];

export const defaultBaseSkills: BaseSkill[] = [
  { name: 'Endure', attribute: 'Strength', value: 0 },
  { name: 'Force', attribute: 'Strength', value: 0 },
  { name: 'Fight', attribute: 'Strength', value: 0 },
  { name: 'Sneak', attribute: 'Agility', value: 0 },
  { name: 'Move', attribute: 'Agility', value: 0 },
  { name: 'Shoot', attribute: 'Agility', value: 0 },
  { name: 'Scout', attribute: 'Wits', value: 0 },
  { name: 'Comprehend', attribute: 'Wits', value: 0 },
  { name: 'Know the Zone', attribute: 'Wits', value: 0 },
  { name: 'Sense Emotion', attribute: 'Empathy', value: 0 },
  { name: 'Manipulate', attribute: 'Empathy', value: 0 },
  { name: 'Heal', attribute: 'Empathy', value: 0 },
];

export const getSpecialistSkillForRole = (role: Role): SpecialistSkill => {
  const specialistSkills: Record<Role, SpecialistSkill> = {
    'Enforcer': { name: 'Intimidate', role: 'Enforcer', attribute: 'Strength', value: 1 },
    'Gearhead': { name: 'Jury Rig', role: 'Gearhead', attribute: 'Wits', value: 1 },
    'Stalker': { name: 'Find the Path', role: 'Stalker', attribute: 'Agility', value: 1 },
    'Fixer': { name: 'Make a Deal', role: 'Fixer', attribute: 'Empathy', value: 1 },
    'Dog Handler': { name: 'Sic a Dog', role: 'Dog Handler', attribute: 'Agility', value: 1 },
    'Chronicler': { name: 'Inspire', role: 'Chronicler', attribute: 'Empathy', value: 1 },
    'Boss': { name: 'Command', role: 'Boss', attribute: 'Wits', value: 1 },
    'Grunt': { name: 'Shake It Off', role: 'Grunt', attribute: 'Strength', value: 1 },
  };
  return specialistSkills[role];
}; 