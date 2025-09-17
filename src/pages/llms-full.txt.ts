import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

function formatDate(dateString: string): string {
  if (!dateString) return 'Date not available';
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  } catch (e) {
    return dateString; // Return as-is if parsing fails
  }
}

// Enhanced markdown to text converter with better structure
function markdownToText(markdown: string, frontmatter: any): string {
  // Extract and format metadata
  const title = frontmatter.title || 'Untitled';
  const date = formatDate(frontmatter.pubDate || frontmatter.date);
  const description = frontmatter.description ? `\n${frontmatter.description}` : '';
  
  // Process the content
  let content = markdown
    // Remove frontmatter
    .replace(/^---[\s\S]*?---\s*/, '')
    // Convert headers
    .replace(/^#+\s+(.*)$/gm, (_, p1) => `\n${p1.toUpperCase()}:`)
    // Convert lists to bullet points
    .replace(/^\s*[-*+]\s+(.*)$/gm, '• $1')
    // Convert bold/italic to plain text
    .replace(/[\*_]{1,3}([^\*_]+)[\*_]{1,3}/g, '$1')
    // Remove links but keep the text
    .replace(/\[(.*?)\]\([^)]*\)/g, '$1')
    // Clean up multiple newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
    
  // Build the structured output
  return `# ${title}
Date: ${date}${description}

${content}`;
}

export const prerender = true;

export const GET: APIRoute = async ({ request }) => {
  const origin = new URL(request.url).origin;
  const posts = await getCollection("blog");

  const chunks: string[] = [`# ${origin} — Full Blog Content for LLMs`, ""];

  for (const post of posts.sort((a, b) =>
    a.data.pubDate && b.data.pubDate ? +new Date(b.data.pubDate) - +new Date(a.data.pubDate) : 0
  )) {
    try {
      // Read the raw markdown file
      const filePath = join(process.cwd(), 'src/content/blog', post.id);
      const fileContent = await readFile(filePath, 'utf-8');
      
      // Convert markdown to structured plain text
      const text = markdownToText(fileContent, post.data);
      chunks.push(text + '\n');
    } catch (error) {
      console.error(`Error processing ${post.id}:`, error);
      chunks.push(`# ${post.data.title}\n\n[Error loading content]\n`);
    }
  }

  return new Response(chunks.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow"
    }
  });
};
