export const lightTheme = {
  colors: {
    background: {
      primary: '#C04C4B',
      secondary: '#2BB3E8',
      accentPrimary: '#FDFDFD',
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
      error: '#dc2626',
      accent: '#000',
      success: '#16a34a',
    },
    button: {
      primary: '#0055D1',
    },
    border: {
      primary: '#efefef',
    },
    input: {
      background: '#fff',
      text: '#929393',
    },
    bagdeColors: {
      attack: '#EF995B',
      defense: '#F5C919',
      speed: '#FC759E',
      hp: '#C04C4B',
      'special-attack': '#3E6FE6',
      'special-defense': '#78C850',
      normal: '#A8A77A',
      fire: '#EF995B',
      water: '#3E6FE6',
      grass: '#78C850',
      electric: '#F8D030',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A0409F',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#FC759E',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    },
  },
}

export const darkTheme = {
  colors: {
    background: {
      primary: '#c30c0d ',
      secondary: '#00B4EC',
      accentPrimary: '#1c1617',
    },
    text: {
      primary: '#fff',
      secondary: '#d1d5db',
      accent: '#d1d5db',
      error: '#ef4444',
      success: '#22c55e',
    },
    button: {
      primary: '#3b82f6',
    },
    border: {
      primary: '#374151',
    },
    input: {
      background: '#1f2937',
      text: '#d1d5db',
    },
    bagdeColors: {
      attack: '#d97706',
      defense: '#ca8a04',
      speed: '#f43f5e',
      hp: '#b91c1c',
      'special-attack': '#2563eb',
      'special-defense': '#4ade80',
      normal: '#78716c',
      fire: '#d97706',
      water: '#2563eb',
      grass: '#4ade80',
      electric: '#eab308',
      ice: '#5eead4',
      fighting: '#991b1b',
      poison: '#9333ea',
      ground: '#ca8a04',
      flying: '#7c3aed',
      psychic: '#db2777',
      bug: '#f43f5e',
      rock: '#a16207',
      ghost: '#5b21b6',
      dragon: '#5b21b6',
      dark: '#4a5568',
      steel: '#9ca3af',
      fairy: '#f472b6',
    },
  },
}

export type Theme = typeof lightTheme
