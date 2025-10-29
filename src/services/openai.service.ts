import axios, { AxiosInstance } from 'axios';
import { Character } from '../types/Character';
import { OpenAIMessage, OpenAIRequest, OpenAIResponse } from '../types/Story';

export class OpenAIService {
  private axiosInstance: AxiosInstance;

  constructor(apiKey: string) {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.openai.com/v1',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      timeout: 60000, // 60 Sekunden für längere Antworten
    });
  }

  /**
   * Sendet eine Chat-Anfrage an OpenAI
   */
  async sendChatRequest(
    messages: OpenAIMessage[],
    temperature: number = 0.8,
    maxTokens: number = 500,
  ): Promise<string> {
    try {
      const request: OpenAIRequest = {
        model: 'gpt-4o',
        messages,
        temperature,
        max_tokens: maxTokens,
      };

      console.log('🚀 Sende Anfrage an OpenAI...');
      console.log('📋 Model:', request.model);
      console.log('💬 Nachrichten:', messages.length);
      
      const response = await this.axiosInstance.post<OpenAIResponse>(
        '/chat/completions',
        request,
      );

      const content = response.data.choices[0]?.message?.content;
      if (!content) {
        throw new Error('Keine Antwort von OpenAI erhalten');
      }

      console.log('✅ Antwort von OpenAI erhalten');
      return content;
    } catch (error: unknown) {
      console.error('❌ OpenAI Fehler:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Ungültiger API-Key. Bitte überprüfe deinen OpenAI API-Key.');
        } else if (error.response?.status === 429) {
          throw new Error('Rate Limit erreicht. Bitte warte einen Moment.');
        } else if (error.response?.status === 500) {
          throw new Error('OpenAI Server-Fehler. Bitte versuche es später erneut.');
        } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
          throw new Error('Netzwerkfehler. CORS-Problem im Browser? Versuche die App auf dem Handy mit Expo Go.');
        }
        
        const errorMessage = error.response?.data?.error?.message;
        if (errorMessage) {
          throw new Error(`OpenAI Fehler: ${errorMessage}`);
        }
      }
      
      throw new Error(
        `OpenAI Fehler: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`,
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
   * Generiert eine Beschreibung der User-Action für TTS
   */
  async generateActionDescription(
    character: Character,
    userAction: string,
  ): Promise<string> {
    const messages: OpenAIMessage[] = [
      {
        role: 'system',
        content: `Du bist ein Erzähler für eine Demon Slayer Story-App. 
Beschreibe in 1-2 kurzen Sätzen was ${character.name} gerade tut, basierend auf der Action.
Schreibe auf Deutsch in der dritten Person.
Beispiel: "Tanjiro zieht sein Schwert und konzentriert sich auf den Wasser-Atem."`,
      },
      {
        role: 'user',
        content: `Action: "${userAction}"`,
      },
    ];

    return await this.sendChatRequest(messages, 0.7, 100);
  }

  /**
   * Generiert die Story-Fortsetzung basierend auf User-Input
   */
  async generateStoryResponse(
    character: Character,
    conversationHistory: OpenAIMessage[],
    userAction: string,
    maxTokens: number = 300,
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

    return await this.sendChatRequest(messages, 0.85, maxTokens);
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

  /**
   * Validiert einen API-Key
   */
  async validateApiKey(): Promise<boolean> {
    try {
      const messages: OpenAIMessage[] = [{ role: 'user', content: 'Test' }];
      await this.sendChatRequest(messages, 0.5, 10);
      return true;
    } catch {
      return false;
    }
  }
}
