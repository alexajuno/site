"use client"

import { useState, useEffect } from "react"
import { Tag, X } from "lucide-react"
import { DebouncedInput } from "@/components/debounced-input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { searchTagsAction } from "@/lib/actions"

interface TagOption {
  id: string
  name: string
  slug: string
  count?: number
}

interface TagFilterProps {
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  className?: string
}

export function TagFilter({ selectedTags, onTagsChange, className = "" }: TagFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [tagSuggestions, setTagSuggestions] = useState<TagOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Search for tags when query changes
  useEffect(() => {
    const searchTags = async () => {
      if (searchQuery.trim().length > 0) {
        setIsLoading(true)
        try {
          const result = await searchTagsAction(searchQuery)
          if (result.success && result.data) {
            // Filter out already selected tags
            const filteredTags = result.data.filter(
              (tag: TagOption) => !selectedTags.includes(tag.slug)
            )
            setTagSuggestions(filteredTags)
            setShowSuggestions(true)
          } else {
            setTagSuggestions([])
          }
        } catch (error) {
          console.error("Error searching tags:", error)
          setTagSuggestions([])
        } finally {
          setIsLoading(false)
        }
      } else {
        setTagSuggestions([])
        setShowSuggestions(false)
      }
    }

    searchTags()
  }, [searchQuery, selectedTags])

  const handleTagSelect = (tagSlug: string) => {
    if (!selectedTags.includes(tagSlug)) {
      onTagsChange([...selectedTags, tagSlug])
    }
    setSearchQuery("")
    setShowSuggestions(false)
  }

  const handleTagRemove = (tagSlug: string) => {
    onTagsChange(selectedTags.filter(slug => slug !== tagSlug))
  }

  const clearAllTags = () => {
    onTagsChange([])
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <DebouncedInput
          placeholder="Search for tags..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          icon={Tag}
          className="w-full"
        />

        {/* Tag Suggestions */}
        {showSuggestions && (
          <Card className="absolute top-full left-0 right-0 z-10 mt-1 max-h-60 overflow-y-auto">
            <CardContent className="p-2">
              {isLoading ? (
                <div className="p-2 text-sm text-muted-foreground">Searching...</div>
              ) : tagSuggestions.length > 0 ? (
                <div className="space-y-1">
                  {tagSuggestions.map((tag) => (
                    <Button
                      key={tag.id}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleTagSelect(tag.slug)}
                    >
                      <Tag className="h-3 w-3 mr-2" />
                      {tag.name}
                      {tag.count && (
                        <span className="ml-auto text-xs text-muted-foreground">
                          ({tag.count})
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="p-2 text-sm text-muted-foreground">
                  No tags found for &quot;{searchQuery}&quot;
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Selected tags:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllTags}
              className="text-xs"
            >
              Clear all
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tagSlug) => (
              <Badge
                key={tagSlug}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {tagSlug}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => handleTagRemove(tagSlug)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 