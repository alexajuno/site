## 🧾 Software Requirements Specification (SRS)

**Project Name:** `ajuno-labs-site`
**Version:** 1.0
**Author:** Giao Le (aka AlexaJuno)
**Date:** May 2025

---

### 1. **Introduction**

#### 1.1 Purpose

This website represents the official online presence of **Ajuno Labs** — a personal brand and project space by Giao Le. It serves as a digital garden, a blog, a project showcase, and a minimal portfolio.

#### 1.2 Scope

The site will include:

* A landing/homepage with intro and links
* A blog for publishing essays on philosophy, technology, and personal insights
* A projects page to list and describe personal/experimental works
* An about/contact section

It will be built with **Next.js** and deployed via **Vercel**.

#### 1.3 Definitions

* **CMS**: Content Management System
* **MDX**: Markdown + JSX for blog posts
* **Static site generation (SSG)**: HTML pages built at build time

---

### 2. **Overall Description**

#### 2.1 Product Perspective

This is a **standalone website** using Next.js framework. No third-party CMS (initially). Blog posts will be stored as Markdown or MDX files.

#### 2.2 User Classes and Characteristics

* **General Visitors**: View blog posts, explore projects, learn about the author
* **Site Owner (Giao)**: Writes content (via files), updates projects

#### 2.3 Constraints

* Site must load quickly and be optimized for SEO
* Content should be easily maintainable without a full backend
* Must support responsive design for desktop and mobile
* Hosting is on **Vercel**

#### 2.4 Assumptions

* No user authentication required
* No dynamic user interaction initially (e.g., no comments)
* Content will be updated through local development, not admin panel

---

### 3. **Functional Requirements**

| ID  | Description                                                                   |
| --- | ----------------------------------------------------------------------------- |
| FR1 | The system shall display a landing page with a welcome message and navigation |
| FR2 | The system shall list blog posts and support individual blog post pages       |
| FR3 | The system shall render blog posts from Markdown/MDX files                    |
| FR4 | The system shall list projects with descriptions and links                    |
| FR5 | The system shall include an "About" section                                   |
| FR6 | The system shall include links to social profiles (e.g., GitHub, LinkedIn)    |

---

### 4. **Non-Functional Requirements**

| ID   | Description                                                      |
| ---- | ---------------------------------------------------------------- |
| NFR1 | The system shall be optimized for SEO and social sharing         |
| NFR2 | The system shall be responsive (mobile/tablet/desktop)           |
| NFR3 | The system shall load within 1s on a typical connection          |
| NFR4 | The system shall support dark mode                               |
| NFR5 | The system shall be maintainable via Git repo and Markdown files |

---

### 5. **Future Enhancements (Optional)**

* Integrate a CMS (like Sanity, Notion, or Contentlayer)
* Add search functionality for blog
* Add tags/categories to blog
* Add RSS feed
* Add light comment system (like Giscus or utterances)
* Add analytics (e.g., Plausible or Vercel Analytics)