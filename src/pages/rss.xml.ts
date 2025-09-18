import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { CollectionEntry } from 'astro:content';
import { SITE_URL } from "../consts";

// Use the current site URL from the context, falling back to SITE_URL
function getSiteUrl(context: { site: URL } | undefined): string {
  // In development or when context.site is not available, use the environment variable or fallback
  if (import.meta.env.DEV) {
    return 'http://localhost:4321';
  }
  // In production or staging, use the current hostname
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // For server-side rendering, use the context site or fallback to SITE_URL
  return context?.site?.toString() || SITE_URL;
}

type Post = CollectionEntry<'blog'> | CollectionEntry<'projects'>;

interface ExtendedPost extends Post {
  type: string;
  url: string;
}

type RSSContext = {
  site: URL;
};

export async function GET(context: RSSContext) {
  // Get the appropriate base URL based on the environment
  const baseUrl = getSiteUrl(context);
  
  // Get blog posts and projects
  const blogPosts = await getCollection("blog");
  const projects = await getCollection("projects");

  // Combine and sort all content by publication date
  const allPosts: ExtendedPost[] = [
    ...blogPosts.map((post: CollectionEntry<'blog'>) => ({
      ...post,
      type: "blog",
      url: new URL(`/blog/${post.slug}/`, baseUrl).toString()
    })),
    ...projects.map((project: CollectionEntry<'projects'>) => ({
      ...project,
      type: "projet",
      url: new URL(`/projects/${project.slug}/`, baseUrl).toString()
    }))
  ].sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());

  const feed = await rss({
    title: "Fauves - Actualités récentes",
    description: "Découvrez les derniers articles et projets publiés par Fauves",
    site: baseUrl,
    items: allPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: post.url,
      customData: `<category>${post.type}</category>`
    })),
    customData: `
      <language>fr-BE</language>
      <copyright>${new Date().getFullYear()} Fauves. Tous droits réservés.</copyright>
      <image>
        <url>${new URL("/favicon.svg", baseUrl).toString()}</url>
        <title>Fauves</title>
        <link>${baseUrl}</link>
      </image>
    `
  });

  return new Response(feed.body, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
