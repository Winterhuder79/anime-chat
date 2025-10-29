import axios, { AxiosInstance } from 'axios';
import { Character } from '../types/Character';
import { OpenAIMessage } from '../types/Story';

/**
 * OpenAI Service der einen lokalen Proxy verwendet
 * Um CORS-Probleme zu vermeiden
 */
export class OpenAIProxyService {
  private axiosInstance: AxiosInstance;

  constructor(proxyUrl: string = 'http://localhost:3001') {
    this.axiosInstance = axios.create({
      baseURL: proxyUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 60000,
    });
  }

  /**
   * Sendet eine Chat-Anfrage über den Proxy
   */
  async sendChatRequest(
    messages: OpenAIMessage[],
    temperature: number = 0.8,
    maxTokens: number = 500,
  ): Promise<string> {
    try {
      console.log('🚀 Sende Anfrage an Proxy-Server...');
      
      const response = await this.axiosInstance.post('/api/chat', {
        messages,
        temperature,
        max_tokens: maxTokens,
      });

      const content = response.data.content;
      if (!content) {
        throw new Error('Keine Antwort vom Proxy erhalten');
      }

      console.log('✅ Antwort vom Proxy erhalten');
      return content;
    } catch (error: unknown) {
      console.error('❌ Proxy Fehler:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
          throw new Error('Proxy-Server nicht erreichbar. Ist er gestartet? (node proxy-server.js)');
        }
        
        const errorMessage = error.response?.data?.error;
        if (errorMessage) {
          throw new Error(`Proxy Fehler: ${errorMessage}`);
        }
      }
      
      throw new Error(
        `Proxy Fehler: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`,
      );
    }
  }

  /**
   * Generiert eine initiale Situation für den gewählten Charakter
   */
  async generateInitialSituation(character: Character): Promise<string> {
    const systemPrompt = this.buildSystemPrompt(character);
    const userPrompt = `Erstelle eine spannende Ausgangssituation für ${character.name} im Demon Slayer Universum.
Die Situation sollte:
- 2-3 Sätze lang sein
- Action oder Drama enthalten
- Den Charakter vor eine Entscheidung stellen
- Zum Charakter und seiner Geschichte passen
- Auf Deutsch geschrieben sein

Beschreibe nur die Situation, keine Dialoge oder Aktionen.`;

    const messages: OpenAIMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];

    return await this.sendChatRequest(messages, 0.9, 300);
  }

  /**
   * Generiert die Story-Fortsetzung basierend auf User-Input
   */
  async generateStoryResponse(
    character: Character,
    conversationHistory: OpenAIMessage[],
    userAction: string,
  ): Promise<string> {
    const systemPrompt = this.buildSystemPrompt(character);

    const messages: OpenAIMessage[] = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      {
        role: 'user',
        content: `Als ${character.name} sage/tue ich: "${userAction}"`,
      },
    ];

    return await this.sendChatRequest(messages, 0.85, 500);
  }

  /**
   * Erstellt den System-Prompt für einen Charakter
   */
  private buildSystemPrompt(character: Character): string {
    const abilitiesList = character.abilities
      .map(a => `- ${a.name}: ${a.description}`)
      .join('\n');

    return `Du bist ein kreativer Story-Generator für eine interaktive Demon Slayer Rollenspiel-App.

CHARAKTER-KONTEXT:
Name: ${character.name} (${character.nameJapanese})
Titel: ${character.title}
Typ: ${character.type}
Persönlichkeit: ${character.personality}
Hintergrund: ${character.backstory}
Sprechstil: ${character.voiceStyle}

FÄHIGKEITEN:
${abilitiesList}

Stärken: ${character.strengths.join(', ')}
Schwächen: ${character.weaknesses.join(', ')}

DEINE AUFGABE:
Du reagierst auf die Aktionen und Dialoge, die der Spieler für ${character.name} wählt. Der Spieler übernimmt die Rolle von ${character.name}.

WICHTIGE REGELN:
1. Beschreibe, wie die Umgebung, NPCs und Gegner auf die Aktionen des Spielers reagieren
2. Bleibe dem Demon Slayer Universum treu (Setting, Begriffe, Atmosphäre)
3. Der Charakter sollte seine Fähigkeiten logisch einsetzen können, aber nicht übermächtig sein
4. Halte Antworten bei 3-5 Sätzen
5. Schaffe Spannung und Konsequenzen
6. Antworte IMMER auf Deutsch
7. Beschreibe NICHT, was ${character.name} sagt oder tut - das macht der Spieler selbst
8. Beschreibe nur die Reaktionen der Welt/NPCs auf die Aktionen des Spielers
9. Stelle gelegentlich neue Herausforderungen oder Entscheidungen

BEISPIEL:
Spieler-Aktion: "Ich ziehe mein Schwert und bereite den Wasser-Atem vor."
Deine Antwort: "Der Dämon vor dir lacht höhnisch und springt in die Luft. Seine Klauen blitzen im Mondlicht. Dorfbewohner verstecken sich ängstlich in ihren Häusern, während der Wind eisig durch die Gasse pfeift."`;
  }
}
