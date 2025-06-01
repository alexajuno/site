'use server'

import { revalidatePath } from 'next/cache'
import { Category } from '@prisma/client'
import { getAllPosts, searchPosts, createComment, getPostBySlug } from './db'

// Post actions
export async function getPostsAction(category?: string, search?: string) {
  try {
    let posts

    if (search) {
      const categoryFilter = category && category !== 'all' ? category.toUpperCase() as Category : undefined
      posts = await searchPosts(search, categoryFilter)
    } else {
      const categoryFilter = category && category !== 'all' ? category.toUpperCase() as Category : undefined
      posts = await getAllPosts(categoryFilter)
    }

    return { success: true, data: posts }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return { success: false, error: 'Failed to fetch posts' }
  }
}

export async function getPostBySlugAction(slug: string) {
  try {
    const post = await getPostBySlug(slug)
    return { success: true, data: post }
  } catch (error) {
    console.error('Error fetching post:', error)
    return { success: false, error: 'Failed to fetch post' }
  }
}

// Comment actions
export async function createCommentAction(formData: FormData) {
  try {
    const postId = formData.get('postId') as string
    const author = formData.get('author') as string
    const content = formData.get('content') as string
    const email = formData.get('email') as string | undefined

    if (!postId || !author || !content) {
      return { 
        success: false, 
        error: 'Missing required fields: postId, author, content' 
      }
    }

    const comment = await createComment(postId, author, content, email)

    // Revalidate the post page to show the new comment
    revalidatePath(`/blog/${postId}`)
    revalidatePath('/blog')

    return {
      success: true,
      data: {
        id: comment.id,
        author: comment.author,
        content: comment.content,
        timestamp: comment.createdAt.toISOString(),
      }
    }
  } catch (error) {
    console.error('Error creating comment:', error)
    return { success: false, error: 'Failed to create comment' }
  }
}

// Alternative comment action that accepts object parameters (for programmatic use)
export async function createCommentObjectAction(data: {
  postId: string
  author: string
  content: string
  email?: string
}) {
  try {
    const { postId, author, content, email } = data

    if (!postId || !author || !content) {
      return { 
        success: false, 
        error: 'Missing required fields: postId, author, content' 
      }
    }

    const comment = await createComment(postId, author, content, email)

    // Revalidate the post page to show the new comment
    revalidatePath(`/blog/${postId}`)
    revalidatePath('/blog')

    return {
      success: true,
      data: {
        id: comment.id,
        author: comment.author,
        content: comment.content,
        timestamp: comment.createdAt.toISOString(),
      }
    }
  } catch (error) {
    console.error('Error creating comment:', error)
    return { success: false, error: 'Failed to create comment' }
  }
} 