import fs from 'fs';
import path from 'path';

/**
 * Validate a project name
 * @param {string} name - The project name to validate
 * @param {string} [cwd] - Current working directory (for directory existence check)
 * @returns {true|string} True if valid, error message string if invalid
 */
export function validateProjectName(name, cwd = process.cwd()) {
  if (!name || name.trim().length === 0) {
    return 'Project name is required';
  }
  if (name.includes(' ')) {
    return 'Project name cannot contain spaces';
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
    return 'Project name can only contain letters, numbers, hyphens, and underscores';
  }
  const targetDir = path.resolve(cwd, name);
  if (fs.existsSync(targetDir)) {
    return `Directory "${name}" already exists`;
  }
  return true;
}

/**
 * Validate project name format only (without directory check)
 * @param {string} name - The project name to validate
 * @returns {true|string} True if valid format, error message string if invalid
 */
export function validateProjectNameFormat(name) {
  if (!name || name.trim().length === 0) {
    return 'Project name is required';
  }
  if (name.includes(' ')) {
    return 'Project name cannot contain spaces';
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
    return 'Project name can only contain letters, numbers, hyphens, and underscores';
  }
  return true;
}
