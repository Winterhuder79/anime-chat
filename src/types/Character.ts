export enum CharacterType {
  HERO = 'HERO',
  DEMON = 'DEMON',
}

export enum BreathingStyle {
  WATER = 'Water Breathing',
  THUNDER = 'Thunder Breathing',
  BEAST = 'Beast Breathing',
  INSECT = 'Insect Breathing',
  FLAME = 'Flame Breathing',
  SUN = 'Sun Breathing (Hinokami Kagura)',
  DEMON_BLOOD = 'Demon Blood Art',
}

export interface Ability {
  name: string;
  description: string;
  breathingStyle?: BreathingStyle;
}

export interface Character {
  id: string;
  name: string;
  nameJapanese: string;
  type: CharacterType;
  title: string;
  personality: string;
  backstory: string;
  abilities: Ability[];
  imageUrl?: string;
  voiceStyle: string; // Wie der Charakter spricht
  strengths: string[];
  weaknesses: string[];
}
