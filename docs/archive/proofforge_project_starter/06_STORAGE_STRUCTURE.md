# Storage Structure

## Objective
Keep the system simple, deterministic, and easy to scale without data chaos.

## Recommended Storage Layers
1. **Content metadata**
   - one source of truth for artifact records
   - JSON files or structured content collection

2. **Content pages**
   - markdown or MDX for long-form detail pages and notes

3. **Static media**
   - thumbnails
   - screenshots
   - small preview videos or GIFs

4. **Private source**
   - separate private repository or backend service for non-public logic

## Recommended Pattern
- metadata lives in `/content/artifacts/`
- long-form notes live in `/content/notes/`
- preview media lives in `/public/captures/`
- public demo pages live under application routes
- private engines live outside the public repo or behind protected services

## Why This Is Optimal
- low publishing friction
- content can be versioned cleanly
- media remains predictable
- public and private responsibilities stay separated
