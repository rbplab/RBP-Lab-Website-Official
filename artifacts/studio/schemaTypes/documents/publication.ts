import {defineField, defineType} from 'sanity'

/**
 * A single publication. `citation` holds the full reference as one string
 * rather than split author/title fields: the lab's records already exist in
 * that form, and splitting them would force editors to re-key 63 entries and
 * to decide how to punctuate each one.
 */
export const publication = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({
      name: 'citation',
      title: 'Citation',
      type: 'text',
      rows: 3,
      description: 'Authors — Title, as it should appear on the page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: 'journals',
      options: {
        list: [
          {title: 'Journal publication', value: 'journals'},
          {title: 'Conference publication', value: 'conferences'},
          {title: 'Book', value: 'books'},
          {title: 'Book chapter', value: 'bookChapters'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      description: 'Journal, conference, or publisher. Drives the cover artwork.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'Groups the entry on the page. Newest first.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'doi',
      title: 'DOI',
      type: 'string',
      description: 'Without the https:// prefix, e.g. doi.org/10.1016/j.bbagrm.2025.195115',
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'text',
      rows: 2,
      description: 'One plain-language line about what the paper shows.',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source record',
      type: 'url',
      description: 'Publisher or PubMed page. Shown next to the DOI.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'extra',
      title: 'Extra detail',
      type: 'string',
      description: 'Volume, pages, ISBN — anything shown after the DOI.',
    }),
  ],
  orderings: [
    {title: 'Newest first', name: 'yearDesc', by: [{field: 'year', direction: 'desc'}]},
    {title: 'By type', name: 'type', by: [{field: 'type', direction: 'asc'}, {field: 'year', direction: 'desc'}]},
  ],
  preview: {
    select: {citation: 'citation', venue: 'venue', year: 'year', type: 'type'},
    prepare({citation, venue, year, type}) {
      return {
        title: (citation ?? '').split('—').slice(-1)[0].trim() || citation,
        subtitle: [type, venue, year].filter(Boolean).join(' · '),
      }
    },
  },
})
