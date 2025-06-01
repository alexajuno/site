import { Mail } from "lucide-react"
import Link from "next/link"
import { GitHubIcon } from "@/components/icons/github-icon"
import { LinkedInIcon } from "@/components/icons/linkedin-icon"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <p className="text-muted-foreground">© {new Date().getFullYear()} Ajuno Labs. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              href="https://github.com/alexajuno"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent rounded-lg"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/giao-le-02606b323/"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent rounded-lg"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:giolynx@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent rounded-lg"
              aria-label="Email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 