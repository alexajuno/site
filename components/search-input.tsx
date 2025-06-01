"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchInputProps {
  placeholder?: string
  value: string
  onSearch: (query: string) => void
  debounceMs?: number
  className?: string
}

export function SearchInput({ 
  placeholder = "Search...", 
  value, 
  onSearch, 
  debounceMs = 300,
  className = ""
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastSearchRef = useRef<string>(value)

  // Update local value when external value changes
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  // Memoize the search callback to prevent infinite re-renders
  const executeDebouncedSearch = useCallback((query: string) => {
    lastSearchRef.current = query
    onSearch(query)
  }, [onSearch])

  // Debounced search effect
  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const trimmedLocalValue = localValue.trim();

    // Only proceed if the current trimmed query is different from what was last submitted.
    if (trimmedLocalValue !== lastSearchRef.current) {
      // Determine if this change warrants a search action (new content or clearing previous content).
      const shouldTriggerSearchBasedOnContent = 
        trimmedLocalValue.length > 0 || // There's new content to search
        (trimmedLocalValue.length === 0 && lastSearchRef.current.length > 0); // Clearing a previous search

      if (shouldTriggerSearchBasedOnContent) {
        // Set new timeout
        timeoutRef.current = setTimeout(() => {
          executeDebouncedSearch(trimmedLocalValue)
        }, debounceMs)
      }
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [localValue, executeDebouncedSearch, debounceMs])

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)
  }

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  )
} 