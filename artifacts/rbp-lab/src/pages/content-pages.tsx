import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  Filter,
  GraduationCap,
  Mic,
  Presentation,
  Search,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'wouter';
import { PageHeader, Section } from '@/components/page-patterns';
import {
  COLLABORATORS,
  COLLABORATORS_QUERY,
  mapCollaboratorDocs,
  type Collaborator,
} from '@/data/collaborators';
import { EQUIPMENT, EQUIPMENT_QUERY, mapEquipmentDocs } from '@/data/equipment';
import { GALLERY_IMAGES, GALLERY_QUERY, mapGalleryDocs } from '@/data/gallery';
import { NEWS_ITEMS, NEWS_QUERY, mapNewsDocs } from '@/data/news';
import { useSanityData } from '@/hooks/use-sanity-data';
import { assetPath } from '@/lib/asset-path';
import {
  PUBLICATIONS,
  PUBLICATIONS_QUERY,
  mapPublicationDocs,
  citationText,
  publicationTypeBadge,
  splitCitation,
  type Publication,
  type PublicationType,
} from '@/data/publications';
import { CONFERENCES, CONFERENCE_YEARS, type ConferenceKind } from '@/data/conferences';
import { coverFor } from '@/data/journals';

const publicationTypeLabels: Record<PublicationType, string> = {
  journals: 'Journal Publications',
  conferences: 'Conference Publications',
  books: 'Books',
  bookChapters: 'Book Chapters',
};

const publicationTypeOrder: PublicationType[] = ['journals', 'conferences', 'books', 'bookChapters'];

function PublicationsFilter({ selected, onToggle }: { selected: Set<PublicationType>; onToggle: (type: PublicationType) => void }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const count = publicationTypeOrder.length - selected.size;

  // A bare dropdown with no dismissal leaves the panel stuck over the results.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        root.current?.querySelector<HTMLButtonElement>('.filter-trigger')?.focus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="publication-filter" ref={root}>
      <button
        className="filter-trigger"
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        <Filter size={15} aria-hidden="true" />
        Filter
        {count > 0 ? <span className="filter-count">{count}</span> : null}
        <ChevronDown size={14} aria-hidden="true" className="filter-chevron" />
      </button>
      {open ? (
        <div className="filter-menu" role="group" aria-label="Filter by publication type">
          <div className="filter-menu-head">
            <span>Show types</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close filter">
              <X size={14} aria-hidden="true" />
            </button>
          </div>
          {publicationTypeOrder.map((type) => (
            <label className="filter-option" key={type}>
              <input
                type="checkbox"
                id={`publication-filter-${type}`}
                name={`publication-filter-${type}`}
                checked={selected.has(type)}
                onChange={() => onToggle(type)}
              />
              <span className="filter-box" aria-hidden="true">
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="filter-label">{publicationTypeLabels[type]}</span>
            </label>
          ))}
        </div>
      ) : null}
    </div>
  );
}

const SKIP_WORDS = new Set(['and', 'of', 'to', 'in', 'the', 'for', 'on', 'a']);

/**
 * A short monogram for a venue: "Nucleic Acids Research" -> "NAR".
 * Venues that are already acronyms are kept as-is.
 */
function monogram(venue: string): string {
  const cleaned = venue.replace(/[–—-]/g, ' ').trim();
  if (/^[A-Z0-9]{2,5}$/.test(cleaned)) return cleaned;

  const initials = cleaned
    .split(/\s+/)
    .filter((word) => word && !SKIP_WORDS.has(word.toLowerCase()))
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return initials.slice(0, 4) || cleaned.slice(0, 3).toUpperCase();
}

/** Stable 0-359 hue from the venue, so each journal keeps its own plate. */
function venueHue(venue: string): number {
  let hash = 0;
  for (let i = 0; i < venue.length; i += 1) hash = (hash * 31 + venue.charCodeAt(i)) | 0;
  return Math.abs(hash) % 360;
}

/** Backbone-and-bases motif, echoing a single RNA strand. */
function StrandMotif() {
  const bases = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <svg className="cover-plate-motif" viewBox="0 0 120 160" aria-hidden="true" focusable="false">
      <path
        d="M14 4 C 46 30, -18 58, 14 84 C 46 110, -18 138, 14 164"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {bases.map((index) => {
        const y = 12 + index * 20;
        return (
          <g key={index}>
            <line x1="16" y1={y} x2={38 + (index % 3) * 9} y2={y} stroke="currentColor" strokeWidth="1.2" />
            <circle cx={42 + (index % 3) * 9} cy={y} r="2.6" fill="currentColor" />
          </g>
        );
      })}
    </svg>
  );
}

function PublicationCover({ venue }: { venue: string }) {
  const [failed, setFailed] = useState(false);
  const src = coverFor(venue);

  // No cover art held, or the CDN stopped serving one. A designed plate — the
  // venue's own accent, a strand motif, the monogram and the full title —
  // reads as a deliberate stand-in rather than an image that failed to load.
  if (!src || failed) {
    return (
      <div
        className="publication-cover publication-cover--plate"
        role="img"
        aria-label={venue}
        style={{ '--plate-hue': venueHue(venue) } as CSSProperties}
      >
        <span className="cover-plate-band" aria-hidden="true">
          <StrandMotif />
        </span>
        <span className="cover-plate-body" aria-hidden="true">
          <span className="cover-plate-monogram">{monogram(venue)}</span>
          <span className="cover-plate-venue">{venue}</span>
        </span>
      </div>
    );
  }

  return (
    <img
      className="publication-cover"
      src={src}
      alt={`Cover of ${venue}`}
      loading="lazy"
      decoding="async"
      width="300"
      height="400"
      // The CDN path is undocumented, so fall back rather than leave a broken
      // image if it ever stops resolving.
      onError={() => setFailed(true)}
      referrerPolicy="no-referrer"
    />
  );
}

/**
 * Resolves the `#paper-id` a research-page citation links to.
 *
 * `:target` is useless here: the publications list renders after the browser
 * has already processed the hash, so the element does not exist at navigation
 * time and never receives the pseudo-class or a scroll. This waits for the
 * entry to exist, scrolls to it, and marks it directly.
 */
function useCitedPublication(ready: boolean) {
  const [cited, setCited] = useState<string | null>(null);

  useEffect(() => {
    const read = () => decodeURIComponent(window.location.hash.replace(/^#/, ''));

    const settle = () => {
      const id = read();
      if (!id) {
        setCited(null);
        return;
      }
      setCited(id);
      // One frame so the entry is laid out before scrolling to it.
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
    };

    settle();
    window.addEventListener('hashchange', settle);
    return () => window.removeEventListener('hashchange', settle);
  }, [ready]);

  return cited;
}

/**
 * Copies a plain-text reference.
 *
 * The async clipboard API needs a secure context and is refused outright by
 * some browsers, so a failure falls back to selecting the text in a temporary
 * field for a manual copy rather than silently doing nothing.
 */
function CopyCitation({ publication }: { publication: Publication }) {
  const [state, setState] = useState<'idle' | 'copied' | 'manual'>('idle');

  const copy = async () => {
    const text = citationText(publication);
    try {
      await navigator.clipboard.writeText(text);
      setState('copied');
    } catch {
      const field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      const ok = document.execCommand?.('copy');
      document.body.removeChild(field);
      setState(ok ? 'copied' : 'manual');
    }
    window.setTimeout(() => setState('idle'), 2500);
  };

  return (
    <button type="button" className="publication-copy" onClick={copy}>
      {state === 'copied' ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
      {state === 'copied' ? 'Copied' : state === 'manual' ? 'Press Ctrl/Cmd+C' : 'Copy citation'}
    </button>
  );
}

/**
 * A single publication, typeset after the faculty draft the PI preferred: a
 * type badge, the title in the serif face linking straight to the DOI, then
 * authors and venue as separate quieter lines.
 *
 * The id is a stable anchor so the research page can deep-link to a specific
 * paper; :target highlights it on arrival.
 */
function PublicationEntry({
  publication,
  isCited,
}: {
  publication: Publication;
  isCited: boolean;
}) {
  const { authors, title } = splitCitation(publication.citation);
  const href = publication.doi
    ? `https://${publication.doi.replace(/^https?:\/\//, '')}`
    : undefined;

  return (
    <article
      className={`publication-entry${isCited ? ' is-cited' : ''}`}
      id={publication.id}
    >
      <PublicationCover venue={publication.venue} />
      <div className="publication-entry-copy">
        <span className="publication-badge">{publicationTypeBadge[publication.type]}</span>
        <h3>
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        {authors ? <p className="publication-authors">{authors}</p> : null}
        <p className="publication-venue">
          {publication.venue} · {publication.year}
          {publication.extra ? ` · ${publication.extra}` : ''}
        </p>
        {publication.note ? <p className="publication-note">{publication.note}</p> : null}

        <div className="publication-links">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              DOI: {publication.doi}
              <ExternalLink size={12} aria-hidden="true" />
            </a>
          ) : null}
          {publication.sourceUrl ? (
            <a href={publication.sourceUrl} target="_blank" rel="noopener noreferrer">
              Source record
              <ExternalLink size={12} aria-hidden="true" />
            </a>
          ) : null}
          <CopyCitation publication={publication} />
        </div>
      </div>
    </article>
  );
}

function PublicationGroup({
  type,
  publications,
  cited,
}: {
  type: PublicationType;
  publications: Publication[];
  cited: string | null;
}) {
  const grouped = useMemo(() => {
    const years = new Map<string, Publication[]>();
    for (const publication of publications) {
      const current = years.get(publication.year) ?? [];
      current.push(publication);
      years.set(publication.year, current);
    }
    return [...years.entries()].sort(([a], [b]) => b.localeCompare(a));
  }, [publications]);

  return (
    <section className="publication-type-group" aria-labelledby={`publication-type-${type}`}>
      <div className="publication-type-heading">
        <h2 id={`publication-type-${type}`}>{publicationTypeLabels[type]}</h2>
      </div>
      {grouped.map(([year, entries]) => (
        <div className="publication-year-group" key={year}>
          <div className="publication-year">{year}</div>
          <div className="publication-entries stagger-list">
            {entries.map((publication) => (
              <PublicationEntry
                publication={publication}
                isCited={cited === publication.id}
                key={publication.id}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}


const conferenceKindOrder: ConferenceKind[] = ['Award', 'Oral', 'Poster', 'Workshop', 'Attended'];

const conferenceKindIcons: Record<ConferenceKind, LucideIcon> = {
  Award,
  Oral: Mic,
  Poster: Presentation,
  Workshop: GraduationCap,
  Attended: Users,
};

const conferenceKindLabels: Record<ConferenceKind, string> = {
  Award: 'Awards',
  Oral: 'Oral presentations',
  Poster: 'Poster presentations',
  Workshop: 'Workshops & training',
  Attended: 'Attended',
};

/**
 * The 66 conference and workshop entries, grouped by year. Entries are shown
 * verbatim, so the only affordance is filtering by kind.
 */
function ConferencesSection() {
  const [kinds, setKinds] = useState<Set<ConferenceKind>>(() => new Set(conferenceKindOrder));

  const toggle = (kind: ConferenceKind) =>
    setKinds((current) => {
      const next = new Set(current);
      if (next.has(kind)) next.delete(kind);
      else next.add(kind);
      return next;
    });

  const years = useMemo(
    () =>
      CONFERENCE_YEARS.map((year) => ({
        year,
        items: CONFERENCES.filter((c) => c.year === year && kinds.has(c.kind)),
      })).filter((group) => group.items.length > 0),
    [kinds],
  );

  const total = years.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <Section tone="sunken" id="conferences" className="conference-section">
      <div className="conference-head">
        <div>
          <div className="eyebrow">Conferences &amp; Workshops</div>
          <h2>Presentations, training, and meetings</h2>
        </div>
        <ul className="conference-kinds" aria-label="Filter by kind">
          {conferenceKindOrder.map((kind) => {
            const KindIcon = conferenceKindIcons[kind];
            return (
              <li key={kind}>
                <button
                  type="button"
                  className="conference-kind-toggle"
                  aria-pressed={kinds.has(kind)}
                  onClick={() => toggle(kind)}
                >
                  <KindIcon size={14} strokeWidth={1.6} aria-hidden="true" />
                  {conferenceKindLabels[kind]}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        {total} of {CONFERENCES.length} entries shown.
      </div>

      {years.length === 0 ? (
        <p className="empty-state">No kinds selected.</p>
      ) : (
        years.map((group) => (
          <section className="conference-year" key={group.year} aria-label={`${group.year}`}>
            <h3 className="conference-year-label">{group.year}</h3>
            <ol className="conference-list">
              {group.items.map((item) => (
                <li className="conference-item" key={item.id}>
                  <span className={`conference-tag conference-tag--${item.kind.toLowerCase()}`}>
                    <span className="conference-tag-badge" aria-hidden="true">
                      {(() => {
                        const KindIcon = conferenceKindIcons[item.kind];
                        return <KindIcon size={17} strokeWidth={1.5} />;
                      })()}
                    </span>
                    <span className="conference-tag-label">{item.kind}</span>
                  </span>
                  <p>{item.entry}</p>
                </li>
              ))}
            </ol>
          </section>
        ))
      )}
    </Section>
  );
}

export function PublicationsPage() {
  const { data: publications } = useSanityData(
    PUBLICATIONS_QUERY,
    mapPublicationDocs,
    PUBLICATIONS,
  );
  const [query, setQuery] = useState('');
  const cited = useCitedPublication(publications.length > 0);
  const [selected, setSelected] = useState<Set<PublicationType>>(() => new Set(publicationTypeOrder));
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = publications.filter((publication) => {
    if (!selected.has(publication.type)) return false;
    if (!normalizedQuery) return true;
    return `${publication.citation} ${publication.venue} ${publication.year}`.toLowerCase().includes(normalizedQuery);
  });
  const groups = publicationTypeOrder
    .map((type) => ({ type, publications: filtered.filter((publication) => publication.type === type) }))
    .filter((group) => group.publications.length > 0);

  const toggleType = (type: PublicationType) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  return (
    <>
      <PageHeader eyebrow="RNA-Binding Proteins (RBPs) Laboratory" title="Publications">
        <p className="page-header-lede">Research output spanning RNA biology, splicing regulation, and computational genomics.</p>
        <div className="publication-controls">
          <label className="search-field">
            <span className="sr-only">Search publications</span>
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              id="publication-search"
              name="publication-search"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search publications"
            />
          </label>
          <PublicationsFilter selected={selected} onToggle={toggleType} />
        </div>
        <div className="sr-only" role="status" aria-live="polite">{filtered.length} publication{filtered.length === 1 ? '' : 's'} shown.</div>
      </PageHeader>

      <Section tone="base" className="publication-results">
        {selected.size === 0 ? <p className="empty-state">No publication type selected.</p> : groups.length === 0 ? <p className="empty-state">No publications match &quot;{query}&quot;.</p> : groups.map((group) => <PublicationGroup key={group.type} cited={cited} {...group} />)}
      </Section>

      <ConferencesSection />
    </>
  );
}

export function NewsPage() {
  const { data: news } = useSanityData(NEWS_QUERY, mapNewsDocs, NEWS_ITEMS);

  return (
    <>
      <PageHeader eyebrow="RNA-Binding Proteins (RBPs) Laboratory" title="News & Achievements">
        <p className="page-header-lede">Grants, publications, and milestones from the lab.</p>
      </PageHeader>
      <Section tone="base" className="news-list-section">
        <ol className="news-list stagger-list">
          {news.map((item, index) => (
            <li className="news-list-item" key={item.id}>
              <div className="news-list-number">{news.length - index}</div>
              <div>
                <div className="eyebrow">
                  {[item.kind, item.venue, item.year].filter(Boolean).join(' · ')}
                </div>
                {/* Not every entry has a short title; leading with the summary
                    beats inventing a headline for it. */}
                <h2>{item.title ?? item.summary}</h2>
                {item.title ? <p>{item.summary}</p> : null}
                {item.link ? (
                  <a className="text-link" href={item.link} target="_blank" rel="noopener noreferrer">
                    Read more <ArrowRight size={15} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
        {news.length === 0 ? <p className="empty-state">No news items yet.</p> : null}
      </Section>
    </>
  );
}

export function EquipmentPage() {
  const { data: equipment } = useSanityData(EQUIPMENT_QUERY, mapEquipmentDocs, EQUIPMENT);
  return (
    <>
      <PageHeader eyebrow="Equipment" title="Lab Instrumentation">
        <p className="page-header-lede">Core equipment supporting our RNA biology, proteomics, and cell biology research programs. Each entry lists the grant it was procured under.</p>
      </PageHeader>
      <Section tone="base" className="equipment-section">
        {equipment.length === 0 ? <p className="empty-state">No equipment entries yet.</p> : (
          <div className="equipment-grid stagger-list">
            {equipment.map((item) => (
              <article className="equipment-card" key={item.id}>
                <img src={item.imageSrc} alt="" />
                <div className="equipment-accent" style={{ backgroundColor: item.accent }} />
                <div className="equipment-card-copy">
                  <h2>{item.name}</h2>
                  <p className="equipment-model" style={{ color: item.accent }}>{item.model}</p>
                  <p className="equipment-description">{item.description}</p>
                  <p className="equipment-funding">Funded by {item.funding}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
}

/**
 * Portrait from the person's institutional page. Falls back to the accent
 * monogram plate if a file is ever missing, so a card never renders empty.
 */
function CollaboratorPortrait({ collaborator }: { collaborator: Collaborator }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="monogram"
        style={{ backgroundColor: collaborator.accent }}
        aria-hidden="true"
      >
        {initials(collaborator.name)}
      </div>
    );
  }

  return (
    <div className="collaborator-portrait">
      <img
        src={assetPath(collaborator.image)}
        alt={collaborator.name}
        loading="lazy"
        decoding="async"
        width="400"
        height="300"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export function CollaboratorsPage() {
  const { data: collaborators } = useSanityData(
    COLLABORATORS_QUERY,
    mapCollaboratorDocs,
    COLLABORATORS,
  );
  return (
    <>
      <PageHeader eyebrow="RNA-Binding Proteins (RBPs) Laboratory" title="Collaborators">
        <p className="page-header-lede">Research partnerships spanning genetics, computer science, and engineering — within IIT Guwahati and beyond.</p>
      </PageHeader>
      <Section tone="base" className="collaborators-section">
        {collaborators.length === 0 ? <p className="empty-state">No collaborators yet.</p> : (
          <div className="collaborators-grid stagger-list">
            {collaborators.map((collaborator) => (
              <article className="collaborator-card" key={collaborator.id}>
                <CollaboratorPortrait collaborator={collaborator} />
                <h2>{collaborator.name}</h2>
                <p className="collaborator-institution">{collaborator.institution}</p>
                <p>{collaborator.description}</p>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

export function GalleryPage() {
  const { data: images } = useSanityData(GALLERY_QUERY, mapGalleryDocs, GALLERY_IMAGES);

  return (
    <>
      <PageHeader eyebrow="RNA-Binding Proteins Laboratory · IIT Guwahati" title="Gallery">
        <p className="page-header-lede">Photographs from the lab, the department, and the people who work here.</p>
      </PageHeader>
      <Section tone="base" className="gallery-section">
        {images.length === 0 ? <p className="empty-state">No gallery images yet.</p> : (
          <div className="gallery-grid stagger-list">
            {images.map((image, index) => (
              <GalleryImageFrame image={image} eager={index < 2} key={image.id} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

function GalleryImageFrame({ image, eager }: { image: (typeof GALLERY_IMAGES)[number]; eager: boolean }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="gallery-image-frame" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
      <img
        className={loaded ? 'is-loaded' : ''}
        src={assetPath(image.src)}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={eager ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}