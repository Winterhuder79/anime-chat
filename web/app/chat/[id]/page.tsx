'use client';

import { CHARACTERS } from '@/constants/characters';
import { Character } from '@/types/Character';
import { Message } from '@/types/Story';
import { useSettings } from '@/context/SettingsContext';
import { OpenAIService } from '@/lib/openai.service';
import { useParams, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const { settings } = useSettings();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const character = CHARACTERS.find(c => c.id === params.id);

  useEffect(() => {
    if (!character) {
      router.push('/');
      return;
    }

    if (!settings.apiKey) {
      router.push('/');
      return;
    }

    // Initial greeting
    if (messages.length === 0) {
      const greeting: Message = {
        role: 'assistant',
        content: `*Du befindest dich im Demon Slayer Universum*\n\n${character.name} erscheint vor dir...\n\nWas möchtest du tun?`,
      };
      setMessages([greeting]);
    }
  }, [character, settings.apiKey, router, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !character) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const openai = new OpenAIService(settings.apiKey);
      const response = await openai.sendMessage(
        [...messages, userMessage],
        character
      );

      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // TTS if enabled
      if (settings.useTTS && settings.ttsProvider === 'browser') {
        speakText(response);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleReset = () => {
    if (confirm('Möchtest du die Konversation wirklich zurücksetzen?')) {
      setMessages([]);
      setError(null);
    }
  };

  if (!character) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black flex flex-col">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-lg border-b border-red-900/30 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                ← Zurück
              </Link>
              <div>
                <h1 className="text-xl font-bold">{character.name}</h1>
                <p className="text-sm text-gray-400">{character.nameJapanese}</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatBubble
                key={index}
                message={message}
                character={character}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-sm border border-red-800/30 rounded-2xl rounded-tl-none px-6 py-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="bg-red-900/20 border border-red-800/50 rounded-xl px-6 py-4 text-red-400">
                ⚠️ {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-black/50 backdrop-blur-lg border-t border-red-900/30 sticky bottom-0">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Schreibe deine Antwort... (Enter zum Senden)"
              className="flex-1 bg-black/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500 resize-none"
              rows={2}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-red-500/50"
            >
              Senden
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ message, character }: { message: Message; character: Character }) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-sm border border-blue-800/30 rounded-2xl rounded-tr-none px-6 py-4 max-w-[80%]">
          <p className="text-white whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-sm border border-red-800/30 rounded-2xl rounded-tl-none px-6 py-4 max-w-[80%]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-semibold text-red-400">{character.name}</span>
        </div>
        <p className="text-white whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
