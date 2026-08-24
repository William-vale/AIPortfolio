import * as React from "react"
import {cn} from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  erro?: string
}

const Input = React.forwardRef<HTMLElement, InputProps> ({ className, type, error, ...props }, ref) => {
  return (
    <div className="w-full">
      <input
          type={type}
          className={cn("flex h-10 w-full rounded-lg border border-border bg-suface px-3 py-2 text-sm text-foreground",
                        "placeholder: text-muted-foreground",
                        "outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible: ring-primary/20",
                        "hover: border-primary/50",
                        error && "border-error-600 focus-visible:border-error-600 focus-visible:ring-error-600/20",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "transition-colors duration-200",
                        className)}
      />
    </div>
  )
}


Input.displayName = "Input"

export { Input }
