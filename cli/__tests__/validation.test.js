import { describe, it, expect } from 'vitest';
import { validateProjectNameFormat } from '../lib/validation.js';

describe('validateProjectNameFormat', () => {
  describe('valid names', () => {
    it('should return true for simple alphanumeric name', () => {
      expect(validateProjectNameFormat('myproject')).toBe(true);
    });

    it('should return true for name with numbers', () => {
      expect(validateProjectNameFormat('project123')).toBe(true);
    });

    it('should return true for name with hyphens', () => {
      expect(validateProjectNameFormat('my-project')).toBe(true);
    });

    it('should return true for name with underscores', () => {
      expect(validateProjectNameFormat('my_project')).toBe(true);
    });

    it('should return true for mixed valid characters', () => {
      expect(validateProjectNameFormat('my-project_123')).toBe(true);
    });

    it('should return true for single character name', () => {
      expect(validateProjectNameFormat('a')).toBe(true);
    });

    it('should return true for uppercase letters', () => {
      expect(validateProjectNameFormat('MyProject')).toBe(true);
    });
  });

  describe('invalid names', () => {
    it('should return error for empty string', () => {
      const result = validateProjectNameFormat('');
      expect(result).toBe('Project name is required');
    });

    it('should return error for whitespace only', () => {
      const result = validateProjectNameFormat('   ');
      expect(result).toBe('Project name is required');
    });

    it('should return error for name with spaces', () => {
      const result = validateProjectNameFormat('my project');
      expect(result).toBe('Project name cannot contain spaces');
    });

    it('should return error for name with special characters', () => {
      expect(validateProjectNameFormat('my@project')).toBe(
        'Project name can only contain letters, numbers, hyphens, and underscores'
      );
      expect(validateProjectNameFormat('my.project')).toBe(
        'Project name can only contain letters, numbers, hyphens, and underscores'
      );
      expect(validateProjectNameFormat('my/project')).toBe(
        'Project name can only contain letters, numbers, hyphens, and underscores'
      );
    });

    it('should return error for name starting with dot', () => {
      const result = validateProjectNameFormat('.hidden');
      expect(result).toBe('Project name can only contain letters, numbers, hyphens, and underscores');
    });

    it('should return error for null/undefined', () => {
      expect(validateProjectNameFormat(null)).toBe('Project name is required');
      expect(validateProjectNameFormat(undefined)).toBe('Project name is required');
    });
  });
});
