"use client";

import { useState, useEffect, useCallback } from "react";
import { PostListWrapper } from "@/components/post-list-wrapper";
import { SearchInput } from "@/components/search-input";
import { BlogSidebar } from "@/components/blog-sidebar";
import { BlogPagination } from "@/components/blog-pagination";
import { getPostsAction } from "@/lib/actions";
import { Post } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Filter } from "lucide-react";

interface BlogPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    tags?: string;
    page?: string;
  }>;
}

const POSTS_PER_PAGE = 6;

export default function BlogPage({ searchParams }: BlogPageProps) {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Load initial data and URL params
  useEffect(() => {
    const loadData = async () => {
      try {
        const params = await searchParams;
        const urlSearchQuery = params.search || "";
        const urlCategory = params.category || "all";
        const urlTags = params.tags
          ? params.tags.split(",").filter(Boolean)
          : [];
        const urlPage = parseInt(params.page || "1", 10);

        setSearchQuery(urlSearchQuery);
        setSelectedCategory(urlCategory);
        setSelectedTags(urlTags);
        setCurrentPage(urlPage);

        // Load all posts initially
        const result = await getPostsAction();
        if (result.success && result.data) {
          setAllPosts(result.data);
        } else {
          console.error("Error loading posts:", result.error);
          setAllPosts([]);
        }
      } catch (error) {
        console.error("Error loading posts:", error);
        setAllPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [searchParams]);

  // Filter posts whenever filters change
  useEffect(() => {
    if (allPosts.length === 0) return;

    let filtered = [...allPosts];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (post) => post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) =>
        selectedTags.some((tag) => post.tags.includes(tag))
      );
    }

    setFilteredPosts(filtered);

    // Reset to first page when filters change
    setCurrentPage(1);
  }, [allPosts, selectedCategory, searchQuery, selectedTags]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleTagsChange = useCallback((tags: string[]) => {
    setSelectedTags(tags);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-2 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-1/4 mx-auto"></div>
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
    );
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <SidebarTrigger>
        <Filter className="h-4 w-4" />
        <span>Filters & Tags</span>
      </SidebarTrigger>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <BlogSidebar
          selectedTags={selectedTags}
          onTagsChange={handleTagsChange}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Blog</h1>

                {/* Filter Toggle Button */}
              </div>

              {/* Search Input */}
              <div className="flex justify-center">
                <SearchInput
                  placeholder="Search posts..."
                  value={searchQuery}
                  onSearch={handleSearch}
                  className="w-full max-w-md"
                />
              </div>

              {/* Category Tabs */}
              <Tabs
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <div className="flex justify-center">
                  <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="tech">Tech</TabsTrigger>
                    <TabsTrigger value="life">Life</TabsTrigger>
                  </TabsList>
                </div>

                {/* Posts Content */}
                <div className="min-h-[600px] mt-8">
                  <TabsContent value={selectedCategory} className="space-y-8">
                    {currentPosts.length > 0 ? (
                      <>
                        <PostListWrapper posts={currentPosts} />

                        {/* Pagination */}
                        <BlogPagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                          className="mt-12"
                        />
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-lg text-muted-foreground">
                          No posts found matching your criteria.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Try adjusting your search or filters.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
