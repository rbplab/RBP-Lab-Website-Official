import { useState } from 'react';
import { Link } from 'wouter';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PageHeader, Section, SectionHeader, SectionNav } from '@/components/page-patterns';
import { assetPath } from '@/lib/asset-path';
import {
  CONCEPTS,
  FIGURES,
  FOCUS_AREAS,
  PIPELINE,
  RESEARCH_QUERY,
  mapConcepts,
  mapFigures,
  mapFocusAreas,
  mapPipeline,
  type Concept,
  type FocusArea,
  type PipelineStage,
  type ResearchFigure,
  type SanityResearchDocs,
} from '@/data/research';
import { useSanityObject } from '@/hooks/use-sanity-data';
import {
  Activity,
  ArrowDown,
  BookOpen,
  Compass,
  Dna,
  FlaskConical,
  Images,
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
        <div className="media-pending" role="img" aria-label={`${alt}. Image asset will be added later.`}>
          <span aria-hidden="true">FIGURE ASSET PENDING</span>
        </div>
      ) : (
        <img src={assetPath(src)} alt={alt} onError={() => setMissing(true)} />
      )}
    </div>
  );
}

/** Horizontal stepper on desktop, vertical timeline on mobile. */
function PipelineDiagram({ stages }: { stages: PipelineStage[] }) {
  if (stages.length === 0) return null;

  return (
    <ol className="pipeline" aria-label="Stages of the RNA lifecycle">
      {stages.map((stage, index) => (
        <li className="pipeline-stage" key={stage.id}>
          <div className="pipeline-node" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="pipeline-copy">
            <h3>{stage.label}</h3>
            <p>{stage.caption}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Overview card — jumps to the matching detail band further down. */
function FocusAreaCard({ area }: { area: FocusArea }) {
  return (
    <article className="focus-card">
      <div className="focus-topline">
        <span className="focus-number">{area.number}</span>
        <Icon name={area.icon} size={22} />
      </div>
      <h3>{area.title}</h3>
      <p>{area.summary}</p>
      {area.tags.length > 0 && (
        <ul className="tag-row" aria-label={`${area.title} keywords`}>
          {area.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}
      <a className="text-link focus-card-link" href={`#${area.id}`}>
        Read more <ArrowDown size={14} aria-hidden="true" />
      </a>
    </article>
  );
}

/** Full detail band. Figure alternates sides between consecutive areas. */
function FocusAreaBand({ area, index }: { area: FocusArea; index: number }) {
  const figureFirst = index % 2 === 1;

  return (
    <Section tone={index % 2 === 0 ? 'base' : 'sunken'} id={area.id} className="focus-band">
      <div className={`focus-band-grid ${figureFirst ? 'focus-band-grid--reversed' : ''}`.trim()}>
        <div className="focus-band-rail">
          <span className="focus-number">{area.number}</span>
          <Icon name={area.icon} size={28} />
        </div>

        <div className="focus-band-copy">
          <div className="eyebrow">{area.eyebrow}</div>
          <h2 id={`${area.id}-title`}>{area.title}</h2>
          {area.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {area.tags.length > 0 && (
            <ul className="tag-row" aria-label={`${area.title} keywords`}>
              {area.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}

          {/* Each theme cites the work behind it, linking to the exact entry on
              the publications page rather than the page in general. */}
          {area.papers && area.papers.length > 0 ? (
            <div className="focus-papers">
              <h3 className="focus-papers-label">Key papers</h3>
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

        <div className="focus-band-figure">
          <PlateFrame src={area.imageSrc} alt={`Figure illustrating ${area.title}`} />
        </div>
      </div>
    </Section>
  );
}

function ConceptAccordion({ concepts }: { concepts: Concept[] }) {
  if (concepts.length === 0) return null;

  return (
    <Accordion type="multiple" defaultValue={[concepts[0].id]} className="concept-accordion">
      {concepts.map((concept) => (
        <AccordionItem value={concept.id} key={concept.id} className="concept-item">
          <AccordionTrigger className="concept-trigger">
            <span className="concept-trigger-inner">
              <Icon name={concept.icon} size={18} />
              <span>
                <span className="eyebrow">{concept.eyebrow}</span>
                <span className="concept-title">{concept.title}</span>
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="concept-content">
            {concept.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
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

export function ResearchPage() {
  const { data } = useSanityObject(
    RESEARCH_QUERY,
    (raw: SanityResearchDocs) => ({
      pipeline: mapPipeline(raw.pipeline ?? []),
      concepts: mapConcepts(raw.concepts ?? []),
      focusAreas: mapFocusAreas(raw.focusAreas ?? []),
      figures: mapFigures(raw.figures ?? []),
    }),
    { pipeline: PIPELINE, concepts: CONCEPTS, focusAreas: FOCUS_AREAS, figures: FIGURES },
    (raw) => !raw?.focusAreas?.length && !raw?.concepts?.length && !raw?.pipeline?.length,
  );
  const { pipeline, concepts, focusAreas, figures } = data;

  const navItems = [
    { label: 'Overview', href: '#overview', icon: <Compass size={16} strokeWidth={1.4} /> },
    { label: 'Background', href: '#background', icon: <BookOpen size={16} strokeWidth={1.4} /> },
    ...focusAreas.map((area) => ({
      label: area.title,
      href: `#${area.id}`,
      icon: <Icon name={area.icon} size={16} />,
    })),
    { label: 'Figures', href: '#figures', icon: <Images size={16} strokeWidth={1.4} /> },
  ];

  return (
    <>
      <PageHeader eyebrow="RNA-BINDING PROTEINS (RBPS) LABORATORY" title="Research">
        <p className="page-header-lede">
          Decoding how RNA-binding proteins assemble, interact, and govern the fate of RNA — from
          biogenesis to decay.
        </p>
        <SectionNav items={navItems} />
      </PageHeader>

      <Section tone="base" id="overview">
        <SectionHeader
          eyebrow="Overview"
          title="Where the laboratory works"
          lede="Our programme follows RNA through its lifecycle, from the proteins deposited during splicing to the regulatory consequences downstream."
        />
        <PipelineDiagram stages={pipeline} />
        <div className="focus-grid stagger-list">
          {focusAreas.map((area) => (
            <FocusAreaCard area={area} key={area.id} />
          ))}
        </div>
      </Section>

      <Section tone="raised" id="background" width="prose">
        <SectionHeader eyebrow="Background" title="The biology behind the questions" />
        <ConceptAccordion concepts={concepts} />
      </Section>

      {focusAreas.map((area, index) => (
        <FocusAreaBand area={area} index={index} key={area.id} />
      ))}

      <Section tone="base" id="figures" className="figures-section">
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
