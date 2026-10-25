---
name: blog-post
description: How the user writes posts for their blog in this repo (alexajuno.com, Astro, posts in src/content/blog) - the voice, how generic a story from work should be, titles, numbers, diagrams and refs, and how a post is checked and published. Use whenever writing, drafting, editing, shortening or retitling a post here, or turning a problem, fix or lesson from a work session or desk issue into a post, even when "blog" is not said. Triggers include "write a blog about", "a post on", "turn this into a post", "blog this", "new post", "shorter title", "make it more generic", "fix the wording in the post".
---

# Writing a post

The user writes short, plain posts about technical problems they met at work and what they learnt from them. A post explains the shape of the problem so any reader gets it. It is not an incident report.

## Before writing

- Find the source: the desk issue or session the problem came from (its Context, Plan and Result) and any scout findings in `~/notes/findings`. Take the facts from there, not from memory.
- Read the latest posts in `src/content/blog` for the voice. The ones the user shaped most are `a-hot-row-on-last-used-at.md` and `fetching-user-supplied-urls.md`.

## What a post is

- **Generic.** Tell the problem as any reader would meet it. Name no product, customer, vendor, company or framework from work. Name a tool only when the reader uses it too, such as curl.
- **In the reader's terms.** Drop internal words that change nothing for the reader. "a worker downloads an image" became "a user gives us a url to their image, and we download it".
- **Honest about what the user did.** They "relearnt the network basics" or "learnt what each failure looks like from curl's error messages". Never claim more understanding or more work than they did. When the fix is not on prod yet, say so in one plain line, with how they will check it: "this is just a design for now, it's not on prod yet. once it is, i'll look at the metrics".
- **No numbers from the incident.** Leave out failure rates, exact timeouts, counts and ratios such as "39 of 40". Use words instead: "some requests, at some hours", "a bit above the slowest healthy one", "almost every retry". An illustration may keep rough numbers, rounded and labelled: a column "takes about" with "5 ms".
- **No tool syntax.** Don't paste a command and its flags for the reader to copy. Say what the tool showed and what that taught.
- **The fix said plainly.** Write "only write it back when the stored value is older than a minute", not "the fix is simple: ...". When others solve it the same way, say so in a line and link them in the refs.
- **One topic, and only the mechanism.** Leave a side topic for its own post, even when it explains a detail. The security reason a client pins one address stayed out of the user-supplied urls post, for a later post on url download security. Leave out how your own stack does it, too: which http client, what it caches, what makes a new one. Keep only what the reader needs. A fix that fits only this incident's host gets one generic line: "a host often runs on many servers, so when one is stuck, trying again might land on another one that works."
- **No closing summary.** A "what i took from it" line repeats the post, which is the takeaway already. End on the last real point.
- **Short.** One thing per paragraph. The hot row post is about 240 words, and about 600 is the upper end.

When the user corrects one spot, apply the correction to the whole post. "Don't use numbers" meant every incident number, not only the one they quoted.

## Voice

- Lowercase throughout, title included. First person, short paragraphs, plain words.
- Casual is fine: "sth", "kinda", "recently i ...".

## Title and file

- The problem's established name, a few words, straight to the point: "hot row problem", "fetching user-supplied urls". Look up how docs, prior art or the scout's findings name it, rather than describing the incident. "a download that just hangs" was too long and too specific.
- The file is `src/content/blog/<slug of the title>.md`. Its frontmatter holds only `title` and `pubDate` (`YYYY-MM-DD`), as `src/content.config.ts` defines.

## Diagrams and tables

- Use plain ASCII in a ```` ```text ```` block. It cannot misalign on a font fallback, and the code box follows the light and dark themes.
- Name every table's columns.
- Keep it under about 60 characters wide, so the code box fits without scrolling, and check that in the browser.

## Facts and refs

- Check every claim about how a tool behaves. Run it where you can: curl's error messages were checked by making each failure happen locally. Otherwise read its source or docs.
- End with `## refs`, a list of primary sources: official docs, the original book or article, or source code. Open each one, check that it says what the post claims, and link its current address rather than a redirect.
- Put command-line flags in link text inside backticks. Otherwise the site's typography turns `--` into an en dash.

## Check and publish

- Work as `.claude/rules/where-to-work.md` says: on main, with no branch, and uncommitted until the user approves.
- `bunx astro build` must pass.
- Serve it with `bunx astro dev --background` and open `http://localhost:4321/blog/<slug>`.
- Before a screenshot, remove the `astro-dev-toolbar` element, which overlaps the page.
- On approval, make one commit, `add <topic> post` (`.claude/rules/commit-style.md`), then `git push origin main`. Cloudflare Pages builds alexajuno.com from main. Stop the dev server with `bunx astro dev stop`.
