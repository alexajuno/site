# Personal Blog Site

A modern blog built with Next.js 15, TypeScript, Tailwind CSS, Prisma ORM, and PostgreSQL.

## Features

- 📝 Blog posts with categories (Tech, Life)
- 🔍 Search functionality
- 🏷️ Tag-based filtering
- 💬 Comments system
- 📱 Responsive design
- 🌙 Dark/Light mode
- 🎨 Modern UI with shadcn/ui components

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Database Setup

1. **Start PostgreSQL with Docker**:
   ```bash
   docker compose up -d
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```

3. **Run database migrations**:
   ```bash
   pnpm prisma migrate dev --name init
   ```

4. **Generate Prisma client**:
   ```bash
   pnpm prisma generate
   ```

5. **Seed the database with sample data**:
   ```bash
   pnpm prisma db seed
   ```

6. **Sync markdown posts to database** (optional):
   ```bash
   pnpm sync-posts
   ```

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Set up the database** (see Database Setup section above)

3. **Run the development server**:
   ```bash
   pnpm dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm sync-posts` - Sync markdown posts from content/posts to database (requires DB setup)
- `pnpm new-post` - Create a new blog post
- `pnpm vercel-build` - Production build for Vercel deployment
- `pnpm prisma studio` - Open Prisma Studio (database GUI)
- `pnpm prisma db seed` - Seed database with sample data

## License

MIT License - see LICENSE file for details.
