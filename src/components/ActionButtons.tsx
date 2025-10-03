import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Character } from '../types/Character';
import {
  ActionCategory,
  ActionOption,
  CharacterSpecificAction,
  MAIN_ACTIONS,
} from '../types/Actions';
import { CharacterActionsService } from '../services/characterActions.service';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../constants/theme';

interface ActionButtonsProps {
  character: Character;
  onActionSelect: (actionText: string) => void;
  disabled?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  character,
  onActionSelect,
  disabled = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ActionCategory | null>(
    null
  );

  const handleMainActionPress = (category: ActionCategory) => {
    setSelectedCategory(category);
  };

  const handleSpecificActionPress = (action: CharacterSpecificAction) => {
    onActionSelect(action.description);
    setSelectedCategory(null); // Zurück zu Hauptauswahl
  };

  const handleBackPress = () => {
    setSelectedCategory(null);
  };

  // Zeige spezifische Aktionen wenn eine Kategorie gewählt wurde
  if (selectedCategory) {
    const specificActions = CharacterActionsService.getActionsForCategory(
      character,
      selectedCategory
    );

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            disabled={disabled}
          >
            <Text style={styles.backButtonText}>← Zurück</Text>
          </TouchableOpacity>
          <Text style={styles.categoryTitle}>
            {MAIN_ACTIONS.find((a) => a.category === selectedCategory)?.emoji}{' '}
            {MAIN_ACTIONS.find((a) => a.category === selectedCategory)?.label}
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {specificActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[
                styles.specificActionButton,
                disabled && styles.buttonDisabled,
              ]}
              onPress={() => handleSpecificActionPress(action)}
              disabled={disabled}
            >
              <Text style={styles.specificActionText}>{action.text}</Text>
              <Text style={styles.specificActionDescription}>
                {action.description}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  // Zeige Hauptkategorien
  return (
    <View style={styles.container}>
      <Text style={styles.promptText}>Wähle eine Aktion:</Text>
      <View style={styles.mainActionsGrid}>
        {MAIN_ACTIONS.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[
              styles.mainActionButton,
              disabled && styles.buttonDisabled,
            ]}
            onPress={() => handleMainActionPress(action.category)}
            disabled={disabled}
          >
            <Text style={styles.actionEmoji}>{action.emoji}</Text>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.ui.surface,
    borderTopWidth: 2,
    borderTopColor: COLORS.accent.gold,
  },
  promptText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.ui.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  mainActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  mainActionButton: {
    width: '48%',
    aspectRatio: 1.5,
    backgroundColor: COLORS.ui.surfaceLight,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.accent.gold,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  actionEmoji: {
    fontSize: 32,
    marginBottom: SPACING.xs,
  },
  actionLabel: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.ui.text,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  backButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  backButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.accent.gold,
    fontWeight: '600',
  },
  categoryTitle: {
    flex: 1,
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.ui.text,
    textAlign: 'center',
    marginRight: SPACING.xl * 2, // Balance für den Back-Button
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  specificActionButton: {
    minWidth: 200,
    backgroundColor: COLORS.ui.surfaceLight,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.accent.gold,
    padding: SPACING.md,
    marginRight: SPACING.sm,
  },
  specificActionText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.ui.text,
    marginBottom: SPACING.xs,
  },
  specificActionDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.ui.textSecondary,
  },
});
