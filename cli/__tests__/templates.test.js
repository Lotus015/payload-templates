import { describe, it, expect } from 'vitest';
import {
  templates,
  getTemplateByValue,
  getTemplateValues,
  isValidTemplate
} from '../lib/templates.js';

describe('templates', () => {
  describe('templates array', () => {
    it('should have exactly 4 templates', () => {
      expect(templates).toHaveLength(4);
    });

    it('should contain premium, traditional, modern, and boutique', () => {
      const values = templates.map(t => t.value);
      expect(values).toContain('premium');
      expect(values).toContain('traditional');
      expect(values).toContain('modern');
      expect(values).toContain('boutique');
    });

    it('should have required properties for each template', () => {
      templates.forEach(template => {
        expect(template).toHaveProperty('value');
        expect(template).toHaveProperty('title');
        expect(template).toHaveProperty('description');
        expect(template).toHaveProperty('colors');
      });
    });

    it('should have correct color format for each template', () => {
      templates.forEach(template => {
        // Colors should be in format "#xxxxxx + #xxxxxx"
        expect(template.colors).toMatch(/^#[a-fA-F0-9]{6} \+ #[a-fA-F0-9]{6}$/);
      });
    });
  });

  describe('getTemplateByValue', () => {
    it('should return premium template when given "premium"', () => {
      const template = getTemplateByValue('premium');
      expect(template).toBeDefined();
      expect(template.title).toBe('Premium');
      expect(template.colors).toBe('#1a1f36 + #d4af37');
    });

    it('should return traditional template when given "traditional"', () => {
      const template = getTemplateByValue('traditional');
      expect(template).toBeDefined();
      expect(template.title).toBe('Traditional');
    });

    it('should return modern template when given "modern"', () => {
      const template = getTemplateByValue('modern');
      expect(template).toBeDefined();
      expect(template.title).toBe('Modern');
    });

    it('should return boutique template when given "boutique"', () => {
      const template = getTemplateByValue('boutique');
      expect(template).toBeDefined();
      expect(template.title).toBe('Boutique');
    });

    it('should return undefined for invalid template value', () => {
      const template = getTemplateByValue('invalid');
      expect(template).toBeUndefined();
    });

    it('should return undefined for empty string', () => {
      const template = getTemplateByValue('');
      expect(template).toBeUndefined();
    });
  });

  describe('getTemplateValues', () => {
    it('should return array of 4 values', () => {
      const values = getTemplateValues();
      expect(values).toHaveLength(4);
    });

    it('should return all template values', () => {
      const values = getTemplateValues();
      expect(values).toEqual(['premium', 'traditional', 'modern', 'boutique']);
    });
  });

  describe('isValidTemplate', () => {
    it('should return true for valid template values', () => {
      expect(isValidTemplate('premium')).toBe(true);
      expect(isValidTemplate('traditional')).toBe(true);
      expect(isValidTemplate('modern')).toBe(true);
      expect(isValidTemplate('boutique')).toBe(true);
    });

    it('should return false for invalid template values', () => {
      expect(isValidTemplate('invalid')).toBe(false);
      expect(isValidTemplate('')).toBe(false);
      expect(isValidTemplate('Premium')).toBe(false); // Case sensitive
      expect(isValidTemplate('PREMIUM')).toBe(false);
    });
  });
});
