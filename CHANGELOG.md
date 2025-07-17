# 📦 CHANGELOG.md

All notable changes to the **Sidebar Navigation Schema** project will be documented in this file.  
This project adheres to [Semantic Versioning](https://semver.org/) and follows conventional changelog formatting.

---

## [v1.0.0] — Initial Release

🎉 Released: YYYY-MM-DD

### ✨ Features

- Defined `sidebars` as an array of entries: `visibleString`, `emptySidebar`, and `populatedSidebar`
- Modular structure using `$defs` and `allOf` composition
- Component definitions:
  - `labelledObject` with shared `label` field
  - `linkItem`, `topicItem`, `categoryItem`, `leafHeading`, `parentHeading`
- Reusable metadata via `commonMeta`:
  - Optional fields: `description`, `summary`, `brief`, `id`, `slug`, `path`
- Regex enforcement:
  - `id`: filename-safe pattern (`^[a-zA-Z0-9._-]+$`)
  - `slug`: lowercase kebab-case (`^[a-z0-9]+(-[a-z0-9]+)*$`)
  - `path`: optional leading `/`, no spaces (`^(/)?([^/ ]+(/)?)*$`)
- Semantic versioning embedded in schema and repo structure
- YAML samples for validation included per version
- GitHub structure aligned for versioned schemas

---

✅ Next Version Preview (`v1.1.0`)
> Planned improvements:

- Add `autoLabel: boolean` toggle in `commonMeta`
- Expand validation utilities (`validate.sh`, `validate.js`)
- Embed default `label` inference based on path/slug

---


