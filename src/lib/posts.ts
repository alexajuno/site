import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/**
 * Posts are dated in the author's local time, and some carry an explicit +0700
 * offset. Formatting in UTC would render those a day early, and formatting in
 * the build machine's zone would make the output depend on where it built, so
 * every date is rendered in this fixed zone.
 */
const SITE_TIMEZONE = 'Asia/Bangkok';

/** Every post, newest first. */
export async function getSortedPosts(): Promise<Post[]> {
	const posts = await getCollection('blog');
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** `2026-07-24` — sortable and fixed-width, so listing rows stay in column. */
export function formatISODate(date: Date): string {
	return new Intl.DateTimeFormat('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		timeZone: SITE_TIMEZONE,
	}).format(date);
}

/** `July 24, 2026` — for prose contexts where the long form reads better. */
export function formatLongDate(date: Date): string {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: SITE_TIMEZONE,
	}).format(date);
}

/** The year a post belongs to, in the same zone its date is displayed in. */
export function getYear(date: Date): number {
	return Number(formatISODate(date).slice(0, 4));
}
