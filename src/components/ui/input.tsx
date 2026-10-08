import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'flex h-11 w-full min-w-0 rounded-md border border-[#cbd5e2] bg-white/25 px-3 py-1 text-sm text-[#1c3048] shadow-xs outline-none transition-[border-color,box-shadow,background] placeholder:text-[#8292a9] focus-visible:border-ledger-green focus-visible:bg-white focus-visible:ring-3 focus-visible:ring-ledger-green/15 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[#a34423] aria-invalid:ring-3 aria-invalid:ring-[#a34423]/15',
        className,
      )}
      {...props}
    />
  )
}