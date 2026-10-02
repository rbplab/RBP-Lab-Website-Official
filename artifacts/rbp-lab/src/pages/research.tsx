import { useState } from 'react';
import { Link } from 'wouter';
import { PageHeader, Section, SectionHeader } from '@/components/page-patterns';
import { assetPath } from '@/lib/asset-path';
import {
  FIGURES,
  FOCUS_AREAS,
  RESEARCH_QUERY,
  mapFigures,
  mapFocusAreas,
  type FocusArea,
  type ResearchFigure,
  type SanityResearchDocs,
} from '@/data/research';
import { useSanityObject } from '@/hooks/use-sanity-data';
import {
  Activity,
  Dna,
  FlaskConical,
  Layers,
  Network,
  Shuffle,
  type LucideIcon,
} from 'lucide-react';

/** Icons are referenced by name from the data layer. */
const ICONS: Record<string, LucideIcon> = {
  Activity,
  Dna,
  FlaskConical,
  Layers,
  Network,
  Shuffle,
};

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const Resolved = ICONS[name] ?? Network;
  return <Resolved size={size} strokeWidth={1.3} aria-hidden="true" />;
}

/**
 * Scientific plates sit on white and must not be cropped — object-contain,
 * never cover.
 */
function PlateFrame({ src, alt }: { src: string; alt: string }) {
  const [missing, setMissing] = useState(false);

  return (
    <div className="research-plate">
      {missing ? (
        <div
          className="media-pending"
          role="img"
          aria-label={`${alt}. Image asset will be added later.`}
        >
          <span aria-hidden="true">FIGURE ASSET PENDING</span>
        </div>
      ) : (
        <img src={assetPath(src)} alt={alt} onError={() => setMissing(true)} />
      )}
    </div>
  );
}

function FigureGrid({ figures }: { figures: ResearchFigure[] }) {
  if (figures.length === 0) return null;

  return (
    <div className="figure-grid stagger-list">
      {figures.map((figure) => (
        <figure className="research-figure" key={figure.id}>
          <PlateFrame src={figure.src} alt={figure.caption} />
          <figcaption>
            <span className="research-figure-caption">{figure.caption}</span>
            <span className="research-figure-meta">{figure.meta}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/** One numbered theme: question, prose, keywords, and the papers behind it. */
function Theme({ area }: { area: FocusArea }) {
  return (
    <li className="theme" id={area.id}>
      <div className="theme-marker" aria-hidden="true">
        <span className="theme-number">{area.number}</span>
        <Icon name={area.icon} size={19} />
      </div>

      <div className="theme-body">
        <h2>{area.title}</h2>
        {area.question ? <p className="theme-question">{area.question}</p> : null}

        {area.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        {area.centralQuestion ? (
          <p className="theme-central">
            <strong>Central question:</strong> {area.centralQuestion}
          </p>
        ) : null}

        {area.tags.length > 0 ? (
          <ul className="tag-row" aria-label={`${area.title} keywords`}>
            {area.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}

        {area.papers && area.papers.length > 0 ? (
          <div className="focus-papers">
            <h3 className="focus-papers-label">Selected supporting publications</h3>
            <ul>
              {area.papers.map((paper) => (
                <li key={paper.id}>
                  <Link href={`/publications#${paper.id}`}>
                    <span className="focus-paper-title">{paper.title}</span>
                    <span className="focus-paper-meta">
                      {[paper.venue, paper.year].filter(Boolean).join(' · ')}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {area.imageSrc ? (
        <div className="theme-figure">
          <PlateFrame src={area.imageSrc} alt={`Figure illustrating ${area.title}`} />
        </div>
      ) : null}
    </li>
  );
}

export function ResearchPage() {
  const { data } = useSanityObject(
    RESEARCH_QUERY,
    (raw: SanityResearchDocs) => ({
      focusAreas: mapFocusAreas(raw.focusAreas ?? []),
      figures: mapFigures(raw.figures ?? []),
    }),
    { focusAreas: FOCUS_AREAS, figures: FIGURES },
    (raw) => !raw?.focusAreas?.length,
  );
  const { focusAreas, figures } = data;

  return (
    <>
      <PageHeader eyebrow="RNA-BINDING PROTEINS (RBPS) LABORATORY" title="Research">
        <p className="page-header-lede">
          Decoding how RNA-binding proteins assemble, interact, and govern the fate of RNA — from
          biogenesis to decay.
        </p>
      </PageHeader>

      {/*
        One run of numbered points rather than separate sub-sections. The PI
        asked in the 19 September review for the themes to sit directly under
        the Research heading, so the overview, background accordion and the
        per-theme section bands are gone.
      */}
      <Section tone="base" className="research-themes">
        <ol className="theme-list">
          {focusAreas.map((area) => (
            <Theme area={area} key={area.id} />
          ))}
        </ol>
      </Section>

      <Section tone="sunken" id="figures" className="figures-section">
        <SectionHeader
          eyebrow="Figures"
          title="Selected data from the laboratory"
          lede="Representative plates from published and ongoing work."
        />
        <FigureGrid figures={figures} />
      </Section>
    </>
  );
}
