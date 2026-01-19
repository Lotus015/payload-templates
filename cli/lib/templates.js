// Template definitions with colors and use cases
export const templates = [
  {
    value: 'premium',
    title: 'Premium',
    description: 'Navy + Gold - Elegant, high-end law firms',
    colors: '#1a1f36 + #d4af37'
  },
  {
    value: 'traditional',
    title: 'Traditional',
    description: 'Burgundy + Gold - Classic, established practices',
    colors: '#800020 + #d4af37'
  },
  {
    value: 'modern',
    title: 'Modern',
    description: 'Blue + White - Clean, contemporary firms',
    colors: '#4a90e2 + #ffffff'
  },
  {
    value: 'boutique',
    title: 'Boutique',
    description: 'Green + Beige - Specialized, personal practices',
    colors: '#2c5f2d + #e8dcc4'
  }
];

/**
 * Get a template by its value/id
 * @param {string} value - The template value to find
 * @returns {object|undefined} The template object or undefined
 */
export function getTemplateByValue(value) {
  return templates.find(t => t.value === value);
}

/**
 * Get all template values (for validation)
 * @returns {string[]} Array of valid template values
 */
export function getTemplateValues() {
  return templates.map(t => t.value);
}

/**
 * Check if a template value is valid
 * @param {string} value - The value to check
 * @returns {boolean} True if valid template
 */
export function isValidTemplate(value) {
  return templates.some(t => t.value === value);
}
