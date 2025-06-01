"use client"

import { useState, useEffect, useCallback } from "react"
import { PostListWrapper } from "@/components/post-list-wrapper"
import { SearchInput } from "@/components/search-input"
import { TagFilter } from "@/components/tag-filter"
import { getPostsAction } from "@/lib/actions"
import { Post } from "@/lib/types"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface BlogPageProps {
  searchParams: Promise<{ search?: string; category?: string; tags?: string }>
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load initial data and URL params
  useEffect(() => {
    const loadData = async () => {
      try {
        const params = await searchParams
        const urlSearchQuery = params.search || ""
        const urlCategory = params.category || "all"
        const urlTags = params.tags ? params.tags.split(',').filter(Boolean) : []
        
        setSearchQuery(urlSearchQuery)
        setSelectedCategory(urlCategory)
        setSelectedTags(urlTags)
        
        // Load posts based on category and search
        const categoryFilter = urlCategory === "all" ? undefined : urlCategory
        const result = await getPostsAction(categoryFilter, urlSearchQuery || undefined)
        
        if (result.success && result.data) {
          // Filter by tags if any selected
          let posts = result.data
          if (urlTags.length > 0) {
            posts = posts.filter(post => 
              urlTags.some(tag => post.tags.includes(tag))
            )
          }
          setFilteredPosts(posts)
        } else {
          console.error("Error loading posts:", result.error)
          setFilteredPosts([])
        }
      } catch (error) {
        console.error("Error loading posts:", error)
        setFilteredPosts([])
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [searchParams])

  // Handle category change
  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category)
    await filterPosts(category, searchQuery, selectedTags)
  }

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query)
    await filterPosts(selectedCategory, query, selectedTags)
  }, [selectedCategory, selectedTags])

  const handleTagsChange = useCallback(async (tags: string[]) => {
    setSelectedTags(tags)
    await filterPosts(selectedCategory, searchQuery, tags)
  }, [selectedCategory, searchQuery])

  // Centralized filter function
  const filterPosts = async (category: string, search: string, tags: string[]) => {
    setIsLoading(true)
    
    try {
      const categoryFilter = category === "all" ? undefined : category
      const result = await getPostsAction(categoryFilter, search || undefined)
      
      if (result.success && result.data) {
        // Filter by tags if any selected
        let posts = result.data
        if (tags.length > 0) {
          posts = posts.filter(post => 
            tags.some(tag => post.tags.includes(tag))
          )
        }
        setFilteredPosts(posts)
      } else {
        console.error("Error filtering posts:", result.error)
        setFilteredPosts([])
      }
    } catch (error) {
      console.error("Error filtering posts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground text-lg">
            {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"} found
          </p>
        </div>

        {/* Filters Section */}
        <div className="space-y-6">
          {/* Search Input */}
          <div className="flex justify-center">
            <SearchInput
              placeholder="Search posts..."
              value={searchQuery}
              onSearch={handleSearch}
              className="w-full max-w-md"
            />
          </div>

          {/* Tag Filter */}
          <div className="flex justify-center">
            <TagFilter
              selectedTags={selectedTags}
              onTagsChange={handleTagsChange}
              className="w-full max-w-2xl"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="tech">Tech</TabsTrigger>
              <TabsTrigger value="life">Life</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Posts Content with Streaming */}
          <div className="min-h-[400px] mt-8">
            <TabsContent value="all">
              <PostListWrapper posts={filteredPosts} />
            </TabsContent>
            
            <TabsContent value="tech">
              <PostListWrapper posts={filteredPosts} />
            </TabsContent>
            
            <TabsContent value="life">
              <PostListWrapper posts={filteredPosts} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
