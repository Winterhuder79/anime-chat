import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  // Demon Slayer inspired colors
  primary: {
    dark: '#1a0a0a',
    medium: '#2d1515',
    light: '#4a2020',
  },
  accent: {
    red: '#ff1744',
    darkRed: '#c51f3d',
    orange: '#ff6f00',
    gold: '#ffd700',
  },
  hero: {
    tanjiro: '#8b0000',
    nezuko: '#ff69b4',
    zenitsu: '#ffd700',
    inosuke: '#2e7d32',
    giyu: '#1976d2',
    shinobu: '#9c27b0',
    rengoku: '#ff5722',
  },
  demon: {
    muzan: '#4a0000',
    akaza: '#ff1744',
    daki: '#e91e63',
    gyutaro: '#4caf50',
    enmu: '#9c27b0',
  },
  ui: {
    background: '#0a0a0a',
    surface: '#1a1a1a',
    surfaceLight: '#2a2a2a',
    border: '#333333',
    text: '#ffffff',
    textSecondary: '#b0bec5',
    textTertiary: '#9e9e9e',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  },
  gradient: {
    hero: ['#1a237e', '#4a148c', '#880e4f'],
    demon: ['#4a0000', '#1a0a0a', '#000000'],
    primary: ['#1a0a0a', '#2d1515', '#4a2020'],
  },
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 22,
    title: 26,
    heading: 34,
    display: 42,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  round: 999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  }),
};

export const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
};

export const LAYOUT = {
  width,
  height,
  isSmallDevice: width < 375,
  isMediumDevice: width >= 375 && width < 768,
  isLargeDevice: width >= 768,
};

export const ANIMATIONS = {
  spring: {
    type: 'spring',
    damping: 20,
    stiffness: 90,
  },
  timing: {
    duration: 300,
  },
};

export const CHARACTER_EMOJIS = {
  tanjiro: '🔥',
  nezuko: '🎀',
  zenitsu: '⚡',
  inosuke: '🐗',
  giyu: '💧',
  shinobu: '🦋',
  rengoku: '🔥',
  muzan: '👹',
  akaza: '💀',
  daki: '👘',
  gyutaro: '🗡️',
  enmu: '😴',
};
