export type NewsKind = 'Publication' | 'Funding' | 'Award' | 'Announcement';

/**
 * One announcement, rendered on two surfaces: the home-page carousel and the
 * /news list. They previously used separate arrays, so posting an item meant
 * editing both. One shape now feeds both.
 *
 * `title` is optional because the carousel leads with the summary sentence.
 * Where no short title exists, /news falls back to the summary rather than
 * inventing a headline.
 */
export interface NewsEntry {
  id: string;
  title?: string;
  summary: string;
  kind: NewsKind | string;
  /** Journal, funding body, or host. */
  venue?: string;
  /** Shown large on the carousel card. */
  year: string;
  /** Path under public/, or an absolute Sanity CDN URL. */
  image?: string;
  link?: string;
}

/**
 * Bundled fallback. The Studio is the source of truth once documents exist;
 * these render when Sanity is empty or unreachable so the site never blanks.
 */
export const NEWS_ITEMS: NewsEntry[] = [
  {
    id: 'magoh-magohb-paralog-proteomics',
    title: 'New Publication: MAGOH/MAGOHB Paralog Proteomics',
    summary:
      'Proteomics uncovers distinct gene-regulatory functions of the MAGOH/MAGOHB paralogs in cell proliferation.',
    kind: 'Publication',
    venue: 'BBA Gene Regulatory Mechanisms',
    year: '2026',
    image: '/images/lab/Proteomics.jpeg',
  },
  {
    id: 'crispr-distinguish-magoh-paralogs',
    title: 'CRISPR-Based Method to Distinguish MAGOH Paralogs',
    summary:
      'CRISPR-based genome editing developed to endogenously distinguish the paralogs MAGOH and MAGOHB.',
    kind: 'Publication',
    venue: 'Gene Reports',
    year: '2025',
    image: '/images/lab/Cas-9_KO_and_Splicing.jpeg',
  },
  {
    id: 'magoh-delta-37-isoform',
    summary:
      'An EJC-independent novel isoform of MAGOH — MAGOH-Δ37 — identified along with its interactome.',
    kind: 'Publication',
    venue: 'BBRC',
    year: '2025',
    image: '/images/lab/Localization_of_MAGOH_delta_37.jpeg',
  },
  {
    id: 'sap18-bioid-prespliceosomal',
    summary:
      'BioID proximity mapping reveals novel SAP18 interactions within the prespliceosomal complex.',
    kind: 'Publication',
    venue: 'BBRC',
    year: '2024',
    image: '/images/lab/IP_Data.jpeg',
  },
  {
    id: 'rnps1-oncogenic-splicing-factor',
    summary:
      'RNPS1 identified as an oncogenic splicing factor driving proliferation in cervical cancer cells.',
    kind: 'Publication',
    venue: 'IUBMB',
    year: '2022',
    image: '/images/lab/Invasion.jpeg',
  },
];

/** Shape returned by the GROQ query in NEWS_QUERY. */
export interface SanityNewsDoc {
  _id: string;
  title?: string;
  summary?: string;
  kind?: string;
  venue?: string;
  year?: string;
  link?: string;
  imageUrl?: string;
}

export const NEWS_QUERY = `*[_type == "news"] | order(publishedAt desc){
  _id, title, summary, kind, venue, year, link,
  "imageUrl": image.asset->url
}`;

/** Maps Studio documents onto the shape both news surfaces render. */
export function mapNewsDocs(docs: SanityNewsDoc[]): NewsEntry[] {
  return docs
    .filter((doc) => doc.summary || doc.title)
    .map((doc) => ({
      id: doc._id,
      title: doc.title,
      summary: doc.summary ?? doc.title ?? '',
      kind: doc.kind ? doc.kind.charAt(0).toUpperCase() + doc.kind.slice(1) : 'Announcement',
      venue: doc.venue,
      year: doc.year ?? '',
      // Same reasoning as the gallery: ask the CDN for a card-sized render
      // rather than the original upload.
      image: doc.imageUrl ? `${doc.imageUrl}?w=900&auto=format&fit=max&q=75` : undefined,
      link: doc.link,
    }));
}
