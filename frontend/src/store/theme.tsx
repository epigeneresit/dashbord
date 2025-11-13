import { ReactNode, createContext, useContext } from 'react';
import { create } from 'zustand';

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      return { theme: nextTheme };
    })
}));

const ThemeContext = createContext<ReturnType<typeof useThemeStore> | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const store = useThemeStore();
  return <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const store = useContext(ThemeContext);
  if (!store) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return store;
}
