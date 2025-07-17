# 📚 Sidebar Navigation Model — Integration Guide

This guide explains how to integrate the Sidebar Navigation Model schema into your project, whether you are using a static site generator, documentation tool, CMS, or a custom application. The schema is designed to be flexible and easy to adopt in a variety of environments.

---

## 1. Overview

The Sidebar Navigation Model is a JSON Schema specification for defining hierarchical navigation structures. It enables you to describe sidebars with nested categories, headings, and links in a consistent, machine-validated format.

---

## 2. Getting Started

### a. Clone or Download the Schema

Clone the repository or download the schema files directly:

```bash
git clone https://github.com/your-username/sidebar-navigation-model.git
```

Or download the latest schema from:

```
schema/latest/sidebar.schema.json
```

### b. Add to Your Project

Copy the relevant schema file(s) into your project, or reference them directly from this repository.

---

## 3. Defining Your Sidebar

Create a JSON or YAML file that describes your sidebar structure. Example (YAML):

```yaml
- sidebars:
    - label: docsSidebar   ## a single sidebar defined in this outline
      items:
        - label: Getting Started  # category with two links
          items:
            - label: Introduction
              href: /docs/intro
            - label: Installation
              href: /docs/install
        - label: Guides   # category with a topic
          items:
            - label: Basic Usage
              href: /docs/usage
```

---

## 4. Validating Your Sidebar

Use a JSON Schema validator to ensure your sidebar file conforms to the schema. Popular tools include:

- [AJV (JavaScript)](https://ajv.js.org/)
- [jsonschema (Python)](https://python-jsonschema.readthedocs.io/)
- [YAML Validator](https://www.jsonschemavalidator.net/)

### Example (AJV)

```js
const Ajv = require('ajv');
const schema = require('./schema/latest/sidebar.schema.json');
const sidebar = require('./sidebar.yaml'); // Convert YAML to JSON first

const ajv = new Ajv();
const validate = ajv.compile(schema);
const valid = validate(sidebar);

if (!valid) console.error(validate.errors);
```

---

## 5. Integrating with Static Site Generators

Many static site generators (e.g., Docusaurus, VuePress, MkDocs) support custom sidebar structures. You can:

- Convert your sidebar YAML/JSON to the format expected by your generator.
- Use the schema to validate sidebar files before build/deploy.
- Automate sidebar generation from content metadata.

### Example: Docusaurus

1. Define your sidebar in YAML/JSON using the schema.
2. Write a script to transform it into the Docusaurus sidebar format.
3. Validate before build.

---

## 6. Custom Applications

For custom UIs or CMS integrations:

- Parse the sidebar file at runtime or build time.
- Use the schema to enforce structure and catch errors early.
- Render navigation dynamically based on the parsed structure.

---

## 7. Best Practices

- **Version Pinning:** Reference a specific schema version for stability.
- **Validation:** Always validate sidebar files during CI/CD or before deployment.
- **Extensibility:** Use `$defs` and `allOf` for advanced schema composition.
- **Documentation:** Keep sidebar files close to your content for easier maintenance.

---

## 8. Resources

- [JSON Schema Documentation](https://json-schema.org/)
- [AJV Validator](https://ajv.js.org/)
- [YAML Validator](https://www.jsonschemavalidator.net/)
- [Sidebar Navigation Model GitHub](https://github.com/your-username/sidebar-navigation-model)

---

For further questions, see the [README](../README.md) or open an issue on GitHub.
