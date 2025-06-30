'use client'

import { darkTheme, lightTheme } from '@/styles/theme'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

interface ThemeContextType {
  isDarkTheme: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function Theme({ children }: { children: ReactNode }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme)

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a Theme provider')
  }
  return context
}
