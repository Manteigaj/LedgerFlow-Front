type FeatureIconProps = { kind: 'upload' | 'sparkle' | 'chart' }

export function FeatureIcon({ kind }: FeatureIconProps) {
  if (kind === 'upload') {
    return (
      <svg className="h-7.5 w-7.5" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M10.5 23.5H8a5 5 0 0 1-.5-9.98A8.5 8.5 0 0 1 23.7 12 6 6 0 0 1 24 24h-2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 27V16m0 0-4 4m4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (kind === 'sparkle') {
    return (
      <svg className="h-7.5 w-7.5" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 3.5c1.5 6.8 5.7 11 12.5 12.5-6.8 1.5-11 5.7-12.5 12.5C14.5 21.7 10.3 17.5 3.5 16 10.3 14.5 14.5 10.3 16 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M25.5 3v6m-3-3h6M6.5 23v6m-3-3h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg className="h-7.5 w-7.5" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M5 26V17h6v9H5Zm8 0V8h6v18h-6Zm8 0V13h6v13h-6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M4 29h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}