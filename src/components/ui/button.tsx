import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline'
}

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-transparent px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ledger-green focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variant === 'default'
          ? 'bg-ledger-action text-white hover:bg-ledger-action-hover'
          : 'border border-[#cbd5e2] bg-transparent text-[#1b2f47] hover:bg-white/60',
        className,
      )}
      {...props}
    />
  )
}