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

const servicesCollection = defineCollection({
  type: "content",
  schema: z.object({
    shortTitle: z.string(),
    title: z.string(),
    slug: z.string().optional(),
    excerpt: z.string().max(180),
    order: z.number().default(0),
    tags: z.array(z.string()).default([]),
    subservices: z.array(z.object({
      title: z.string(),
      key: z.string(),
      ownPage: z.boolean().default(false),
      excerpt: z.string().optional(),
      order: z.number().default(0)
    })).default([]),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional()
    }).optional()
  })
});

export const collections = {
  projects: projectsCollection,
  blog: blogCollection,
  services: servicesCollection
};
