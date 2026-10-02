/**
 * Home page content.
 *
 * The PI asked for this to be editable — "this section is missing in the
 * panel" — so the hero wording, keywords, buttons and the band headings all
 * come from one Sanity document, with these values as the offline fallback.
 */
export interface HomeContent {
  title: string;
  lede: string;
  keywords: string[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageCaption: string;
  focusEyebrow: string;
  focusTitle: string;
  focusLede: string;
  newsEyebrow: string;
  newsTitle: string;
}

export const HOME: HomeContent = {
  title: 'RNA-Binding Proteins Laboratory',
  lede: 'Investigating the molecular logic of RNA-binding proteins in nonsense-mediated decay, splicing regulation, and gene expression fidelity.',
  keywords: ['Alternative Splicing', 'Splicing', 'Gene Expression', 'EJC Research'],
  primaryCtaLabel: 'Explore Research',
  secondaryCtaLabel: 'Meet the Team',
  heroImage: '/images/lab/Proteomics.jpeg',
  heroImageAlt:
    'Research figure: western blot of MAGOH and MAGOHB knockouts, ribbon structures of the two paralogs, and a bar chart of mean normalised peptide intensity across knockout and wildtype conditions',
  heroImageCaption: 'MAGOH / MAGOHB paralogs · Quantitative proteomics',
  focusEyebrow: 'Research Focus',
  focusTitle: 'Problems the lab is working on',
  focusLede:
    'Our programme spans the assembly of ribonucleoprotein complexes, their disruption in disease, and the regulatory consequences downstream.',
  newsEyebrow: 'Lab News & Achievements',
  newsTitle: 'Recent work from the laboratory',
};

/** Shape returned by HOME_QUERY. */
export interface SanityHomeDoc {
  title?: string;
  lede?: string;
  keywords?: string[];
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  heroImageCaption?: string;
  focusEyebrow?: string;
  focusTitle?: string;
  focusLede?: string;
  newsEyebrow?: string;
  newsTitle?: string;
}

/** A singleton: take whichever home document exists. */
export const HOME_QUERY = `*[_type == "homePage"][0]{
  title, lede, keywords, primaryCtaLabel, secondaryCtaLabel,
  focusEyebrow, focusTitle, focusLede, newsEyebrow, newsTitle,
  "heroImageUrl": heroImage.asset->url,
  "heroImageAlt": heroImage.alt,
  "heroImageCaption": heroImage.caption
}`;

/**
 * Field-by-field fallback rather than all-or-nothing: an editor who clears one
 * field should not blank the rest of the hero.
 */
export function mapHomeDoc(doc: SanityHomeDoc | null): HomeContent {
  if (!doc) return HOME;
  return {
    title: doc.title || HOME.title,
    lede: doc.lede || HOME.lede,
    keywords: doc.keywords?.length ? doc.keywords : HOME.keywords,
    primaryCtaLabel: doc.primaryCtaLabel || HOME.primaryCtaLabel,
    secondaryCtaLabel: doc.secondaryCtaLabel || HOME.secondaryCtaLabel,
    heroImage: doc.heroImageUrl
      ? `${doc.heroImageUrl}?w=1200&auto=format&fit=max&q=75`
      : HOME.heroImage,
    heroImageAlt: doc.heroImageAlt || HOME.heroImageAlt,
    heroImageCaption: doc.heroImageCaption || HOME.heroImageCaption,
    focusEyebrow: doc.focusEyebrow || HOME.focusEyebrow,
    focusTitle: doc.focusTitle || HOME.focusTitle,
    focusLede: doc.focusLede || HOME.focusLede,
    newsEyebrow: doc.newsEyebrow || HOME.newsEyebrow,
    newsTitle: doc.newsTitle || HOME.newsTitle,
  };
}
