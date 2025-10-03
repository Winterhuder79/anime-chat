import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../constants/theme';

interface ApiKeyInputProps {
  visible: boolean;
  onSubmit: (apiKey: string) => void;
  onCancel: () => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
  visible,
  onSubmit,
  onCancel,
}) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = () => {
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
      setApiKey('');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerEmoji}>🔑</Text>
            <Text style={styles.title}>OpenAI API-Key</Text>
            <Text style={styles.subtitle}>
              Für die KI-Story-Generierung benötigt
            </Text>
          </View>

          {/* Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>API-Key eingeben:</Text>
            <TextInput
              style={styles.input}
              value={apiKey}
              onChangeText={setApiKey}
              placeholder="sk-proj-..."
              placeholderTextColor={COLORS.ui.textTertiary}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.hint}>
              Der Key wird sicher lokal gespeichert
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Abbrechen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
              disabled={!apiKey.trim()}
            >
              <Text style={styles.submitButtonText}>Speichern</Text>
            </TouchableOpacity>
          </View>

          {/* Info */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              ℹ️ Du kannst deinen API-Key bei{' '}
              <Text style={styles.infoLink}>platform.openai.com</Text> erstellen
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  modal: {
    backgroundColor: COLORS.ui.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xxl,
    width: '100%',
    maxWidth: 500,
    borderWidth: 2,
    borderColor: COLORS.accent.gold,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: FONTS.sizes.title,
    fontWeight: 'bold',
    color: COLORS.ui.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.ui.textSecondary,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: SPACING.xxl,
  },
  label: {
    fontSize: FONTS.sizes.md,
    color: COLORS.ui.text,
    marginBottom: SPACING.sm,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.ui.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.ui.text,
    borderWidth: 2,
    borderColor: COLORS.ui.border,
  },
  hint: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.ui.textTertiary,
    marginTop: SPACING.xs,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  button: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.ui.surfaceLight,
    borderWidth: 2,
    borderColor: COLORS.ui.border,
  },
  submitButton: {
    backgroundColor: COLORS.accent.gold,
  },
  cancelButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.ui.text,
    fontWeight: '600',
  },
  submitButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primary.dark,
    fontWeight: 'bold',
  },
  infoBox: {
    marginTop: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: BORDER_RADIUS.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent.gold,
  },
  infoText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.ui.textSecondary,
    lineHeight: 20,
  },
  infoLink: {
    color: COLORS.accent.gold,
    fontWeight: '600',
  },
});
