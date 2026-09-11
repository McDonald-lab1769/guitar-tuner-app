// Comprehensive tuning database
export const TUNINGS = [
  // Standard Tunings (Free)
  {
    id: 'standard',
    name: 'Standard',
    description: 'Classic E-A-D-G-B-E tuning',
    notes: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
    frequencies: [82.41, 110.0, 146.83, 196.0, 246.94, 329.63],
    category: 'Standard',
    free: true,
  },
  {
    id: 'dropd',
    name: 'Drop D',
    description: 'Lower the low E to D',
    notes: ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'],
    frequencies: [73.42, 110.0, 146.83, 196.0, 246.94, 329.63],
    category: 'Standard',
    free: true,
  },
  {
    id: 'halfstepdown',
    name: 'Half Step Down',
    description: 'Lower all strings by half step',
    notes: ['D#2', 'G#2', 'C#3', 'F#3', 'A#3', 'D#4'],
    frequencies: [77.78, 103.83, 138.59, 185.0, 233.08, 311.13],
    category: 'Standard',
    premium: true,
  },
  {
    id: 'fullstepdown',
    name: 'Full Step Down',
    description: 'Lower all strings by full step',
    notes: ['D2', 'G2', 'C3', 'F3', 'A3', 'D4'],
    frequencies: [73.42, 98.0, 130.81, 174.61, 220.0, 293.66],
    category: 'Standard',
    premium: true,
  },
  {
    id: 'openG',
    name: 'Open G',
    description: 'D-G-D-G-B-D - Great for slide guitar',
    notes: ['D2', 'G2', 'D3', 'G3', 'B3', 'D4'],
    frequencies: [73.42, 98.0, 146.83, 196.0, 246.94, 293.66],
    category: 'Open',
    premium: true,
  },
  {
    id: 'openD',
    name: 'Open D',
    description: 'D-A-D-F#-A-D - Resonant open tuning',
    notes: ['D2', 'A2', 'D3', 'F#3', 'A3', 'D4'],
    frequencies: [73.42, 110.0, 146.83, 185.0, 220.0, 293.66],
    category: 'Open',
    premium: true,
  },
  {
    id: 'openA',
    name: 'Open A',
    description: 'E-A-E-A-C#-E - Bright and jangly',
    notes: ['E2', 'A2', 'E3', 'A3', 'C#4', 'E4'],
    frequencies: [82.41, 110.0, 164.81, 220.0, 277.18, 329.63],
    category: 'Open',
    premium: true,
  },
  {
    id: 'openE',
    name: 'Open E',
    description: 'E-B-E-G#-B-E - Powerful and resonant',
    notes: ['E2', 'B2', 'E3', 'G#3', 'B3', 'E4'],
    frequencies: [82.41, 123.47, 164.81, 207.65, 246.94, 329.63],
    category: 'Open',
    premium: true,
  },
  {
    id: 'dadgad',
    name: 'DADGAD',
    description: 'D-A-D-G-A-D - Celtic and fingerstyle',
    notes: ['D2', 'A2', 'D3', 'G3', 'A3', 'D4'],
    frequencies: [73.42, 110.0, 146.83, 196.0, 220.0, 293.66],
    category: 'Modal',
    premium: true,
  },
  {
    id: 'leadbelly',
    name: 'Leadbelly',
    description: 'D-G-D-F#-A-D - Blues and folk',
    notes: ['D2', 'G2', 'D3', 'F#3', 'A3', 'D4'],
    frequencies: [73.42, 98.0, 146.83, 185.0, 220.0, 293.66],
    category: 'Open',
    premium: true,
  },
  {
    id: 'lowc',
    name: 'Low C',
    description: 'C-G-C-G-C-E - Deep and dark',
    notes: ['C2', 'G2', 'C3', 'G3', 'C4', 'E4'],
    frequencies: [65.41, 98.0, 130.81, 196.0, 261.63, 329.63],
    category: 'Alternative',
    premium: true,
  },
  {
    id: 'doubledrop',
    name: 'Double Drop D',
    description: 'D-A-D-G-B-D - Heavy bottom end',
    notes: ['D2', 'A2', 'D3', 'G3', 'B3', 'D4'],
    frequencies: [73.42, 110.0, 146.83, 196.0, 246.94, 293.66],
    category: 'Alternative',
    premium: true,
  },
  {
    id: 'overtone',
    name: 'Overtone',
    description: 'D-A-D-G-A-C# - Harmonic focus',
    notes: ['D2', 'A2', 'D3', 'G3', 'A3', 'C#4'],
    frequencies: [73.42, 110.0, 146.83, 196.0, 220.0, 277.18],
    category: 'Modal',
    premium: true,
  },
  {
    id: 'fourths',
    name: 'All Fourths',
    description: 'E-A-D-G-C-F - Jazz and experimental',
    notes: ['E2', 'A2', 'D3', 'G3', 'C4', 'F4'],
    frequencies: [82.41, 110.0, 146.83, 196.0, 261.63, 349.23],
    category: 'Interval',
    premium: true,
  },
  {
    id: 'newportfolk',
    name: 'Newport Folk',
    description: 'E-B-E-G#-B-E - Light and open',
    notes: ['E2', 'B2', 'E3', 'G#3', 'B3', 'E4'],
    frequencies: [82.41, 123.47, 164.81, 207.65, 246.94, 329.63],
    category: 'Open',
    premium: true,
  },
];

export const TUNING_CATEGORIES = [
  { name: 'Standard', icon: '🎸' },
  { name: 'Open', icon: '🔓' },
  { name: 'Modal', icon: '🎼' },
  { name: 'Alternative', icon: '⚡' },
  { name: 'Interval', icon: '🎵' },
];

export const getTuningsByCategory = (category) => {
  return TUNINGS.filter((tuning) => tuning.category === category);
};

export const getTuningById = (id) => {
  return TUNINGS.find((tuning) => tuning.id === id);
};

export const getFreeTunings = () => {
  return TUNINGS.filter((tuning) => tuning.free);
};

export const getPremiumTunings = () => {
  return TUNINGS.filter((tuning) => tuning.premium);
};
