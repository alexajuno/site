"use client"

import { Search } from "lucide-react"
import { DebouncedInput } from "@/components/debounced-input"

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
  return (
    <DebouncedInput
      placeholder={placeholder}
      value={value}
      onValueChange={onSearch}
      debounceMs={debounceMs}
      className={className}
      icon={Search}
    />
  )
} 