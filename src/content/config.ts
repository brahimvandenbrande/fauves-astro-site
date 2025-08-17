// src/content/config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Tags disponibles (valeurs fixes, réutilisables)
const tagEnum = z.enum([
  "Brand Strategy",
  "Storytelling",
  "Brand Design",
  "Visual Identity",
  "Web Design",
  "Web Development",
  "Copywriting",
  "SEO",
  "Workshops",
  "Content Creation"
]);

// Catégories principales (1 seule par projet)
const categoryEnum = z.enum([
  "Strategy & Messaging",
  "Visual & Digital Design",
  "Tech & Performance",
  "Content & Engagement"
]);

const projectsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      featured: z.boolean().default(false),
      order: z.number().optional(),
      image: z.object({
        src: z.string(),
        alt: z.string()
      }),
      client: z.string().optional(),
      category: categoryEnum,
      tags: z.array(tagEnum).min(1),
      date: z.union([z.date(), z.string().transform((str) => new Date(str))]),
      updated: z
        .union([z.date(), z.string().transform((str) => new Date(str))])
        .optional()
    })
});

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.union([z.date(), z.string().transform((str) => new Date(str))]),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    tags: z.array(z.string())
  })
});

export const collections = {
  projects: projectsCollection,
  blog: blogCollection
};
