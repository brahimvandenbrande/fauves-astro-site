import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  // Récupérer les articles de blog et les projets
  const blogPosts = await getCollection("blog");
  const projects = await getCollection("projects");

  // Combiner et trier tous les contenus par date de publication
  const allPosts = [
    ...blogPosts.map((post) => ({
      ...post,
      type: "blog",
      url: `/blog/${post.slug}/`
    })),
    ...projects.map((project) => ({
      ...project,
      type: "projet",
      url: `/projects/${project.slug}/`
    }))
  ].sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate));

  return rss({
    title: "Fauves - Actualités récentes",
    description:
      "Découvrez les derniers articles et projets publiés par Fauves",
    site: context.site,
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
        <url>${new URL("/favicon.svg", context.site)}</url>
        <title>Fauves</title>
        <link>${context.site}</link>
      </image>
    `
  });
}
