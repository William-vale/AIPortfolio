"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends CheckboxPrimitive.Root.Props {
  label?: string;
  containerClassName?: string;
}

function Checkbox({
  label,
  containerClassName,
  className,
  id,
  ...props
}: CheckboxProps) {
  const generatedId = React.useId();
  const checkboxId = id ?? generatedId;

  return (
    <div className={cn("flex items-center gap-2", containerClassName)}>
      <CheckboxPrimitive.Root
        id={checkboxId}
        className={cn(
          "size-4 rounded border border-border bg-surface",
          "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
          "data-checked:border-primary data-checked:bg-primary",
          "transition-all duration-200",
          "cursor-pointer hover:border-primary/50",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator>
          <Check
            className="size-3 text-primary-foreground"
            aria-hidden="true"
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {label && (
        <label
          htmlFor={checkboxId}
          className="cursor-pointer select-none text-sm text-secondary"
        >
          {label}
        </label>
      )}
    </div>
  );
}

export { Checkbox };