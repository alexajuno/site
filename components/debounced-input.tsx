"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { LucideIcon } from "lucide-react"

interface DebouncedInputProps {
  placeholder?: string
  value: string
  onValueChange: (value: string) => void
  debounceMs?: number
  className?: string
  icon?: LucideIcon
  disabled?: boolean
  type?: string
}

export function DebouncedInput({ 
  placeholder = "Type to search...", 
  value, 
  onValueChange, 
  debounceMs = 300,
  className = "",
  icon: Icon,
  disabled = false,
  type = "text"
}: DebouncedInputProps) {
  const [localValue, setLocalValue] = useState(value)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastValueRef = useRef<string>(value)

  // Update local value when external value changes
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  // Memoize the onChange callback to prevent infinite re-renders
  const executeDebouncedChange = useCallback((newValue: string) => {
    lastValueRef.current = newValue
    onValueChange(newValue)
  }, [onValueChange])

  // Debounced change effect
  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const trimmedLocalValue = localValue.trim();

    // Only proceed if the current trimmed value is different from what was last submitted.
    if (trimmedLocalValue !== lastValueRef.current) {
      // Determine if this change warrants a callback (new content or clearing previous content).
      const shouldTriggerChangeBasedOnContent = 
        trimmedLocalValue.length > 0 || // There's new content
        (trimmedLocalValue.length === 0 && lastValueRef.current.length > 0); // Clearing a previous value

      if (shouldTriggerChangeBasedOnContent) {
        // Set new timeout
        timeoutRef.current = setTimeout(() => {
          executeDebouncedChange(trimmedLocalValue)
        }, debounceMs)
      }
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [localValue, executeDebouncedChange, debounceMs])

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)
  }

  return (
    <div className={`relative ${className}`}>
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      )}
      <Input
        type={type}
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        disabled={disabled}
        className={Icon ? "pl-10" : ""}
      />
    </div>
  )
} 