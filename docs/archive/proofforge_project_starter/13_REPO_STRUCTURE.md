# Recommended Repo Structure

```text
proofforge/
├─ app/
│  ├─ page.tsx
│  ├─ lab/
│  │  ├─ page.tsx
│  │  └─ [slug]/page.tsx
│  ├─ play/
│  │  └─ [slug]/page.tsx
│  ├─ replica/
│  │  └─ [slug]/page.tsx
│  ├─ notes/page.tsx
│  └─ about/page.tsx
├─ content/
│  ├─ artifacts/
│  │  └─ prompt-dojo-module-01.json
│  └─ notes/
│     └─ publishing-principles.md
├─ public/
│  └─ captures/
│     └─ prompt-dojo-module-01.png
├─ docs/
│  ├─ architecture/
│  └─ decisions/
├─ lib/
├─ components/
└─ styles/
```

## Why This Is Optimal
- page routing stays obvious
- content and code are separated
- captures are predictable
- future scaling does not require structural rework
