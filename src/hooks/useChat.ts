import { useCallback, useRef, useState } from 'react';
import { OpenAIService } from '../services/openai.service';
import { Character } from '../types/Character';
import { ChatMessage, MessageRole, OpenAIMessage } from '../types/Story';
import { useSettings } from '../context/SettingsContext';

interface UseChatProps {
  character: Character;
  apiKey: string;
}

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (userInput: string, isAction?: boolean) => Promise<void>;
  resetChat: () => void;
  initialSituation: string | null;
  initializeStory: () => Promise<void>;
}

export const useChat = ({ character, apiKey }: UseChatProps): UseChatReturn => {
  const { settings } = useSettings();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialSituation, setInitialSituation] = useState<string | null>(null);

  const openAIService = useRef<OpenAIService>(new OpenAIService(apiKey));
  const messageIdCounter = useRef(0);
  
  // ✅ Service neu erstellen wenn apiKey sich ändert
  if (openAIService.current) {
    openAIService.current = new OpenAIService(apiKey);
  }

  const generateMessageId = useCallback(() => {
    messageIdCounter.current += 1;
    return `msg-${messageIdCounter.current}-${Date.now()}`;
  }, []);

  /**
   * Initialisiert die Story mit einer Ausgangssituation
   */
  const initializeStory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const situation = await openAIService.current.generateInitialSituation(
        character,
      );
      setInitialSituation(situation);

      // Füge initiale Situation als System-Message hinzu
      const systemMessage: ChatMessage = {
        id: generateMessageId(),
        role: MessageRole.SYSTEM,
        content: situation,
        timestamp: new Date(),
      };

      setMessages([systemMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Fehler beim Laden der Story';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [character, generateMessageId]);

  /**
   * Sendet eine User-Nachricht und erhält KI-Antwort
   */
  const sendMessage = useCallback(
    async (userInput: string, isAction: boolean = false) => {
      if (!userInput.trim() || isLoading) {
        return;
      }

      setIsLoading(true);
      setError(null);

      // Füge User-Message hinzu
      const userMessage: ChatMessage = {
        id: generateMessageId(),
        role: MessageRole.USER,
        content: userInput,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      // Wenn es eine Action ist, beschreibe sie mit der KI für TTS
      if (isAction) {
        try {
          const actionDescription = await openAIService.current.generateActionDescription(
            character,
            userInput
          );
          
          // Füge beschreibende Message hinzu (wird vorgelesen)
          const actionDescriptionMessage: ChatMessage = {
            id: generateMessageId(),
            role: MessageRole.ASSISTANT,
            content: actionDescription,
            timestamp: new Date(),
          };
          
          setMessages((prev) => [...prev, actionDescriptionMessage]);
          
          // WICHTIG: Warte bis TTS fertig ist (ca. 100ms pro Zeichen + Buffer)
          const estimatedDuration = actionDescription.length * 100 + 1000;
          console.log(`⏳ Warte ${estimatedDuration}ms bis Action-TTS fertig ist...`);
          await new Promise(resolve => setTimeout(resolve, estimatedDuration));
          console.log('✅ Action-TTS sollte fertig sein, generiere Story-Antwort...');
        } catch (err) {
          console.error('Fehler beim Generieren der Action-Beschreibung:', err);
        }
      }

      try {
        // Konvertiere Chat-Historie zu OpenAI-Format
        const conversationHistory: OpenAIMessage[] = messages.map((msg) => ({
          role: msg.role === MessageRole.SYSTEM ? 'system' : msg.role === MessageRole.USER ? 'user' : 'assistant',
          content: msg.content,
        }));

        // Hole KI-Antwort mit maxTokens aus Settings
        const aiResponse = await openAIService.current.generateStoryResponse(
          character,
          conversationHistory,
          userInput,
          settings.story.maxTokens,
        );

        // Füge AI-Message hinzu
        const assistantMessage: ChatMessage = {
          id: generateMessageId(),
          role: MessageRole.ASSISTANT,
          content: aiResponse,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Fehler beim Senden der Nachricht';
        setError(errorMessage);

        // Entferne die User-Message bei Fehler
        setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, character, generateMessageId],
  );

  /**
   * Setzt den Chat zurück
   */
  const resetChat = useCallback(() => {
    setMessages([]);
    setInitialSituation(null);
    setError(null);
    messageIdCounter.current = 0;
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    resetChat,
    initialSituation,
    initializeStory,
  };
};
