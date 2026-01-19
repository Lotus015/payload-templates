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
      defaultValue: '#2c5f2d',
      label: 'Primary Color',
      admin: {
        description: 'Main brand color (hex format, e.g., #2c5f2d)',
      },
    },
    {
      name: 'secondaryColor',
      type: 'text',
      required: true,
      defaultValue: '#e8dcc4',
      label: 'Secondary Color',
      admin: {
        description: 'Accent color for highlights (hex format, e.g., #e8dcc4)',
      },
    },
    {
      name: 'accentColor',
      type: 'text',
      required: true,
      defaultValue: '#f5f0e8',
      label: 'Accent Color',
      admin: {
        description: 'Additional accent color (hex format, e.g., #f5f0e8)',
      },
    },
    {
      name: 'fontHeading',
      type: 'select',
      required: true,
      defaultValue: 'cormorant',
      label: 'Heading Font',
      options: [
        { label: 'Playfair Display', value: 'playfair-display' },
        { label: 'Merriweather', value: 'merriweather' },
        { label: 'Montserrat', value: 'montserrat' },
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
      defaultValue: 'raleway',
      label: 'Body Font',
      options: [
        { label: 'Inter', value: 'inter' },
        { label: 'Lora', value: 'lora' },
        { label: 'Open Sans', value: 'open-sans' },
        { label: 'Raleway', value: 'raleway' },
        { label: 'Source Sans Pro', value: 'source-sans-pro' },
      ],
      admin: {
        description: 'Font family for body text',
      },
    },
  ],
}
