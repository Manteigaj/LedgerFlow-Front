import { useRef, useState } from 'react'
import { Logo } from '../components/Logo'
import { ThemeToggle } from '../components/ThemeToggle'
import { ActivityPage } from './ActivityPage'

type HomePageId = 'overview' | 'activity' | 'import'
type HomePageProps = {
  username: string
  onLogout: () => void
  isDarkMode: boolean
  onToggleTheme: () => void
}

export function HomePage({ username, onLogout, isDarkMode, onToggleTheme }: HomePageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activePage, setActivePage] = useState<HomePageId>('overview')
  const navigation: { id: HomePageId; label: string }[] = [
    { id: 'overview', label: 'Visão geral' },
    { id: 'activity', label: 'Movimentações' },
    { id: 'import', label: 'Importar arquivo' },
  ]

  return (
    <main className="min-h-screen bg-[#f3f6f8] text-[#14283e]">
      <header className="border-b border-[#dce5eb] bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-5 sm:px-10">
          <Logo className="text-[25px] tracking-[-1px] [&_svg]:h-8 [&_svg]:w-8" />
          <div className="flex w-full flex-wrap items-center justify-end gap-4 sm:w-auto sm:gap-6">
            <nav aria-label="Navegação principal" className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm font-semibold">
              {navigation.map((item) => (
                <button key={item.id} aria-current={activePage === item.id ? 'page' : undefined} className={`border-b-2 py-1 transition-colors ${activePage === item.id ? 'border-ledger-green text-ledger-green' : 'border-transparent text-[#465d7b] hover:text-ledger-green'}`} type="button" onClick={() => setActivePage(item.id)}>
                  {item.label}
                </button>
              ))}
            </nav>
            <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
            <button className="flex h-10 items-center gap-2 rounded-md border border-[#dce5eb] bg-white px-3 text-sm font-semibold text-[#465d7b] transition-colors hover:border-[#bac9d3] hover:text-[#14283e] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ledger-green" type="button" onClick={onLogout}>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 17l5-5-5-5m5 5H3m9-9h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 sm:py-14">
        {activePage === 'overview' && (
          <section aria-labelledby="overview-title">
            <p className="mb-2 text-sm font-semibold text-black">VISÃO GERAL</p>
            <h1 id="overview-title" className="text-3xl font-bold tracking-[-1px] sm:text-4xl">Olá, {username || 'bem-vindo'}</h1>
            <p className="mt-2 text-base text-[#64778a]">Acompanhe sua vida financeira em um só lugar.</p>
            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Saldo disponível', detail: 'Saldo atual da conta' },
                { label: 'Entradas do mês', detail: 'Receitas registradas' },
                { label: 'Saídas do mês', detail: 'Despesas registradas' },
              ].map((item) => (
                <article key={item.label} className="rounded-lg border border-[#dce5eb] bg-white p-5 sm:p-6">
                  <p className="text-sm font-medium text-[#64778a]">{item.label}</p>
                  <p className="mt-4 text-3xl font-bold text-[#14283e]">--</p>
                  <p className="mt-2 text-xs text-[#8493a2]">{item.detail}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {activePage === 'activity' && (
          <ActivityPage />
        )}

        {activePage === 'import' && (
          <section aria-labelledby="import-title">
            <p className="mb-2 text-sm font-semibold text-black">ARQUIVOS</p>
            <h1 id="import-title" className="text-3xl font-bold tracking-[-1px] sm:text-4xl">Importar extrato</h1>
            <p className="mt-2 max-w-2xl text-base leading-6 text-[#64778a]">Escolha um arquivo CSV para preparar a importação. O envio será conectado quando a rota da API estiver pronta.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-[#dce5eb] py-6">
              <input ref={fileInputRef} className="sr-only" id="statement-file" type="file" accept=".csv,text/csv" onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)} />
              <button className="flex h-11 items-center gap-2 rounded-md border border-transparent bg-ledger-action px-4 text-sm font-semibold text-white transition-colors hover:bg-ledger-action-hover focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ledger-green" type="button" onClick={() => fileInputRef.current?.click()}>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 16V4m0 0L7 9m5-5 5 5M5 14v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Selecionar arquivo CSV
              </button>
              {selectedFile && <p className="min-w-0 text-sm text-[#465d7b]" role="status">Selecionado: <span className="font-semibold">{selectedFile.name}</span></p>}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}