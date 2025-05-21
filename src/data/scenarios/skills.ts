/**
 * Represents a stunt that can be performed with extra successes
 */
export interface Stunt {
  id: string;
  name: string;
  description: string;
}

/**
 * Represents a skill in the game
 */
export interface Skill {
  id: string;
  name: string;
  description: string;
  attribute: 'strength' | 'agility' | 'wits' | 'empathy';
  success: string;
  failure: string;
  stunts: Stunt[];
  notes?: string;
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
    success: 'You manage to push on, ignoring the pain just a little longer.',
    failure: 'You just can\'t take it anymore. You have to rest, if just for a couple of hours. But what if some predator spots you?',
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
    success: 'With a groan, you push through and get whatever it was out of your way.',
    failure: 'It\'s just too heavy. You need to find another way. And what if the noise you made attracted unwanted company?',
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
    success: 'You hit, and inflict weapon damage (page 87) on your opponent.',
    failure: 'You stumble and miss. Now it\'s your opponent\'s turn ...',
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
    ],
    notes: 'When you Fight you can use weapons such as clubs, knives and spears. Read more on page 83. When someone Fights you, you can try to defend yourself. When you defend, you also roll for Fight, with a specific set of stunts available. Read more on page 84.',
  },
  {
    id: 'sneak',
    name: 'Sneak',
    description: 'Steathily carry out your tasks',
    attribute: 'agility',
    success: 'You move like a shadow in the night, noticed by no one.',
    failure: 'Your enemy sees you or hears you, and the element of surprise is lost.', 
    stunts: [
      {
        id: 'stealth-1',
        name: 'Extra Sneak Attack',
        description: 'When setting up a sneak attack, you get a -1 modification to your first attack for every extra ☢️ rolled after the first.',
      },
    ]
  },
  {
    id: 'move',
    name: 'Move',
    description: 'Get out of a bad situation',
    attribute: 'agility',
    success: 'You get out of the sticky situation, and live to fight another day.',
    failure: 'You are pinned down, backed into a corner with no way out. Get ready for a fight.',   
    stunts: [
      {
        id: 'move-1',
        name: 'Help an Ally',
        description: 'For every ☢️ you roll, you can help a friend (PC or NPC) in the same spot of trouble as you. He makes it out, and doesn\'t have to roll himself. You can even choose this stunt when you only roll one ☢️ -- that means you help you friend while sacrificing yourself.',
      },
    ],
    notes: 'Also use the Move skill when balancing, jumping or climbing (Acrobatics). Failure in these cases can be fatal!',
  },
  {
    id: 'shoot',
    name: 'Shoot',
    description: 'Using ranged weapons like guns and bows',
    attribute: 'agility',
    success: 'You hit and inflict weapon damage (page 87) on your target.',
    failure: 'The shot misses your target. Maybe it hits something else? And the sound of gunfire could attract unwelcome attention ...',
    stunts: [
      {
        id: 'shoot-1',
        name: 'More Damage',
        description: 'You inflict one more point of damage. You can choose this stunt multiple times, if you roll several ☢️',
      },
      {
        id: 'shoot-2',
        name: 'Pin Down and Fatigue',
        description: 'You pin down your enemy. He suffers one point of fatigue (page 88).',
      },
      {
        id: 'shoot-3',
        name: 'Increase Initiative Score',
        description: 'You increase your initiative score by 2 (page 80), effective as of the next turn.',
      },
      {
        id: 'shoot-4',
        name: 'Oppenent Drops an Object',
        description: 'Your target drops a weapon or another hand-held object. You choose which.',
      },
      {
        id: 'shoot-5',
        name: 'Shove',
        description: 'Your opponent falls to the ground or is pushed back, for example through a doorway or over a cliff.',
      }
    ],
    notes: 'Scrap guns are usually loaded with just one bullet at a time. When you have fired it, you\'ll need to reload before you can fire again. Reloading is a maneuver in conflicts. Some scrap guns (page 55) and artifacts have magazines with several bullets, letting you fire again and again without reloading.',
  },
  {
    id: 'scout',
    name: 'Scout',
    description: 'Learn about sneaking or non-obvious details.',
    attribute: 'wits',
    success: 'You are able to make out what it is, and if it appears like a threat to you or not. The exact information you get is up to the GM',
    failure: 'You can\'t really make out what it is, or you mistake it for something else (the GM feeds you false information).',
    stunts: [
      {
        id: 'scout-1',
        name: 'Extra Question',
        description: 'For every extra ☢️ you roll, you get to know the answer to one of these questions: (1) Is it coming for me? (2) Are more of them close by? (3) How do I get in/past/away? ',
      }
    ]
  },
  {
    id: 'comprehend',
    name: 'Comprehend',
    description: 'Understand the Old Age and its artifacts.',
    attribute: 'wits',
    success: 'You understand the nature or function of the object. If it\'s an artifact, you can use it.',
    failure: 'The object of your study makes no sense to you at all, or you are mistaken (in this case, the GM can feed you false information about the object).',
    stunts: [
      {
        id: 'comprehend-1',
        name: 'Teach Others',
        description: 'For every ☢️ rolled beyond the first, you can teach someone else how to use the artifact.',
      }
    ]
  },
  {
    id: 'know-the-zone',
    name: 'Know the Zone',
    description: 'Understand the world immediately around you.',
    attribute: 'wits',
    success: 'You know what it is, and its basic traits or effects.',
    failure: 'You have no, or the wrong, idea. The GM can feed you false, or a mix of true and false, information (in this way, you will know that you have failed your roll, but not what information to trust.)',
    stunts: [
      {
        id: 'know-the-zone-1',
        name: 'Extra Question',
        description: 'For every extra / you roll, you get the answer to one of these questions about the creature or phenomenon: (1) How can it hurt me? (2) How can I hurt it?',
      }
    ]
  },
  {
    id: 'sense-emotion',
    name: 'Sense Emotion',
    description: 'Read the mood and intent of others',
    attribute: 'empathy',
    success: 'The GM must reveal the NPC\'s most powerful emotion at this point in time -- hate, fear, contempt, love, etc.',
    failure: 'You fail to read, or misread, the NPC. The GM can feed you false, or a mix of true and false, information.',
    stunts: [
      {
        id: 'sense-emotion-1',
        name: 'Extra Question',
        description: 'For every extra ☢️ you roll, you get the answer to one of these yes/no questions about the NPC: (1) Is he telling the truth? (2) Does he want to hurt me? (3) Does he want something from me?',
      }
    ],
    notes: 'If the NPC is not of the People you geta -1 modification to your roll -- strangers are harder to read.',
  },
  {
    id: 'manipulate',
    name: 'Manipulate',
    description: 'Persuade or deceive others with your words and actions',
    attribute: 'empathy',
    success: 'He reluctantly does what you want, but wants something in return. The GM decides what this is, but it must be something you can reasonably do. It is up to you whether to accept the deal or not.',
    failure: 'He won\'t listen and he won\'t do what you want. He might start to dislike you, or even attack you if provoked.',
    stunts: [
      {
        id: 'manipulate-1',
        name: 'Break Their Spirit',
        description: 'Extra ☢️ on your roll mean you sow fear and doubt in your opponent\'s heart. He suffers one point of doubt (page 88) for every additional ☢️ you roll after the first one. If he is broken by doubt, he does what you want without demanding a return favor.',
      }
    ],
    notes: 'NPCs and other PCs can Manipulate you. If their roll succeeds, you must offer them a deal of some sort. It\'s then up to the GM (or the other player) to accept or decline it.',
  },
  {
    id: 'heal',
    name: 'Heal',
    description: 'Bring your broken comrades back from the brink',
    attribute: 'empathy',
    success: 'Either: A person who has suffered enough trauma to reduce any of the four attributes to zero is broken, and can\'t carry on. If you successfully Heal a broken person, he gets back to his feet and immediately recovers a number of attributes points equal to the number of ☢️ you rolled. No resources are needed for this recovery. A failed roll has no further effect. OR The most important use of the Heal skill is to give first aid and stabilize critical injuries -- which might save your patient\'s life. A failed roll in this situation could kill him, however, so be careful.',
    failure: '',
    stunts: [
      {
        id: 'heal-1', 
        name: 'No Stunts',
        description: 'There are no stunts for Heal.',
      }
    ]
  }
];
