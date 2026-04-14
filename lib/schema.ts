import { z } from "zod";

export const ArtifactSchema = z.object({
  name: z.string(),
  category: z.string(),
  promise: z.string(),
  business_value: z.string(),
  status: z.enum(["live_demo", "internal_harness", "spec_only", "protected"]),
  protection_level: z.string(),
  link: z.string(),
  capture: z.string(),
  tech_stack: z.array(z.string()),
  date: z.string(), // ISO date string preferred
});

export type Artifact = z.infer<typeof ArtifactSchema>;
