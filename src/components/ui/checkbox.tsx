import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends CheckboxPrimitive.Props {
  // Label opcional para o checkbox
  label?: string
  // Classe personalizada para o container
  containerClassName?: string
}

function Checkbox({ 
  label, 
  containerClassName,
  className,
  ...props 
}: CheckboxProps) {
  return (
    <div className={cn("flex items-center gap-2", containerClassName)}>
      {/* Checkbox primitivo do Base UI */}
      <CheckboxPrimitive
        className={cn(
          // Estilos base do checkbox
          "size-4 rounded border border-border bg-surface",
          // Estados de focus
          "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
          // Estado checked
          "data-checked:bg-primary data-checked:border-primary",
          // Transições
          "transition-all duration-200",
          // Cursor e hover
          "cursor-pointer hover:border-primary/50",
          className
        )}
        {...props}
      >
        {/* Ícone de check exibido quando marcado */}
        <CheckboxPrimitive.Indicator>
          <Check className="size-3 text-primary-foreground" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive>
      
      {/* Label clicável associada ao checkbox */}
      {label && (
        <label className="text-sm text-secondary cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  )
}

export { Checkbox }
