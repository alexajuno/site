import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const skills = [
    "Laravel",
    "Next.js",
    "Python",
    "Docker",
    "Redis",
    "HuggingFace",
    "GitHub Actions",
  ];

  const projects = [
    {
      name: "finitor",
      description: "CLI tool for personal finance",
      type: "CLI Tool",
      url: "https://github.com/alexajuno/finitor",
    },
    {
      name: "jamc",
      description: "Q&A + Learning‑management prototype",
      type: "Web Platform",
      url: "https://github.com/alexajuno/jamc",
    },
    {
      name: "Bug Localization and Report",
      description: "Exploratory NLP work on automated bug localization",
      type: "Research",
      url: "https://github.com/alexajuno/bug-localization-and-report",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-6 py-12 space-y-16">
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Hi, I&apos;m <span className="text-primary">Giao</span>.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Backend‑leaning developer based in Vietnam. I enjoy shipping tidy
            code, learning in public, and exploring how tech meets everyday
            needs.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" aria-hidden="true" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg">Ownego Internship</h3>
                <p className="text-muted-foreground mb-2">
                  Backend Development
                </p>
                <p className="text-sm">
                  Built a backend API for a loyalty app using Laravel and
                  Shopify’s native store credit system, with PostgreSQL for
                  persistence.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Side Projects</h3>
                <div className="space-y-3">
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-primary/20 pl-4"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:underline"
                        >
                          {project.name}
                        </Link>
                        <Badge variant="secondary" className="text-xs">
                          {project.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium">Backend &amp; Infra:</span>{" "}
                  Laravel · Python · Docker · Redis
                </p>
                <p>
                  <span className="font-medium">
                    Frontend &amp; Full‑stack:
                  </span>{" "}
                  Next.js · React · Tailwind
                </p>
                <p>
                  <span className="font-medium">AI &amp; DevOps:</span>{" "}
                  HuggingFace · GitHub Actions · CI/CD
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Writing &amp; Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                I jot down notes as I learn — from API design patterns to small
                experiments with AI agents. Nothing too grand, mostly
                breadcrumbs for future‑me and anyone who finds them useful.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
