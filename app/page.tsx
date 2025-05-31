import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {Github, Linkedin, Mail, ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-white hover:text-gray-300 transition-colors">
              Ajuno Labs
            </Link>
            <div className="flex items-center space-x-8">
              <Link href="/blog" className="text-gray-300 hover:text-white transition-colors font-medium">
                Blog
              </Link>
              <Link href="/projects" className="text-gray-300 hover:text-white transition-colors font-medium">
                Projects
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors font-medium">
                About
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Ideas, Experiments, and Essays
          </h1>
          <p className="text-xl lg:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">A digital garden by Giao Le</p>
          <Button
            size="lg"
            className="bg-white text-gray-950 hover:bg-gray-200 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Read the Blog
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Featured Blog Post */}
            <Card className="bg-gray-900/50 border-gray-800 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-gray-900/70 rounded-2xl">
              <CardHeader className="pb-4">
                <div className="text-sm text-gray-500 mb-2">Featured Post</div>
                <CardTitle className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  Building a Second Brain in the Digital Age
                </CardTitle>
                <CardDescription className="text-gray-400 text-base leading-relaxed">
                  Exploring how digital tools can augment our thinking and creativity. A deep dive into personal
                  knowledge management systems and the art of connecting ideas across domains.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link
                  href="/blog/building-second-brain"
                  className="inline-flex items-center text-white hover:text-gray-300 font-medium transition-colors group"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>

            {/* Featured Project */}
            <Card className="bg-gray-900/50 border-gray-800 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-gray-900/70 rounded-2xl">
              <CardHeader className="pb-4">
                <div className="text-sm text-gray-500 mb-2">Featured Project</div>
                <CardTitle className="text-2xl lg:text-3xl font-bold text-white mb-3">Neural Garden</CardTitle>
                <CardDescription className="text-gray-400 text-base leading-relaxed">
                  An experimental note-taking app that uses AI to surface connections between ideas. Built with Next.js,
                  TypeScript, and OpenAI's API to create a living knowledge graph.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <p className="text-gray-400">© {new Date().getFullYear()} Ajuno Labs. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="https://github.com"
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:hello@ajunolabs.com"
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
