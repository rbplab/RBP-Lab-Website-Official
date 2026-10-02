import {defineField, defineType} from 'sanity'

/**
 * The home page, as a single document rather than a list.
 *
 * The PI asked for this in the 19 September review — "this section is missing
 * in the panel" — so the hero wording, keywords, buttons and the headings of
 * each band below can be changed without a code edit.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'sections', title: 'Section headings'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      group: 'hero',
      description: 'Set in the large serif face. Kept on one line at every width.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lede',
      title: 'Lede',
      type: 'text',
      rows: 3,
      group: 'hero',
      description: 'The paragraph under the headline.',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'hero',
      description: 'The pills under the lede.',
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary button label',
      type: 'string',
      group: 'hero',
      initialValue: 'Explore Research',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary button label',
      type: 'string',
      group: 'hero',
      initialValue: 'Meet the Team',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero figure',
      type: 'image',
      options: {hotspot: true},
      group: 'hero',
      fields: [
        defineField({name: 'alt', title: 'Alternative text', type: 'string'}),
        defineField({name: 'caption', title: 'Caption', type: 'string'}),
      ],
    }),

    defineField({
      name: 'focusEyebrow',
      title: 'Research band — eyebrow',
      type: 'string',
      group: 'sections',
      initialValue: 'Research Focus',
    }),
    defineField({
      name: 'focusTitle',
      title: 'Research band — heading',
      type: 'string',
      group: 'sections',
    }),
    defineField({
      name: 'focusLede',
      title: 'Research band — lede',
      type: 'text',
      rows: 3,
      group: 'sections',
    }),
    defineField({
      name: 'newsEyebrow',
      title: 'News band — eyebrow',
      type: 'string',
      group: 'sections',
      initialValue: 'Lab News & Achievements',
    }),
    defineField({
      name: 'newsTitle',
      title: 'News band — heading',
      type: 'string',
      group: 'sections',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Home page'}),
  },
})
