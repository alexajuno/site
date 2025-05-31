# 📍 Information Architecture – Ajuno Labs Site

This document outlines the high-level structure of pages and content for the website, including both longform essays and short daily notes.

---

## 🌐 Top-Level Pages

| Route       | Purpose                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------- |
| `/`         | Homepage — intro to Ajuno Labs, recent blog posts (essays and notes), and featured projects |
| `/about`    | About page — bio, purpose of site, and contact/social links                                 |
| `/blog`     | Blog index — lists all posts (essays + notes) with filters                                  |
| `/projects` | Projects index — showcase of software experiments and tools                                 |

---

## 📜 Blog

| Route              | Purpose                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `/blog`            | Blog index — shows all posts (essays + notes), sorted by date, with filters by post type |
| `/blog/[slug]`     | Individual post page — renders a single essay or note, based on frontmatter              |
| `/blog/tags/[tag]` | *(optional)* View all posts associated with a specific tag (e.g., philosophy, tech)      |
| `/blog/type/essay` | *(optional)* Filtered list of only posts marked as "Essay"                               |
| `/blog/type/note`  | *(optional)* Filtered list of only posts marked as "Note"                                |

**Content stored in:**
`/content/blog/`

**Frontmatter format:**

```yaml
---
title: "Post Title"
date: "2025-06-01"
type: "Essay" # or "Note"
tags: ["philosophy", "reflection"]
---
```

* **Essays**: Longform posts (reflective, structured, 800+ words)
* **Notes**: Short posts (daily thoughts, insights, 100–400 words), not diary entries but lightweight and shareable

---

## 🧪 Projects

| Route              | Purpose                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `/projects`        | Projects index — card/grid layout of project titles, descriptions, tags, and external links |
| `/projects/[slug]` | *(optional)* Individual project page with in-depth description, screenshots, and tech stack |

**Content stored in:**
`/content/projects/`
Format: `.mdx`, `.yaml`, or `.json`

Each project includes:

* Title
* Short description
* Tags (e.g., AI, Web, Indie)
* Links (GitHub, live demo)
* Optional full write-up

---

## ⚙️ Site Meta

### Navigation Bar

* Home
* Blog (dropdown or filter: All, Essays, Notes)
* Projects
* About

### Footer

* Copyright © Ajuno Labs
* Social links (GitHub, LinkedIn, Email)

---

## 📌 Future Add-ons

| Route      | Feature                                             |
| ---------- | --------------------------------------------------- |
| `/search`  | Site-wide search across essays, notes, and projects |
| `/tags`    | Explore posts by tag                                |
| `/rss.xml` | RSS feed for blog (can split essays and notes)      |
| `/now`     | Optional “Now” page — current activities and focus  |