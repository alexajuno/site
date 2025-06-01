"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { 
  X, 
  Search, 
  Hash, 
  Home, 
  FileText, 
  FolderOpen, 
  User,
  Tag
} from "lucide-react"
import { getPostsAction } from "@/lib/actions"
import { useBlog } from "@/components/blog-context"

interface AppSidebarProps {
  className?: string
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname()
  const { selectedTags, setSelectedTags } = useBlog()
  const [allTags, setAllTags] = useState<string[]>([])
  const [tagSearchQuery, setTagSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [totalPosts, setTotalPosts] = useState(0)

  const isBlogPage = pathname?.startsWith('/blog')

  // Navigation items
  const navigationItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      title: "Blog",
      url: "/blog",
      icon: FileText,
      isActive: pathname?.startsWith("/blog"),
    },
    {
      title: "Projects",
      url: "/projects",
      icon: FolderOpen,
      isActive: pathname?.startsWith("/projects"),
    },
    {
      title: "About",
      url: "/about",
      icon: User,
      isActive: pathname?.startsWith("/about"),
    },
  ]

  // Load all available tags (only for blog pages)
  useEffect(() => {
    if (!isBlogPage) {
      setIsLoading(false)
      return
    }

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
  }, [isBlogPage])

  // Filter tags based on search query
  const filteredTags = allTags.filter(tag =>
    tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
  )

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleClearAllTags = () => {
    setSelectedTags([])
  }

  const selectedTagsCount = selectedTags.length
  const totalTagsCount = allTags.length

  return (
    <Sidebar className={className}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">A</span>
            </div>
            <span className="font-semibold">Ajuno Labs</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Blog-specific content */}
        {isBlogPage && (
          <>
            <Separator />
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="h-3 w-3" />
                  <span>Blog Tags</span>
                </div>
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

                {selectedTags.length > 0 && <Separator />}

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
                          type="button"
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
          </>
        )}
      </SidebarContent>
      
      {isBlogPage && (
        <SidebarFooter className="border-t border-sidebar-border">
          <div className="flex items-center gap-2 px-2 py-2 text-xs text-muted-foreground">
            <Hash className="h-3 w-3" />
            <span>{totalPosts} total posts</span>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  )
} 