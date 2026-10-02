import {defineField, defineType} from 'sanity'

/**
 * The research page is four different structures, so it is four document types
 * rather than one page blob. Each maps to one band on /research and can be
 * edited without touching the others.
 *
 * `icon` is a name from the site's Lucide set, not free text — an unknown name
 * falls back to a default glyph rather than breaking the render.
 */
const ICON_OPTIONS = [
  {title: 'Network', value: 'Network'},
  {title: 'Activity (pulse)', value: 'Activity'},
  {title: 'DNA helix', value: 'Dna'},
  {title: 'Shuffle', value: 'Shuffle'},
  {title: 'Layers', value: 'Layers'},
  {title: 'Flask', value: 'FlaskConical'},
]

/** One stage of the RNA lifecycle, shown as the numbered stepper. */
export const pipelineStage = defineType({
  name: 'pipelineStage',
  title: 'Pipeline stage',
  type: 'document',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'caption', title: 'Caption', type: 'text', rows: 2}),
    defineField({name: 'order', title: 'Sort order', type: 'number', initialValue: 100}),
  ],
  orderings: [{title: 'Manual order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'label', subtitle: 'caption'}},
})

/** Background biology, rendered as the accordion under "Background". */
export const researchConcept = defineType({
  name: 'researchConcept',
  title: 'Research concept',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Core Concept'}),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      initialValue: 'FlaskConical',
      options: {list: ICON_OPTIONS},
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'text', rows: 5}],
      description: 'One entry per paragraph.',
    }),
    defineField({name: 'order', title: 'Sort order', type: 'number', initialValue: 100}),
  ],
  orderings: [{title: 'Manual order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'eyebrow'}},
})

/** One of the lab's active research directions. */
export const focusArea = defineType({
  name: 'focusArea',
  title: 'Focus area',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      description: 'Anchor target for the page navigation.',
      validation: (r) => r.required(),
    }),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Research Theme'}),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'The question this theme answers. Shown in italics under the title.',
    }),
    defineField({
      name: 'centralQuestion',
      title: 'Central question',
      type: 'text',
      rows: 2,
      description: 'Closing line. Rendered after the words "Central question:".',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      initialValue: 'Network',
      options: {list: ICON_OPTIONS},
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Shown on the overview card near the top of the page.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'text', rows: 5}],
      description: 'One entry per paragraph, shown in the detail band.',
    }),
    defineField({name: 'figure', title: 'Figure', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'tags',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'papers',
      title: 'Key papers',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'publication'}]}],
      description:
        'Publications supporting this theme. Shown under the detail band and linked ' +
        'straight to the entry on the publications page.',
    }),
    defineField({name: 'order', title: 'Sort order', type: 'number', initialValue: 100}),
  ],
  orderings: [{title: 'Manual order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'summary', media: 'figure'}},
})

/** A representative plate in the "Selected data" grid. */
export const researchFigure = defineType({
  name: 'researchFigure',
  title: 'Research figure',
  type: 'document',
  fields: [
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, validation: (r) => r.required()}),
    defineField({name: 'caption', title: 'Caption', type: 'text', rows: 2, validation: (r) => r.required()}),
    defineField({
      name: 'meta',
      title: 'Technique',
      type: 'string',
      description: 'e.g. "Confocal microscopy". Shown under the caption.',
    }),
    defineField({name: 'order', title: 'Sort order', type: 'number', initialValue: 100}),
  ],
  orderings: [{title: 'Manual order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'caption', subtitle: 'meta', media: 'image'}},
})
