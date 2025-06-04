import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

export interface PostFrontmatter {
  slug: string
  title: string
  date: string
  updated?: string
  category: 'TECH' | 'LIFE'
  tags: string[]
  excerpt: string
}

export interface ParsedPost {
  frontmatter: PostFrontmatter
  content: string
  htmlContent: string
  filename: string
}

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/posts')

export function getAllPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return []
  }
  
  return fs.readdirSync(POSTS_DIRECTORY)
    .filter(file => file.endsWith('.md'))
}

export function parseMarkdownFile(filename: string): ParsedPost {
  const fullPath = path.join(POSTS_DIRECTORY, filename)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  const { data, content } = matter(fileContents)
  const htmlContent = md.render(content)
  
  // Validate and normalize frontmatter
  const frontmatter: PostFrontmatter = {
    slug: data.slug || filename.replace(/\.md$/, ''),
    title: data.title || 'Untitled Post',
    date: data.date || new Date().toISOString(),
    updated: data.updated,
    category: data.category === 'Life' ? 'LIFE' : 'TECH',
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: data.excerpt || content.substring(0, 200) + '...',
  }
  
  return {
    frontmatter,
    content,
    htmlContent,
    filename,
  }
}

export function getAllParsedPosts(): ParsedPost[] {
  const filenames = getAllPostFiles()
  return filenames.map(parseMarkdownFile)
}

export function getPostBySlug(slug: string): ParsedPost | null {
  const posts = getAllParsedPosts()
  return posts.find(post => post.frontmatter.slug === slug) || null
} 