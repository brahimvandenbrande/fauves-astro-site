import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  // Get the base URL from context.site or fallback to the current deployment URL
  const baseUrl = context.site?.toString() || 'https://ocwwsggk4w84wockocgckk4k.apps.fauves.agency';
  
  // Récupérer les articles de blog et les projets
  const blogPosts = await getCollection("blog");
  const projects = await getCollection("projects");

  // Combiner et trier tous les contenus par date de publication
  const allPosts = [
    ...blogPosts.map((post) => ({
      ...post,
      type: "blog",
      url: new URL(`/blog/${post.slug}/`, baseUrl).toString()
    })),
    ...projects.map((project) => ({
      ...project,
      type: "projet",
      url: new URL(`/projects/${project.slug}/`, baseUrl).toString()
    }))
  ].sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate));

  const feed = rss({
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
        <url>${new URL("/favicon.svg", context.site).toString()}</url>
        <title>Fauves</title>
        <link>${context.site}</link>
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
