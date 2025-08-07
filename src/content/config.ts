// src/content/config.ts
import { defineCollection, z } from "astro:content";
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

export const collections = {
  projects: projectsCollection
};
