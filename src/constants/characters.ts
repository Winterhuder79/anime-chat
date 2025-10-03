import {
  Ability,
  BreathingStyle,
  Character,
  CharacterType,
} from '../types/Character';

const tanjiroAbilities: Ability[] = [
  {
    name: 'Hinokami Kagura: Tanzende Sonne',
    description:
      'Eine kraftvolle Sonnen-Atemtechnik mit feurigen Angriffen in kreisenden Bewegungen',
    breathingStyle: BreathingStyle.SUN,
  },
  {
    name: 'Wasser-Atem: Fließender Tanz',
    description: 'Flexible Wasserschläge, die sich an jede Situation anpassen',
    breathingStyle: BreathingStyle.WATER,
  },
  {
    name: 'Geruchssinn',
    description:
      'Außergewöhnlicher Geruchssinn, der Feinde und Emotionen erkennt',
  },
  {
    name: 'Steinharter Kopf',
    description: 'Unglaublich harter Schädel für Kopfstöße',
  },
];

const nezukoAbilities: Ability[] = [
  {
    name: 'Dämonenblut-Kunst: Explosive Flammen',
    description: 'Rosa Flammen, die andere Dämonenblut-Künste verbrennen',
    breathingStyle: BreathingStyle.DEMON_BLOOD,
  },
  {
    name: 'Größenänderung',
    description: 'Kann ihre Körpergröße nach Belieben verändern',
  },
  {
    name: 'Dämonenkraft',
    description: 'Übermenschliche Stärke und Regeneration',
  },
  {
    name: 'Sonnenlicht-Resistenz',
    description: 'Als einziger Dämon immun gegen Sonnenlicht',
  },
];

const zenitsuAbilities: Ability[] = [
  {
    name: 'Donner-Atem, Erste Form: Donnerblitz',
    description: 'Blitzschnelle Bewegung mit verheerender Durchschlagskraft',
    breathingStyle: BreathingStyle.THUNDER,
  },
  {
    name: 'Donner-Atem, Siebte Form: Flammender Donner',
    description: 'Eigene kreierte Form mit mehrfachen Blitzschlägen',
    breathingStyle: BreathingStyle.THUNDER,
  },
  {
    name: 'Gehör',
    description: 'Übernatürliches Gehör zur Feindortung',
  },
  {
    name: 'Schlaf-Kampfmodus',
    description: 'Wird im Schlaf zum furchtlosen Krieger',
  },
];

const inosukeAbilities: Ability[] = [
  {
    name: 'Bestien-Atem: Fang',
    description: 'Wilde, instinktive Angriffe mit zwei Schwertern',
    breathingStyle: BreathingStyle.BEAST,
  },
  {
    name: 'Räumliche Wahrnehmung',
    description: 'Spürt Gegner durch Berührung und Vibrationen',
  },
  {
    name: 'Flexible Gelenke',
    description: 'Kann Gelenke verschieben für unmögliche Bewegungen',
  },
  {
    name: 'Wildnis-Überleben',
    description: 'Im Wald aufgewachsen, extrem anpassungsfähig',
  },
];

const giyuAbilities: Ability[] = [
  {
    name: 'Wasser-Atem, Elfte Form: Ruhiger Ozean',
    description: 'Eigene Form mit absoluter Verteidigung',
    breathingStyle: BreathingStyle.WATER,
  },
  {
    name: 'Wasser-Atem, Zehnte Form: Konstanter Fluss',
    description: 'Fließende Angriffe ohne Unterbrechung',
    breathingStyle: BreathingStyle.WATER,
  },
  {
    name: 'Hashira-Level',
    description: 'Meister-Schwertkämpfer auf höchstem Niveau',
  },
  {
    name: 'Kühler Kopf',
    description: 'Behält auch in Extremsituationen die Ruhe',
  },
];

const shinobuAbilities: Ability[] = [
  {
    name: 'Insekten-Atem: Schmetterlings-Tanz',
    description: 'Schnelle, präzise Stiche mit vergifteter Klinge',
    breathingStyle: BreathingStyle.INSECT,
  },
  {
    name: 'Wisteria-Gift',
    description: 'Spezielles Gift, tödlich für Dämonen',
  },
  {
    name: 'Geschwindigkeit',
    description: 'Extrem schnelle und agile Bewegungen',
  },
  {
    name: 'Medizinwissen',
    description: 'Expertin in Gifte und Heilmittel',
  },
];

const rengokuAbilities: Ability[] = [
  {
    name: 'Flammen-Atem, Neunte Form: Purgatorio',
    description: 'Mächtigster Flammenangriff mit voller Kraft',
    breathingStyle: BreathingStyle.FLAME,
  },
  {
    name: 'Flammen-Atem, Erste Form: Unbekanntes Feuer',
    description: 'Einzelner, durchschlagender Feuerschlag',
    breathingStyle: BreathingStyle.FLAME,
  },
  {
    name: 'Unbeugsamer Wille',
    description: 'Kämpft weiter, selbst bei tödlichen Verletzungen',
  },
  {
    name: 'Flammen-Hashira',
    description: 'Meister des Flammen-Atems',
  },
];

const muzanAbilities: Ability[] = [
  {
    name: 'Dämonenblut-Kunst: Schwarze Blut',
    description: 'Verwandelt Körperteile in tödliche Klingen und Tentakel',
    breathingStyle: BreathingStyle.DEMON_BLOOD,
  },
  {
    name: 'Totale Regeneration',
    description: 'Heilt jede Wunde fast augenblicklich',
  },
  {
    name: 'Dämonenkontrolle',
    description: 'Kann alle Dämonen mit seinem Blut kontrollieren',
  },
  {
    name: 'Sieben Herzen',
    description: 'Besitzt sieben Herzen und fünf Gehirne',
  },
  {
    name: 'Formwandlung',
    description: 'Kann Aussehen und Geschlecht beliebig ändern',
  },
];

const akazaAbilities: Ability[] = [
  {
    name: 'Destruktiver Tod: Kompass-Nadel',
    description: 'Spürt Kampfgeist und Bewegungen des Gegners',
    breathingStyle: BreathingStyle.DEMON_BLOOD,
  },
  {
    name: 'Destruktiver Tod: Lufttyp',
    description: 'Schockwellen-Angriffe aus der Distanz',
    breathingStyle: BreathingStyle.DEMON_BLOOD,
  },
  {
    name: 'Kampfkunst-Meister',
    description: 'Experte im unbewaffneten Nahkampf',
  },
  {
    name: 'Kampflust',
    description: 'Wird stärker gegen starke Gegner',
  },
];

const dakiAbilities: Ability[] = [
  {
    name: 'Obi-Manipulation',
    description: 'Kontrolliert tödliche Stoffbänder als Waffen',
    breathingStyle: BreathingStyle.DEMON_BLOOD,
  },
  {
    name: 'Schönheit',
    description: 'Hypnotische Schönheit zur Ablenkung',
  },
  {
    name: 'Verstecken',
    description: 'Kann sich in Obi-Bändern verstecken',
  },
];

const gyutaroAbilities: Ability[] = [
  {
    name: 'Drehende Blutsicheln',
    description: 'Vergiftete Blutsicheln als Projektile',
    breathingStyle: BreathingStyle.DEMON_BLOOD,
  },
  {
    name: 'Tödliches Gift',
    description: 'Hochgiftiges Dämonenblut in Waffen',
  },
  {
    name: 'Geschwindigkeit',
    description: 'Extrem schnelle Reflexe und Bewegungen',
  },
  {
    name: 'Geschwister-Symbiose',
    description: 'Teilt Leben mit Daki, beide müssen sterben',
  },
];

const enmuAbilities: Ability[] = [
  {
    name: 'Zwangsschlaf',
    description: 'Versetzt Opfer in tiefen Schlaf',
    breathingStyle: BreathingStyle.DEMON_BLOOD,
  },
  {
    name: 'Traummanipulation',
    description: 'Kontrolliert und verändert Träume',
  },
  {
    name: 'Verschmelzung',
    description: 'Kann mit Objekten (z.B. Zügen) verschmelzen',
  },
  {
    name: 'Alpträume',
    description: 'Erschafft grauenhafte Alpträume',
  },
];

export const HEROES: Character[] = [
  {
    id: 'tanjiro',
    name: 'Tanjiro Kamado',
    nameJapanese: '竈門炭治郎',
    type: CharacterType.HERO,
    title: 'Der Träger des Sonnen-Atems',
    personality:
      'Freundlich, mitfühlend, entschlossen. Sieht das Gute in jedem, auch in Dämonen. Beschützt seine Schwester über alles.',
    backstory:
      'Seine Familie wurde von Dämonen getötet, nur Nezuko überlebte als Dämon. Trainiert als Dämonenjäger, um sie zu heilen.',
    abilities: tanjiroAbilities,
    voiceStyle:
      'Spricht höflich und respektvoll, aber bestimmt wenn es um seine Überzeugungen geht',
    strengths: [
      'Starker Wille',
      'Empathie',
      'Anpassungsfähigkeit',
      'Außergewöhnlicher Geruchssinn',
    ],
    weaknesses: [
      'Manchmal zu nachsichtig',
      'Überbeschützend gegenüber Nezuko',
      'Physisch nicht der Stärkste',
    ],
  },
  {
    id: 'nezuko',
    name: 'Nezuko Kamado',
    nameJapanese: '竈門禰豆子',
    type: CharacterType.HERO,
    title: 'Der Dämon, der die Sonne eroberte',
    personality:
      'Als Dämon meist non-verbal, beschützend gegenüber Menschen. Liebt ihren Bruder über alles.',
    backstory:
      'Wurde von Muzan in einen Dämon verwandelt, behielt aber ihre Menschlichkeit. Kämpft gegen ihre Dämonennatur.',
    abilities: nezukoAbilities,
    voiceStyle:
      'Kommuniziert meist durch "Hmm!" und Laute, kämpft instinktiv aber beschützend',
    strengths: [
      'Einzigartige Dämonenkraft',
      'Sonnenlicht-Immunität',
      'Beschützerinstinkt',
      'Selbstkontrolle',
    ],
    weaknesses: [
      'Kann nicht sprechen',
      'Hunger nach Menschenblut',
      'Bambusknebel limitiert Bisse',
    ],
  },
  {
    id: 'zenitsu',
    name: 'Zenitsu Agatsuma',
    nameJapanese: '我妻善逸',
    type: CharacterType.HERO,
    title: 'Der Donnerblitz',
    personality:
      'Ängstlich und oft panisch, aber beschützend. Verliebt sich schnell. Im Schlaf furchtlos.',
    backstory:
      'Von seinem Meister Jigoro Kuwajima trainiert. Meistert nur die erste Form, perfektioniert sie aber.',
    abilities: zenitsuAbilities,
    voiceStyle:
      'Jammert und schreit oft, im Kampf (schlafend) fokussiert und ernst',
    strengths: [
      'Blitzschnelle Geschwindigkeit',
      'Übernatürliches Gehör',
      'Perfektionierte erste Form',
      'Loyalität',
    ],
    weaknesses: [
      'Extrem ängstlich',
      'Geringes Selbstvertrauen',
      'Kämpft nur im Schlaf effektiv',
    ],
  },
  {
    id: 'inosuke',
    name: 'Inosuke Hashibira',
    nameJapanese: '嘴平伊之助',
    type: CharacterType.HERO,
    title: 'Der König der Berge',
    personality:
      'Wild, kampflustig, aggressiv. Unter der rauen Schale aber loyal und liebevoll.',
    backstory:
      'Im Wald von Wildschweinen aufgezogen. Lernte Schwertkampf durch Beobachtung und Instinkt.',
    abilities: inosukeAbilities,
    voiceStyle:
      'Laut, rau, herausfordernd. Schreit oft und prahlt mit seiner Stärke',
    strengths: [
      'Rohe Kraft',
      'Kampfinstinkt',
      'Flexibilität',
      'Furchtlosigkeit',
    ],
    weaknesses: ['Ungestüm', 'Mangelnde Bildung', 'Überschätzt sich oft'],
  },
  {
    id: 'giyu',
    name: 'Giyu Tomioka',
    nameJapanese: '冨岡義勇',
    type: CharacterType.HERO,
    title: 'Wasser-Hashira',
    personality:
      'Ruhig, stoisch, distanziert. Tief im Inneren aber fürsorglich und schuldgeplagt.',
    backstory:
      'Verlor seine Schwester an Dämonen. Fühlt sich nicht würdig, ein Hashira zu sein.',
    abilities: giyuAbilities,
    voiceStyle:
      'Spricht wenig, direkt und ohne Emotion. Kurze, prägnante Sätze',
    strengths: [
      'Hashira-Level Stärke',
      'Ruhig unter Druck',
      'Meister des Wasser-Atems',
      'Taktiker',
    ],
    weaknesses: [
      'Emotional verschlossen',
      'Schuldkomplex',
      'Schwer zugänglich',
    ],
  },
  {
    id: 'shinobu',
    name: 'Shinobu Kocho',
    nameJapanese: '胡蝶しのぶ',
    type: CharacterType.HERO,
    title: 'Insekten-Hashira',
    personality:
      'Freundliches, lächelndes Äußeres. Verbirgt Wut und Rachegefühle gegen Dämonen.',
    backstory:
      'Ihre Schwester Kanae wurde von einem Dämon getötet. Nutzt Gift statt Kraft.',
    abilities: shinobuAbilities,
    voiceStyle:
      'Sanft und höflich mit leicht sadistischem Unterton bei Dämonen',
    strengths: [
      'Giftexpertin',
      'Extrem schnell',
      'Intelligente Kämpferin',
      'Medizinwissen',
    ],
    weaknesses: [
      'Körperlich schwach',
      'Kann Dämonenköpfe nicht abschneiden',
      'Rachegefühle',
    ],
  },
  {
    id: 'rengoku',
    name: 'Kyojuro Rengoku',
    nameJapanese: '煉獄杏寿郎',
    type: CharacterType.HERO,
    title: 'Flammen-Hashira',
    personality:
      'Enthusiastisch, laut, optimistisch. Starker Gerechtigkeitssinn und Beschützerinstinkt.',
    backstory:
      'Stammt aus Hashira-Familie. Trainierte sich selbst durch Bücher zum Meister.',
    abilities: rengokuAbilities,
    voiceStyle:
      'Laut, enthusiastisch, ruft oft "UMAI!" (lecker). Spricht mit Leidenschaft',
    strengths: [
      'Unglaubliche Willenskraft',
      'Flammen-Atem Meister',
      'Inspirierend',
      'Selbstlos',
    ],
    weaknesses: [
      'Manchmal zu selbstlos',
      'Stur in Überzeugungen',
      'Unterschätzt Gefahren',
    ],
  },
];

export const DEMONS: Character[] = [
  {
    id: 'muzan',
    name: 'Muzan Kibutsuji',
    nameJapanese: '鬼舞辻無惨',
    type: CharacterType.DEMON,
    title: 'Dämonenkönig',
    personality:
      'Kalt, grausam, narzisstisch. Besessen von Perfektion und Unsterblichkeit.',
    backstory:
      'Der erste und mächtigste Dämon. Erschuf alle anderen Dämonen mit seinem Blut.',
    abilities: muzanAbilities,
    voiceStyle: 'Kalt, arrogant, bedrohlich. Spricht mit absoluter Autorität',
    strengths: [
      'Nahezu unbesiegbar',
      'Kontrolle über alle Dämonen',
      'Mehrere Organe',
      'Formwandlung',
    ],
    weaknesses: ['Sonnenlicht', 'Wisteria-Gift', 'Arroganz', 'Paranoia'],
  },
  {
    id: 'akaza',
    name: 'Akaza',
    nameJapanese: '猗窩座',
    type: CharacterType.DEMON,
    title: 'Oberer Mond Drei',
    personality:
      'Kampfbegeistert, respektvoll gegenüber Kriegern. Verachtet Schwäche.',
    backstory:
      'War einst ein Mensch, der für seine kranke Verlobte kämpfte. Vergaß seine Menschlichkeit.',
    abilities: akazaAbilities,
    voiceStyle:
      'Respektvoll aber fordernd. Bietet starken Gegnern Dämonenwerdung an',
    strengths: [
      'Kampfkunst-Experte',
      'Kampfgeist-Sensor',
      'Extrem stark',
      'Regeneration',
    ],
    weaknesses: [
      'Kann Frauen nicht töten',
      'Verdrängte Erinnerungen',
      'Obsession mit Stärke',
    ],
  },
  {
    id: 'daki',
    name: 'Daki',
    nameJapanese: '堕姫',
    type: CharacterType.DEMON,
    title: 'Oberer Mond Sechs (mit Gyutaro)',
    personality:
      'Eitel, grausam, verwöhnt. Tief emotional abhängig von ihrem Bruder.',
    backstory:
      'Im Vergnügungsviertel als Mensch lebendig verbrannt, von Muzan gerettet.',
    abilities: dakiAbilities,
    voiceStyle: 'Hochnäsig, kapriziös. Schreit wenn wütend, weint schnell',
    strengths: [
      'Obi-Kontrolle',
      'Schönheit als Waffe',
      'Verstecken in Obi',
      'Mit Gyutaro unbesiegbar',
    ],
    weaknesses: [
      'Abhängig von Gyutaro',
      'Eitel und leicht ablenkbar',
      'Emotional instabil',
    ],
  },
  {
    id: 'gyutaro',
    name: 'Gyutaro',
    nameJapanese: '妓夫太郎',
    type: CharacterType.DEMON,
    title: 'Oberer Mond Sechs (mit Daki)',
    personality:
      'Verbittert, rachsüchtig, beschützend gegenüber Daki. Hasst die Schönen und Privilegierten.',
    backstory:
      'Lebte im Elend, beschützte seine Schwester bis zum Tod. Von Muzan zu Dämon gemacht.',
    abilities: gyutaroAbilities,
    voiceStyle: 'Kratzig, hasserfüllt, verbittert. Wird sanfter bei Daki',
    strengths: [
      'Tödliches Gift',
      'Kampferfahrung',
      'Geschwister-Symbiose',
      'Überraschungsangriffe',
    ],
    weaknesses: [
      'Minderwertigkeitskomplex',
      'Muss mit Daki sterben',
      'Emotional durch Daki manipulierbar',
    ],
  },
  {
    id: 'enmu',
    name: 'Enmu',
    nameJapanese: '魘夢',
    type: CharacterType.DEMON,
    title: 'Unterer Mond Eins',
    personality:
      'Sadistisch, masochistisch, genießt Leiden anderer. Loyal zu Muzan.',
    backstory:
      'Von Muzan zum mächtigsten Unteren Mond gemacht. Obsession mit Albträumen.',
    abilities: enmuAbilities,
    voiceStyle: 'Sanft, fast flüsternd, gruselig höflich. Genießt Qual anderer',
    strengths: [
      'Traummanipulation',
      'Schwer zu bekämpfen',
      'Verschmelzung mit Objekten',
      'Mental-Angriffe',
    ],
    weaknesses: [
      'Physisch schwächer',
      'Übermut',
      'Abhängig von Schlaf-Induktion',
    ],
  },
];

export const ALL_CHARACTERS: Character[] = [...HEROES, ...DEMONS];
