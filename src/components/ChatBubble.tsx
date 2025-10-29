import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ChatMessage, MessageRole } from '../types/Story';
import { useTTS } from '../hooks/useTTS';

interface ChatBubbleProps {
  message: ChatMessage;
  characterName?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;
  const isSystem = message.role === MessageRole.SYSTEM;

  // Auto-Play für alle nicht-User Nachrichten
  const { speak, stop, isSpeaking, currentUtterance } = useTTS({
    text: message.content,
    autoPlay: !isUser, // Nur KI und System-Nachrichten
    messageId: message.id,
  });

  // Prüfe ob DIESE Message gerade spricht
  const isThisMessageSpeaking = isSpeaking && currentUtterance === message.content;

  const handleSpeakerPress = async () => {
    if (isThisMessageSpeaking) {
      // Unterbreche die Wiedergabe
      await stop();
    } else {
      // Starte die Wiedergabe von vorne
      await speak();
    }
  };

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.aiContainer,
        isSystem && styles.systemContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.aiBubble,
          isSystem && styles.systemBubble,
        ]}
      >
        {/* Label für System/AI Nachrichten */}
        {!isUser && (
          <Text style={styles.label}>
            {isSystem ? '📜 Situation' : '🌍 Umgebung'}
          </Text>
        )}

        {/* Nachricht Content */}
        <Text
          style={[
            styles.text,
            isUser ? styles.userText : styles.aiText,
            isSystem && styles.systemText,
          ]}
        >
          {message.content}
        </Text>

        {/* Footer: Speaker Button + Timestamp */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.speakerButton}
            onPress={handleSpeakerPress}
          >
            <Text style={styles.speakerIcon}>
              {isThisMessageSpeaking ? '⏸️' : '🔊'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.timestamp}>
            {message.timestamp.toLocaleTimeString('de-DE', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  aiContainer: {
    justifyContent: 'flex-start',
  },
  systemContainer: {
    justifyContent: 'center',
  },
  bubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  userBubble: {
    backgroundColor: '#1976d2',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#424242',
    borderBottomLeftRadius: 4,
  },
  systemBubble: {
    backgroundColor: '#37474f',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#546e7a',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#b0bec5',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
  },
  userText: {
    color: '#ffffff',
  },
  aiText: {
    color: '#e0e0e0',
  },
  systemText: {
    color: '#ffffff',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  speakerButton: {
    padding: 4,
  },
  speakerIcon: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 11,
    color: '#90a4ae',
  },
});
