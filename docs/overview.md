# 📘 Sidebar Navigation Schema — Overview

Welcome to the official documentation for the Sidebar Navigation Schema!  
This schema defines a modular, extensible, and deeply recursive data structure for modeling navigational sidebars in documentation platforms, developer portals, content-heavy sites, and schema-driven UIs.

---

## 🔍 Purpose

The Sidebar Navigation Schema provides a clear, structured way to represent hierarchical sidebar menus in YAML or JSON. It was designed to:

- Facilitate version-aware sidebar configuration
- Standardize recursive layouts using JSON Schema best practices
- Support metadata like `id`, `slug`, `path`, and descriptions for advanced automation
- Enable validation, generation, and programmatic integration into tools and docs

---

## 🧩 Why Use It?

Traditional sidebar configs (especially in static site generators) can quickly become unmanageable. This schema brings:

- **Modularity**: Components like `linkItem`, `topicItem`, and `categoryItem` are independently defined and reused.
- **Recursive Structure**: Support for nested headings and categories is baked in with `leafHeading` and `parentHeading`.
- **Metadata Intelligence**: Auto-labeling, sorting, and slug/path handling becomes easier with enriched metadata.
- **Version Control**: The repo and schema design allow sidebars to be tracked, published, and evolved by version.
- **Validation First**: Conform your sidebar config to a robust spec using tools like AJV.

---

## 🛠️ Core Design Concepts

### 🧱 Composition via `$defs` + `allOf`
The schema uses `allOf` composition to combine reusable fragments like `labelledObject` and `commonMeta`.

### 🧠 Reusable Definitions
Key components include:
- `linkItem`: URI-based navigation links
- `categoryItem`: groups of links or topics
- `topicItem`: structural headings with optional content lists
- `emptySidebar` / `populatedSidebar`: foundational sidebar containers
- `leafHeading` and `parentHeading`: represent structured document trees

### 📝 Metadata Support
Fields like:
- `description`, `summary`, `brief`: flexible annotation fields
- `id`: regex-enforced to mimic filenames
- `slug`: lowercase, hyphenated format
- `path`: leading-slash optional URL-style routing

These enable sidebar content to be parsed, indexed, rendered, or auto-labeled.

---

## 🔮 What's Next

Future versions of the schema may include:

- `autoLabel`: boolean flag to auto-generate labels from `slug` or `path`
- Localization support (e.g. per-language sidebars)
- Tooling for generating UI or documentation previews

Explore the [definitions](./definitions.md) and [integrations guide](./integrations-guide.md) to go deeper — this schema is built to scale with your content platform.

---