import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CharacterCard } from '../components/CharacterCard';
import { ALL_CHARACTERS, DEMONS, HEROES } from '../constants/characters';
import { Character } from '../types/Character';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../constants/theme';

type RootStackParamList = {
  CharacterSelection: undefined;
  Story: { character: Character };
  Settings: undefined;
};

type CharacterSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CharacterSelection'
>;

interface Props {
  navigation: CharacterSelectionScreenNavigationProp;
}

export const CharacterSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const handleCharacterSelect = (character: Character) => {
    navigation.navigate('Story', { character });
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <LinearGradient
        colors={[COLORS.accent.red, COLORS.accent.darkRed, COLORS.primary.dark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        {/* Settings Button */}
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.emoji}>🗾</Text>
          <Text style={styles.title}>Demon Slayer</Text>
          <Text style={styles.subtitle}>Interactive Story</Text>
        </View>

        {/* Subtitle */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>Wähle deinen Charakter</Text>
          <View style={styles.divider} />
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>⚔️</Text>
            <Text style={styles.statNumber}>{HEROES.length}</Text>
            <Text style={styles.statLabel}>Helden</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>👹</Text>
            <Text style={styles.statNumber}>{DEMONS.length}</Text>
            <Text style={styles.statLabel}>Dämonen</Text>
          </View>
        </View>

        {/* Bottom Wave */}
        <View style={styles.waveContainer}>
          <View style={styles.wave} />
        </View>
      </LinearGradient>
    </View>
  );

  const renderItem = ({ item }: { item: Character }) => (
    <CharacterCard character={item} onSelect={handleCharacterSelect} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.ui.background} />
      <FlatList
        data={ALL_CHARACTERS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        key="two-columns"
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ui.background,
  },
  listContent: {
    paddingBottom: SPACING.xxxl,
  },
  columnWrapper: {
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: SPACING.xl,
  },
  headerGradient: {
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xxxl + 20,
    position: 'relative',
  },
  settingsButton: {
    position: 'absolute',
    top: SPACING.lg,
    right: SPACING.lg,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 2,
    borderColor: COLORS.accent.gold,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  settingsIcon: {
    fontSize: 24,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  emoji: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: FONTS.sizes.display,
    fontWeight: 'bold',
    color: COLORS.ui.text,
    marginBottom: SPACING.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.ui.textSecondary,
    fontStyle: 'italic',
    letterSpacing: 3,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  subtitleText: {
    fontSize: FONTS.sizes.xl,
    color: COLORS.accent.gold,
    fontWeight: '600',
    marginBottom: SPACING.md,
    letterSpacing: 1,
  },
  divider: {
    width: 100,
    height: 2,
    backgroundColor: COLORS.accent.gold,
    borderRadius: BORDER_RADIUS.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xxxl,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.md,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: SPACING.xs,
  },
  statNumber: {
    fontSize: FONTS.sizes.heading,
    fontWeight: 'bold',
    color: COLORS.accent.gold,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.ui.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statDivider: {
    width: 2,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: SPACING.lg,
  },
  waveContainer: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 20,
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: COLORS.ui.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
