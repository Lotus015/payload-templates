import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'firmName',
      type: 'text',
      required: true,
      defaultValue: 'Law Firm Name',
      label: 'Firm Name',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      defaultValue: 'Professional Legal Services',
      admin: {
        description: 'A short slogan or description of the firm',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
      defaultValue: 'contact@example.com',
      label: 'Contact Email',
    },
    {
      name: 'contactPhone',
      type: 'text',
      required: true,
      defaultValue: '+1 (555) 000-0000',
      label: 'Contact Phone',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Address',
      defaultValue: '123 Main Street\nCity, State 12345',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
    },
    {
      name: 'workingHours',
      type: 'textarea',
      label: 'Working Hours',
      defaultValue: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: By appointment\nSunday: Closed',
      admin: {
        description: 'Business hours displayed on the website',
      },
    },
  ],
}
