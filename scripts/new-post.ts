#!/usr/bin/env ts-node

import fs from 'fs'
import path from 'path'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function createPostTemplate(title: string, category: 'Tech' | 'Life' = 'Tech') {
  const slug = slugify(title)
  const now = new Date()
  const date = now.toISOString()
  
  const template = `---
slug: ${slug}
title: "${title}"
date: "${date}"
category: "${category}"
tags: []
excerpt: "Brief description of your post content. This will appear in the blog listing and meta descriptions."
---

# ${title}

## Introduction

Write your introduction here.

## Main Content

Add your main content sections here.

## Conclusion

Wrap up your thoughts and key takeaways.
`

  const postsDir = path.join(process.cwd(), 'content/posts')
  const filename = `${slug}.md`
  const filepath = path.join(postsDir, filename)

  if (fs.existsSync(filepath)) {
    console.log(`❌ Post "${filename}" already exists!`)
    return
  }

  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true })
  }

  fs.writeFileSync(filepath, template)
  console.log(`✅ Created new post: ${filename}`)
  console.log(`📝 Edit: ${filepath}`)
  console.log(`🔄 Run "pnpm sync-posts" when ready to publish`)
}

// CLI interface
const args = process.argv.slice(2)

if (args.length === 0) {
  console.log('📝 Blog Post Generator')
  console.log('')
  console.log('Usage:')
  console.log('  pnpm new-post "Your Post Title"')
  console.log('  pnpm new-post "Your Post Title" Tech')
  console.log('  pnpm new-post "Your Post Title" Life')
  console.log('')
  console.log('Examples:')
  console.log('  pnpm new-post "Building a React Component Library"')
  console.log('  pnpm new-post "My Morning Routine" Life')
  process.exit(0)
}

const title = args[0]
const category = (args[1] as 'Tech' | 'Life') || 'Tech'

if (!['Tech', 'Life'].includes(category)) {
  console.log('❌ Category must be either "Tech" or "Life"')
  process.exit(1)
}

createPostTemplate(title, category) 