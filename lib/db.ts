import { PrismaClient, Category } from '@prisma/client'
import { enhance } from '@zenstackhq/runtime'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const basePrisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = basePrisma

export const prisma = enhance(basePrisma)

export async function getAllPosts(category?: Category) {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(category && { category }),
    },
    include: {
      _count: {
        select: { comments: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return posts.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    date: post.createdAt.toISOString(),
    updated: post.updatedAt.toISOString(),
    commentCount: post._count.comments,
  }))
}

export async function getPostBySlug(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      comments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
      _count: {
        select: { comments: true },
      },
    },
  })

  if (!post) return null

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    date: post.createdAt.toISOString(),
    updated: post.updatedAt.toISOString(),
    comments: post.comments.map(comment => ({
      id: comment.id,
      author: comment.author,
      content: comment.content,
      timestamp: comment.createdAt.toISOString(),
    })),
    commentCount: post._count.comments,
  }
}

export async function searchPosts(query: string, category?: Category) {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(category && { category }),
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          content: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          tags: {
            has: query,
          },
        },
      ],
    },
    include: {
      _count: {
        select: { comments: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return posts.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    date: post.createdAt.toISOString(),
    updated: post.updatedAt.toISOString(),
    commentCount: post._count.comments,
  }))
}

export async function getPopularTags() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { tags: true },
  })

  const tagCounts: Record<string, number> = {}
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}

// Comment functions
export async function createComment(postId: string, author: string, content: string, email?: string) {
  return await prisma.comment.create({
    data: {
      postId,
      author,
      content,
      email,
    },
  })
}

export async function getCommentsByPostId(postId: string) {
  const comments = await prisma.comment.findMany({
    where: { postId },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return comments.map(comment => ({
    id: comment.id,
    author: comment.author,
    content: comment.content,
    timestamp: comment.createdAt.toISOString(),
  }))
} 