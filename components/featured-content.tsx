import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { GitHubIcon } from "@/components/icons/github-icon";

export function FeaturedContent() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Featured Blog Post */}
          <Card className="bg-card/50 border-border shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-card/70 rounded-2xl">
            <CardHeader className="pb-4">
              <div className="text-sm text-muted-foreground mb-2">
                Featured Post
              </div>
              <CardTitle className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                Some Retrospective Thoughts on Building JAMC - A Q&A Platform
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base leading-relaxed">
                Looking back at building JAMC, a Q&A platform, and the lessons learned along the way. Reflections on technical decisions, challenges faced, and the future of the project.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link
                href="/blog/some-retrospective-thoughts-on-my-qa-platform"
                className="inline-flex items-center text-foreground hover:text-muted-foreground font-medium transition-colors group"
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </CardContent>
          </Card>

          {/* Featured Project */}
          <Card className="bg-card/50 border-border shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-card/70 rounded-2xl">
            <CardHeader className="pb-4">
              <div className="text-sm text-muted-foreground mb-2">
                Featured Project
              </div>
              <CardTitle className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                JAMC
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base leading-relaxed">
                An experimental Q&A platform integrating with an LMS to bridge
                the gap between student questions and teachers. Built with
                Next.js.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border text-muted-foreground hover:bg-accent hover:text-foreground rounded-lg"
                >
                  <GitHubIcon className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Link href="https://jamc.vercel.app">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border text-muted-foreground hover:bg-accent hover:text-foreground rounded-lg"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
