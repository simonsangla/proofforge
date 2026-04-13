# Artifact Status Model

## Status
### concept
Defined but not yet publicly available.

### live_demo
Usable public demonstration exists.

### replica
A limited cloneable or reproducible version exists.

### private_engine
The real value logic is private and not exposed.

### archived
No longer active but kept for portfolio history.

## Protection Levels
### public
Safe to expose fully.

### limited
Publicly viewable or testable, but intentionally incomplete.

### private
Not exposed. Used only as proof that deeper capability exists.

## Status × Protection Guidance
- `concept` + `private` is valid
- `live_demo` + `limited` is common
- `replica` + `limited` is preferred
- `private_engine` + `private` is expected
- avoid `live_demo` + `public` if the moat lives in client-side logic
