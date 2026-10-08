import * as Switch from '@radix-ui/react-switch'

type ThemeToggleProps = {
  isDarkMode: boolean
  onToggle: () => void
  className?: string
}

export function ThemeToggle({ isDarkMode, onToggle, className = '' }: ThemeToggleProps) {
  return (
    <Switch.Root
      checked={isDarkMode}
      onCheckedChange={() => onToggle()}
      aria-label={isDarkMode ? 'Ativar tema claro' : 'Ativar tema escuro'}
      title={isDarkMode ? 'Ativar tema claro' : 'Ativar tema escuro'}
      className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ledger-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-ledger-action data-[state=unchecked]:bg-[#dce5eb] ${className}`}
    >
      <Switch.Thumb
        className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0`}
      >
        <span className="flex h-full w-full items-center justify-center">
          {isDarkMode ? (
            <svg className="h-3 w-3 text-[#f59e0b]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="h-3 w-3 text-[#f59e0b]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </Switch.Thumb>
    </Switch.Root>
  )
}