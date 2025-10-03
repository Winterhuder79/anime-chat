import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Character, CharacterType } from '../types/Character';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS, CHARACTER_EMOJIS } from '../constants/theme';

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width > 768 ? (width - 64) / 4 : width > 500 ? (width - 48) / 3 : (width - 48) / 2;

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onSelect,
}) => {
  const isHero = character.type === CharacterType.HERO;
  const emoji = CHARACTER_EMOJIS[character.id as keyof typeof CHARACTER_EMOJIS] || '⚔️';
  
  const gradientColors = isHero 
    ? [COLORS.hero[character.id as keyof typeof COLORS.hero] || '#1976d2', COLORS.primary.dark]
    : [COLORS.demon[character.id as keyof typeof COLORS.demon] || '#c62828', COLORS.primary.dark];

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => onSelect(character)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, isHero ? styles.heroCard : styles.demonCard]}
      >
        {/* Glow Effect Border */}
        <View style={[
          styles.glowBorder,
          { borderColor: isHero ? COLORS.accent.gold : COLORS.accent.red }
        ]} />
        
        {/* Emoji Avatar */}
        <View style={styles.avatarContainer}>
          <View style={[
            styles.avatar,
            { backgroundColor: isHero ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 23, 68, 0.2)' }
          ]}>
            <Text style={styles.emoji}>{emoji}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Name */}
          <Text style={styles.name} numberOfLines={1}>
            {character.name}
          </Text>
          
          {/* Japanese Name */}
          <Text style={styles.nameJapanese} numberOfLines={1}>
            {character.nameJapanese}
          </Text>

          {/* Title with Icon */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleIcon}>{isHero ? '⚔️' : '👹'}</Text>
            <Text style={styles.title} numberOfLines={2}>
              {character.title}
            </Text>
          </View>

          {/* Stats Bar */}
          <View style={styles.statsContainer}>
            <View style={styles.statBadge}>
              <Text style={styles.statIcon}>⚡</Text>
              <Text style={styles.statText}>{character.abilities.length}</Text>
            </View>
            <View style={[
              styles.typeBadge,
              isHero ? styles.heroBadge : styles.demonBadge
            ]}>
              <Text style={styles.typeText}>
                {isHero ? 'HELD' : 'DÄMON'}
              </Text>
            </View>
          </View>
        </View>

        {/* Corner Accent */}
        <View style={[
          styles.cornerAccent,
          { backgroundColor: isHero ? COLORS.accent.gold : COLORS.accent.red }
        ]} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    margin: SPACING.sm,
  },
  card: {
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    minHeight: 220,
    position: 'relative',
    ...SHADOWS.lg,
  },
  heroCard: {
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  demonCard: {
    borderWidth: 2,
    borderColor: 'rgba(255, 23, 68, 0.3)',
  },
  glowBorder: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 2,
    opacity: 0.5,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  emoji: {
    fontSize: 40,
  },
  content: {
    padding: SPACING.md,
    paddingTop: SPACING.sm,
  },
  name: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.ui.text,
    marginBottom: SPACING.xs,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  nameJapanese: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.ui.textSecondary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    minHeight: 36,
  },
  titleIcon: {
    fontSize: 14,
    marginRight: SPACING.xs,
  },
  title: {
    flex: 1,
    fontSize: FONTS.sizes.xs,
    color: COLORS.ui.textSecondary,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
  },
  statIcon: {
    fontSize: 14,
    marginRight: SPACING.xs,
  },
  statText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.ui.text,
  },
  typeBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
  },
  heroBadge: {
    backgroundColor: COLORS.accent.gold,
  },
  demonBadge: {
    backgroundColor: COLORS.accent.red,
  },
  typeText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: 'bold',
    color: COLORS.primary.dark,
    letterSpacing: 1,
  },
  cornerAccent: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    transform: [{ rotate: '45deg' }],
    marginTop: -20,
    marginRight: -20,
    opacity: 0.6,
  },
});
