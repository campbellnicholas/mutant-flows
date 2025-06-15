export type Role = 
  | 'Enforcer'
  | 'Gearhead'
  | 'Stalker'
  | 'Fixer'
  | 'Dog Handler'
  | 'Chronicler'
  | 'Boss'
  | 'Grunt';

export type AttributeName = 'strength' | 'agility' | 'wits' | 'empathy';

export type TraumaLabel = 'Damage' | 'Fatigue' | 'Confusion' | 'Doubt';

export type Attribute = {
  name: AttributeName;
  value: number;
  trauma: {
    value: number;
  };
  traumaName: TraumaLabel;
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
  weight: number;
  range: Range;
  specialNotes?: string;
};

export type ArmorType = 'Damage' | 'Rot';

export type Armor = {
  id: string;
  name: string;
  rating: number;
  weight: number;
  type: ArmorType;
  specialNotes?: string;
  worn: boolean;
};

export type RotSuit = {
  name: string;
  rating: number;
};

export type Skill = 
  | 'Endure'
  | 'Force'
  | 'Fight'
  | 'Sneak'
  | 'Move'
  | 'Shoot'
  | 'Scout'
  | 'Comprehend'
  | 'Know the Zone'
  | 'Sense Emotion'
  | 'Manipulate'
  | 'Heal'
  | 'Intimidate'
  | 'Jury Rig'
  | 'Find the Path'
  | 'Make a Deal'
  | 'Sic a Dog'
  | 'Inspire'
  | 'Command'
  | 'Shake It Off';

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
    strength: Attribute;
    agility: Attribute;
    wits: Attribute;
    empathy: Attribute;
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

export const createEmptyCharacter = (): Character => {
  // Initialize all skills with 0
  const allSkills = getBaseSkills().reduce((acc, skill) => ({
    ...acc,
    [skill]: 0
  }), {} as Record<Skill, number>);
  
  // Add specialist skill
  const specialistSkill = getSpecialistSkillForRole('Gearhead'); // Default role
  allSkills[specialistSkill] = 1; // Specialist skills start at 1
  
  return {
    name: '',
    role: 'Gearhead',
    appearance: {
      face: '',
      body: '',
      clothing: ''
    },
    attributes: {
      strength: { name: 'strength', value: 0, trauma: { value: 0 }, traumaName: 'Damage' },
      agility: { name: 'agility', value: 0, trauma: { value: 0 }, traumaName: 'Fatigue' },
      wits: { name: 'wits', value: 0, trauma: { value: 0 }, traumaName: 'Confusion' },
      empathy: { name: 'empathy', value: 0, trauma: { value: 0 }, traumaName: 'Doubt' },
    },
    skills: allSkills,
    weapons: [],
    armor: [],
    gear: [],
    experiencePoints: 0,
    rotPoints: 0,
    mutationPoints: 0,
  };
};

// Default values for new characters
export const defaultAttributes: Attribute[] = [
  { name: 'strength', value: 0, trauma: { value: 0 }, traumaName: 'Damage' },
  { name: 'agility', value: 0, trauma: { value: 0 }, traumaName: 'Fatigue' },
  { name: 'wits', value: 0, trauma: { value: 0 }, traumaName: 'Confusion' },
  { name: 'empathy', value: 0, trauma: { value: 0 }, traumaName: 'Doubt' },
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

// Helper function to get all base skills
export const getBaseSkills = (): Skill[] => [
  'Endure',
  'Force',
  'Fight',
  'Sneak',
  'Move',
  'Shoot',
  'Scout',
  'Comprehend',
  'Know the Zone',
  'Sense Emotion',
  'Manipulate',
  'Heal'
];

// Helper function to get specialist skill for a role
export const getSpecialistSkillForRole = (role: Role): Skill => {
  const specialistSkills: Record<Role, Skill> = {
    'Enforcer': 'Intimidate',
    'Gearhead': 'Jury Rig',
    'Stalker': 'Find the Path',
    'Fixer': 'Make a Deal',
    'Dog Handler': 'Sic a Dog',
    'Chronicler': 'Inspire',
    'Boss': 'Command',
    'Grunt': 'Shake It Off'
  };
  return specialistSkills[role];
}; 