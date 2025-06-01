"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Post } from "@/lib/types"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const router = useRouter()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Ho_Chi_Minh",
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "TECH":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "LIFE":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const formatCategory = (category: string) => {
    return category.charAt(0) + category.slice(1).toLowerCase()
  }

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Navigate to blog page with tag filter
    const params = new URLSearchParams()
    params.set('tags', tag)
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge className={getCategoryColor(post.category)}>
              {formatCategory(post.category)}
            </Badge>
            {post.commentCount !== undefined && (
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <span>{post.commentCount}</span>
              </div>
            )}
          </div>
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-xl font-semibold hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
          </Link>
          <div className="flex items-center text-sm text-muted-foreground space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.date)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
              onClick={(e) => handleTagClick(tag, e)}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <Link href={`/blog/${post.slug}`}>
          <Button variant="outline" className="w-full">
            Read more
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
