import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Character, CharacterType } from '../types/Character';

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 Karten pro Reihe mit Padding

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onSelect,
}) => {
  const isHero = character.type === CharacterType.HERO;

  return (
    <TouchableOpacity
      style={[styles.card, isHero ? styles.heroCard : styles.demonCard]}
      onPress={() => onSelect(character)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Header mit Name */}
        <View style={styles.header}>
          <Text style={styles.name}>{character.name}</Text>
          <Text style={styles.nameJapanese}>{character.nameJapanese}</Text>
        </View>

        {/* Titel */}
        <Text style={styles.title}>{character.title}</Text>

        {/* Typ Badge */}
        <View
          style={[
            styles.typeBadge,
            isHero ? styles.heroBadge : styles.demonBadge,
          ]}
        >
          <Text style={styles.typeText}>{isHero ? '⚔️ Held' : '👹 Dämon'}</Text>
        </View>

        {/* Fähigkeiten Anzahl */}
        <Text style={styles.abilityCount}>
          {character.abilities.length} Fähigkeiten
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    margin: 8,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  heroCard: {
    backgroundColor: '#1a237e',
    borderWidth: 2,
    borderColor: '#64b5f6',
  },
  demonCard: {
    backgroundColor: '#4a0000',
    borderWidth: 2,
    borderColor: '#e57373',
  },
  content: {
    padding: 16,
    minHeight: 180,
  },
  header: {
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  nameJapanese: {
    fontSize: 14,
    color: '#b0bec5',
  },
  title: {
    fontSize: 12,
    color: '#e0e0e0',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  heroBadge: {
    backgroundColor: '#1976d2',
  },
  demonBadge: {
    backgroundColor: '#c62828',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  abilityCount: {
    fontSize: 11,
    color: '#9e9e9e',
    marginTop: 4,
  },
});
