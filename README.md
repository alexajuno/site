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

1. **Set up PostgreSQL database**:
   - Install PostgreSQL locally or use a cloud service (Supabase, Railway, etc.)
   - Create a new database named `blog_db`

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   Update the `DATABASE_URL` in `.env` with your PostgreSQL connection string:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/blog_db?schema=public"
   ```

3. **Run database migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Seed the database with sample data**:
   ```bash
   npx prisma db seed
   ```

5. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up the database** (see Database Setup section above)

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   └── post/              # Individual post pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                   # Utility functions
│   ├── generated/        # Generated Prisma client
│   └── db.ts             # Database functions
├── prisma/               # Prisma schema and migrations
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding script
└── ...
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma db seed` - Seed database with sample data

## License

MIT License - see LICENSE file for details.
