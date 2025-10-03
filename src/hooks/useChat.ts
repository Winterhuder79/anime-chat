import { useCallback, useRef, useState } from 'react';
import { OpenAIService } from '../services/openai.service';
import { Character } from '../types/Character';
import { ChatMessage, MessageRole, OpenAIMessage } from '../types/Story';

interface UseChatProps {
  character: Character;
  apiKey: string;
}

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (userInput: string) => Promise<void>;
  resetChat: () => void;
  initialSituation: string | null;
  initializeStory: () => Promise<void>;
}

export const useChat = ({ character, apiKey }: UseChatProps): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialSituation, setInitialSituation] = useState<string | null>(null);

  const openAIService = useRef<OpenAIService>(new OpenAIService(apiKey));
  const messageIdCounter = useRef(0);

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
      const situation =
        await openAIService.current.generateInitialSituation(character);
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
    async (userInput: string) => {
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

      setMessages(prev => [...prev, userMessage]);

      try {
        // Konvertiere Chat-Historie zu OpenAI-Format
        const conversationHistory: OpenAIMessage[] = messages.map(msg => ({
          role:
            msg.role === MessageRole.SYSTEM
              ? 'system'
              : msg.role === MessageRole.USER
                ? 'user'
                : 'assistant',
          content: msg.content,
        }));

        // Hole KI-Antwort
        const aiResponse = await openAIService.current.generateStoryResponse(
          character,
          conversationHistory,
          userInput,
        );

        // Füge AI-Message hinzu
        const assistantMessage: ChatMessage = {
          id: generateMessageId(),
          role: MessageRole.ASSISTANT,
          content: aiResponse,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Fehler beim Senden der Nachricht';
        setError(errorMessage);

        // Entferne die User-Message bei Fehler
        setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
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
