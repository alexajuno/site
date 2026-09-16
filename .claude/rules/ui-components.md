---
paths:
  - "src/**/*.astro"
  - "src/**/*.tsx"
---

# UI components

Build UI from the shadcn/ui primitives in `@/components/ui/` rather than hand-rolled markup. A styled `<button>` should be `Button`, a bordered container should be `Card` with its `CardHeader` / `CardTitle` / `CardDescription` parts, and so on. The primitives carry the project's design tokens, dark mode, and focus and ARIA behavior; equivalent raw markup drifts from all three and has to be maintained by hand.

Only `button` and `card` are installed so far. When a primitive is missing, install it with `bunx shadcn@latest add <name>` instead of writing a local substitute.

Plain HTML is still correct for semantic and structural elements that have no shadcn counterpart — `<main>`, `<article>`, `<section>`, `<time>`, headings, paragraphs, and anything rendered from markdown content. The rule is about not rebuilding an interactive or styled primitive that already exists, not about avoiding HTML.

This project uses the `base-nova` style, where a primitive renders as a different element through the `render` prop rather than `asChild`:

```astro
<Button variant="ghost" render={createElement('a', { href: '/blog' })}>Back to blog</Button>
```
