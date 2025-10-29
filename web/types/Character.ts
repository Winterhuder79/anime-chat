export type CharacterType = 'demon_slayer' | 'demon';

export interface Ability {
  name: string;
  description: string;
  type: 'attack' | 'defense' | 'support';
}

export interface Character {
  id: string;
  name: string;
  nameJapanese: string;
  title: string;
  type: CharacterType;
  personality: string;
  backstory: string;
  voiceStyle: string;
  abilities: Ability[];
  strengths: string[];
  weaknesses: string[];
}
