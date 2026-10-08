import type { HTMLAttributes, LabelHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export function Field({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-2', className)} {...props} />
}

export function FieldDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-[#6f829b]', className)} {...props} />
}

export function FieldGroup({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-5', className)} {...props} />
}

export function FieldLabel({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('text-sm font-medium text-[#192d44]', className)} {...props} />
}

export function FieldSeparator({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center gap-3 text-xs text-[#6f829b] before:h-px before:flex-1 before:bg-[#cbd5e2] before:content-["\"] after:h-px after:flex-1 after:bg-[#cbd5e2] after:content-["\"]', className)} {...props}>
      <span>{children}</span>
    </div>
  )
}