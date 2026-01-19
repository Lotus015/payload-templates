import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g., "home", "about")',
      },
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'headline',
          type: 'text',
          label: 'Headline',
        },
        {
          name: 'subheadline',
          type: 'text',
          label: 'Subheadline',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'CTA Button Text',
        },
        {
          name: 'ctaLink',
          type: 'text',
          label: 'CTA Button Link',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Page Content',
    },
  ],
}
