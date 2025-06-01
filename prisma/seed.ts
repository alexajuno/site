import { PrismaClient, Category } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample posts
  const post1 = await prisma.post.upsert({
    where: { slug: 'getting-started-with-nextjs' },
    update: {},
    create: {
      slug: 'getting-started-with-nextjs',
      title: 'Getting Started with Next.js 15',
      content: `# Getting Started with Next.js 15

Next.js 15 brings exciting new features and improvements that make building React applications even better. In this post, we'll explore the key features and how to get started.

## What's New in Next.js 15

- **Improved App Router**: Better performance and developer experience
- **Enhanced Server Components**: More efficient rendering
- **Better TypeScript Support**: Improved type safety and IntelliSense
- **Optimized Bundle Size**: Smaller bundles for faster loading

## Getting Started

To create a new Next.js 15 project, run:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Key Features to Explore

1. **App Router**: The new routing system based on the file system
2. **Server Components**: Components that render on the server
3. **Client Components**: Interactive components that run in the browser
4. **API Routes**: Built-in API endpoints

## Conclusion

Next.js 15 continues to push the boundaries of what's possible with React applications. The improvements in performance, developer experience, and new features make it an excellent choice for modern web development.`,
      excerpt: 'Explore the exciting new features in Next.js 15 and learn how to get started with the latest version of this powerful React framework.',
      category: Category.TECH,
      tags: ['nextjs', 'react', 'web-development', 'javascript'],
      published: true,
    },
  })

  const post2 = await prisma.post.upsert({
    where: { slug: 'building-better-habits' },
    update: {},
    create: {
      slug: 'building-better-habits',
      title: 'Building Better Habits: A Personal Journey',
      content: `# Building Better Habits: A Personal Journey

Habits shape our daily lives more than we often realize. Over the past year, I've been on a journey to build better habits and break some old ones. Here's what I've learned along the way.

## The Science Behind Habits

Habits are formed through a loop of cue, routine, and reward. Understanding this loop is crucial for both building new habits and breaking old ones.

### The Habit Loop

1. **Cue**: The trigger that initiates the behavior
2. **Routine**: The behavior itself
3. **Reward**: The benefit you gain from the behavior

## My Personal Experience

### Morning Routine

I started with a simple morning routine:
- Wake up at 6 AM
- Drink a glass of water
- 10 minutes of meditation
- Review daily goals

### Exercise Habit

Building an exercise habit was challenging, but I found success by:
- Starting small (10 minutes daily)
- Choosing activities I enjoyed
- Tracking progress
- Celebrating small wins

## Key Lessons Learned

1. **Start Small**: Don't try to change everything at once
2. **Be Consistent**: Consistency beats intensity
3. **Track Progress**: What gets measured gets managed
4. **Be Patient**: Habits take time to form (21-66 days on average)
5. **Forgive Yourself**: Setbacks are normal and part of the process

## Tools That Helped

- **Habit tracking apps**: Simple visual progress tracking
- **Accountability partner**: Someone to check in with regularly
- **Environmental design**: Making good habits easier and bad habits harder

## Conclusion

Building better habits is a marathon, not a sprint. The key is to start small, be consistent, and be patient with yourself. Remember, every small step counts towards the person you want to become.`,
      excerpt: 'A personal reflection on building better habits, the science behind habit formation, and practical tips for creating lasting positive changes.',
      category: Category.LIFE,
      tags: ['habits', 'personal-development', 'productivity', 'lifestyle'],
      published: true,
    },
  })

  const post3 = await prisma.post.upsert({
    where: { slug: 'typescript-best-practices' },
    update: {},
    create: {
      slug: 'typescript-best-practices',
      title: 'TypeScript Best Practices for 2025',
      content: `# TypeScript Best Practices for 2025

TypeScript has become an essential tool for JavaScript developers. Here are the best practices I've learned from years of TypeScript development.

## Type Safety First

Always prioritize type safety over convenience. Use strict mode and enable all strict flags in your tsconfig.json:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
\`\`\`

## Interface vs Type

Use interfaces for object shapes that might be extended:

\`\`\`typescript
interface User {
  id: string
  name: string
  email: string
}

interface AdminUser extends User {
  permissions: string[]
}
\`\`\`

Use type aliases for unions, primitives, and computed types:

\`\`\`typescript
type Status = 'loading' | 'success' | 'error'
type UserKeys = keyof User
\`\`\`

## Generic Constraints

Use generic constraints to make your types more specific:

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
\`\`\`

## Utility Types

Leverage TypeScript's built-in utility types:

\`\`\`typescript
// Make all properties optional
type PartialUser = Partial<User>

// Pick specific properties
type UserSummary = Pick<User, 'id' | 'name'>

// Omit specific properties
type CreateUser = Omit<User, 'id'>
\`\`\`

## Conclusion

TypeScript is a powerful tool that can significantly improve your development experience and code quality. By following these best practices, you'll write more maintainable and robust code.`,
      excerpt: 'Essential TypeScript best practices for writing better, more maintainable code in 2025.',
      category: Category.TECH,
      tags: ['typescript', 'javascript', 'best-practices', 'programming'],
      published: true,
    },
  })

  const post4 = await prisma.post.upsert({
    where: { slug: 'work-life-balance-remote' },
    update: {},
    create: {
      slug: 'work-life-balance-remote',
      title: 'Maintaining Work-Life Balance While Working Remotely',
      content: `# Maintaining Work-Life Balance While Working Remotely

Remote work has become the new normal for many of us. While it offers flexibility and eliminates commuting, it also presents unique challenges for maintaining work-life balance.

## The Challenges

### Blurred Boundaries
When your home is your office, it's easy for work to spill into personal time and vice versa.

### Isolation
Working from home can be lonely, especially if you live alone or are used to a bustling office environment.

### Distractions
Home environments come with their own set of distractions - family, pets, household chores, and more.

## Strategies That Work

### 1. Create Physical Boundaries
- Designate a specific workspace
- Use a separate computer or user account for work
- Have a ritual to "commute" to and from work

### 2. Set Clear Time Boundaries
- Define specific work hours
- Use calendar blocking for personal time
- Turn off work notifications after hours

### 3. Maintain Social Connections
- Schedule regular video calls with colleagues
- Join virtual coworking sessions
- Take breaks to call friends or family

### 4. Prioritize Self-Care
- Take regular breaks throughout the day
- Go for walks or exercise
- Maintain hobbies and interests outside of work

## My Daily Routine

Here's what works for me:

**Morning (8:00 AM - 9:00 AM)**
- Coffee and news
- Review daily goals
- Quick workout or walk

**Work Block 1 (9:00 AM - 12:00 PM)**
- Deep work on important tasks
- No social media or personal tasks

**Lunch Break (12:00 PM - 1:00 PM)**
- Actual lunch away from the computer
- Short walk outside

**Work Block 2 (1:00 PM - 5:00 PM)**
- Meetings and collaborative work
- Email and administrative tasks

**Evening (5:00 PM onwards)**
- "Commute" ritual (close laptop, change clothes)
- Personal time and hobbies

## Tools and Apps

- **Time tracking**: RescueTime, Toggl
- **Focus**: Forest, Freedom
- **Communication**: Slack, Zoom
- **Project management**: Notion, Trello

## Conclusion

Remote work requires intentional effort to maintain balance. The key is to be proactive about setting boundaries and sticking to them. Remember, the goal is to work to live, not live to work.`,
      excerpt: 'Practical strategies and tips for maintaining a healthy work-life balance while working from home.',
      category: Category.LIFE,
      tags: ['remote-work', 'work-life-balance', 'productivity', 'lifestyle'],
      published: true,
    },
  })

  // Create sample comments
  await prisma.comment.createMany({
    data: [
      {
        content: 'Great introduction to Next.js 15! The new features look really promising.',
        author: 'Alex Chen',
        email: 'alex@example.com',
        postId: post1.id,
      },
      {
        content: 'Thanks for the detailed explanation. The App Router improvements are exactly what I was looking for.',
        author: 'Sarah Johnson',
        email: 'sarah@example.com',
        postId: post1.id,
      },
      {
        content: 'This really resonates with me. I\'ve been struggling with building consistent habits.',
        author: 'Mike Rodriguez',
        email: 'mike@example.com',
        postId: post2.id,
      },
      {
        content: 'The habit loop concept is so simple yet powerful. Thanks for sharing your journey!',
        author: 'Emily Davis',
        email: 'emily@example.com',
        postId: post2.id,
      },
      {
        content: 'Excellent TypeScript tips! The generic constraints section was particularly helpful.',
        author: 'David Kim',
        email: 'david@example.com',
        postId: post3.id,
      },
      {
        content: 'As someone new to TypeScript, this guide is exactly what I needed. Bookmarked!',
        author: 'Lisa Wang',
        email: 'lisa@example.com',
        postId: post3.id,
      },
      {
        content: 'Working from home has been challenging. Your daily routine gives me some great ideas to try.',
        author: 'Tom Wilson',
        email: 'tom@example.com',
        postId: post4.id,
      },
      {
        content: 'The physical boundaries tip is so important. I never thought about having a "commute" ritual!',
        author: 'Anna Martinez',
        email: 'anna@example.com',
        postId: post4.id,
      },
    ],
  })

  console.log('Database has been seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }) 