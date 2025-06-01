import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

export function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-foreground hover:text-muted-foreground transition-colors">
            Ajuno Labs
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Blog
            </Link>
            <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Projects
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              About
            </Link>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
} 