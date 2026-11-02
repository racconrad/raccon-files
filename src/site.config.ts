// Visual and personal configuration for the portfolio.
import type { Scene } from './data/navigation';

export const site = {
  name: 'raccon-files',
  github: 'https://github.com/racconrad',
  email: '', // 'you@example.com' — empty string hides it
  cv: '', // '/cv.pdf' — empty string hides it

  // Primary color palette. 'text' specifies foreground text color for buttons and bars.
  colors: {
    crimson: { color: '#dc143c', text: '#ffffff' },
    amethyst: { color: '#9966cc', text: '#0d0b0f' },
    bone: { color: '#f2eef4', text: '#0d0b0f' },
    // Sub-colors for accents and secondary scenes.
    rose: { color: '#ff4f73', text: '#0d0b0f' },
    lilac: { color: '#c4a2f0', text: '#0d0b0f' },
  },
  // In light mode, pale tones darken to preserve readability.
  lightColors: {
    crimson: { color: '#b0102f', text: '#ffffff' },
    amethyst: { color: '#6a3c9a', text: '#ffffff' },
    bone: { color: '#141116', text: '#ffffff' },
    rose: { color: '#a8102f', text: '#ffffff' },
    lilac: { color: '#5b2f8a', text: '#ffffff' },
  },
  surfaces: {
    dark: {
      ground: '#0f0d11',
      panel: '#1a171d',
      deep: '#141116',
      ink: '#f2eef4',
      muted: '#a79fad',
      line: '#3a3340',
    },
    light: {
      ground: '#f6f4f7',
      panel: '#ffffff',
      deep: '#ece8ef',
      ink: '#141116',
      muted: '#56505c',
      line: '#c9c2ce',
    },
  },

  // Scene triads: [dominant, secondary, accent] (keys of site.colors).
  sections: {
    home: ['crimson', 'amethyst', 'bone'],
    projects: ['amethyst', 'crimson', 'bone'],
    skills: ['bone', 'crimson', 'amethyst'],
    about: ['rose', 'amethyst', 'bone'],
    journey: ['amethyst', 'rose', 'bone'],
    contact: ['lilac', 'crimson', 'bone'],
  } satisfies Record<Scene, [string, string, string]>,

  border: '2px', // Main border width
  radius: '0px', // Corner radius (0 = square)
  grid: '48px', // Background grid unit
};

export type Tone = keyof typeof site.colors;
