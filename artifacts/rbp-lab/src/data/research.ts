import { PUBLICATIONS, splitCitation, type Publication } from '@/data/publications';

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
  /** The question the theme answers, shown under the title. */
  question?: string;
  summary: string;
  body: string[];
  /** Closing line, rendered after "Central question:". */
  centralQuestion?: string;
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
/**
 * Research themes, taken from the faculty draft the PI supplied and asked to be
 * merged in. Rendered as sequential points under the Research heading rather
 * than as separate sections, per her 19 Sep review.
 *
 * `papers` holds our own publication ids so each theme links to the exact entry
 * on /publications.
 */
export const FOCUS_AREA_SEED: (Omit<FocusArea, 'papers'> & { papers: string[] })[] = [
  {
    id: 'ejc-splicing-fidelity',
    number: '01',
    icon: 'Layers',
    eyebrow: 'Research Theme',
    title: 'EJC & splicing fidelity',
    question: 'How does a cell preserve the integrity of its RNA messages?',
    summary: 'The exon junction complex (EJC) links splicing to later events in an RNA molecule’s life. Collaborative work showed that EJCs help suppress inappropriate splice-site use. Related studies connect EJC-associated assembly with RNA export and examine how the splicing regulator RNPS1 supports alternative splicing.',
    body: [
      'The exon junction complex (EJC) links splicing to later events in an RNA molecule’s life. Collaborative work showed that EJCs help suppress inappropriate splice-site use. Related studies connect EJC-associated assembly with RNA export and examine how the splicing regulator RNPS1 supports alternative splicing.',
    ],
    centralQuestion: 'how do RNA-associated protein assemblies influence which splice sites are used?',
    imageSrc: '/images/lab/IP_Data.jpeg',
    tags: [
      'EJC',
      'Splicing fidelity',
      'RNPS1',
    ],
    papers: [
      'journals-25',
      'journals-27',
      'journals-11',
    ],
  },
  {
    id: 'magoh-paralogs-isoform-diversity',
    number: '02',
    icon: 'Shuffle',
    eyebrow: 'Research Theme',
    title: 'MAGOH paralogs & isoform diversity',
    question: 'What makes closely related proteins functionally different?',
    summary: 'MAGOH and MAGOHB provide a powerful setting for investigating shared and distinct protein functions. The publication record extends from their contributions to EJC composition and nonsense-mediated decay to the MAGOH-Δ37 isoform, which has a distinct interaction profile outside the canonical EJC. Recent proteomic work examines paralog-specific gene regulatory functions in cell proliferation.',
    body: [
      'MAGOH and MAGOHB provide a powerful setting for investigating shared and distinct protein functions. The publication record extends from their contributions to EJC composition and nonsense-mediated decay to the MAGOH-Δ37 isoform, which has a distinct interaction profile outside the canonical EJC. Recent proteomic work examines paralog-specific gene regulatory functions in cell proliferation.',
    ],
    centralQuestion: 'how do paralog identity and isoform switching reshape a protein’s interactions and biological roles?',
    imageSrc: '/images/lab/Proteomics.jpeg',
    tags: [
      'MAGOH',
      'MAGOHB',
      'Isoforms',
    ],
    papers: [
      'journals-28',
      'journals-6',
      'journals-1',
    ],
  },
  {
    id: 'rna-surveillance-nmd',
    number: '03',
    icon: 'Activity',
    eyebrow: 'Research Theme',
    title: 'RNA surveillance & NMD',
    question: 'How are RNA messages selected for surveillance?',
    summary: 'Nonsense-mediated mRNA decay (NMD) connects RNA quality control with gene regulation. Work on MAGOH establishes links between EJC composition and NMD, while reviews examine UPF3 proteins, their neurodevelopmental relevance and microRNA-mediated regulation of NMD factors. These complementary perspectives frame questions about how the surveillance machinery itself is regulated.',
    body: [
      'Nonsense-mediated mRNA decay (NMD) connects RNA quality control with gene regulation. Work on MAGOH establishes links between EJC composition and NMD, while reviews examine UPF3 proteins, their neurodevelopmental relevance and microRNA-mediated regulation of NMD factors. These complementary perspectives frame questions about how the surveillance machinery itself is regulated.',
    ],
    centralQuestion: 'how do the abundance and context of RNA-surveillance factors influence transcript fate?',
    imageSrc: '',
    tags: [
      'NMD',
      'UPF3',
      'microRNA',
    ],
    papers: [
      'journals-28',
      'journals-21',
      'journals-9',
    ],
  },
  {
    id: 'rnps1-micrornas-cancer',
    number: '04',
    icon: 'Dna',
    eyebrow: 'Research Theme',
    title: 'RNPS1, microRNAs & cancer',
    question: 'What happens when a splicing regulator is misregulated?',
    summary: 'RNPS1 connects alternative splicing with cellular function. Published cell-based research links RNPS1 to oncogenic splicing behaviour in cervical cancer models, and a separate study identifies miR-6893-3p as a negative regulator of RNPS1. Together with domain-level splicing studies, this work connects the regulation of a protein to the RNA-processing decisions it helps make.',
    body: [
      'RNPS1 connects alternative splicing with cellular function. Published cell-based research links RNPS1 to oncogenic splicing behaviour in cervical cancer models, and a separate study identifies miR-6893-3p as a negative regulator of RNPS1. Together with domain-level splicing studies, this work connects the regulation of a protein to the RNA-processing decisions it helps make.',
    ],
    centralQuestion: 'how do changes in RNPS1 regulation affect splicing and cancer-cell behaviour? These are mechanistic studies, not claims of a validated clinical test or treatment.',
    imageSrc: '/images/lab/Invasion.jpeg',
    tags: [
      'RNPS1',
      'Cancer',
      'miR-6893-3p',
    ],
    papers: [
      'journals-17',
      'journals-15',
      'journals-11',
    ],
  },
  {
    id: 'rna-protein-interaction-networks',
    number: '05',
    icon: 'Network',
    eyebrow: 'Research Theme',
    title: 'RNA–protein interaction networks',
    question: 'Who works with whom inside an RNA-processing complex?',
    summary: 'Protein interactions offer a route from molecular identity to mechanism. SAP18 BioID proximity mapping investigates its molecular neighbourhood in the prespliceosomal complex, while the MAGOH-Δ37 study examines isoform-associated interactions. A comparative review of RNA–protein interaction techniques places such questions within a broader methodological landscape.',
    body: [
      'Protein interactions offer a route from molecular identity to mechanism. SAP18 BioID proximity mapping investigates its molecular neighbourhood in the prespliceosomal complex, while the MAGOH-Δ37 study examines isoform-associated interactions. A comparative review of RNA–protein interaction techniques places such questions within a broader methodological landscape.',
    ],
    centralQuestion: 'how does the composition of a protein’s molecular neighbourhood change with its identity and context?',
    imageSrc: '',
    tags: [
      'BioID',
      'SAP18',
      'Interactome',
    ],
    papers: [
      'journals-10',
      'journals-6',
      'journals-7',
    ],
  },
  {
    id: 'genome-editing-computational-tools',
    number: '06',
    icon: 'FlaskConical',
    eyebrow: 'Research Theme',
    title: 'Genome editing & computational tools',
    question: 'How can better tools reveal otherwise hidden biology?',
    summary: 'The group’s publication record combines experimental tool development with computational collaborations. CRISPR-based editing distinguishes endogenous MAGOH paralogs; antibody development supports RNPS1 studies. Splice-junction prediction and SpliceViNCI explore how interpretable neural-network approaches can reveal features of splicing sequences.',
    body: [
      'The group’s publication record combines experimental tool development with computational collaborations. CRISPR-based editing distinguishes endogenous MAGOH paralogs; antibody development supports RNPS1 studies. Splice-junction prediction and SpliceViNCI explore how interpretable neural-network approaches can reveal features of splicing sequences.',
    ],
    centralQuestion: 'how can selective molecular tools and interpretable computation make RNA biology easier to interrogate?',
    imageSrc: '/images/lab/Cas-9_KO_and_Splicing.jpeg',
    tags: [
      'CRISPR',
      'Antibody',
      'Deep learning',
    ],
    papers: [
      'journals-3',
      'journals-18',
      'journals-20',
      'journals-23',
    ],
  },
];

/**
 * Resolves the seeded publication ids against PUBLICATIONS so the bundled
 * fallback renders the same citation records Sanity returns. An id with no
 * matching paper is dropped rather than rendering a dead link.
 */
export const FOCUS_AREAS: FocusArea[] = FOCUS_AREA_SEED.map((area) => ({
  ...area,
  papers: area.papers
    .map((id) => PUBLICATIONS.find((publication) => publication.id === id))
    .filter((publication): publication is Publication => Boolean(publication))
    .map((publication) => ({
      id: publication.id,
      title: splitCitation(publication.citation).title,
      venue: publication.venue,
      year: publication.year,
    })),
}));

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
    question?: string;
    centralQuestion?: string;
    figureUrl?: string;
    papers?: { _id: string; citation?: string; venue?: string; year?: string }[];
  }[];
  figures: { _id: string; caption?: string; meta?: string; imageUrl?: string }[];
}

export const RESEARCH_QUERY = `{
  "pipeline": *[_type == "pipelineStage"] | order(order asc){_id, label, caption},
  "concepts": *[_type == "researchConcept"] | order(order asc){_id, title, eyebrow, icon, body},
  "focusAreas": *[_type == "focusArea"] | order(order asc){
    _id, title, slug, eyebrow, icon, summary, body, tags, question, centralQuestion,
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
      question: d.question,
      centralQuestion: d.centralQuestion,
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
