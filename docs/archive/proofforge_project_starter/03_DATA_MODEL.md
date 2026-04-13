# Data Model

## Canonical Artifact Fields
Each artifact must contain exactly these 10 fields:

1. `name`
2. `category`
3. `promise`
4. `business_value`
5. `status`
6. `protection_level`
7. `link`
8. `capture`
9. `tech_stack`
10. `date`

## Field Definitions

### `name`
Human-readable artifact title.

### `category`
One of the approved portfolio categories.

### `promise`
One-sentence statement of what the artifact does or demonstrates.

### `business_value`
One-sentence statement of why this matters commercially.

### `status`
Lifecycle state:
- concept
- live_demo
- replica
- private_engine
- archived

### `protection_level`
Exposure level:
- public
- limited
- private

### `link`
Primary URL for the artifact detail page or live target.

### `capture`
Path or URL to thumbnail, screenshot, or demo preview asset.

### `tech_stack`
Array of technologies, platforms, or media involved.

### `date`
Publication date in ISO format: YYYY-MM-DD

## Derived Fields
Derived fields are allowed in runtime views, but they are not part of the canonical authoring contract.
Examples:
- slug
- featured
- tags
- sort_order
- read_time
- cta_label
