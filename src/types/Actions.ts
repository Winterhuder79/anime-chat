export enum ActionCategory {
  FRIENDLY = 'friendly',
  INSULTING = 'insulting',
  ATTACK = 'attack',
  FLEE = 'flee',
}

export interface ActionOption {
  id: string;
  label: string;
  category: ActionCategory;
  emoji: string;
}

export interface CharacterSpecificAction {
  id: string;
  text: string;
  description: string;
}

export const MAIN_ACTIONS: ActionOption[] = [
  {
    id: 'friendly',
    label: 'Freundlich',
    category: ActionCategory.FRIENDLY,
    emoji: '😊',
  },
  {
    id: 'insulting',
    label: 'Beleidigend',
    category: ActionCategory.INSULTING,
    emoji: '😠',
  },
  {
    id: 'attack',
    label: 'Angreifen',
    category: ActionCategory.ATTACK,
    emoji: '⚔️',
  },
  {
    id: 'flee',
    label: 'Wegrennen',
    category: ActionCategory.FLEE,
    emoji: '🏃',
  },
];
