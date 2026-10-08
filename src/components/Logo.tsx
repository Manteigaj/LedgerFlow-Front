type LogoProps = { className?: string }

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`inline-flex items-center justify-center gap-3 text-[34px] leading-none font-extrabold tracking-[-1.8px] text-[#14283e] ${className}`} aria-label="LedgerFlow">
      <svg className="h-10 w-10 text-ledger-green" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="3" y="23" width="8" height="14" rx="2.5" fill="currentColor" />
        <rect x="16" y="13" width="8" height="24" rx="2.5" fill="currentColor" />
        <rect x="29" y="3" width="8" height="34" rx="2.5" fill="currentColor" />
      </svg>
      <span>Ledger<span className="text-ledger-green">Flow</span></span>
    </div>
  )
}