import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'clientRole', 'rating', 'order', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
      label: 'Client Name',
    },
    {
      name: 'clientRole',
      type: 'text',
      label: 'Client Role/Title',
      admin: {
        description: 'e.g., "CEO, Tech Startup" or "Business Owner"',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: 'Testimonial Content',
      admin: {
        description: 'The testimonial text from the client',
      },
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Rating',
      min: 1,
      max: 5,
      admin: {
        description: 'Rating from 1 to 5 stars',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      admin: {
        description: 'Lower numbers appear first',
      },
      defaultValue: 0,
    },
  ],
}
