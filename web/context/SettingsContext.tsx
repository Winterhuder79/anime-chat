'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Settings } from '@/types/Settings';

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  isLoading: boolean;
}

const defaultSettings: Settings = {
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  useTTS: false,
  ttsProvider: 'browser',
  elevenLabsApiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || '',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load settings from localStorage on mount
    const loadSettings = () => {
      try {
        const stored = localStorage.getItem('demon-slayer-settings');
        if (stored) {
          setSettings(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    
    try {
      localStorage.setItem('demon-slayer-settings', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
