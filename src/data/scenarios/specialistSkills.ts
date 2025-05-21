import type { Skill } from './skills';

/**
 * List of available specialist skills and their stunts
 */
export const specialistSkills: Skill[] = [
    {
        id: 'enforcer-intimidate',
        name: 'Enforcer: Intimidate',
        attribute: 'strength',
        description: 'Persuade someone with a meaningful threat',
        success: 'Your opponent must choose -- either attack you right now (by Fighting, Shooting or using a mutation), or bow to your will.',
        failure: 'Your target won\'t be pushed around by a bully like you. He might even attack you now, or hold the grudge for the opportune moment.',
        stunts: [
            {
                id: 'enforcer-intimidate-stunt-1',
                name: 'Break Their Spirit',
                description: 'Additional ☢️ mean you strike fear into your opponent\'s heart. He suffers one point of doubt (page 88) for every additional ☢️ you roll on top of the first one.',
            }
        ]
    },
    {
        id: 'gearhead-jury-rig',
        name: 'Gearhead: Jury Rig',
        attribute: 'wits',
        description: 'Make something useful out of scrap',
        success: 'If you make the roll, your construct works -- once. Most Jury-Rigged devices are temporary, made to solve a problem here and now -- but not to last. Normally, your device will only last for one action or use, then it will fall apart (the Gear Bonus automatically drops to zero). You can use a stunt to make it last longer.',
        failure: 'If you fail the Jury-Rig roll, bad things happen. The device will fall apart when you really need it, or even blow up in your face. You can\'t roll for the exact same device again, unless you find new scrap to use. Alternatively, the GM can set a new precondition.',   
        stunts: [
            {
                id: 'gearhead-jury-rig-stunt-1',
                name: 'Durable', 
                description: 'The device is durable and can be used more than once. It breaks down according to the normal gear rules (page 46).',
            },
            {
                id: 'gearhead-jury-rig-stunt-2',
                name: 'Increased Gear Bonus',
                description: 'The device\'s Gear Bonus is increased by one.',
            },
            {
                id: 'gearhead-jury-rig-stunt-3',
                name: 'Increased Weapon Damage',
                description: 'If it\'s a weapon, its weapon damage is increased by one.',
            },
            {
                id: 'gearhead-jury-rig-stunt-4',
                name: 'Fewer Reloads',
                description: 'A gun gets an extra barrel and can be fired a second time before you need to reload. You can choose this stunt several times for a multi-barrel gun.',
            },
            {
                id: 'gearhead-jury-rig-stunt-5',
                name: 'Increase Armor/Protection Rating',
                description: 'The Armor/Protection Rating of an armor or a Rot suit is increased by one. You can choose this stunt multiple times.',
            },
            {
                id: 'gearhead-jury-rig-stunt-6',
                name: 'Increase Blast Power',
                description: 'The Blast Power of an explosive charge is increased by 3. You can choose this stunt multiple times.',
            },
            {
                id: 'gearhead-jury-rig-stunt-7',
                name: 'Add Shrapnel Damage',
                description: 'You fit deadly shrapnel to an explosive charge, increasing the weapon damage to 2 (page 94).',
            },
            {
                id: 'gearhead-jury-rig-stunt-8',
                name: 'Carry More People',
                description: 'A scrap raft can carry twice as many people.',
            },
            {
                id: 'gearhead-jury-rig-stunt-9',
                name: 'Vehicle: Souped-up Engine',
                description: 'If repairing a vehicle, the Gear Bonus of the vehicle is increased by one.',
            },
            {
                id: 'gearhead-jury-rig-stunt-10',
                name: 'Vehicle: Spikes and Blades',
                description: 'If repairing a vehicle, the weapon damage of the vehicle (normally 1) is increased by one.',
            },
            {
                id: 'gearhead-jury-rig-stunt-11',
                name: 'Vehicle: Increase Armor',
                description: 'If repairing a car, the Armor Value of the vehicle is increased by 3 (only for cars).',
            },
        ],
        notes: 'Jury-Rig has a lot of options. Please see page 54-56.',
    },
    {
        id: 'stalker-find-the-path',
        name: 'Stalker: Find the Path',
        attribute: 'agility',
        description: 'Navigate any new zones with caution',
        success: 'You find a safe path and spot any threats in the Zone before they spot you.',
        failure: 'Any NPCs or monsters in the sector spot you before you spot them, and if hostile, they might ambush you (page 56).',
        stunts: [
            {
                id: 'stalker-find-the-path-stunt-1',
                name: 'Find an Artifact',
                description: 'You find an artifact in the sector, if it\'s there to be found. You still might have to struggle to get your hands on it.',
            },
            {
                id: 'stalker-find-the-path-stunt-2',
                name: 'Assess Rot Level',
                description: 'You can assess the general level of Rot in the sector (page 125).',
            },
            {
                id: 'stalker-find-the-path-stunt-3',
                name: 'Find Bullets',
                description: 'You find D6 bullets, still live.',
            },
            {
                id: 'stalker-find-the-path-stunt-4',
                name: 'Find Contaminated Grub',
                description: 'You find D6 rations of grub contaminated by the Rot. It can be edible plants or leftovers from the Old Age. A Zone cook (page 67) can cook the Rot out of the food.',
            },
            {
                id: 'stalker-find-the-path-stunt-5',
                name: 'Find Rot-Free Water',
                description: 'You find D6 rations of Rot-free water (rotwater is usually plentiful).',
            },
            {
                id: 'stalker-find-the-path-stunt-6',
                name: 'Quick Exploration',
                description: 'The exploration of the sector only takes half the time (page 122).',
            },
            {
                id: 'stalker-find-the-path-stunt-7',
                name: 'Speed Run the Zone',
                description: 'You rush through the sector in a quarter of the time it would take to explore it. You avoid all threats, but the sector does not count as having been explored and you find no artifacts, grub or water in it.',
            },
            {
                id: 'stalker-find-the-path-stunt-8',
                name: 'Rot Finder: Rot-Free Path',
                description: 'Stalkers with Rot Finder can find the most Rot-free route through a sector. The Rot level counts as one step lower during this visit to the sector.',
            }
        ],
        notes: 'You usually only roll to explore sec-tors that you haven\'t explored before. An explored sector should be considered empty, and contains no threats unless the GM decides otherwise. You can roll for Find a Path to find artifacts, grub and water in a sector that has already been explored, however -- as long as you haven\'t already chosen these stunts. Each new roll takes as long as exploring the sector did in the first place. \n If your group has several Stalkers, only one of you get to roll to Find a Path when you enter a sector. Which one is up to you. If you later roll to find grub, water and artifacts you can all roll individually.',
    },
    {
        id: 'fixer-make-a-deal',
        name: 'Fixer: Make a Deal',
        attribute: 'empathy',
        description: 'Get what\'s needed however you can',
        success: 'You know who probably has what you need. If he wants to give it to you is another matter entirely -- you need to roleplay this out. Often you\'ll need to Manipulate someone to get what you want.',
        failure: 'You get stonewalled and nobody wants to deal with you. Or worse, you step on somebody\'s toes and now you\'re looking over your shoulder...',
        stunts: [
            {
                id: 'fixer-make-a-deal-stunt-1',
                name: 'Deals on the Side: Get Bullets',
                description: 'You gain D6 bullets.',
            },
            {
                id: 'fixer-make-a-deal-stunt-2',
                name: 'Deals on the Side: Get Grub',
                description: 'You gain D6 rations of grub.',
            },
            {
                id: 'fixer-make-a-deal-stunt-3',
                name: 'Deals on the Side: Get Water',
                description: 'You gain 2D6 rations of Rot-free water.',
            },
            {
                id: 'fixer-make-a-deal-stunt-4',
                name: 'Deals on the Side: Get Booze',
                description: 'You gain 2D6 doses of booze.',
            },
            {
                id: 'fixer-make-a-deal-stunt-5',
                name: 'Deals on the Side: Get Dirt',
                description: 'You get dirt on someone. The GM decides on who, and what the information is, but you are free to make suggestions.',
            }, 
        ],
        notes: 'Get details on making a Deal on the Side on pages 57-58.',
    },
    {
        id: 'dog-handler-sic-a-dog',
        name: 'Dog Handler: Sic a Dog',
        attribute: 'agility',
        description: 'Your dog is your best friend',
        success: '',
        failure: '',
        stunts: [
            {
                id: 'dog-handler-sic-a-dog-stunt-1',
                name: 'Tracking: Extra Questions',
                description: 'For every extra ☢️ you roll, choose one stunt: \n 1. How far behind (in hours) are you? \n 2. Is the prey wounded? \n 3. Is the prey alone?',
            }
        ],
        notes: 'Dogs are very helpful and good. Find all the things they can do on pages 58-59.'
    },
    {
        id: 'chronicler-inspire',
        name: 'Chronicler: Inspire',
        attribute: 'empathy',
        description: 'Make someone all they can be',
        success: 'For Help, the first ☢️ gives the target +2 or -2 modification dice to the skill they are about to roll for. For Hinder, every ☢️ you roll eliminates one success rolled by your subject. If all of his successes are negated, his action fails.',
        failure: 'If your roll fails, you get in the way of whatever action you\'re trying to help or hinder, and can suffer the adverse effects of it. The details are up to the GM.',
        stunts: [
            {
                id: 'chronicler-inspire-stunt-1',
                name: 'Help: Modifications',
                description: 'For Help, add +1 or -1 modification dice to the target\'s roll for each additional ☢️ you roll.',
            },
            {
                id: 'chronicler-inspire-stunt-2',
                name: 'Hinder: Remove Successes',
                description: 'For Hinder, remove successes from the target\'s roll for each additional ☢️ you roll.',
            },
            {
                id: 'chronicler-inspire-stunt-3',
                name: 'Performer: Extra Bullets or Grub',
                description: 'If a Chronicler has the Performer talent, after rolling Inspire to peform a creative work for an audience. For every ☢️ you roll, you get D6 bullets or rations of grub.',
            }
        ],
        notes: 'Most of the Ark\'s inhabitants can\'t read or write, at least not as long the Culture DEV level is low (page 101). Chroniclers are different -- dutifully, you have maintained the knowledge of letters, words and numbers, taught to you by the Elder when you were children.',
    },
    {
        id: 'boss-command',
        name: 'Boss: Command',
        attribute: 'wits',
        description: 'You can hack into a computer system and find out what you need to know.',
        success: 'If the Command roll succeeds, your gang (or the individual members given the order) performs the task you want. If any of the factors in the table change during the task, you\'ll need to roll again.',
        failure: 'If your Command roll fails, someone in your gang rebels against you! You\'ll need to fight him one-on-one, to make an example of what happens to anyone who questions your leadership. If you lose this fight (and live), your gang abandons you. You can find a new gang, but it will take some weeks and a successful Command roll. This process should be at least partly roleplayed out.',
        stunts: [
            {
                id: 'boss-command-stunt-1',
                name: 'Racketeering: Bullets',
                description: 'If you use Command to demand something, you can get D6 bullets with each ☢️ you roll.',
            },
            {
                id: 'boss-command-stunt-2',
                name: 'Racketeering: Grub',
                description: 'If you use Command to demand something, you can get D6 rations of grub with each ☢️ you roll.',
            },
            {
                id: 'boss-command-stunt-3',
                name: 'Racketeering: Water',
                description: 'If you use Command to demand something, you can get 2D6 rations of Rot-free water with each ☢️ you roll.',
            },
            {
                id: 'boss-command-stunt-4',
                name: 'Racketeering: Booze',
                description: 'If you use Command to demand something, you can get 2D6 rations of booze with each ☢️ you roll.',
            },
        ]
    },
    {
        id: 'grunt-shake-it-off',
        name: 'Grunt: Shake It Off',
        attribute: 'strength',
        description: 'Pain and suffering are nothing',
        success: 'For every ☢️ you roll, one point of trauma is eliminated. If all trauma is eliminated, you suffer none at all.',
        failure: 'The pain is just too great, and you can\'t shut it out. You suffer the full amount of trauma (but no other adverse effect).',
        stunts: [
            {
                id: 'grunt-shake-it-off-stunt-1',
                name: 'Reduce Trauma',
                description: 'For every ☢️ you roll, one point of trauma is eliminated. If all trauma is eliminated, you suffer none at all.',
            },
            {
                id: 'grunt-shake-it-off-stunt-2',
                name: 'Rebel: Extra Modifications',
                description: 'If a Grunt has the Rebel talent, for every ☢️ you roll, you get +1 modification to your next action. You must use this bonus at the earliest possible opportunity -- that is, in the current turn or the next if you already acted in the turn.',
            }
        ],
        notes: 'You can use the skill any number of times in a turn of a conflict -- using the skill does not count as an action or as a maneuver.'
    }
]