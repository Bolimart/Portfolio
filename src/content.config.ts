import { file, glob } from "astro/loaders";
import { defineCollection, z, reference } from "astro:content";
import type { icons as lucideIcons } from '@iconify-json/lucide/icons.json';
// @ts-ignore
import type { icons as simpleIcons } from '@iconify-json/simple-icons/icons.json';

const other = defineCollection({
  loader: glob({ base: "src/content/other", pattern: "**/*.{md,mdx}" }),
});

const lucideIconSchema = z.object({
  type: z.literal("lucide"),
  name: z.custom<keyof typeof lucideIcons>(),
});

const simpleIconSchema = z.object({
  type: z.literal("simple-icons"),
  name: z.custom<keyof typeof simpleIcons>(),
});

const quickInfo = defineCollection({
  loader: file("src/content/info.json"),
  schema: z.object({
    id: z.number(),
    icon: z.union([lucideIconSchema, simpleIconSchema]),
    text: z.string(),
  })
});

const socials = defineCollection({
  loader: file("src/content/socials.json"),
  schema: z.object({
    id: z.number(),
    icon: z.union([lucideIconSchema, simpleIconSchema]),
    text: z.string(),
    link: z.string().url().optional(),
  })
});

const softwaresGroup = defineCollection({
  loader: file("src/content/software.json"),
  schema: z.object({
    id: z.number(),
    icon: z.union([lucideIconSchema, simpleIconSchema]),
    title: z.string(),
    softwares: z.array(
        z.object({
          id: z.number(),
          icon: z.union([lucideIconSchema, simpleIconSchema]),
          text: z.string(),
          link: z.string().url().optional(),
        })
    ),
  }),
});

const workExperience = defineCollection({
  loader: file("src/content/work.json"),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    company: z.string(),
    duration: z.string(),
    description: z.string(),
  })
});

const tags = defineCollection({
  loader: file("src/content/tags.json"),
  schema: z.object({
    id: z.string()
  })
});


const projects = defineCollection({
  loader: glob({ base: "src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    id: z.number(),
    image: image(),
    link: z.string().url().optional(),
    info: z.array(
      z.object({
        text: z.string(),
        icon: z.union([lucideIconSchema, simpleIconSchema]),
        link: z.string().url().optional(),
      })
    )
  })
});

const galeries = defineCollection({
  loader: file("src/content/galeries.json"),
  schema: ({ image }) => z.object({
    title: z.string(),
    icon: z.union([lucideIconSchema, simpleIconSchema]),
    description: z.string(),
    id: z.number(),
    images: z.array(z.string()),
  })
});

const highlights = defineCollection({
  loader: file("src/content/highlights.json"),
  schema: ({ image }) => z.object({
    title: z.string(),
    icon: z.union([lucideIconSchema, simpleIconSchema]),
    description: z.string(),
    id: z.number(),
    images: z.array(z.string()),
  })
});

export const collections = { tags, projects, other, quickInfo, socials, workExperience, highlights, softwaresGroup, galeries };