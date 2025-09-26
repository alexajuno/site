import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Menu } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="inline-flex items-center justify-center rounded-md border border-input bg-background p-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle sidebar</span>
            </SidebarTrigger>
            <Link href="/" className="text-xl font-bold text-foreground hover:text-muted-foreground transition-colors">
              Ajuno Labs
            </Link>
          </div>
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
