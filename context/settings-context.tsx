"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useTheme } from "next-themes"

type LanguageOption = "en" | "pt"
type ThemeOption = "light" | "dark" | "system"

interface SettingsContextType {
  language: LanguageOption
  setLanguage: (language: LanguageOption) => void
  theme: ThemeOption
  setTheme: (theme: ThemeOption) => void
  isSettingsOpen: boolean
  openSettings: () => void
  closeSettings: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()
  const { theme: currentTheme, setTheme: setNextTheme } = useTheme()
  const [language, setLanguageState] = useState<LanguageOption>("en")
  const [theme, setThemeState] = useState<ThemeOption>("system")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // Initialize language from localStorage or default to 'en'
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as LanguageOption
    if (savedLanguage) {
      setLanguageState(savedLanguage)
      i18n.changeLanguage(savedLanguage)
    }
  }, [i18n])

  // Initialize theme from localStorage or default to 'system'
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeOption
    if (savedTheme) {
      setThemeState(savedTheme)
      setNextTheme(savedTheme)
    } else if (currentTheme) {
      setThemeState(currentTheme as ThemeOption)
    }
  }, [currentTheme, setNextTheme])

  const setLanguage = (newLanguage: LanguageOption) => {
    setLanguageState(newLanguage)
    i18n.changeLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const setTheme = (newTheme: ThemeOption) => {
    setThemeState(newTheme)
    setNextTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  const openSettings = () => setIsSettingsOpen(true)
  const closeSettings = () => setIsSettingsOpen(false)

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        isSettingsOpen,
        openSettings,
        closeSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

