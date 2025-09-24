import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="py-4 lg:py-6">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent leading-normal">
          Ideas, Experiments, and Essays
        </h1>
        <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A digital garden by Alex Ajuno
        </p>
        <Link href="/blog">
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Read the Blog
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
