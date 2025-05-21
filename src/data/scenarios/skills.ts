/**
 * Represents a stunt that can be performed with extra successes
 */
export interface Stunt {
  id: string;
  name: string;
  description: string;
  requiredSuccesses: number;
}

/**
 * Represents a skill in the game
 */
export interface Skill {
  id: string;
  name: string;
  description: string;
  attribute: 'strength' | 'agility' | 'wits' | 'empathy';
  stunts: Stunt[];
}

/**
 * List of available skills and their stunts
 */
export const skills: Skill[] = [
    {
        id: 'endure',
        name: 'Endure',
        description: 'Sustain and survive in difficult situations.',
        attribute: 'strength',
        stunts: [
            {
                id: 'endure-1',
                name: 'Help an Ally',
                description: 'For every ☢️ you roll, you can help a friend (PC or NPC) in the same situation as you. He can keep moving, and doesn\'t have to roll himself. You can even choose this stunt when you only roll one/ -- that means you help you friend while sacrificing yourself.'
            },
        ]
    },
    {
        id: 'force',
        name: 'Force',
        description: 'Move heavy objects or debris.',
        attribute: 'strength',
        stunts: [
            {
                id: 'force-1',
                name: 'Push or Throw Object Forcefully',
                description: 'You push or throw the object with great force. One target of your choice within Arm\'s Length suffers damage equal to the number of extra ☢️.'
            },
            {
                id: 'force-2',
                name: 'Find Hidden Passages',
                description: 'If applicable in the situation, you find or reveal a hidden passage or object. The GM decides what it is.'
            }, 
        ]
    },
    {
        id: 'fight',
        name: 'Fight',
        description: 'Fighting in close combat with weapons or bare hands',
        attribute: 'strength',
        stunts: [
            {
                id: 'fight-1',
                name: 'More Damage',
                description: 'You inflict one more point of damage. You can choose this stunt multiple times, if you roll several ☢️'
            },
            {
                id: 'fight-2',
                name: 'Fatigue',
                description: 'You subdue or tire your enemy. He suffers one point of fatigue',
            },
            {
                id: 'fight-3',
                name: 'Increase Initiative Score',
                description: 'You increase your initiative score by 2, taking effect next turn',
            },
            {
                id: 'fight-4',
                name: 'Affect Object on Opponent',
                description: 'You knock or pull a weapon or other object from your opponent. You choose which. During a conflict, picking up a dropped object counts as a maneuver',
            },
            {
                id: 'fight-5',
                name: 'Shove',
                description: 'Your opponent falls to the ground or is pushed back, for example through a doorway or over a cliff.',
            },
            {
                id: 'fight-6',
                name: 'Grapple',
                description: 'You hold the opponent in a grapple. He needs to successfully Fight you to break free, and can\'t perform any other action (or any maneuver) until he has done so -- or until you are broken or let him go.',
            }
        ]
    },
    {
    id: 'shoot',
    name: 'Shoot',
    description: 'Using ranged weapons like guns and bows',
    attribute: 'agility',
    stunts: [
      {
        id: 'shoot-1',
        name: 'Quick Shot',
        description: 'You can fire twice in the same turn',
        
      },
      {
        id: 'shoot-2',
        name: 'Precise Shot',
        description: 'Your shot ignores armor',
        
      },
      {
        id: 'shoot-3',
        name: 'Ricochet',
        description: 'Your shot can hit a second target',
        
      }
    ]
  },
  {
    id: 'scout',
    name: 'Scout',
    description: 'Finding your way and spotting things',
    attribute: 'wits',
    stunts: [
      {
        id: 'scout-1',
        name: 'Spot Weakness',
        description: 'You can spot a weakness in your opponent\'s defense',
        
      },
      {
        id: 'scout-2',
        name: 'Find Path',
        description: 'You can find a safe path through dangerous terrain',
        
      },
      {
        id: 'scout-3',
        name: 'Predict Movement',
        description: 'You can predict your opponent\'s next move',
        
      }
    ]
  }
];
