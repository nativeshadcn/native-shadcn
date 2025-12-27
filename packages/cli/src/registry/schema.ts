import { z } from "zod"

// Registry item types
export const registryItemTypeSchema = z.enum([
  "registry:lib",
  "registry:block",
  "registry:component",
  "registry:ui",
  "registry:hook",
  "registry:page",
])

// File schema for registry items
export const registryItemFileSchema = z.object({
  path: z.string(),
  content: z.string().optional(),
  type: registryItemTypeSchema,
  target: z.string().optional(),
})

// Tailwind config schema
export const registryItemTailwindSchema = z.object({
  config: z.object({
    content: z.array(z.string()).optional(),
    theme: z.record(z.string(), z.any()).optional(),
    plugins: z.array(z.string()).optional(),
  }).optional(),
})

// CSS variables schema
export const registryItemCssVarsSchema = z.object({
  light: z.record(z.string(), z.string()).optional(),
  dark: z.record(z.string(), z.string()).optional(),
})

// Main registry item schema
export const registryItemSchema = z.object({
  name: z.string(),
  type: registryItemTypeSchema,
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(registryItemFileSchema).optional(),
  tailwind: registryItemTailwindSchema.optional(),
  cssVars: registryItemCssVarsSchema.optional(),
  meta: z.record(z.string(), z.any()).optional(),
  docs: z.string().optional(),
})

// Registry index item schema (index.json has files as strings, not objects)
export const registryIndexItemSchema = z.object({
  name: z.string(),
  type: registryItemTypeSchema,
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(z.string()).optional(), // Strings in index, not objects!
  meta: z.record(z.string(), z.any()).optional(),
  docs: z.string().optional(),
})

// Registry index schema
export const registryIndexSchema = z.array(registryIndexItemSchema)

// Registry schema
export const registrySchema = z.object({
  name: z.string(),
  items: z.array(registryItemSchema),
})

// Infer TypeScript types from Zod schemas
export type RegistryItem = z.infer<typeof registryItemSchema>
export type RegistryIndexItem = z.infer<typeof registryIndexItemSchema>
export type RegistryItemFile = z.infer<typeof registryItemFileSchema>
export type RegistryItemType = z.infer<typeof registryItemTypeSchema>
export type Registry = z.infer<typeof registrySchema>
export type RegistryIndex = z.infer<typeof registryIndexSchema>
