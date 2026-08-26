'use client'

import * as React from 'react'
import { X, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TagInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
  disabled?: boolean
}

export function TagInput({
  tags,
  onTagsChange,
  placeholder = 'Adicionar...',
  disabled = false,
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const value = inputValue.trim()
      if (value && !tags.includes(value)) {
        onTagsChange([...tags, value])
        setInputValue('')
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onTagsChange(tags.slice(0, -1))
    }
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          'flex flex-wrap gap-2 min-h-[40px] p-2 rounded-lg border border-border bg-surface',
          'focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Tags existentes */}
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary-700 border border-secondary/20"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeTag(tag)
                }}
                className="hover:text-secondary transition-colors"
              >
                <X className="size-3" />
              </button>
            )}
          </span>
        ))}
        
        {/* Input para novas tags */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      
      {/* Botão de adicionar quando tem tags */}
      {tags.length > 0 && (
        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
          className="mt-2 text-xs text-primary hover:text-primary-dark flex items-center gap-1"
        >
          <Plus className="size-3" />
          Adicionar tecnologia
        </button>
      )}
    </div>
  )
}
