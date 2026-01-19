import type { GlobalConfig } from 'payload'

export const ThemeSettings: GlobalConfig = {
  slug: 'theme-settings',
  label: 'Theme Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'primaryColor',
      type: 'text',
      required: true,
      defaultValue: '#4a90e2',
      label: 'Primary Color',
      admin: {
        description: 'Main brand color (hex format, e.g., #4a90e2)',
      },
    },
    {
      name: 'secondaryColor',
      type: 'text',
      required: true,
      defaultValue: '#ffffff',
      label: 'Secondary Color',
      admin: {
        description: 'Accent color for highlights (hex format, e.g., #ffffff)',
      },
    },
    {
      name: 'accentColor',
      type: 'text',
      required: true,
      defaultValue: '#f8fafc',
      label: 'Accent Color',
      admin: {
        description: 'Additional accent color (hex format, e.g., #f8fafc)',
      },
    },
    {
      name: 'fontHeading',
      type: 'select',
      required: true,
      defaultValue: 'montserrat',
      label: 'Heading Font',
      options: [
        { label: 'Montserrat', value: 'montserrat' },
        { label: 'Playfair Display', value: 'playfair-display' },
        { label: 'Merriweather', value: 'merriweather' },
        { label: 'Cormorant', value: 'cormorant' },
        { label: 'Georgia', value: 'georgia' },
      ],
      admin: {
        description: 'Font family for headings',
      },
    },
    {
      name: 'fontBody',
      type: 'select',
      required: true,
      defaultValue: 'open-sans',
      label: 'Body Font',
      options: [
        { label: 'Open Sans', value: 'open-sans' },
        { label: 'Inter', value: 'inter' },
        { label: 'Lora', value: 'lora' },
        { label: 'Raleway', value: 'raleway' },
        { label: 'Source Sans Pro', value: 'source-sans-pro' },
      ],
      admin: {
        description: 'Font family for body text',
      },
    },
  ],
}
