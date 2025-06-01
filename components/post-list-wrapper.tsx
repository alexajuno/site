"use client"

import { Suspense } from "react"
import { PostList } from "@/components/post-list"
import { Post } from "@/lib/types"

interface PostListWrapperProps {
  posts: Post[]
  postsPerPage?: number
}

function PostListSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-48 bg-muted rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PostListWrapper({ posts, postsPerPage = 6 }: PostListWrapperProps) {
  return (
    <Suspense fallback={<PostListSkeleton />}>
      <PostList posts={posts} postsPerPage={postsPerPage} />
    </Suspense>
  )
} 