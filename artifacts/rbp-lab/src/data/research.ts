import { splitCitation } from '@/data/publications';

/** A paper cited by a focus area, linked to its entry on /publications. */
export interface CitedPaper {
  id: string;
  title: string;
  venue: string;
  year: string;
}

export interface FocusArea {
  id: string;
  number: string;
  icon: string;
  eyebrow: string;
  title: string;
  summary: string;
  body: string[];
  imageSrc: string;
  tags: string[];
  papers?: CitedPaper[];
}

export interface Concept {
  id: string;
  icon: string;
  eyebrow: string;
  title: string;
  body: string[];
}

export interface PipelineStage {
  id: string;
  label: string;
  caption: string;
}

export interface ResearchFigure {
  id: string;
  src: string;
  caption: string;
  meta: string;
}

/** Stages of the RNA lifecycle the laboratory works across. */
export const PIPELINE: PipelineStage[] = [
  { id: 'transcription', label: 'Transcription', caption: 'Pre-mRNA is synthesised from the gene.' },
  { id: 'splicing', label: 'Splicing', caption: 'Introns are removed and exons joined.' },
  { id: 'ejc-deposition', label: 'EJC deposition', caption: 'The spliceosome deposits the EJC upstream of junctions.' },
  { id: 'export', label: 'Export', caption: 'The mature mRNP is exported to the cytoplasm.' },
  { id: 'translation', label: 'Translation', caption: 'Ribosomes read the transcript and remodel the mRNP.' },
  { id: 'decay', label: 'Decay', caption: 'Surveillance pathways such as NMD degrade faulty transcripts.' },
];

/** Background biology framing the laboratory's questions. */
export const CONCEPTS: Concept[] = [
  {
    id: 'rnp-hypothesis',
    icon: 'FlaskConical',
    eyebrow: 'Core Concept',
    title: 'The RNP Hypothesis',
    body: [
      'Starting from the birth of RNA molecules, many RNA-binding proteins (RBPs) associate with RNA to regulate its cytoplasmic fate. This assembly of RBPs on non-coding RNAs (ncRNAs) or mRNAs is called ribonucleoprotein particles (RNPs). The dynamic interaction between RBPs and RNA molecules decides mRNA biogenesis, pre-mRNA processing, export, localization, translation, and degradation — the deposition of RBPs on mRNAs couples transcription with post-transcriptional gene expression events.',
      'However, we do not have a comprehensive idea about the sequential assembly, composition, and roles of many RBPs. Thus, our goal is to understand the assembly and functions of various mRNP interactomes to decipher the molecular events at different stages of gene expression.',
    ],
  },
  {
    id: 'exon-junction-complex',
    icon: 'Layers',
    eyebrow: 'Core Biology',
    title: 'Exon Junction Complex (EJC)',
    body: [
      'During the splicing of premature mRNA, the spliceosome deposits a multiprotein complex termed the Exon Junction Complex (EJC) onto the mRNAs. The core EJC subunits are eukaryotic translation initiation factor 4A3 (eIF4A3), Y14-MAGOH, and Barentz (BTZ, CASC3, or MLN51).',
    ],
  },
  {
    id: 'asap-complex',
    icon: 'Network',
    eyebrow: 'Core Biology',
    title: 'Apoptosis & Splicing-Associated Protein (ASAP)',
    body: [
      'Many proteins transiently interact with the core EJC, and our focus of study is the ASAP complex. Components of both ASAP and EJC have been found to function in a wide range of activities on RNA metabolism, including splicing, translation, nonsense-mediated mRNA decay (NMD), and apoptosis.',
    ],
  },
];

/** The laboratory's four active research directions. */
export const FOCUS_AREAS: FocusArea[] = [
  {
    id: 'asap-ejc-mrna-metabolism',
    number: '01',
    icon: 'Network',
    eyebrow: 'Focus Area',
    title: 'ASAP & EJC in mRNA Metabolism',
    summary: 'Understanding the functions of the Apoptosis and Splicing-Associated Protein (ASAP) complex in relation to the Exon Junction Complex (EJC) in mRNA metabolism.',
    body: [
      'Understanding the functions of the Apoptosis and Splicing-Associated Protein (ASAP) complex in relation to the Exon Junction Complex (EJC) in mRNA metabolism.',
    ],
    imageSrc: '/images/lab/IP_Data.jpeg',
    tags: ['ASAP', 'EJC', 'mRNP assembly'],
  },
  {
    id: 'rbps-in-human-disease',
    number: '02',
    icon: 'Activity',
    eyebrow: 'Focus Area',
    title: 'RBPs in Human Disease',
    summary: 'Elucidating the molecular involvement of RNA-binding proteins in human diseases such as cancers and neurodevelopmental disorders.',
    body: [
      'Elucidating the molecular involvement of RNA-binding proteins in human diseases such as cancers and neurodevelopmental disorders.',
    ],
    imageSrc: '/images/lab/Invasion.jpeg',
    tags: ['Cancer', 'Neurodevelopment'],
  },
  {
    id: 'post-transcriptional-regulation',
    number: '03',
    icon: 'Dna',
    eyebrow: 'Focus Area',
    title: 'Post-Transcriptional Regulation',
    summary: 'Exploring the post-transcriptional gene regulation of different RNA-binding proteins across stages of gene expression.',
    body: [
      'Exploring the post-transcriptional gene regulation of different RNA-binding proteins across stages of gene expression.',
    ],
    imageSrc: '/images/lab/Proteomics.jpeg',
    tags: ['NMD', 'Gene expression'],
  },
  {
    id: 'isoform-switching',
    number: '04',
    icon: 'Shuffle',
    eyebrow: 'Focus Area',
    title: 'Isoform Switching',
    summary: 'Investigating the functional outcomes of isoform switching and its consequences for mRNP composition and activity.',
    body: [
      'Investigating the functional outcomes of isoform switching and its consequences for mRNP composition and activity.',
    ],
    imageSrc: '/images/lab/Isoform_Usage.jpeg',
    tags: ['Splicing', 'Isoforms'],
  },
];

/** Representative plates from published and ongoing work. */
export const FIGURES: ResearchFigure[] = [
  { id: 'fig-proteomics', src: '/images/lab/Proteomics.jpeg', caption: 'Distinct gene-regulatory functions of the MAGOH and MAGOHB paralogs.', meta: 'Quantitative proteomics' },
  { id: 'fig-crispr', src: '/images/lab/Cas-9_KO_and_Splicing.jpeg', caption: 'CRISPR-Cas9 knockouts distinguishing the MAGOH paralogs in splicing assays.', meta: 'Genome editing' },
  { id: 'fig-localization', src: '/images/lab/Localization_of_MAGOH_delta_37.jpeg', caption: 'Subcellular localization of the EJC-independent MAGOH-\u039437 isoform.', meta: 'Confocal microscopy' },
  { id: 'fig-ip', src: '/images/lab/IP_Data.jpeg', caption: 'Immunoprecipitation mapping of interactions within the EJC core.', meta: 'Biochemistry' },
  { id: 'fig-isoform', src: '/images/lab/Isoform_Usage.jpeg', caption: 'Isoform usage shifts on RNPS1 knockdown in HeLa and SiHa cells.', meta: 'Transcriptomics' },
  { id: 'fig-invasion', src: '/images/lab/Invasion.jpeg', caption: 'Invasion assays quantifying the role of EJC components in cancer cell lines.', meta: 'Cell biology' },
];

/* ---------------------------------------------------------------------------
 * Sanity wiring
 *
 * The research page is four different structures, so it queries four document
 * types in one request rather than stitching a single page blob together.
 * ------------------------------------------------------------------------ */

export interface SanityResearchDocs {
  pipeline: { _id: string; label?: string; caption?: string }[];
  concepts: { _id: string; title?: string; eyebrow?: string; icon?: string; body?: string[] }[];
  focusAreas: {
    _id: string;
    title?: string;
    slug?: { current?: string };
    eyebrow?: string;
    icon?: string;
    summary?: string;
    body?: string[];
    tags?: string[];
    figureUrl?: string;
    papers?: { _id: string; citation?: string; venue?: string; year?: string }[];
  }[];
  figures: { _id: string; caption?: string; meta?: string; imageUrl?: string }[];
}

export const RESEARCH_QUERY = `{
  "pipeline": *[_type == "pipelineStage"] | order(order asc){_id, label, caption},
  "concepts": *[_type == "researchConcept"] | order(order asc){_id, title, eyebrow, icon, body},
  "focusAreas": *[_type == "focusArea"] | order(order asc){
    _id, title, slug, eyebrow, icon, summary, body, tags,
    "figureUrl": figure.asset->url,
    "papers": papers[]->{_id, citation, venue, year}
  },
  "figures": *[_type == "researchFigure"] | order(order asc){
    _id, caption, meta, "imageUrl": image.asset->url
  }
}`;

const cdn = (url: string | undefined, width: number) =>
  url ? `${url}?w=${width}&auto=format&fit=max&q=75` : '';

export function mapPipeline(docs: SanityResearchDocs['pipeline']): PipelineStage[] {
  return docs
    .filter((d) => d.label)
    .map((d) => ({ id: d._id, label: d.label as string, caption: d.caption ?? '' }));
}

export function mapConcepts(docs: SanityResearchDocs['concepts']): Concept[] {
  return docs
    .filter((d) => d.title)
    .map((d) => ({
      id: d._id,
      icon: d.icon ?? 'FlaskConical',
      eyebrow: d.eyebrow ?? 'Core Concept',
      title: d.title as string,
      body: d.body ?? [],
    }));
}

export function mapFocusAreas(docs: SanityResearchDocs['focusAreas']): FocusArea[] {
  return docs
    .filter((d) => d.title)
    .map((d, index) => ({
      // The anchor has to be the slug, not the document id: the page navigation
      // and the detail bands link to each other by this value.
      id: d.slug?.current ?? d._id,
      number: String(index + 1).padStart(2, '0'),
      icon: d.icon ?? 'Network',
      eyebrow: d.eyebrow ?? 'Focus Area',
      title: d.title as string,
      summary: d.summary ?? '',
      body: d.body ?? [],
      imageSrc: cdn(d.figureUrl, 1200),
      tags: d.tags ?? [],
      papers: (d.papers ?? [])
        .filter((p) => p.citation)
        .map((p) => ({
          // Must match the anchor the publications page renders.
          id: p._id.replace(/^publication-/, ''),
          title: splitCitation(p.citation as string).title,
          venue: p.venue ?? '',
          year: p.year ?? '',
        })),
    }));
}

export function mapFigures(docs: SanityResearchDocs['figures']): ResearchFigure[] {
  return docs
    .filter((d) => d.imageUrl)
    .map((d) => ({
      id: d._id,
      src: cdn(d.imageUrl, 1200),
      caption: d.caption ?? '',
      meta: d.meta ?? '',
    }));
}
