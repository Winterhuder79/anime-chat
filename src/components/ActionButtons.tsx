import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Character } from '../types/Character';
import {
  ActionCategory,
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));

  const handleToggleExpand = () => {
    const toValue = isExpanded ? 0 : 1;
    
    Animated.spring(slideAnim, {
      toValue,
      useNativeDriver: false, // false wegen height-Animation
      friction: 8,
    }).start();
    
    setIsExpanded(!isExpanded);
  };

  const handleMainActionPress = (category: ActionCategory) => {
    setSelectedCategory(category);
    // Slide aus wenn Kategorie gewählt
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: false, // false wegen height-Animation
      friction: 8,
    }).start();
    setIsExpanded(false);
  };

  const handleSpecificActionPress = (action: CharacterSpecificAction) => {
    onActionSelect(action.description);
    setSelectedCategory(null);
    
    // Fahre den Slider komplett ein
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: false,
      friction: 8,
    }).start();
    setIsExpanded(false);
  };

  const handleBackPress = () => {
    setSelectedCategory(null);
    // Slide wieder ein
    setIsExpanded(true);
    Animated.spring(slideAnim, {
      toValue: 1,
      useNativeDriver: false, // false wegen height-Animation
      friction: 8,
    }).start();
  };

  const mainActionsHeight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 260], // Erhöhte Höhe damit alle 4 Buttons sichtbar sind
  });

  // Zeige spezifische Aktionen als 2x2 Grid (OVERLAY)
  if (selectedCategory) {
    const specificActions = CharacterActionsService.getActionsForCategory(
      character,
      selectedCategory
    );

    return (
      <View style={styles.overlayContainer}>
        <View style={styles.overlay}>
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

          <View style={styles.gridContainer}>
            {specificActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[
                  styles.gridButton,
                  disabled && styles.buttonDisabled,
                ]}
                onPress={() => handleSpecificActionPress(action)}
                disabled={disabled}
              >
                <Text style={styles.gridButtonText}>{action.text}</Text>
                <Text style={styles.gridButtonDescription}>
                  {action.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  }

  // Zeige Hauptkategorien als ausklappbarer Slider
  return (
    <View style={styles.container}>
      {/* Toggle Button - Immer sichtbar */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={handleToggleExpand}
        disabled={disabled}
      >
        <Text style={styles.toggleText}>
          {isExpanded ? '▼ Aktionen ausblenden' : '▲ Aktionen anzeigen'}
        </Text>
      </TouchableOpacity>

      {/* Animated Slider für Main Actions */}
      <Animated.View
        style={[
          styles.sliderContainer,
          {
            height: mainActionsHeight,
            opacity: slideAnim,
          },
        ]}
      >
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
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.ui.surface,
    borderTopWidth: 2,
    borderTopColor: COLORS.accent.gold,
  },
  toggleButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.ui.surfaceLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.ui.border,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.accent.gold,
  },
  sliderContainer: {
    overflow: 'hidden',
  },
  mainActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: SPACING.md,
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
  // OVERLAY für Sub-Actions
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  overlay: {
    backgroundColor: COLORS.ui.surface,
    borderTopLeftRadius: BORDER_RADIUS.xxl,
    borderTopRightRadius: BORDER_RADIUS.xxl,
    padding: SPACING.lg,
    maxHeight: '50%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
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
    marginRight: SPACING.xl * 2,
  },
  // 2x2 GRID für Sub-Actions
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'space-between',
  },
  gridButton: {
    width: '48%',
    backgroundColor: COLORS.ui.surfaceLight,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.accent.gold,
    padding: SPACING.md,
    minHeight: 80,
    justifyContent: 'center',
  },
  gridButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.ui.text,
    marginBottom: SPACING.xs,
  },
  gridButtonDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.ui.textSecondary,
  },
});
