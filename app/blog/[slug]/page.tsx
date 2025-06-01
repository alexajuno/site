import { notFound } from "next/navigation"
import { Calendar, MessageCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import { getPostBySlugAction } from "@/lib/actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CommentForm } from "@/components/comment-form"
import { CommentList } from "@/components/comment-list"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const result = await getPostBySlugAction(slug)

  if (!result.success || !result.data) {
    notFound()
  }

  const post = result.data

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "tech":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "life":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Post Header */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 flex-wrap">
              <Badge className={getCategoryColor(post.category)}>
                {formatCategory(post.category)}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                {post.commentCount !== undefined && (
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.commentCount} comments</span>
                  </div>
                )}
              </div>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
            
            {post.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Link key={tag} href={`/blog?search=${encodeURIComponent(tag)}`}>
                    <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Post Content */}
        <Card>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none p-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                // Custom components for better styling
                h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>,
                p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                    {children}
                  </blockquote>
                ),
                code: ({ children, className }) => {
                  const isInline = !className
                  if (isInline) {
                    return (
                      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                        {children}
                      </code>
                    )
                  }
                  return <code className={className}>{children}</code>
                },
                pre: ({ children }) => (
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
                    {children}
                  </pre>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comments ({post.commentCount || 0})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CommentForm postId={post.id} />
              {post.comments && post.comments.length > 0 && (
                <CommentList comments={post.comments} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 