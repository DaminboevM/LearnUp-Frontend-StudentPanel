import { create } from "zustand"

const useStore = create((set) => ({
  // Dark mode state
  isDarkMode: false,
  setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.isDarkMode
      if (newDarkMode) {
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }
      return { isDarkMode: newDarkMode }
    }),

  // Mobile menu state
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  // Initialize theme from localStorage
  initializeTheme: () => {
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark")
      set({ isDarkMode: true })
    }
  },
}))

export default useStore
