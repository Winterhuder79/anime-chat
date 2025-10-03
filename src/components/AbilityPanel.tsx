import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Character } from '../types/Character';

interface AbilityPanelProps {
  character: Character;
  isVisible: boolean;
  onClose: () => void;
}

export const AbilityPanel: React.FC<AbilityPanelProps> = ({
  character,
  isVisible,
  onClose,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.panel}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Fähigkeiten</Text>
            <Text style={styles.headerSubtitle}>{character.name}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {character.abilities.map((ability, index) => (
            <View key={index} style={styles.abilityCard}>
              <Text style={styles.abilityName}>⚡ {ability.name}</Text>
              {ability.breathingStyle && (
                <Text style={styles.breathingStyle}>
                  {ability.breathingStyle}
                </Text>
              )}
              <Text style={styles.abilityDescription}>
                {ability.description}
              </Text>
            </View>
          ))}

          {/* Zusätzliche Info */}
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>💪 Stärken</Text>
            {character.strengths.map((strength, index) => (
              <Text key={index} style={styles.infoItem}>
                • {strength}
              </Text>
            ))}
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>⚠️ Schwächen</Text>
            {character.weaknesses.map((weakness, index) => (
              <Text key={index} style={styles.infoItem}>
                • {weakness}
              </Text>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  panel: {
    backgroundColor: '#1e1e1e',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9e9e9e',
    marginTop: 4,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 20,
    color: '#ffffff',
  },
  content: {
    padding: 20,
  },
  abilityCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#64b5f6',
  },
  abilityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  breathingStyle: {
    fontSize: 12,
    color: '#81c784',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  abilityDescription: {
    fontSize: 14,
    color: '#b0bec5',
    lineHeight: 20,
  },
  infoSection: {
    marginTop: 16,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  infoItem: {
    fontSize: 14,
    color: '#9e9e9e',
    marginBottom: 6,
    lineHeight: 20,
  },
});
