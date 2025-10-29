import { Character } from '../types/Character';
import { ActionCategory, CharacterSpecificAction } from '../types/Actions';

/**
 * Generiert charakterspezifische Aktionen basierend auf der gewählten Kategorie
 */
export class CharacterActionsService {
  /**
   * Gibt 4 charakterspezifische Aktionen für eine Kategorie zurück
   */
  static getActionsForCategory(
    character: Character,
    category: ActionCategory
  ): CharacterSpecificAction[] {
    switch (category) {
      case ActionCategory.FRIENDLY:
        return this.getFriendlyActions(character);
      case ActionCategory.INSULTING:
        return this.getInsultingActions(character);
      case ActionCategory.ATTACK:
        return this.getAttackActions(character);
      case ActionCategory.FLEE:
        return this.getFleeActions(character);
      default:
        return [];
    }
  }

  private static getFriendlyActions(character: Character): CharacterSpecificAction[] {
    const ability1 = character.abilities[0]?.name || 'Technik';
    const ability2 = character.abilities[1]?.name || 'Fähigkeit';

    return [
      {
        id: 'friendly-1',
        text: `Biete Hilfe an`,
        description: `Als ${character.name} biete ich meine Unterstützung an`,
      },
      {
        id: 'friendly-2',
        text: `Erkläre ${ability1}`,
        description: `Erkläre freundlich meine ${ability1}`,
      },
      {
        id: 'friendly-3',
        text: `Teile Weisheit`,
        description: `Gebe einen weisen Rat im Stil von ${character.name}`,
      },
      {
        id: 'friendly-4',
        text: `Stelle mich vor`,
        description: `Stelle mich als ${character.title} vor`,
      },
    ];
  }

  private static getInsultingActions(character: Character): CharacterSpecificAction[] {
    const weakness = character.weaknesses[0] || 'Schwäche';
    
    return [
      {
        id: 'insulting-1',
        text: `Verspotte den Gegner`,
        description: `Verspotte im Stil von ${character.name}`,
      },
      {
        id: 'insulting-2',
        text: `Provoziere zum Kampf`,
        description: `Fordere arrogant heraus`,
      },
      {
        id: 'insulting-3',
        text: `Zeige Verachtung`,
        description: `Zeige tiefe Verachtung für die Schwäche des Gegners`,
      },
      {
        id: 'insulting-4',
        text: `Drohe subtil`,
        description: `Drohe auf charakteristische Art und Weise`,
      },
    ];
  }

  private static getAttackActions(character: Character): CharacterSpecificAction[] {
    const ability1 = character.abilities[0]?.name || 'Erste Technik';
    const ability2 = character.abilities[1]?.name || 'Zweite Technik';
    const ability3 = character.abilities[2]?.name || 'Dritte Technik';
    const strength = character.strengths[0] || 'Kampfkraft';

    return [
      {
        id: 'attack-1',
        text: `${ability1}`,
        description: `Setze ${ability1} ein`,
      },
      {
        id: 'attack-2',
        text: `${ability2}`,
        description: `Verwende ${ability2}`,
      },
      {
        id: 'attack-3',
        text: `${ability3 || 'Kombination'}`,
        description: character.abilities[2] 
          ? `Nutze ${ability3}`
          : `Kombiniere mehrere Techniken`,
      },
      {
        id: 'attack-4',
        text: `Nutze ${strength}`,
        description: `Setze meine Stärke "${strength}" taktisch ein`,
      },
    ];
  }

  private static getFleeActions(character: Character): CharacterSpecificAction[] {
    const ability = character.abilities[0]?.name || 'Fähigkeit';
    
    return [
      {
        id: 'flee-1',
        text: `Strategischer Rückzug`,
        description: `Ziehe mich taktisch zurück und analysiere`,
      },
      {
        id: 'flee-2',
        text: `Ablenkung schaffen`,
        description: `Schaffe Ablenkung um zu entkommen`,
      },
      {
        id: 'flee-3',
        text: `${ability} zur Flucht`,
        description: `Nutze ${ability} um Distanz zu gewinnen`,
      },
      {
        id: 'flee-4',
        text: `Versteck suchen`,
        description: `Suche schnell ein sicheres Versteck`,
      },
    ];
  }
}
