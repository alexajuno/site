"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { X, Search, Filter, Hash } from "lucide-react"
import { getPostsAction } from "@/lib/actions"

interface BlogSidebarProps {
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  className?: string
}

export function BlogSidebar({ selectedTags, onTagsChange, className }: BlogSidebarProps) {
  const [allTags, setAllTags] = useState<string[]>([])
  const [tagSearchQuery, setTagSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [totalPosts, setTotalPosts] = useState(0)

  // Load all available tags
  useEffect(() => {
    const loadTags = async () => {
      try {
        const result = await getPostsAction()
        if (result.success && result.data) {
          const tags = Array.from(new Set(result.data.flatMap(post => post.tags)))
            .sort()
          setAllTags(tags)
          setTotalPosts(result.data.length)
        }
      } catch (error) {
        console.error("Error loading tags:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTags()
  }, [])

  // Filter tags based on search query
  const filteredTags = allTags.filter(tag =>
    tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
  )

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag))
    } else {
      onTagsChange([...selectedTags, tag])
    }
  }

  const handleClearAllTags = () => {
    onTagsChange([])
  }

  const selectedTagsCount = selectedTags.length
  const totalTagsCount = allTags.length

  return (
    <Sidebar className={className}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <Filter className="h-4 w-4" />
          <span className="font-semibold">Filters</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            <span>Tags</span>
            <span className="text-xs text-muted-foreground">
              {selectedTagsCount}/{totalTagsCount}
            </span>
          </SidebarGroupLabel>
          
          <SidebarGroupContent className="space-y-4">
            {/* Tag Search */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tags..."
                value={tagSearchQuery}
                onChange={(e) => setTagSearchQuery(e.target.value)}
                className="pl-7 h-8 text-sm"
              />
            </div>

            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-muted-foreground">
                    Selected
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAllTags}
                    className="h-auto p-1 text-xs"
                  >
                    Clear all
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="default"
                      className="cursor-pointer text-xs h-6 px-2"
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                      <X className="ml-1 h-2 w-2" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Available Tags */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                Available Tags
              </Label>
              
              {isLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-6 bg-muted rounded animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {filteredTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                  
                  {filteredTags.length === 0 && tagSearchQuery && (
                    <p className="text-xs text-muted-foreground text-center py-4">
                      No tags found for &quot;{tagSearchQuery}&quot;
                    </p>
                  )}
                </div>
              )}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2 text-xs text-muted-foreground">
          <Hash className="h-3 w-3" />
          <span>{totalPosts} total posts</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
} 