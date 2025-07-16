# 📚 Sidebar Navigation Model — Definitions

This document outlines the definitions used in the Sidebar Navigation JSON Schema, version **v1.0.0**. These components form a flexible and reusable structure for nested sidebars, metadata, and navigation.

---

## 🧠 Core Definitions

### `visibleString`
A basic string type used for labels and identifiers.

- **Type**: `string`
- **Pattern**: `^\S+$` (No whitespace)
- **Min Length**: 1

---

### `labelledObject`
Represents any object with a human-readable label.

- **Properties**:
  - `label`: `visibleString`
- **Required**: `label`

---

### `commonMeta`
Provides standard metadata applicable to most sidebar components.

- **Properties**:
  - `description`: Optional `string`
  - `summary`: Optional `string`
  - `brief`: Optional `string`
  - `id`: `string` (Pattern: `^[a-zA-Z0-9._-]+$`)
  - `slug`: `string` (Pattern: `^[a-z0-9]+(-[a-z0-9]+)*$`)
  - `path`: `string` (Pattern: `^(/)?([^/ ]+(/)?)*$`)
- **Additional Properties**: Not allowed

---

## 📦 Sidebar Types

### `emptySidebar`
An empty navigational group.

- Inherits:
  - `labelledObject`
  - `commonMeta`
- **Items**: `array` with max 0 items

---

### `populatedSidebar`
A sidebar containing actual navigation elements.

- Inherits:
  - `labelledObject`
  - `commonMeta`
- **Items**: Array of:
  - `visibleString`
  - `topicItem`
  - `categoryItem`
  - `linkItem`
- **Min Items**: 1

---

### `leafHeading` and `parentHeading`
Define headings within documents.

- Inherit:
  - `labelledObject`
  - `commonMeta`
- **leafHeading**: No nested items
- **parentHeading**: Includes sub-items:
  - `visibleString`, `leafHeading`, or `parentHeading`
- **Min Items for parent**: 1

---

### `topicItem`
A documentation topic block.

- Inherits: `emptySidebar`
- **Headings**: Array of:
  - `visibleString`, `leafHeading`, or `parentHeading`

---

### `linkItem`
Defines external/internal hyperlinks.

- Inherits:
  - `labelledObject`
  - `commonMeta`
- **Required**:
  - `href` (type: URI)
- **Additional Properties**: Not allowed

---

### `categoryItem`
Nested category container.

- Inherits:
  - `labelledObject`
  - `commonMeta`
- **Items**: Array of:
  - `visibleString`
  - `linkItem`
  - `topicItem`
  - `categoryItem`
- **Min Items**: 1

---

Feel free to tweak formatting or add usage examples to make it more interactive. Want me to help generate example data structures or usage scenarios next?