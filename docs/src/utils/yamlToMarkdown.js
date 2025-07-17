const { format } = require('prettier');
const prettierPluginEstree = require('prettier/plugins/estree');
const prettierPluginYaml = require('prettier/plugins/yaml');
const prettierPluginMarkdown = require('prettier/plugins/markdown');
const { parseDocument } = require('yaml');

/**
 * Formats the given Markdown content using Prettier.
 * @param {string} content - The Markdown content to format.
 * @returns {Promise<string>} The formatted Markdown content, or the original content if an error occurs.
 */
async function formatMarkdown(content) {
  try {
    return await format(content, {
      parser: 'markdown',
      plugins: [prettierPluginMarkdown, prettierPluginEstree, prettierPluginYaml],
    });
  } catch (error) {
    console.error('Error formatting Markdown:', error);
    return content; // Return original content if formatting fails
  }
}

// Helper to convert camelCase to Title Case
function toTitleCase(str) {
  return str
    .replace(/([A-Z])/g, ' $1') // Add a space before capital letters
    .replace(/^./, (char) => char.toUpperCase()); // Capitalize the first letter
}

/**
 * Renders all scalar properties (except label, items, headings, tags) as _property_: value.
 * @param {object} item - The item object.
 * @param {string} indent - The indentation string.
 * @returns {string} The Markdown for scalar properties.
 */
function renderScalarProperties(item, indent) {
  let marks = '';
  for (const key in item) {
    if (
      Object.prototype.hasOwnProperty.call(item, key) &&
      !['label', 'items', 'headings', 'tags', '__sidebarComments'].includes(key)
    ) {
      const value = item[key];
      // Only render scalar values (string, number, boolean)
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        marks += `${indent}- _${key}_: ${value}\n`;
      }
    }
  }
  return marks;
}

/**
 * Renders the tags property as a sub-list if it is a non-empty array of strings.
 * @param {object} item - The item object.
 * @param {string} indent - The indentation string.
 * @returns {string} The Markdown for tags property.
 */
function renderTagsProperty(item, indent) {
  if (
    Array.isArray(item.tags) &&
    item.tags.length > 0 &&
    item.tags.every(tag => typeof tag === 'string')
  ) {
    let tagsMarkdown = `${indent}- _tags_:\n`;
    for (const tag of item.tags) {
      tagsMarkdown += `${indent}  - ${tag}\n`;
    }
    return tagsMarkdown;
  }
  return '';
}

/**
 * Recursively processes an array of sidebar items and converts them to a Markdown list.
 * Scalar properties are rendered as _property_: value.
 * The tags property is rendered as a sub-list if it is a non-empty array of strings.
 * @param {Array<string|object>} items - The array of items to process.
 * @param {number} level - The current indentation level.
 * @returns {string} The generated Markdown list.
 */
function processSidebarItems(items, level = 0) {
  let markdown = '';
  const indent = '  '.repeat(level);

  for (const item of items) {
    if (typeof item === 'string') {
      markdown += `${indent}- ${item}\n`;
    } else if (typeof item === 'object' && item !== null) {
      if (item.href && item.label) {
        // It's a link item, so create a Markdown link.
        markdown += `${indent}- [${item.label}](${item.href})\n`;
        markdown += renderScalarProperties(item, indent + '  ');
        markdown += renderTagsProperty(item, indent + '  ');
      } else if (item.items && item.label) {
        // It's a category item
        markdown += `${indent}- ${item.label}\n`;
        markdown += renderScalarProperties(item, indent + '  ');
        markdown += renderTagsProperty(item, indent + '  ');
        // Recursively process the nested items
        markdown += processSidebarItems(item.items, level + 1);
      } else if (item.label && Array.isArray(item.headings) && item.headings.length > 0) {
        // It's a topicItem with headings
        markdown += `${indent}- ${item.label}\n`;
        markdown += renderScalarProperties(item, indent + '  ');
        markdown += renderTagsProperty(item, indent + '  ');
        markdown += `${indent}  - _headings_:\n`;
        markdown += processSidebarItems(item.headings, level + 2);
      } else if (item.label) {
        // It's a topicItem or similar without headings
        markdown += `${indent}- ${item.label}\n`;
        markdown += renderScalarProperties(item, indent + '  ');
        markdown += renderTagsProperty(item, indent + '  ');
      }
    }
  }
  return markdown;
}

/**
 * Parses YAML and extracts sidebar comments (comments before each sidebar entry in the sidebars array).
 * Returns a JS object with __sidebarComments property on each sidebar object if comments are found.
 * @param {string} yamlString
 * @returns {object} Parsed data with sidebar comments attached.
 */
function parseYamlWithSidebarComments(yamlString) {
  const doc = parseDocument(yamlString, { keepCstNodes: true });
  const data = doc.toJS();

  // Find the CST node for the 'sidebars' property
  const cst = doc.cstNode;
  if (!cst) return data;

  // Find the 'sidebars' sequence node
  const sidebarsNode = cst.contents
    .find(node => node.type === 'MAP')
    ?.items.find(pair => pair.key?.value === 'sidebars')?.value;

  if (!sidebarsNode || sidebarsNode.type !== 'SEQ') return data;

  // For each sidebar entry, extract comments before it
  let sidebarIdx = 0;
  for (const item of sidebarsNode.items) {
    if (item.type === 'MAP') {
      // Comments before this sidebar entry
      let comments = [];
      let preceding = item;
      // Traverse backwards to collect comments before this item
      while (preceding && preceding.commentBefore) {
        comments.unshift(...preceding.commentBefore.split('\n').map(s => s.trim()));
        preceding = preceding.prev;
      }
      if (comments.length > 0 && data.sidebars && data.sidebars[sidebarIdx]) {
        data.sidebars[sidebarIdx].__sidebarComments = comments;
      }
      sidebarIdx++;
    }
  }
  return data;
}

/**
 * Converts a YAML/JSON sidebar data object into a Markdown navigation list.
 * Scalar properties at the sidebar level are rendered as _property_: value.
 * The tags property is rendered as a sub-list if it is a non-empty array of strings.
 * If __sidebarComments is present, emits them as Markdown paragraphs after the heading.
 * Prepends Markdown comments for YAML filename and timestamp if options are provided.
 * @param {object} dataObject - The sidebar data object.
 * @param {object} [options] - Optional metadata: { yamlFilePath: string }
 * @returns {Promise<string>} A Promise that resolves to the formatted Markdown string.
 */
async function convertDataToMarkdown(dataObject, options = {}) {
  let markdown = '';

  // Add Markdown comments for YAML filename and timestamp
  if (options.yamlFilePath) {
    markdown += `<!-- Source YAML: ${options.yamlFilePath} -->\n`;
  }
  markdown += `<!-- Generated: ${new Date().toISOString()} -->\n\n`;

  if (dataObject.sidebars && Array.isArray(dataObject.sidebars)) {
    for (const sidebar of dataObject.sidebars) {
      if (sidebar.label) {
        markdown += `## ${sidebar.label}\n\n`;
      }
      // Emit sidebar comments as Markdown paragraphs
      if (sidebar.__sidebarComments && Array.isArray(sidebar.__sidebarComments)) {
        for (const comment of sidebar.__sidebarComments) {
          markdown += comment ? `${comment}\n\n` : '\n';
        }
      }
      // Render scalar properties at the sidebar level
      markdown += renderScalarProperties(sidebar, '');
      markdown += renderTagsProperty(sidebar, '');
      if (sidebar.items && Array.isArray(sidebar.items)) {
        markdown += processSidebarItems(sidebar.items);
      }
      markdown += '\n'; // Add space between sidebars
    }
  }

  // Trim trailing newlines before formatting
  return await formatMarkdown(markdown.trim());
}

module.exports = {
  formatMarkdown,
  toTitleCase,
  renderScalarProperties,
  renderTagsProperty,
  processSidebarItems,
  parseYamlWithSidebarComments,
  convertDataToMarkdown,
};