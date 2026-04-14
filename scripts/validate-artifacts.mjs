import fs from "fs";
import path from "path";
import { z } from "zod";

// We re-declare or import the schema. 
// Since it's a script, importing TS might be tricky without ts-node or similar.
// I'll re-declare it here or use a shared one if possible.
// Actually, I'll just re-declare it to match lib/schema.ts for the script.

const ArtifactSchema = z.object({
  name: z.string(),
  category: z.string(),
  promise: z.string(),
  business_value: z.string(),
  status: z.enum(["live_demo", "internal_harness", "spec_only", "protected"]),
  protection_level: z.string(),
  link: z.string(),
  capture: z.string(),
  tech_stack: z.array(z.string()),
  date: z.string(),
});

const artifactsDir = path.join(process.cwd(), "content/artifacts");

function validate() {
  console.log("🔍 Validating artifacts...");
  const files = fs.readdirSync(artifactsDir).filter(f => f.endsWith(".json"));
  
  let hasError = false;
  
  files.forEach(file => {
    const filePath = path.join(artifactsDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    
    const result = ArtifactSchema.safeParse(content);
    
    if (!result.success) {
      console.error(`❌ Validation failed for ${file}:`);
      console.error(JSON.stringify(result.error.format(), null, 2));
      hasError = true;
    } else {
      console.log(`✅ ${file} passed.`);
    }
  });

  if (hasError) {
    console.error("❌ Artifact validation failed. Build must crash.");
    process.exit(1);
  }
  
  console.log("✨ All artifacts validated successfully.");
}

validate();
