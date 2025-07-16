# Sidebar Navigation Model

A modular and extensible JSON Schema for defining hierarchical sidebar navigation structures in content platforms, documentation tools, and UI frameworks.

> Ideal for static site generators, developer portals, CMS integrations, or schema-driven UIs.

## 📘 Overview

This repository contains a versioned specification for sidebar layout models. Built with composability and clarity in mind, the schema supports:

- 🔹 Flat and nested sidebar items
- 🔸 Categories and topics with structured children
- 🧭 Headings and hierarchical depth
- 🔗 Link items with URI validation
- ✅ Rich validation through JSON Schema

Whether you’re building a static site generator, documentation renderer, or a dynamic navigation engine—this model is adaptable to your workflow.

---

## 📁 Repository Structure

```
.
├── README.md
├── CHANGELOG.md
├── schema/
│   ├── v1.0.0/
│   │   ├── sidebar.schema.json
│   │   └── samples/
│   │       └── example.yaml
│   └── latest/
│       ├── sidebar.schema.json
│       └── samples/
│           └── example.yaml
├── docs/
│   ├── definitions.md
│   ├── integrations-guide.md
│   └── overview.md
```

- `latest/` is a pointer to the most recent version of the schema for easy integration. Update it manually on each release, or use a script/symlink strategy.

---

## 📘 Features

- Recursive sidebar modeling
- Component inheritance via `$defs` and `allOf`
- Regex-validated metadata: `id` (filename-like), `slug`, and flexible `path`
- Deeply nested headings and categories
- Ready for version tracking and changelog support

---

## 🚀 Usage

Clone the repo:

```bash
git clone https://github.com/your-username/sidebar-navigation-model.git
```

---

## 📚 Documentation

Explore:

- [`overview.md`](./docs/overview.md): High-level schema purpose and structure
- [`definitions.md`](./docs/definitions.md): Breakdown of reusable components
- [`integrations-guide.md`](./docs/integrations-guide.md): How to integrate with static site generators or client apps

---

## 📌 Versioning

We follow [Semantic Versioning](https://semver.org/) for schema releases. Refer to the [CHANGELOG.md](CHANGELOG.md) for a history of changes.

---

## 🤝 Contributing

Want to improve definitions, suggest enhancements, or add examples? Feel free to submit an issue or open a pull request.

---

## 📬 Questions or Feedback?

Open an issue or connect with the maintainer. Contributions and collaboration are warmly welcomed.

---

## 📄 License

Released under the [MIT License](LICENSE). Use it freely in commercial and open source projects.

---
