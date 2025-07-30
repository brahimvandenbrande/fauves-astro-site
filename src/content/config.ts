// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    featured: z.boolean().default(false),
    order: z.number().optional(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    client: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    date: z.union([z.date(), z.string().transform(str => new Date(str))]),
    updated: z.union([z.date(), z.string().transform(str => new Date(str))]).optional(),
  }),
});

export const collections = {
  'projects': projectsCollection,
};