"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface BlogContextType {
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

export function BlogProvider({ children }: { children: ReactNode }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  return (
    <BlogContext.Provider value={{ selectedTags, setSelectedTags }}>
      {children}
    </BlogContext.Provider>
  )
}

export function useBlog() {
  const context = useContext(BlogContext)
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider")
  }
  return context
} 