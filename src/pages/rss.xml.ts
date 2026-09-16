import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getSortedPosts } from '@/lib/posts';

export async function GET(context: APIContext) {
	const posts = await getSortedPosts();

	return rss({
		title: 'alexajuno',
		description: "giao's little digital garden",
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}`,
		})),
		customData: '<language>en-us</language>',
	});
}
