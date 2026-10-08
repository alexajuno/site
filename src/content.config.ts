import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { load } from 'js-yaml';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
	}),
});

// The file loader wants an id on every list item. Keying by url lets the yaml
// stay a plain list that nobody numbers.
const bookmarks = defineCollection({
	loader: file('src/content/bookmarks.yaml', {
		parser: (text) =>
			Object.fromEntries((load(text) as { url: string }[]).map((b) => [b.url, b])),
	}),
	schema: z.object({
		url: z.url(),
		title: z.string(),
		added: z.coerce.date(),
		note: z.string().optional(),
	}),
});

export const collections = { blog, bookmarks };
