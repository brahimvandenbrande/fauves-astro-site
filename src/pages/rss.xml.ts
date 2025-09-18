import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { SITE_URL } from "../consts";

// Récupère l'URL du site en fonction du contexte/env
function getSiteUrl(context: { site?: URL } | undefined): string {
  if (context?.site) return context.site.toString();
  if (import.meta.env.DEV) return "http://localhost:4321";
  return SITE_URL;
}

type Post = CollectionEntry<"blog"> | CollectionEntry<"projects">;

interface ExtendedPost extends Post {
  type: string;
  url: string;
}

type RSSContext = {
  site: URL;
};

export async function GET(context: RSSContext) {
  const baseUrl = getSiteUrl(context);

  // Récupération des contenus
  const blogPosts = await getCollection("blog");
  const projects = await getCollection("projects");

  // Fusion et tri des contenus par date décroissante
  const allPosts: ExtendedPost[] = [
    ...blogPosts.map((post: CollectionEntry<"blog">) => ({
      ...post,
      type: "blog",
      url: new URL(`/blog/${post.slug}/`, baseUrl).toString()
    })),
    ...projects.map((project: CollectionEntry<"projects">) => ({
      ...project,
      type: "projet",
      url: new URL(`/projects/${project.slug}/`, baseUrl).toString()
    }))
  ].sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );

  const feedTitle = "Fauves - Actualités récentes";
  const feedDescription =
    "Découvrez les derniers articles et projets publiés par Fauves";

  // Image du flux (doit être PNG/JPG/GIF, pas SVG)
  const imageUrl = new URL("/images/og-image.png", baseUrl).toString();

  const feed = await rss({
    title: feedTitle,
    description: feedDescription,
    site: baseUrl,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom"
    },
    customData: `
      <language>fr-BE</language>
      <copyright>${new Date().getFullYear()} Fauves. Tous droits réservés.</copyright>
      <atom:link href="${new URL("/rss.xml", baseUrl).toString()}" rel="self" type="application/rss+xml" />
      <image>
        <url>${imageUrl}</url>
        <title>${feedTitle}</title>
        <link>${baseUrl}</link>
        <description>${feedDescription}</description>
        <width>144</width>
        <height>144</height>
      </image>
    `,
    items: allPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: post.url,
      guid: post.url,
      customData: `<category>${post.type}</category>`
    }))
  });

  return new Response(feed.body, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
