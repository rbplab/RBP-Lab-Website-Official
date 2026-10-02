export type PublicationType = "journals" | "conferences" | "books" | "bookChapters";

export interface Publication {
  id: string;
  citation: string;
  venue: string;
  year: string;
  doi?: string;
  /**
   * The article's own graphical abstract (or figure 1), served live from the
   * publisher CDN. Elsevier exposes these at a predictable PII-based path;
   * other publishers don't, so only Elsevier entries carry one.
   */
  articleImage?: string;
  extra?: string;
  /** One-line plain-language gloss, from the faculty draft. */
  note?: string;
  /** Publisher or PubMed record. Complements the DOI. */
  sourceUrl?: string;
  type: PublicationType;
}

export const PUBLICATIONS: Publication[] = [
  {
    id: 'journals-1',
    citation: 'Ayushi Rehman; Raja Tamilselvan; Priyanka Yadav; Sourabh Chakrabarty; Pitter F. Huesgen; Kusum Kumari Singh — Proteomic analysis reveals distinct gene regulatory functions of the paralogs MAGOH and MAGOHB in cell proliferation',
    venue: 'BBA – Gene Regulatory Mechanisms',
    year: '2026',
    type: 'journals',
    note: 'Comparative proteomics connects MAGOH-paralog biology with cell proliferation.',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/41956154/',
    doi: 'doi.org/10.1016/j.bbagrm.2026.195152',
  },
  {
    id: 'journals-2',
    citation: 'Khalid Mohd Ibrahimi, Kusum K. Singh — A highly sensitive Shape-engineered AuNP-integrated LSPR-PCF Biosensor with Systematic Comparative Analysis for MCF-7 Cancer Detection',
    venue: 'Optical and Quantum Electronics',
    year: '2026',
    type: 'journals',
  },
  {
    id: 'journals-3',
    citation: 'Ayushi Rehman, Ajay Narwade, Kusum Kumari Singh — CRISPR-based genome editing to endogenously distinguish the paralogs MAGOH and MAGOHB',
    venue: 'GENE REPORTS',
    year: '2025',
    doi: 'doi.org/10.1016/j.genrep.2025.102152',
    articleImage: 'https://ars.els-cdn.com/content/image/1-s2.0-S2452014425000251-ga1.jpg',
    type: 'journals',
    note: 'Genome editing provides a way to distinguish two closely related endogenous proteins.',
    sourceUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S2452014425000251',
  },
  {
    id: 'journals-4',
    citation: 'Gourabh Chatterjee and Kusum K. Singh — Slicing through the Secrets of FokI: Structure, Function and Innovation',
    venue: 'Integrated Publications',
    year: '2025',
    extra: 'ISBN 978-93-5834-713-5',
    type: 'journals',
  },
  {
    id: 'journals-5',
    citation: 'Gourabh Chatterjee and Kusum K. Singh — Editing the Future: Ethical Challenges of Therapeutic Use, Germline Modification and Human Enhancement with CRISPR',
    venue: 'Integrated Publications',
    year: '2025',
    extra: 'ISBN 978-1-83635-584-7',
    type: 'journals',
  },
  {
    id: 'journals-6',
    citation: 'Ayushi Rehman, Raja Tamilselvan, Henrique Baeta, Gourab Chatterjee, Kusum Kumari Singh — An EJC-independent novel isoform of MAGOH: the MAGOH-∆37 isoform and its interactome capture',
    venue: 'BBRC',
    year: '2025',
    doi: 'doi.org/10.1016/j.bbrc.2025.152540',
    articleImage: 'https://ars.els-cdn.com/content/image/1-s2.0-S0006291X25012550-ga1.jpg',
    type: 'journals',
    note: 'An alternatively spliced MAGOH isoform has a distinct interaction profile outside the canonical EJC.',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/40889427/',
  },
  {
    id: 'journals-7',
    citation: 'Sourabh Chakrabarty, Sayan Roy, Soumyadip Sarkar, Kusum K. Singh — RNA-protein interaction techniques - A historical and comparative analysis',
    venue: 'BBA – Gene Regulatory Mechanisms',
    year: '2025',
    doi: 'doi.org/10.1016/j.bbagrm.2025.195115',
    articleImage: 'https://ars.els-cdn.com/content/image/1-s2.0-S1874939925000409-gr1.jpg',
    type: 'journals',
    note: 'A comparative perspective on methods for studying RNA–protein interactions.',
    sourceUrl: 'https://www.sciencedirect.com/science/article/pii/S1874939925000409',
  },
  {
    id: 'journals-8',
    citation: 'Yadav, P., Singh, K.K. — Molecular Cloning, Expression, and Generation of UPF3B-3′UTR Stable Expression Mammalian Cell Line',
    venue: 'Springer Singapore',
    year: '2025',
    doi: 'doi.org/10.1007/978-981-96-9342-9_6',
    type: 'journals',
  },
  {
    id: 'journals-9',
    citation: 'Priyanka Yadav, Raja Tamilselvan, M Harita, Kusum Kumari Singh — MicroRNA-mediated regulation of nonsense-mediated mRNA decay factors: Insights into microRNA prediction tools and profiling techniques',
    venue: 'BBA – Gene Regulatory Mechanisms',
    year: '2024',
    extra: 'Vol.1867(2) pp.195022-195032',
    type: 'journals',
    note: 'A review of the links between microRNAs, NMD factors and the tools used to investigate them.',
    sourceUrl: 'https://www.iitg.ac.in/biotech/faculty_profile_full.php?email=kusumsingh%40iitg.ac.in&iitg=1137',
    doi: 'doi.org/10.1016/j.bbagrm.2024.195022',
  },
  {
    id: 'journals-10',
    citation: 'Sweta Kumari, Ankita Adhikary, Kusum Kumari Singh — BioID Proximity Mapping Reveals Novel SAP18 Interactions in the Prespliceosomal Complex',
    venue: 'BBRC',
    year: '2024',
    doi: 'doi.org/10.1016/j.bbrc.2024.150944',
    articleImage: 'https://ars.els-cdn.com/content/image/1-s2.0-S0006291X24014803-ga1.jpg',
    type: 'journals',
    note: 'Proximity mapping examines SAP18-associated proteins in early spliceosomal assemblies.',
    sourceUrl: 'https://www.sciencedirect.com/science/article/pii/S0006291X24014803',
  },
  {
    id: 'journals-11',
    citation: 'Sweta Kumari, Bhagyashree Deka, and Kusum Kumari Singh — Serine-rich domain of RNPS1 functions in activation of alternative splicing',
    venue: 'Genes to Cells',
    year: '2023',
    extra: 'PMID: 37204171',
    type: 'journals',
    note: 'Domain-level analysis of how RNPS1 contributes to alternative-splicing activation.',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/37204171/',
    doi: 'doi.org/10.1111/gtc.13036',
  },
  {
    id: 'journals-12',
    citation: 'Aparajita Dutta, Kusum Kumari Singh, Ashish Anand — Identification of Splice Junctions Across Species Using BLSTM Model',
    venue: 'ACM Digital Library',
    year: '2023',
    extra: 'pp.1-6',
    type: 'journals',
  },
  {
    id: 'journals-13',
    citation: 'Sweta Kumari, Ayushi Rehman, Pratap Chandra, Kusum K. Singh — Functional role of SAP18 protein: From transcriptional repression to splicing regulation',
    venue: 'Cell Biochemistry and Function',
    year: '2023',
    doi: 'doi.org/10.1002/cbf.3830',
    type: 'journals',
    note: 'A synthesis of SAP18 functions across gene regulation and RNA processing.',
    sourceUrl: 'https://www.iitg.ac.in/biotech/faculty_profile_full.php?email=kusumsingh%40iitg.ac.in&iitg=1137',
  },
  {
    id: 'journals-14',
    citation: 'Bhagyashree Deka, Kusum K Singh — Identification of Candidate RNA Binding Proteins Associated with RNPS1 3\'UTR',
    venue: 'Healthcare Research and Related Technologies',
    year: '2023',
    doi: 'doi.org/10.1007/978-981-99-4056-1_2',
    type: 'journals',
  },
  {
    id: 'journals-15',
    citation: 'Bhagyashree Deka, Ayushi Rehman, Kusum Kumari Singh — miR-6893-3p is a bonafide negative regulator of splicing activator, RNPS1',
    venue: '3 Biotech',
    year: '2023',
    doi: 'doi.org/10.1007/s13205-023-03761-2',
    extra: 'Vol.13(340)',
    type: 'journals',
    note: 'Post-transcriptional regulation of the splicing activator RNPS1 by a microRNA.',
    sourceUrl: 'https://link.springer.com/article/10.1007/s13205-023-03761-2',
  },
  {
    id: 'journals-16',
    citation: 'Rumela Mitra, Ayushi Rehman, Kusum Kumari Singh*, Bithiah Grace Jaganathan* — Multifaceted Roles of MAGOH Proteins',
    venue: 'Molecular Biology Reports',
    year: '2022',
    type: 'journals',
  },
  {
    id: 'journals-17',
    citation: 'Bhagyashree Deka, Pratap Chandra, Priyanka Yadav, Ayushi Rehman, Sweta Kumari, Ajaikumar B. Kunnumakkara and Kusum Kumari Singh — RNPS1 functions as an oncogenic splicing factor in cervical cancer cells',
    venue: 'IUBMB',
    year: '2022',
    type: 'journals',
    note: 'Connects RNPS1-dependent alternative splicing to cancer-cell behaviour. Published online in 2022; journal issue in 2023.',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/36300671/',
    doi: 'doi.org/10.1002/iub.2686',
  },
  {
    id: 'journals-18',
    citation: 'Bhagyashree Deka and Kusum K. Singh — Molecular cloning, expression and generation of a polyclonal antibody specific for RNPS1',
    venue: 'Molecular Biology Reports',
    year: '2022',
    doi: 'doi.org/10.1007/s11033-022-07676-8',
    extra: 'Vol.12(4)',
    type: 'journals',
    note: 'Development of an antibody reagent for studying RNPS1.',
    sourceUrl: 'https://link.springer.com/article/10.1007/s11033-022-07676-8',
  },
  {
    id: 'journals-19',
    citation: 'Ayushi Rehman, Pratap Chandra, Kusum Kumari Singh — The MAGOH paralogs - MAGOH, MAGOHB and their multiple isoforms',
    venue: 'Gene Reports',
    year: '2021',
    doi: 'doi.org/10.1016/j.genrep.2021.101214',
    extra: 'Vol.24',
    articleImage: 'https://ars.els-cdn.com/content/image/1-s2.0-S2452014421001990-gr1.jpg',
    type: 'journals',
    note: 'Examines the MAGOH paralog family and its isoform diversity.',
    sourceUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S2452014421001990',
  },
  {
    id: 'journals-20',
    citation: 'Aparajita Dutta, Kusum K Singh, Ashish Anand — SpliceViNCI: Visualizing the splicing of non-canonical introns through recurrent neural networks',
    venue: 'Journal of Bioinformatics and Computational Biology',
    year: '2021',
    extra: 'Vol.19(04) p.215004',
    type: 'journals',
    note: 'A computational collaboration investigating non-canonical intron splicing.',
    sourceUrl: 'https://www.iitg.ac.in/biotech/faculty_profile_full.php?email=kusumsingh%40iitg.ac.in&iitg=1137',
    doi: 'doi.org/10.1142/S0219720021500141',
  },
  {
    id: 'journals-21',
    citation: 'Bhagyashree Deka, Pratap Chandra, Kusum K. Singh — Functional roles of human Up-frameshift suppressor 3 (UPF3) proteins: From nonsense-mediated mRNA decay to neurodevelopmental disorders',
    venue: 'Biochimie',
    year: '2020',
    doi: 'doi.org/10.1016/j.biochi.2020.10.011',
    articleImage: 'https://ars.els-cdn.com/content/image/1-s2.0-S0300908420302698-gr1.jpg',
    type: 'journals',
    note: 'UPF3 proteins at the intersection of RNA quality control and neurodevelopment. Published online in 2020; journal issue in 2021.',
    sourceUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S0300908420302698',
  },
  {
    id: 'journals-22',
    citation: 'Deka B and Singh K.K. — The arginine and serine (RS)-rich domains of Acinus modulate splicing',
    venue: 'Cell Biology International',
    year: '2019',
    type: 'journals',
  },
  {
    id: 'journals-23',
    citation: 'Aparajita Dutta, Aman Dalmia, Athul R., Kusum Kumari Singh, Ashish Anand — Using the Chou\'s 5-steps rule to predict splice junctions with interpretable bidirectional long short-term memory networks',
    venue: 'Computers in Biology and Medicine',
    year: '2019',
    doi: 'doi.org/10.1016/j.compbiomed.2019.103558',
    articleImage: 'https://ars.els-cdn.com/content/image/1-s2.0-S0010482519304135-gr1.jpg',
    type: 'journals',
    note: 'Interpretable neural-network methods for splice-junction prediction.',
    sourceUrl: 'https://www.iitg.ac.in/biotech/faculty_profile_full.php?email=kusumsingh%40iitg.ac.in&iitg=1137',
  },
  {
    id: 'journals-24',
    citation: 'Dutta A., Dubey T., Singh K. K. and Anand A. — SpliceVec: distributed feature representations for splice junction prediction',
    venue: 'Computational Biology and Chemistry',
    year: '2018',
    type: 'journals',
  },
  {
    id: 'journals-25',
    citation: 'Boehm V, Britto-Borges T, Steckelberg AL, Singh KK, Gerbracht JV, Gueney E, Blazquez L, Altmueller J, Dieterich C, Gehring NH — Exon Junction Complexes Suppress Spurious Splice Sites to Safeguard Transcriptome Integrity',
    venue: 'Molecular Cell',
    year: '2018',
    extra: 'Vol.72(3) pp.482-495',
    type: 'journals',
    note: 'A collaborative study of how EJCs help suppress inappropriate splice-site use.',
    sourceUrl: 'https://discovery.ucl.ac.uk/10063339/',
    doi: 'doi.org/10.1016/j.molcel.2018.08.030',
  },
  {
    id: 'journals-26',
    citation: 'Deka B., Singh K.K. — Multifaceted Regulation of Gene Expression by the Apoptosis- and Splicing-Associated Protein Complex and Its Components',
    venue: 'International Journal of Biological Sciences',
    year: '2017',
    extra: 'Vol.13(5) pp.545-560',
    type: 'journals',
  },
  {
    id: 'journals-27',
    citation: 'Gromadzka A.M., Steckelberg A.L., Singh K.K., Hofmann K., Gehring N.H. — A short conserved motif in ALYREF directs cap- and EJC-dependent assembly of export complexes on spliced mRNAs',
    venue: 'Nucleic Acids Research',
    year: '2016',
    extra: 'Vol.44 pp.2348-2361',
    type: 'journals',
    note: 'Links splicing-associated mRNP assembly with recruitment of RNA-export factors.',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4797287/',
    doi: 'doi.org/10.1093/nar/gkw009',
  },
  {
    id: 'journals-28',
    citation: 'Singh K.K., Wachsmuth L., Kulozik A.E., Gehring N.H. — Two mammalian MAGOH genes contribute to exon junction complex composition and nonsense-mediated decay',
    venue: 'RNA Biology',
    year: '2013',
    extra: 'Vol.8 pp.1291-1298',
    type: 'journals',
    note: 'Foundational work establishing contributions of both MAGOH paralogs to EJC function and NMD.',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/23917022/',
    doi: 'doi.org/10.4161/rna.25827',
  },
  {
    id: 'journals-29',
    citation: 'Uren P.J., Burns S.C., Ruan J., Singh K.K., Smith A.D., Penalva L.O. — Genomic analyses of the RNA binding protein Hu Antigen R (HuR) identify a complex network of target genes and novel characteristics of its binding sites',
    venue: 'Journal of Biological Chemistry',
    year: '2011',
    extra: 'Vol.43 pp.37063-37066',
    type: 'journals',
  },
  {
    id: 'journals-30',
    citation: 'Singh K.K., Erkelenz S., Rattay S., Dehof A.K., Hildebrandt A., Schulze-Osthoff K., Schaal H., Schwerk C. — Human SAP18 mediates assembly of a splicing regulatory multiprotein complex via its ubiquitin-like fold',
    venue: 'RNA',
    year: '2010',
    extra: 'Vol.16 pp.2442-2454',
    type: 'journals',
  },
  {
    id: 'journals-31',
    citation: 'Singh K. K., Ueffing N., Christians A., Feller A.C., Fend F., Heikaus S., Marx A., Zotz R.B., Schulz W.A., Schulze-Osthoff K., Schmitz I., Schwerk C. — A single nucleotide polymorphism determines protein isoform production of the human c-FLIP protein',
    venue: 'Blood',
    year: '2009',
    extra: 'Vol.114 pp.572-579',
    type: 'journals',
  },
  {
    id: 'journals-32',
    citation: 'Singh K. K., Mathew R., Masih I.E., Bernard P. — ITS region of the rDNA of Pythium rhizosacchurum sp. Nov., isolated from sugarcane roots: taxonomy and comparision with related species',
    venue: 'FEMS Microbiology Letters',
    year: '2003',
    extra: 'Vol.221 pp.233-236',
    type: 'journals',
  },
  {
    id: 'journals-33',
    citation: 'Mathew R., Singh K.K., Bernard P. — Pythium campanulatum sp. Nov., isolated from rhizosphere of maze, its taxonomy, ITS region of rDNA, and comparison with related species',
    venue: 'FEMS Microbiology Letters',
    year: '2003',
    extra: 'Vol.226 pp.9-14',
    type: 'journals',
  },
  {
    id: 'conferences-1',
    citation: 'Bhagyashree Deka — participated in a three-day Flow Cytometry workshop on Flow Applications in Basics, Applied and Clinical Biology, organized by IIT Guwahati and Dr. B. Borooah Cancer Institute, Guwahati',
    venue: 'Flow Cytometry Workshop',
    year: '2016',
    type: 'conferences',
  },
  {
    id: 'conferences-2',
    citation: 'Volker Boehm, Thiago Britto-Borges, Anna-Lena Steckelberg, Kusum K. Singh, Jennifer V. Gerbracht, Elif Gueney, Lorea Blazquez, Janine Altmüller, Christoph Dieterich, Niels H. Gehring — Exon Junction Complexes Suppress Spurious Splice Sites to Safeguard Transcriptome Integrity',
    venue: '9th RNA Group Meeting at BHU',
    year: '2017',
    type: 'conferences',
  },
  {
    id: 'conferences-3',
    citation: 'Aparajita Dutta, Tushar Dubey, Kusum Kumari Singh, Ashish Anand — SpliceVec: distributed feature representations for splice junction prediction',
    venue: '16th Asia Pacific Bioinformatics Conference',
    year: '2018',
    type: 'conferences',
  },
  {
    id: 'conferences-4',
    citation: 'Sweta Kumari, Kusum K Singh — Comparative transcriptome analysis of SAP18 splicing regulator',
    venue: 'Research Conclave, IIT Guwahati',
    year: '2019',
    type: 'conferences',
  },
  {
    id: 'conferences-5',
    citation: 'Bhagyashree Deka and Pratap Chandra — three-day workshop on Genome/Transcriptome Sequence Analysis, organized by ADBS and IBAB, Bangalore',
    venue: 'Workshop on Genome/Transcriptome Sequence Analysis',
    year: '2019',
    type: 'conferences',
  },
  {
    id: 'conferences-6',
    citation: 'Bhagyashree Deka, Kusum K Singh — Elucidating the role of microRNA and RBP-mediated modulation of RNPS1 gene expression',
    venue: 'Research Conclave, IIT Guwahati',
    year: '2019',
    type: 'conferences',
  },
  {
    id: 'conferences-7',
    citation: 'Bhagyashree Deka, Kusum K Singh — Understanding the Role of RNA-binding proteins in the Post-transcriptional regulation of RNPS1 gene',
    venue: 'Biotech Express, IIT Guwahati',
    year: '2019',
    type: 'conferences',
  },
  {
    id: 'conferences-8',
    citation: 'Glory Basumata and Kusum Kumari Singh — Knockdown effect of MAGOHB on Alternative splicing via RNA-Seq Analysis',
    venue: 'International Conference on Molecular Basis of Diseases and Therapeutics',
    year: '2019',
    type: 'conferences',
  },
  {
    id: 'conferences-9',
    citation: 'Glory Basumata and Kusum Kumari Singh — Effects of MAGOHB knockdown on Alternative splicing via RNA-Seq Analysis',
    venue: 'Galaxy Community Conference 2019',
    year: '2019',
    type: 'conferences',
  },
  {
    id: 'conferences-10',
    citation: 'Glory Basumata — Training on RNA-Seq data analysis and gene ontology studies using various tools, International Workshop: Introduction to RNA-Seq and Functional Interpretation, EMBL-EBI, Hinxton, UK',
    venue: 'EMBL-EBI RNA-Seq Workshop',
    year: '2019',
    type: 'conferences',
  },
  {
    id: 'conferences-11',
    citation: 'Volker Boehm, Thiago Britto-Borges, Anna-Lena Steckelberg, Kusum K. Singh, Jennifer V. Gerbracht, Elif Gueney, Lorea Blazquez, Janine Altmüller, Christoph Dieterich, Niels H. Gehring — Exon Junction Complexes Suppress Spurious Splice Sites to Safeguard Transcriptome Integrity',
    venue: '24th Annual Meeting of the RNA Society',
    year: '2019',
    type: 'conferences',
  },
  {
    id: 'conferences-12',
    citation: 'Pratap Chandra, Kusum K Singh — CRISPR/Cas9-mediated gene-knockout of UPF3B in HEK-293 cells alters the expression of cell-cycle and axon guidance genes. CRISPR/Cas: From Biology to Technology',
    venue: 'CRISPR/Cas: From Biology to Technology',
    year: '2021',
    type: 'conferences',
  },
  {
    id: 'conferences-13',
    citation: 'Harita M, Bhagyashree Deka, Kusum K Singh — Identification of candidate RNA binding proteins associated with RNPS1 mRNA',
    venue: '11th RNA Group Meeting',
    year: '2022',
    type: 'conferences',
  },
  {
    id: 'conferences-14',
    citation: 'Raja T — Hands-on workshop on CRISPR/Cas technology and genome editing, National Center for Biological Sciences, Bangalore',
    venue: 'CRISPR Workshop, NCBS Bangalore',
    year: '2022',
    type: 'conferences',
  },
  {
    id: 'conferences-15',
    citation: 'Sayan Roy, Pratap Chandra, Kusum K Singh — Proteomic Analysis of CRISPR/Cas9-mediated UPF3B-Knockout HEK293 Cells',
    venue: '11th RNA Group Meeting',
    year: '2022',
    type: 'conferences',
  },
  {
    id: 'conferences-16',
    citation: 'Priyanka Yadav, Kusum K Singh — MicroRNA-mediated regulation of UPF3 for the development of novel therapeutics',
    venue: '11th RNA Group Meeting',
    year: '2022',
    type: 'conferences',
  },
  {
    id: 'conferences-17',
    citation: 'Priyanka Yadav, Kusum K Singh — MicroRNA-mediated regulation of UPF3B for the development of novel therapeutics',
    venue: 'Functional Nucleic Acids Conference (ielc22-095)',
    year: '2022',
    type: 'conferences',
  },
  {
    id: 'conferences-18',
    citation: 'Ayushi Rehman, Raja Tamilselvan, Kusum K Singh — Et Tu MAGOHB.. The paralog dilemma',
    venue: '11th RNA Group Meeting',
    year: '2022',
    type: 'conferences',
  },
  {
    id: 'conferences-19',
    citation: 'Ayushi Rehman, Anil Mukund Limaye, Kusum K Singh — Investigating the characteristics and functions of MAGOH paralogs',
    venue: 'North East Research Conclave',
    year: '2022',
    type: 'conferences',
  },
  {
    id: 'conferences-20',
    citation: 'Sweta Kumari, Kusum K Singh — Proximity-dependent approach to identify novel spliceosomal factors involved in the recruitment of SAP18 protein on pre-mRNA',
    venue: 'India EMBO Lecture Course',
    year: '2022',
    type: 'conferences',
  },
  {
    id: 'conferences-21',
    citation: 'Sweta Kumari, Kusum K Singh — Deciphering the Novel spliceosomal interactions of SAP18 by proximity-dependent approach',
    venue: '11th RNA Group Meeting',
    year: '2022',
    type: 'conferences',
  },
  {
    id: 'conferences-22',
    citation: 'Pratap Chandra, Kusum K Singh — CRISPR/Cas9-mediated gene-knockout of UPF3B in HEK-293 cells alters the expression of cell-cycle and axon guidance genes',
    venue: 'Systems Biology: Global Regulation of Gene Expression',
    year: '2022',
    type: 'conferences',
  },
  {
    id: 'conferences-23',
    citation: 'Pratap Chandra, Kusum K Singh — UPF3B-knockout in HEK-293 cells delays cell proliferation and deregulates the expression of neuron-specific genes',
    venue: 'North East Research Conclave',
    year: '2022',
    type: 'conferences',
  },
  {
    id: 'conferences-24',
    citation: 'Pratap Chandra, Kusum K Singh — Transcriptome-wide analysis of UPF3B-knockout HEK-293 cells generated by CRISPR/Cas9 gene-editing method',
    venue: '11th RNA Group Meeting',
    year: '2022',
    type: 'conferences',
  },
  {
    id: 'conferences-25',
    citation: 'Bhagyashree Deka, Pratap Chandra, Kusum K Singh — RNPS1 functions as an oncogenic splicing factor in cervical carcinoma',
    venue: '41st Annual Conference IACR, Amity University',
    year: '2022',
    type: 'conferences',
  },
  {
    id: 'conferences-26',
    citation: 'Bhagyashree Deka, Ayushi Rehman, Kusum K Singh — Understanding the Role of microRNAs in the Post-Transcriptional Regulation of RNPS1 gene',
    venue: 'Cold Spring Harbor – Regulatory & Non-Coding RNAs',
    year: '2022',
    type: 'conferences',
  },
  {
    id: 'conferences-27',
    citation: 'Bhagyashree Deka, Ayushi Rehman, Kusum K Singh — Understanding the Role of microRNAs in the Post-Transcriptional Regulation of RNPS1 gene',
    venue: 'North-East Research Conclave, IIT Guwahati',
    year: '2022',
    type: 'conferences',
  },
  {
    id: 'books-1',
    citation: 'Kusum Kumari Singh — Regulation of alternative splice site selection',
    venue: 'Scholar\'s Press',
    year: '2015',
    extra: 'ISBN 3639514769 · pp.148',
    type: 'books',
  },
  {
    id: 'bookChapters-1',
    citation: 'Gourabh Chatterjee, Kusum K. Singh — Slicing through the Secrets of FokI: Structure, Function and Innovation',
    venue: 'Integrated Publications',
    year: '2025',
    extra: 'Vol.8',
    type: 'bookChapters',
  },
  {
    id: 'bookChapters-2',
    citation: 'Gourabh Chatterjee, Kusum K. Singh — CRISPR Technologies - Advances in Genome Editing, Applications, and Ethical Implications',
    venue: 'Integrated Publications',
    year: '2025',
    extra: 'ISBN 978-1-83635-584-7',
    type: 'bookChapters',
  },
];

/** Shape returned by PUBLICATIONS_QUERY. */
export interface SanityPublicationDoc {
  _id: string;
  citation?: string;
  venue?: string;
  year?: string;
  doi?: string;
  extra?: string;
  type?: string;
  note?: string;
  sourceUrl?: string;
}

export const PUBLICATIONS_QUERY = `*[_type == "publication"] | order(year desc, _createdAt asc){
  _id, citation, venue, year, doi, extra, type, note, sourceUrl
}`;

const PUBLICATION_TYPES: PublicationType[] = ['journals', 'conferences', 'books', 'bookChapters'];

const isPublicationType = (value: string | undefined): value is PublicationType =>
  PUBLICATION_TYPES.includes(value as PublicationType);

/** Maps Studio documents onto the publications the page renders. */
export function mapPublicationDocs(docs: SanityPublicationDoc[]): Publication[] {
  return docs
    .filter((doc) => doc.citation)
    .map((doc) => ({
      // Strip the seed prefix so an anchor is the same whether the entry came
      // from Sanity ("publication-journals-1") or the bundled fallback
      // ("journals-1"). Deep links from the research page must not depend on
      // which source happens to be live.
      id: doc._id.replace(/^publication-/, ''),
      citation: doc.citation as string,
      venue: doc.venue ?? '',
      year: doc.year ?? '',
      doi: doc.doi || undefined,
      extra: doc.extra || undefined,
      note: doc.note || undefined,
      sourceUrl: doc.sourceUrl || undefined,
      // An unrecognised value would drop the entry from every filter group and
      // make it invisible, so fall back to the largest category.
      type: isPublicationType(doc.type) ? doc.type : 'journals',
    }));
}

/**
 * Splits the stored citation into author list and title.
 *
 * Entries are recorded as "Authors — Title" and all 63 use that em dash, which
 * lets the page typeset the two parts differently (as the faculty draft does)
 * without re-keying the data. If a dash is ever missing the whole string falls
 * through as the title rather than silently losing the authors.
 */
export function splitCitation(citation: string): { authors?: string; title: string } {
  const at = citation.indexOf(' \u2014 ');
  if (at === -1) return { title: citation };
  return {
    authors: citation.slice(0, at).trim(),
    title: citation.slice(at + 3).trim(),
  };
}

/** Short label for the type badge. */
export const publicationTypeBadge: Record<PublicationType, string> = {
  journals: 'Research article',
  conferences: 'Conference',
  books: 'Book',
  bookChapters: 'Book chapter',
};

/**
 * Builds the plain-text reference used by "Copy citation".
 *
 * Derived from the stored fields rather than kept as a second copy of the
 * citation, so it can never drift from what the page shows and works for all
 * 63 entries rather than only the ones the faculty draft covered.
 */
export function citationText(publication: Publication): string {
  const { authors, title } = splitCitation(publication.citation);
  const parts = [
    authors ? `${authors}.` : '',
    `(${publication.year}).`,
    `${title}.`,
    publication.venue ? `${publication.venue}.` : '',
    publication.doi ? `https://${publication.doi.replace(/^https?:\/\//, '')}` : '',
  ];
  return parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
}
