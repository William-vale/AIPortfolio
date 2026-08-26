import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  className?: string
  showLabel?: boolean
}

export function ProgressBar({ value, className, showLabel = true }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))
  
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        {showLabel && (
          <span className="text-sm font-medium text-foreground">
            Completude do perfil
          </span>
        )}
        <span className="text-sm font-semibold text-primary">
          {clampedValue}%
        </span>
      </div>
      <div className="h-2 w-full bg-bg-subtle rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary-500 transition-all duration-500 ease-out"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}
