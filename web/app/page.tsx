'use client';

import { CHARACTERS } from '@/constants/characters';
import { Character } from '@/types/Character';
import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';
import { useState } from 'react';

export default function Home() {
  const { settings, updateSettings } = useSettings();
  // Zeige API-Key Input nur wenn kein ENV-Key und kein gespeicherter Key vorhanden
  const hasEnvKey = !!process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  const [showApiKeyInput, setShowApiKeyInput] = useState(!settings.apiKey && !hasEnvKey);

  const handleApiKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const apiKey = formData.get('apiKey') as string;
    
    if (apiKey.trim()) {
      updateSettings({ apiKey: apiKey.trim() });
      setShowApiKeyInput(false);
    }
  };

  const demonSlayers = CHARACTERS.filter(c => c.type === 'demon_slayer');
  const demons = CHARACTERS.filter(c => c.type === 'demon');

  if (showApiKeyInput) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-black/80 backdrop-blur-lg border border-red-900/30 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            🗡️ Demon Slayer Chat
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Interaktive Story im Demon Slayer Universum
          </p>

          <form onSubmit={handleApiKeySubmit} className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-2">
                OpenAI API Key
              </label>
              <input
                type="password"
                id="apiKey"
                name="apiKey"
                placeholder="sk-..."
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                required
              />
              <p className="mt-2 text-xs text-gray-500">
                Dein API-Key wird lokal in deinem Browser gespeichert
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-red-500/50"
            >
              Starten
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-500 text-center">
              Du benötigst einen OpenAI API Key um zu spielen.{' '}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 underline"
              >
                Hier erstellen
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            🗡️ Demon Slayer Chat
          </h1>
          <p className="text-xl text-gray-400">
            Wähle deinen Charakter und erlebe eine einzigartige Story
          </p>
          <button
            onClick={() => setShowApiKeyInput(true)}
            className="mt-4 text-sm text-gray-500 hover:text-red-500 underline"
          >
            API-Key ändern
          </button>
        </div>

        {/* Demon Slayers */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-400">
            ⚔️ Dämonenjäger
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demonSlayers.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </section>

        {/* Demons */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-red-400">
            👹 Dämonen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demons.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function CharacterCard({ character }: { character: Character }) {
  const bgColor = character.type === 'demon_slayer' 
    ? 'from-blue-900/20 to-cyan-900/20 border-blue-800/30' 
    : 'from-red-900/20 to-orange-900/20 border-red-800/30';

  return (
    <Link
      href={`/chat/${character.id}`}
      className={`group bg-gradient-to-br ${bgColor} backdrop-blur-sm border rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-${character.type === 'demon_slayer' ? 'blue' : 'red'}-500/20`}
    >
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-orange-500 group-hover:bg-clip-text transition-all">
          {character.name}
        </h3>
        <p className="text-gray-400 text-sm">{character.nameJapanese}</p>
        <p className="text-sm mt-2 text-gray-300 italic">{character.title}</p>
      </div>

      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
        {character.personality}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {character.abilities.slice(0, 3).map((ability, idx) => (
          <span
            key={idx}
            className="text-xs px-3 py-1 rounded-full bg-black/40 border border-gray-700 text-gray-300"
          >
            {ability.name.split(':')[0]}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {character.abilities.length} Fähigkeiten
        </span>
        <span className="text-red-500 group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
    </Link>
  );
}
