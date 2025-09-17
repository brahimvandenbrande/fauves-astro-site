import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true; // generate at build time (static)

export const GET: APIRoute = async ({ request }) => {
  const origin = new URL(request.url).origin;
  const posts = await getCollection("blog");

  const body =
    `# ${origin} — Blog index for LLMs\n\n` +
    posts
      .sort((a, b) =>
        a.data.pubDate && b.data.pubDate ? +b.data.pubDate - +a.data.pubDate : 0
      )
      .map((p) => `- [${p.data.title}](${origin}/blog/${p.slug}/)`)
      .join("\n") +
    "\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow"
    }
  });
};
