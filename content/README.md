# Blog Content Management

This blog uses a **markdown-based workflow** with database synchronization for the best of both worlds: easy authoring and dynamic features.

## 📝 Writing Workflow

### 1. Create a New Post

Generate a new post template:

```bash
pnpm new-post "Your Post Title"
# or specify category
pnpm new-post "Your Life Story" Life
```

### 2. Edit the Markdown File

Edit the generated file in `content/posts/your-post-title.md`:

```markdown
---
slug: your-post-title
title: "Your Post Title"
date: "2025-01-07T10:00:00+07:00"
category: "Tech"  # or "Life"
tags: ["React", "TypeScript", "Web Development"]
excerpt: "Brief description that appears in listings and meta tags."
---

# Your Post Title

Write your content here using standard markdown...
```

### 3. Sync to Database

When ready to publish:

```bash
pnpm sync-posts
```

This will:
- Parse all markdown files in `content/posts/`
- Create/update posts in the database
- Handle tags automatically
- Set posts as published

## 📁 File Structure

```
content/
├── posts/
│   ├── getting-started-with-nextjs-15.md
│   ├── my-coding-journey.md
│   └── your-new-post.md
└── README.md (this file)
```

## 🏷️ Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `slug` | ✅ | URL-friendly identifier (auto-generated if missing) |
| `title` | ✅ | Post title |
| `date` | ✅ | Publication date (ISO format) |
| `updated` | ❌ | Last updated date |
| `category` | ✅ | "Tech" or "Life" |
| `tags` | ❌ | Array of tags |
| `excerpt` | ✅ | Brief description for listings |

## ✨ Benefits of This Approach

### ✅ Advantages
- **Easy editing** - Use any markdown editor
- **Version control** - Track changes in git
- **Dynamic features** - Comments, search, filtering work
- **Fast serving** - Content served from database
- **SEO friendly** - Proper meta tags and structure
- **Backup** - Content exists in both git and database

### 🔄 Workflow
1. Write in markdown (offline capable)
2. Sync to database (when ready)
3. Content appears live immediately
4. Comments and interactions work dynamically

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm new-post "Title"` | Create new post template |
| `pnpm sync-posts` | Sync markdown files to database |
| `pnpm dev` | Start development server |

## 📚 Markdown Features

Support for:
- Standard markdown syntax
- Code blocks with syntax highlighting
- Links and images
- Lists and tables
- Headers and formatting

## 🚀 Publishing Process

1. **Draft**: Write your post in markdown
2. **Review**: Preview locally with `pnpm dev`
3. **Publish**: Run `pnpm sync-posts`
4. **Deploy**: Push to git (if using auto-deploy)

## 💡 Tips

- Keep slug URLs SEO-friendly
- Write descriptive excerpts
- Use relevant tags for discoverability
- Include proper headings for structure
- Add images to `public/images/` and reference them
- Test locally before syncing 