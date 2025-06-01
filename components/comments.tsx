"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"
import { createCommentObjectAction } from "@/lib/actions"

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
}

interface CommentsProps {
  postId: string
  initialComments?: Comment[]
}

export function Comments({ postId, initialComments = [] }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [author, setAuthor] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use initial comments if provided
  useEffect(() => {
    setComments(initialComments)
  }, [initialComments])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!author.trim() || !content.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await createCommentObjectAction({
        postId,
        author: author.trim(),
        content: content.trim(),
      })

      if (!result.success) {
        throw new Error(result.error || 'Failed to post comment')
      }

      if (result.data) {
        setComments((prev) => [result.data, ...prev])
      }
      setAuthor("")
      setContent("")

      toast.success("Your comment has been posted!")
    } catch (error) {
      console.error('Error posting comment:', error)
      toast.error("Failed to post comment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Comments ({comments.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Comment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Your name *" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            </div>
            <Textarea
              placeholder="Your comment *"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4 p-4 border rounded-lg">
                  <Avatar>
                    <AvatarFallback>
                      {comment.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{comment.author}</h4>
                      <span className="text-sm text-muted-foreground">{formatDate(comment.timestamp)}</span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
