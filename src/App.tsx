import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { ThemeToggle } from './components/ThemeToggle'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { useAppStore } from './stores/appStore'

type AuthPage = 'login' | 'register'

function App() {
  const [authPage, setAuthPage] = useState<AuthPage>('login')
  const queryClient = useQueryClient()
  const accessToken = useAppStore((state) => state.accessToken)
  const username = useAppStore((state) => state.username)
  const isDarkMode = useAppStore((state) => state.isDarkMode)
  const logout = useAppStore((state) => state.logout)
  const toggleTheme = useAppStore((state) => state.toggleTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light'
    localStorage.setItem('ledgerflow-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  function handleLogout() {
    logout()
    queryClient.clear()
    setAuthPage('login')
  }

  if (accessToken) {
    return (
      <HomePage
        username={username}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />
    )
  }

  return (
    <>
      <ThemeToggle
        isDarkMode={isDarkMode}
        onToggle={toggleTheme}
        className="fixed top-5 right-5 z-20"
      />
      {authPage === 'register' ? (
        <main className="grid min-h-screen place-items-center bg-[radial-gradient(ellipse_at_50%_45%,rgb(255_255_255/65%),transparent_56%),#f7f9fc] px-6 py-12">
          <RegisterPage onBack={() => setAuthPage('login')} />
        </main>
      ) : (
        <LoginPage
          onRegister={() => setAuthPage('register')}
        />
      )}
    </>
  )
}

export default App
