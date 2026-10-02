/**
 * Seeds the Sanity dataset with the content currently bundled in the website.
 *
 * Run once to move the lab's existing news and photographs into the Studio, so
 * editors open it and find real content rather than a blank slate. Safe to
 * re-run: every document uses a deterministic `_id` and assets are looked up by
 * their original filename, so a second run updates in place instead of
 * creating duplicates.
 *
 *   node scripts/seed.mjs            # create/update
 *   node scripts/seed.mjs --dry-run  # report what would happen
 *
 * Auth comes from the Sanity CLI session already on this machine
 * (~/.config/sanity/config.json). No token is written to the repo.
 */
import { createClient } from '@sanity/client';
import { readFile, readdir } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, '../../rbp-lab');
const DRY_RUN = process.argv.includes('--dry-run');

function cliToken() {
  if (process.env.SANITY_AUTH_TOKEN) return process.env.SANITY_AUTH_TOKEN;
  const configPath = path.join(homedir(), '.config', 'sanity', 'config.json');
  if (!existsSync(configPath)) {
    throw new Error('No Sanity CLI session found. Run `sanity login` first.');
  }
  const token = JSON.parse(readFileSync(configPath, 'utf8'))?.authToken;
  if (!token) throw new Error('Sanity CLI config has no authToken. Run `sanity login`.');
  return token;
}

const client = createClient({
  projectId: 'qlzc99he',
  dataset: 'production',
  apiVersion: '2024-10-01',
  token: cliToken(),
  useCdn: false,
});

/**
 * `publishedAt` is the ordering key the schema describes, not a claim about
 * when each item happened. These timestamps reproduce the order the site
 * already shows; the lab sets real dates on anything posted from here on.
 */
const NEWS = [
  {
    _id: 'news-magoh-magohb-paralog-proteomics',
    title: 'New Publication: MAGOH/MAGOHB Paralog Proteomics',
    summary:
      'Proteomics uncovers distinct gene-regulatory functions of the MAGOH/MAGOHB paralogs in cell proliferation.',
    kind: 'publication',
    venue: 'BBA Gene Regulatory Mechanisms',
    year: '2026',
    publishedAt: '2026-06-01T00:00:00.000Z',
    imageFile: 'lab/Proteomics.jpeg',
  },
  {
    _id: 'news-crispr-distinguish-magoh-paralogs',
    title: 'CRISPR-Based Method to Distinguish MAGOH Paralogs',
    summary:
      'CRISPR-based genome editing developed to endogenously distinguish the paralogs MAGOH and MAGOHB.',
    kind: 'publication',
    venue: 'Gene Reports',
    year: '2025',
    publishedAt: '2025-09-01T00:00:00.000Z',
    imageFile: 'lab/Cas-9_KO_and_Splicing.jpeg',
  },
  {
    _id: 'news-magoh-delta-37-isoform',
    summary:
      'An EJC-independent novel isoform of MAGOH — MAGOH-Δ37 — identified along with its interactome.',
    kind: 'publication',
    venue: 'BBRC',
    year: '2025',
    publishedAt: '2025-03-01T00:00:00.000Z',
    imageFile: 'lab/Localization_of_MAGOH_delta_37.jpeg',
  },
  {
    _id: 'news-sap18-bioid-prespliceosomal',
    summary:
      'BioID proximity mapping reveals novel SAP18 interactions within the prespliceosomal complex.',
    kind: 'publication',
    venue: 'BBRC',
    year: '2024',
    publishedAt: '2024-06-01T00:00:00.000Z',
    imageFile: 'lab/IP_Data.jpeg',
  },
  {
    // The schema restricts `kind` to four values, so the Co-PI detail lives in
    // the venue rather than being dropped.
    _id: 'news-icmr-estrogen-regulated-expression',
    summary:
      'Ongoing ICMR-funded project as Co-PI on genome-wide estrogen-regulated gene expression.',
    kind: 'funding',
    venue: 'ICMR · Co-PI',
    year: 'Ongoing',
    publishedAt: '2023-06-01T00:00:00.000Z',
    imageFile: 'lab/Isoform_Usage.jpeg',
  },
  {
    _id: 'news-rnps1-oncogenic-splicing-factor',
    summary:
      'RNPS1 identified as an oncogenic splicing factor driving proliferation in cervical cancer cells.',
    kind: 'publication',
    venue: 'IUBMB',
    year: '2022',
    publishedAt: '2022-06-01T00:00:00.000Z',
    imageFile: 'lab/Invasion.jpeg',
  },
];


/**
 * Members, in the order the site already lists them. `order` is spaced by ten
 * so the lab can slot someone in between two people without renumbering.
 */
const MEMBERS = [
  ['Prof. Kusum K. Singh', 'Principal Investigator \u00b7 Assistant Professor', 'kusum-k-singh', 'current', true],
  ['Khalid Mohd Ibrahimi', 'Postdoctoral Researcher', 'khalid-mohd-ibrahimi', 'current', false],
  ['Priyanka Yadav', 'PhD Scholar \u00b7 NMD & UPF3B Regulation', 'priyanka-yadav', 'current', false],
  ['Sourabh Chakrabarty', 'PhD Scholar \u00b7 RNA-Protein Interactions', 'sourabh-chakrabarty', 'current', false],
  ['Silpi Sikha Bora', 'PhD Scholar', 'silpi-sikha-bora', 'current', false],
  ['Lashika Goyal', 'M.Tech Scholar', 'lashika-goyal', 'current', false],
  ['Priya Gautam', 'M.Tech Scholar', 'priya-gautam', 'current', false],
  ['Bhagyashree Deka', 'PhD Scholar', 'bhagyashree-deka', 'alumni', false],
  ['Pratap Chandra', 'PhD Scholar', 'pratap-chandra', 'alumni', false],
  ['Sweta Kumari', 'PhD Scholar', 'sweta-kumari', 'alumni', false],
  ['Ayushi Rehman', 'PhD Scholar', 'ayushi-rehman', 'alumni', false],
  ['Jebasingh Winston R', 'M.Tech', 'jebasingh-winston', 'alumni', false],
  ['Harita M', 'M.Tech', 'harita-m', 'alumni', false],
  ['Raja T', 'M.Tech', 'raja-t', 'alumni', false],
  ['Vishal Bharti', 'M.Tech', 'vishal-bharti', 'alumni', false],
  ['Ajay Narwade', 'M.Tech', 'ajay-narwade', 'alumni', false],
  ['Sonali Devi', 'M.Tech', 'sonali-devi', 'alumni', false],
  ['Harekrishna Mandal', 'M.Tech', 'harekrishna-mandal', 'alumni', false],
  ['Nayan Jain', 'M.Tech', 'nayan-jain', 'alumni', false],
  ['Gourab Chatterjee', 'M.Tech', 'gourab-chatterjee', 'alumni', false],
  ['Abhiram Ganji', 'Summer Intern \u00b7 Data Science & AI', 'abhiram-ganji', 'intern', false],
].map(([name, role, slug, group, isPrincipalInvestigator], index) => ({
  name, role, slug, group, isPrincipalInvestigator, order: (index + 1) * 10,
}));

/** Reuses an existing asset with the same original filename. */
async function uploadOnce(relPath, cache) {
  const filename = path.basename(relPath);
  if (cache.has(filename)) return cache.get(filename);

  const existing = await client.fetch(
    '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id',
    { filename },
  );
  if (existing) {
    cache.set(filename, existing);
    console.log(`  reuse  ${filename}`);
    return existing;
  }

  if (DRY_RUN) {
    console.log(`  UPLOAD ${filename} (dry run)`);
    return `dry-run-${filename}`;
  }

  const buffer = await readFile(path.join(SITE, 'public/images', relPath));
  const asset = await client.assets.upload('image', buffer, { filename });
  cache.set(filename, asset._id);
  console.log(`  upload ${filename} -> ${asset._id}`);
  return asset._id;
}

/**
 * Reads an exported array straight out of the site's TypeScript data files.
 * Re-declaring 63 publications in this script would guarantee the two copies
 * drift, so the source of truth stays in one place.
 */
async function loadFromSite(relPath, exportName) {
  const source = await readFile(path.join(SITE, 'src/data', relPath), 'utf8');
  const start = source.indexOf(`export const ${exportName}`);
  if (start === -1) throw new Error(`${exportName} not found in ${relPath}`);
  // Anchor past the `=`: the type annotation (`: Publication[]`) contains a
  // bracket that would otherwise be mistaken for the start of the array.
  const assign = source.indexOf('=', start);
  const open = source.indexOf('[', assign);
  let depth = 0;
  let end = open;
  for (let i = open; i < source.length; i += 1) {
    if (source[i] === '[') depth += 1;
    else if (source[i] === ']') {
      depth -= 1;
      if (depth === 0) { end = i; break; }
    }
  }
  const literal = source.slice(open, end + 1);
  // The arrays are plain data; evaluating the literal keeps every character
  // (em dashes, Greek letters, nested quotes) byte-identical.
  return new Function(`return ${literal};`)();
}

async function main() {
  const cache = new Map();

  console.log(`\nNews (${NEWS.length})`);
  const newsDocs = [];
  for (const item of NEWS) {
    const assetId = await uploadOnce(item.imageFile, cache);
    const { imageFile, ...fields } = item;
    newsDocs.push({
      ...fields,
      _type: 'news',
      image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
    });
  }

  console.log(`\nMembers (${MEMBERS.length})`);
  const memberDocs = [];
  for (const person of MEMBERS) {
    const rel = `members/${person.slug}.jpg`;
    const hasPortrait = existsSync(path.join(SITE, 'public/images', rel));
    const assetId = hasPortrait ? await uploadOnce(rel, cache) : null;
    if (!hasPortrait) console.log(`  (no portrait) ${person.slug}`);
    memberDocs.push({
      _id: `member-${person.slug}`,
      _type: 'member',
      name: person.name,
      role: person.role,
      group: person.group,
      slug: { _type: 'slug', current: person.slug },
      order: person.order,
      isPrincipalInvestigator: person.isPrincipalInvestigator,
      ...(assetId
        ? { portrait: { _type: 'image', asset: { _type: 'reference', _ref: assetId } } }
        : {}),
    });
  }

  const publications = await loadFromSite('publications.ts', 'PUBLICATIONS');
  console.log(`\nPublications (${publications.length})`);
  const publicationDocs = publications.map((pub) => ({
    _id: `publication-${pub.id}`,
    _type: 'publication',
    citation: pub.citation,
    venue: pub.venue,
    year: pub.year,
    type: pub.type,
    ...(pub.doi ? { doi: pub.doi } : {}),
    ...(pub.extra ? { extra: pub.extra } : {}),
    ...(pub.note ? { note: pub.note } : {}),
    ...(pub.sourceUrl ? { sourceUrl: pub.sourceUrl } : {}),
  }));

  const equipment = await loadFromSite('equipment.ts', 'EQUIPMENT');
  console.log(`\nEquipment (${equipment.length})`);
  const equipmentDocs = [];
  for (const [index, item] of equipment.entries()) {
    const rel = item.imageSrc.replace(/^\/images\//, '');
    const hasPhoto = existsSync(path.join(SITE, 'public/images', rel));
    const assetId = hasPhoto ? await uploadOnce(rel, cache) : null;
    if (!hasPhoto) console.log(`  (no photo) ${item.id}`);
    equipmentDocs.push({
      _id: `equipment-${item.id}`,
      _type: 'equipment',
      name: item.name,
      model: item.model,
      description: item.description,
      funding: item.funding,
      accent: item.accent,
      order: (index + 1) * 10,
      ...(assetId ? { photo: { _type: 'image', asset: { _type: 'reference', _ref: assetId } } } : {}),
    });
  }

  const collaborators = await loadFromSite('collaborators.ts', 'COLLABORATORS');
  console.log(`\nCollaborators (${collaborators.length})`);
  const collaboratorDocs = [];
  for (const [index, person] of collaborators.entries()) {
    const rel = (person.image || '').replace(/^\/images\//, '');
    const hasPortrait = rel && existsSync(path.join(SITE, 'public/images', rel));
    const assetId = hasPortrait ? await uploadOnce(rel, cache) : null;
    if (!hasPortrait) console.log(`  (no portrait) ${person.id}`);
    collaboratorDocs.push({
      _id: `collaborator-${person.id}`,
      _type: 'collaborator',
      name: person.name,
      institution: person.institution,
      description: person.description,
      accent: person.accent,
      order: (index + 1) * 10,
      ...(assetId ? { portrait: { _type: 'image', asset: { _type: 'reference', _ref: assetId } } } : {}),
    });
  }

  const focusAreas = await loadFromSite('research.ts', 'FOCUS_AREA_SEED');
  const figures = await loadFromSite('research.ts', 'FIGURES');
  console.log(`\nResearch (${focusAreas.length} themes, ${figures.length} figures)`);

  const researchDocs = [];

  for (const [index, area] of focusAreas.entries()) {
    const rel = (area.imageSrc || '').replace(/^\/images\//, '');
    const hasFigure = rel && existsSync(path.join(SITE, 'public/images', rel));
    const assetId = hasFigure ? await uploadOnce(rel, cache) : null;
    researchDocs.push({
      _id: `focus-${area.id}`,
      _type: 'focusArea',
      title: area.title,
      // Keep the existing anchor: /research links bands and nav by this value.
      slug: { _type: 'slug', current: area.id },
      eyebrow: area.eyebrow,
      icon: area.icon,
      summary: area.summary,
      body: area.body,
      tags: area.tags,
      question: area.question,
      centralQuestion: area.centralQuestion,
      order: (index + 1) * 10,
      papers: (area.papers ?? []).map((pubId) => ({
        _type: 'reference',
        _ref: `publication-${pubId}`,
        _key: pubId,
      })),
      ...(assetId ? { figure: { _type: 'image', asset: { _type: 'reference', _ref: assetId } } } : {}),
    });
  }

  for (const [index, figure] of figures.entries()) {
    const rel = (figure.src || '').replace(/^\/images\//, '');
    const hasImage = rel && existsSync(path.join(SITE, 'public/images', rel));
    if (!hasImage) { console.log(`  (no image) ${figure.id}`); continue; }
    const assetId = await uploadOnce(rel, cache);
    researchDocs.push({
      _id: `figure-${figure.id}`,
      _type: 'researchFigure',
      caption: figure.caption,
      meta: figure.meta,
      order: (index + 1) * 10,
      image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
    });
  }

  const galleryDir = path.join(SITE, 'public/images/gallery');
  const files = (await readdir(galleryDir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
  console.log(`\nGallery (${files.length})`);
  const galleryDocs = [];
  for (const [index, file] of files.entries()) {
    const assetId = await uploadOnce(`gallery/${file}`, cache);
    galleryDocs.push({
      _id: `gallery-${String(index + 1).padStart(2, '0')}`,
      _type: 'galleryImage',
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
        alt: `Photograph ${index + 1} from the RNA-Binding Proteins Laboratory at IIT Guwahati`,
      },
      // Descending so the existing on-page order is preserved.
      takenAt: new Date(Date.UTC(2026, 0, 1) - index * 86400000).toISOString(),
    });
  }

  if (DRY_RUN) {
    console.log(`\nDry run: would write ${newsDocs.length + galleryDocs.length + memberDocs.length + publicationDocs.length + equipmentDocs.length + collaboratorDocs.length + researchDocs.length} documents.`);
    return;
  }

  const tx = client.transaction();
  for (const doc of [...newsDocs, ...galleryDocs, ...memberDocs, ...publicationDocs, ...equipmentDocs, ...collaboratorDocs, ...researchDocs]) tx.createOrReplace(doc);
  await tx.commit();

  const counts = await client.fetch(
    '{"news": count(*[_type == "news"]), "gallery": count(*[_type == "galleryImage"]), "members": count(*[_type == "member"]), "publications": count(*[_type == "publication"]), "equipment": count(*[_type == "equipment"]), "collaborators": count(*[_type == "collaborator"]), "research": count(*[_type in ["focusArea","researchConcept","pipelineStage","researchFigure"]])}',
  );
  console.log(`\nDone: ${counts.news} news, ${counts.gallery} gallery, ${counts.members} members, ${counts.publications} publications, ${counts.equipment} equipment, ${counts.collaborators} collaborators, ${counts.research} research docs.`);
}

main().catch((error) => {
  console.error('\nSeed failed:', error.message);
  process.exit(1);
});
