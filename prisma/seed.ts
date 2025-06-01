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
      tags: ['nextjs', 'react', 'web-development', 'javascript', 'framework', 'frontend'],
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
      tags: ['habits', 'personal-development', 'productivity', 'lifestyle', 'self-improvement', 'mindfulness'],
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
      tags: ['typescript', 'javascript', 'best-practices', 'programming', 'development', 'type-safety'],
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
      tags: ['remote-work', 'work-life-balance', 'productivity', 'lifestyle', 'wellness', 'home-office'],
      published: true,
    },
  })

  // Add more posts with diverse tags
  const post5 = await prisma.post.upsert({
    where: { slug: 'react-server-components-guide' },
    update: {},
    create: {
      slug: 'react-server-components-guide',
      title: 'Understanding React Server Components',
      content: `# Understanding React Server Components

React Server Components represent a fundamental shift in how we think about React applications. Let's explore what they are and how to use them effectively.

## What are Server Components?

Server Components are React components that render on the server, allowing us to:
- Reduce bundle size
- Improve initial page load
- Access server-side data directly
- Better SEO performance

## Key Benefits

1. **Zero JavaScript Bundle**: Server components don't ship JavaScript to the client
2. **Direct Database Access**: Fetch data directly without API layers
3. **Better Performance**: Faster initial page loads
4. **SEO Friendly**: Fully rendered HTML for search engines

## Example Usage

\`\`\`jsx
// Server Component
async function BlogPost({ id }) {
  const post = await db.post.findUnique({ where: { id } })
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
\`\`\`

## Best Practices

- Keep server components simple
- Use client components for interactivity
- Minimize prop drilling
- Leverage Suspense boundaries

## Conclusion

Server Components are a powerful tool for building faster, more efficient React applications. Understanding when and how to use them is crucial for modern web development.`,
      excerpt: 'A comprehensive guide to React Server Components, their benefits, and how to use them effectively in your applications.',
      category: Category.TECH,
      tags: ['react', 'server-components', 'performance', 'web-development', 'frontend', 'nextjs'],
      published: true,
    },
  })

  const post6 = await prisma.post.upsert({
    where: { slug: 'mindfulness-meditation-beginners' },
    update: {},
    create: {
      slug: 'mindfulness-meditation-beginners',
      title: 'Mindfulness Meditation for Beginners',
      content: `# Mindfulness Meditation for Beginners

Mindfulness meditation is a simple yet powerful practice that can transform your daily life. If you're new to meditation, this guide will help you get started.

## What is Mindfulness?

Mindfulness is the practice of being fully present and engaged in the current moment. It involves:
- Awareness of thoughts and feelings
- Non-judgmental observation
- Acceptance of the present moment
- Letting go of past and future worries

## Getting Started

### 1. Find a Quiet Space
Choose a comfortable, quiet place where you won't be disturbed.

### 2. Start Small
Begin with just 5-10 minutes per day.

### 3. Focus on Your Breath
Use your breath as an anchor to the present moment.

### 4. Be Patient
Don't expect immediate results. Meditation is a practice.

## Simple Techniques

### Breath Awareness
1. Sit comfortably with eyes closed
2. Focus on your natural breathing
3. When your mind wanders, gently return to your breath
4. Continue for your chosen duration

### Body Scan
1. Start at the top of your head
2. Slowly move attention through your body
3. Notice sensations without judgment
4. End at your toes

## Common Challenges

- **Wandering Mind**: This is normal! Gently redirect focus
- **Restlessness**: Start with shorter sessions
- **Sleepiness**: Try meditating when more alert
- **Doubt**: Be patient with the process

## Benefits You May Experience

- Reduced stress and anxiety
- Better sleep quality
- Improved focus and concentration
- Greater emotional regulation
- Enhanced self-awareness

## Building a Practice

1. **Consistency**: Same time and place daily
2. **Community**: Join meditation groups or apps
3. **Learning**: Read books or take courses
4. **Patience**: Be kind to yourself

## Conclusion

Mindfulness meditation is a journey, not a destination. Start small, be consistent, and remember that every moment of awareness counts. Your future self will thank you for starting today.`,
      excerpt: 'A beginner-friendly guide to mindfulness meditation, including simple techniques, common challenges, and tips for building a sustainable practice.',
      category: Category.LIFE,
      tags: ['mindfulness', 'meditation', 'mental-health', 'wellness', 'self-care', 'stress-relief'],
      published: true,
    },
  })

  const post7 = await prisma.post.upsert({
    where: { slug: 'css-grid-vs-flexbox' },
    update: {},
    create: {
      slug: 'css-grid-vs-flexbox',
      title: 'CSS Grid vs Flexbox: When to Use Each',
      content: `# CSS Grid vs Flexbox: When to Use Each

Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes. Understanding when to use each will make you a more effective developer.

## CSS Flexbox

Flexbox is designed for one-dimensional layouts (row or column).

### Best Use Cases
- Navigation bars
- Centering content
- Distributing space among items
- Responsive button groups

### Example
\`\`\`css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## CSS Grid

Grid is designed for two-dimensional layouts (rows and columns).

### Best Use Cases
- Page layouts
- Card layouts
- Complex responsive designs
- Magazine-style layouts

### Example
\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}
\`\`\`

## When to Use What

### Use Flexbox When:
- Working with a single dimension
- Items need to grow/shrink
- Content determines layout
- Aligning items in a container

### Use Grid When:
- Working with two dimensions
- Need precise control over rows/columns
- Layout determines content placement
- Creating complex responsive layouts

## Combining Both

You can use Grid and Flexbox together:

\`\`\`css
.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
\`\`\`

## Conclusion

Both tools are valuable and complement each other. Grid for overall layout structure, Flexbox for component-level alignment and distribution.`,
      excerpt: 'Learn the key differences between CSS Grid and Flexbox, when to use each, and how they can work together in modern web development.',
      category: Category.TECH,
      tags: ['css', 'grid', 'flexbox', 'layout', 'web-development', 'frontend', 'responsive-design'],
      published: true,
    },
  })

  const post8 = await prisma.post.upsert({
    where: { slug: 'digital-minimalism-productivity' },
    update: {},
    create: {
      slug: 'digital-minimalism-productivity',
      title: 'Digital Minimalism: Reclaiming Your Focus',
      content: `# Digital Minimalism: Reclaiming Your Focus

In our hyper-connected world, digital minimalism offers a path to intentional technology use and improved productivity.

## What is Digital Minimalism?

Digital minimalism is a philosophy that helps you focus on using technology in ways that support your values and goals.

### Core Principles
1. **Intentional Use**: Every digital tool should serve a purpose
2. **Quality over Quantity**: Fewer, better tools
3. **Regular Decluttering**: Periodic review and removal
4. **Mindful Consumption**: Conscious choice over automatic habit

## The Problem with Digital Clutter

- Constant notifications break focus
- Information overload causes decision fatigue
- Social media creates comparison and FOMO
- Device switching reduces productivity

## Practical Steps

### 1. Digital Declutter
- Uninstall unused apps
- Unsubscribe from unnecessary emails
- Remove apps from home screen
- Use app timers and restrictions

### 2. Notification Management
- Turn off non-essential notifications
- Use Do Not Disturb modes
- Batch process emails and messages
- Set specific times for checking devices

### 3. Intentional Consumption
- Choose quality content sources
- Set reading/watching limits
- Use bookmarks instead of endless scrolling
- Practice the "one tab rule"

### 4. Create Tech-Free Zones
- No phones during meals
- Device-free bedroom
- Designated work hours
- Regular digital sabbaths

## Tools for Digital Minimalism

- **Focus apps**: Forest, Freedom, Cold Turkey
- **Minimalist launchers**: Niagara, Before Launcher
- **Reading apps**: Pocket, Instapaper
- **Note-taking**: Obsidian, Notion (used minimally)

## Benefits I've Experienced

- Improved focus and concentration
- Better sleep quality
- More time for meaningful activities
- Reduced anxiety and stress
- Stronger real-world relationships

## Starting Your Journey

1. **Audit**: Track current digital habits
2. **Identify**: What adds value vs. what doesn't
3. **Remove**: Eliminate or reduce low-value tools
4. **Replace**: Find analog alternatives where possible
5. **Review**: Regular check-ins and adjustments

## Conclusion

Digital minimalism isn't about rejecting technology—it's about using it intentionally. Start small, be patient with yourself, and remember that the goal is to make technology serve you, not the other way around.`,
      excerpt: 'Explore digital minimalism principles and practical strategies to reduce digital clutter, improve focus, and reclaim control over your technology use.',
      category: Category.LIFE,
      tags: ['digital-minimalism', 'productivity', 'focus', 'technology', 'lifestyle', 'mindfulness', 'time-management'],
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
      {
        content: 'Server Components are game-changing! Thanks for the clear explanation.',
        author: 'Chris Lee',
        email: 'chris@example.com',
        postId: post5.id,
      },
      {
        content: 'This helped me understand when to use server vs client components. Great examples!',
        author: 'Jordan Taylor',
        email: 'jordan@example.com',
        postId: post5.id,
      },
      {
        content: 'I\'ve been wanting to start meditation. This guide makes it feel less intimidating.',
        author: 'Maya Patel',
        email: 'maya@example.com',
        postId: post6.id,
      },
      {
        content: 'The body scan technique has become part of my daily routine. Thank you!',
        author: 'Robert Zhang',
        email: 'robert@example.com',
        postId: post6.id,
      },
      {
        content: 'Finally understand the difference between Grid and Flexbox! This is so helpful.',
        author: 'Samantha Brown',
        email: 'samantha@example.com',
        postId: post7.id,
      },
      {
        content: 'The practical examples make it easy to know which layout method to choose.',
        author: 'Kevin O\'Connor',
        email: 'kevin@example.com',
        postId: post7.id,
      },
      {
        content: 'Digital minimalism has changed my life. Great tips for getting started!',
        author: 'Rachel Green',
        email: 'rachel@example.com',
        postId: post8.id,
      },
      {
        content: 'The notification management section is gold. Already seeing improvements in my focus.',
        author: 'Daniel Kumar',
        email: 'daniel@example.com',
        postId: post8.id,
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