import { PrismaClient } from '@prisma/client'
import { getAllParsedPosts, type ParsedPost } from '../lib/markdown'

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set')
  console.log('💡 Make sure you have a .env file with DATABASE_URL configured')
  process.exit(1)
}

const prisma = new PrismaClient()

async function createOrUpdateTag(name: string) {
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  
  return await prisma.tag.upsert({
    where: { slug },
    update: { name },
    create: {
      name,
      slug,
    },
  })
}

async function syncPost(parsedPost: ParsedPost) {
  const { frontmatter, htmlContent } = parsedPost
  
  console.log(`📝 Syncing post: ${frontmatter.title}`)
  
  // Create or update tags first
  const tagRecords = await Promise.all(
    frontmatter.tags.map(tagName => createOrUpdateTag(tagName))
  )
  
  // Create or update the post
  const post = await prisma.post.upsert({
    where: { slug: frontmatter.slug },
    update: {
      title: frontmatter.title,
      content: htmlContent,
      excerpt: frontmatter.excerpt,
      category: frontmatter.category as 'TECH' | 'LIFE',
      tags: frontmatter.tags, // Keep backward compatibility
      published: true,
      updatedAt: frontmatter.updated ? new Date(frontmatter.updated) : new Date(),
    },
    create: {
      slug: frontmatter.slug,
      title: frontmatter.title,
      content: htmlContent,
      excerpt: frontmatter.excerpt,
      category: frontmatter.category as 'TECH' | 'LIFE',
      tags: frontmatter.tags, // Keep backward compatibility
      published: true,
      createdAt: new Date(frontmatter.date),
      updatedAt: frontmatter.updated ? new Date(frontmatter.updated) : new Date(frontmatter.date),
    },
  })
  
  // Clear existing post-tag relationships
  await prisma.postTag.deleteMany({
    where: { postId: post.id },
  })
  
  // Create new post-tag relationships
  if (tagRecords.length > 0) {
    await prisma.postTag.createMany({
      data: tagRecords.map(tag => ({
        postId: post.id,
        tagId: tag.id,
      })),
    })
  }
  
  console.log(`✅ Synced: ${frontmatter.title} (${tagRecords.length} tags)`)
  return post
}

async function seedPosts() {
  try {
    console.log('🚀 Starting post synchronization...')
    
    const parsedPosts = getAllParsedPosts()
    
    if (parsedPosts.length === 0) {
      console.log('📁 No markdown posts found in content/posts/')
      return
    }
    
    console.log(`📊 Found ${parsedPosts.length} markdown posts`)
    
    // Sync all posts
    const syncedPosts = await Promise.all(
      parsedPosts.map(parsedPost => syncPost(parsedPost))
    )
    
    console.log(`🎉 Successfully synced ${syncedPosts.length} posts!`)
    
    // Display summary
    const stats = await prisma.post.groupBy({
      by: ['category'],
      _count: { category: true },
    })
    
    console.log('\n📈 Database summary:')
    stats.forEach(stat => {
      console.log(`  ${stat.category}: ${stat._count.category} posts`)
    })
    
    const totalTags = await prisma.tag.count()
    console.log(`  Tags: ${totalTags} total`)
    
  } catch (error) {
    console.error('❌ Error syncing posts:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the script
if (require.main === module) {
  seedPosts()
    .then(() => {
      console.log('✨ Sync completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Sync failed:', error)
      process.exit(1)
    })
}

export { seedPosts } 
