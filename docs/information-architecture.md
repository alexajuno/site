# 🧭 Information Architecture – Ajuno Labs Site

This document outlines the high-level structure of pages and content for the website.

---

## 🌐 Top-Level Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage — intro to Ajuno Labs, recent blog posts, featured projects |
| `/about` | About page — bio, purpose of site, contact/social links |
| `/blog` | Blog index — list of essays and reflections |
| `/projects` | Projects index — showcase of software experiments and tools |

---

## 📝 Blog

| Route | Purpose |
|-------|---------|
| `/blog/[slug]` | Individual blog/essay page, rendered from MDX or Markdown |
| `/blog/tags/[tag]` *(optional)* | List posts under a specific tag or topic (e.g., philosophy, tech) |

**Content stored as**:  
Markdown or MDX files in `/content/blog/`

---

## 🧪 Projects

| Route | Purpose |
|-------|---------|
| `/projects/[slug]` *(optional)* | Individual project detail page (if needed) |

Each project includes:
- Title
- Description
- Tags (e.g., AI, Web, Indie)
- Link (GitHub, live demo)

**Content format**: JSON, YAML, or MDX in `/content/projects/`

---

## ⚙️ Site Meta

- **Navigation bar**:
  - Home
  - Blog
  - Projects
  - About

- **Footer**:
  - Copyright © Ajuno Labs
  - Social links (GitHub, LinkedIn, Email)

---

## 📌 Future Add-ons

- `/search` — site-wide search
- `/tags` — explore by topic
- `/rss.xml` — RSS feed for blog
- `/now` — optional "Now" page (what you're currently working on)