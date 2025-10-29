import axios from 'axios';
import { Message } from '@/types/Story';
import { Character } from '@/types/Character';

export class OpenAIService {
  private apiKey: string;

  constructor(apiKey?: string) {
    // Priorität: 1. Übergebener Key, 2. Environment Variable, 3. Fehler
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';
    
    if (!this.apiKey) {
      throw new Error('OpenAI API Key fehlt. Bitte in .env.local setzen oder über Settings eingeben.');
    }
  }

  async sendMessage(
    messages: Message[],
    character: Character
  ): Promise<string> {
    try {
      const systemPrompt = this.createSystemPrompt(character);
      
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages,
          ],
          temperature: 0.8,
          max_tokens: 500,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `OpenAI API Fehler: ${error.response?.data?.error?.message || error.message}`
        );
      }
      throw error;
    }
  }

  private createSystemPrompt(character: Character): string {
    const abilitiesList = character.abilities
      .map((a) => `- ${a.name}: ${a.description}`)
      .join('\n');

    return `Du bist ${character.name} (${character.nameJapanese}) aus Demon Slayer.

CHARAKTER-PROFIL:
- Titel: ${character.title}
- Typ: ${character.type === 'demon_slayer' ? 'Dämonenjäger' : 'Dämon'}
- Persönlichkeit: ${character.personality}
- Hintergrund: ${character.backstory}
- Sprechstil: ${character.voiceStyle}

FÄHIGKEITEN:
${abilitiesList}

STÄRKEN: ${character.strengths.join(', ')}
SCHWÄCHEN: ${character.weaknesses.join(', ')}

WICHTIGE REGELN:
1. Bleibe IMMER im Charakter von ${character.name}
2. Nutze den beschriebenen Sprechstil konsistent
3. Antworte auf DEUTSCH
4. Erschaffe eine packende Story im Demon Slayer Universum
5. Reagiere auf die Handlungen des Spielers und entwickle die Geschichte weiter
6. Beschreibe Kampfszenen und die Umgebung lebhaft
7. Halte dich an die Persönlichkeit und den Hintergrund des Charakters
8. Erwähne gelegentlich deine Fähigkeiten, wenn sie relevant sind
9. Interagiere mit der Welt und anderen Charakteren aus Demon Slayer

Beginne nun die interaktive Geschichte!`;
  }
}
