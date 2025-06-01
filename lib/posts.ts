import { Post } from './types'

export async function getAllPosts(): Promise<Post[]> {
  // Only run on server side
  if (typeof window !== 'undefined') {
    return []
  }

  try {
    const fs = await import('fs')
    const path = await import('path')
    const matter = await import('gray-matter')
    
    const postsDirectory = path.join(process.cwd(), 'content/posts')
    
    // Check if posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((fileName: string) => fileName.endsWith('.md'))
      .map((fileName: string) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter.default(fileContents)

        return {
          slug,
          title: data.title || '',
          date: data.date || '',
          updated: data.updated,
          category: data.category || 'Tech',
          tags: data.tags || [],
          excerpt: data.excerpt || '',
          content: content,
        } as Post
      })

    // Sort posts by date
    return allPostsData.sort((a: Post, b: Post) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Only run on server side
  if (typeof window !== 'undefined') {
    return null
  }

  try {
    const fs = await import('fs')
    const path = await import('path')
    const matter = await import('gray-matter')
    
    const postsDirectory = path.join(process.cwd(), 'content/posts')
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter.default(fileContents)

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      updated: data.updated,
      category: data.category || 'Tech',
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      content: content,
    } as Post
  } catch (error) {
    console.error('Error reading post:', error)
    return null
  }
}

export async function getPopularTags(): Promise<{ name: string; count: number }[]> {
  const posts = await getAllPosts()
  const tagCounts: Record<string, number> = {}

  posts.forEach((post) => {
    post.tags.forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
} 