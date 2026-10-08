import { create } from 'zustand'

type AppStore = {
  accessToken: string | null
  username: string
  isDarkMode: boolean
  setSession: (accessToken: string, username: string) => void
  logout: () => void
  toggleTheme: () => void
}

export const useAppStore = create<AppStore>((set) => ({
  accessToken: localStorage.getItem('access_token'),
  username: localStorage.getItem('ledgerflow-username') ?? '',
  isDarkMode: localStorage.getItem('ledgerflow-theme') === 'dark',
  setSession: (accessToken, username) => {
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('ledgerflow-username', username)
    set({ accessToken, username })
  },
  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('ledgerflow-username')
    set({ accessToken: null, username: '' })
  },
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}))