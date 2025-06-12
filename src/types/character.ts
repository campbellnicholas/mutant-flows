export type Role = 
  | 'Enforcer'
  | 'Gearhead'
  | 'Stalker'
  | 'Fixer'
  | 'Dog Handler'
  | 'Chronicler'
  | 'Boss'
  | 'Grunt';

export type AttributeName = 'Strength' | 'Agility' | 'Wits' | 'Empathy';

export type Attribute = {
  name: AttributeName;
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
  id: string;
  name: string;
  weight: number;
  isTiny: boolean;
};

export type Range = 'Arm\'s Length' | 'Near' | 'Short' | 'Long';

export type Weapon = {
  id: string;
  name: string;
  bonus: number;
  damage: number;
  range: Range;
  specialNotes?: string;
};

export type Armor = {
  id: string;
  name: string;
  rating: number;
  condition: number; // 0-10, representing current condition
};

export type RotSuit = {
  name: string;
  rating: number;
};

export type Skill = 
  | 'Melee'
  | 'Might'
  | 'Endurance'
  | 'Stealth'
  | 'Sneak'
  | 'Move'
  | 'Scout'
  | 'Comprehend'
  | 'Know the Zone'
  | 'Sense Emotion'
  | 'Manipulate'
  | 'Heal'
  | 'Survival';

export type Appearance = {
  face: string;
  body: string;
  clothing: string;
};

export type Character = {
  name: string;
  role: Role;
  appearance: Appearance;
  attributes: {
    strength: number | null;
    agility: number | null;
    wits: number | null;
    empathy: number | null;
  };
  skills: {
    [key in Skill]: number;
  };
  weapons: Weapon[];
  armor: Armor[];
  gear: GearItem[];
  experiencePoints: number;
  rotPoints: number;
  mutationPoints: number;
};

export const createEmptyCharacter = (): Character => ({
  name: '',
  role: 'Gearhead',
  appearance: {
    face: '',
    body: '',
    clothing: ''
  },
  attributes: {
    strength: null,
    agility: null,
    wits: null,
    empathy: null,
  },
  skills: {
    Melee: 0,
    Might: 0,
    Endurance: 0,
    Stealth: 0,
    Sneak: 0,
    Move: 0,
    Scout: 0,
    Comprehend: 0,
    'Know the Zone': 0,
    'Sense Emotion': 0,
    Manipulate: 0,
    Heal: 0,
    Survival: 0,
  },
  weapons: [],
  armor: [],
  gear: [],
  experiencePoints: 0,
  rotPoints: 0,
  mutationPoints: 0,
});

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