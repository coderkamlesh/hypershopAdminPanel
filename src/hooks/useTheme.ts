// src/hooks/useTheme.ts
import { useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

const STORAGE_KEY = "hs-theme"

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system")

  // Initial load: system or saved
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    const initial = saved || "system"
    applyTheme(initial)
    setTheme(initial)
  }, [])

  const applyTheme = (value: Theme) => {
    const root = document.documentElement
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const effective =
      value === "system" ? (systemPrefersDark ? "dark" : "light") : value

    if (effective === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }

  const changeTheme = (value: Theme) => {
    setTheme(value)
    localStorage.setItem(STORAGE_KEY, value)
    applyTheme(value)
  }

  return { theme, changeTheme }
}
