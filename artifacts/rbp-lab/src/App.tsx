import { type ReactNode, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ArrowLeft, ArrowRight, ArrowUpRight, Dna, Linkedin, Network, RefreshCw, ScanLine } from 'lucide-react';
import { PageHeader, Section, SectionHeader, SectionNav } from '@/components/page-patterns';
import { CollaboratorsPage, EquipmentPage, GalleryPage, NewsPage, PublicationsPage } from '@/pages/content-pages';
import { ContactPage } from '@/pages/contact';
import {
  AWARDS,
  COURSES,
  EDUCATION,
  EXPERIENCE,
  PROFILE_COLUMNS,
  TALKS,
  type TimelineEntry,
} from '@/data/faculty';
import { ResearchPage } from '@/pages/research';
import { SiteShell } from '@/components/site-shell';
import NotFound from '@/pages/not-found';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { assetPath } from '@/lib/asset-path';
import {
  MEMBERS,
  MEMBERS_QUERY,
  PRINCIPAL_INVESTIGATOR,
  groupMembers,
  mapMemberDocs,
  type Member,
} from '@/data/members';
import { useSanityData } from '@/hooks/use-sanity-data';
import { NEWS_ITEMS, NEWS_QUERY, mapNewsDocs } from '@/data/news';

const queryClient = new QueryClient();

function FigureFrame({ src, alt, caption, className = '' }: { src: string; alt: string; caption?: string; className?: string }) {
  const [missing, setMissing] = useState(false);

  return (
    <figure className={`figure-frame ${className}`.trim()}>
      <div className="figure-surface">
        {missing ? (
          <div className="media-pending" role="img" aria-label={`${alt}. Image asset will be added later.`}>
            <span aria-hidden="true">FIGURE ASSET PENDING</span>
          </div>
        ) : (
          <img src={assetPath(src)} alt={alt} onError={() => setMissing(true)} />
        )}
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

const focusItems = [
  {
    number: '01',
    title: 'ASAP & EJC in mRNA Metabolism',
    description: 'Understanding the functions of the Apoptosis and Splicing-Associated Protein (ASAP) complex in relation to the Exon Junction Complex (EJC) in mRNA metabolism.',
    icon: Dna,
  },
  {
    number: '02',
    title: 'RBPs in Human Disease',
    description: 'Elucidating the molecular involvement of RNA-binding proteins in human diseases such as cancers and neurodevelopmental disorders.',
    icon: Network,
  },
  {
    number: '03',
    title: 'Post-Transcriptional Regulation',
    description: 'Exploring the post-transcriptional gene regulation of different RNA-binding proteins across stages of gene expression.',
    icon: ScanLine,
  },
  {
    number: '04',
    title: 'Isoform Switching',
    description: 'Investigating the functional outcomes of isoform switching and its consequences for mRNP composition and activity.',
    icon: RefreshCw,
  },
];

const gatewayCards = [
  {
    label: 'Research',
    href: '/research',
    image: '/images/lab/Cas-9_KO_and_Splicing.jpeg',
    description: 'Exon junction complexes, the ASAP complex, and the regulation of RNA fate.',
  },
  {
    label: 'Team',
    href: '/members',
    image: '/images/gallery/gallery-01.jpg',
    description: 'The researchers, scholars, and students who make up the laboratory.',
  },
  {
    label: 'Publications',
    href: '/publications',
    image: '/images/lab/Isoform_Usage.jpeg',
    description: 'Peer-reviewed work on splicing regulation, nonsense-mediated decay, and RNA-protein interactions.',
  },
];

function PortraitFrame({ member, featured = false, className = '' }: { member: Member; featured?: boolean; className?: string }) {
  const [missing, setMissing] = useState(false);
  const alt = `Portrait of ${member.name}`;

  return (
    <div className={`member-portrait ${featured ? 'member-portrait--featured' : ''} ${className}`.trim()}>
      {missing ? (
        <div className="member-portrait-blank" role="img" aria-label={`${alt}. Image not available.`} />
      ) : (
        <img
          src={assetPath(member.portrait ?? `/images/members/${member.slug}.jpg`)}
          alt={alt}
          onError={() => setMissing(true)}
        />
      )}
    </div>
  );
}

function LinkedInButton({ name }: { name: string }) {
  return (
    <button className="member-link" type="button" aria-label={`LinkedIn profile for ${name}`} title="LinkedIn profile not linked">
      <Linkedin size={15} strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <article className="member-card">
      <PortraitFrame member={member} />
      <div className="member-card-meta">
        <div>
          <h3>{member.name}</h3>
          <p>{member.role}</p>
        </div>
        <LinkedInButton name={member.name} />
      </div>
    </article>
  );
}

function RosterSectionHeader({ title, lede }: { title: string; lede?: string }) {
  return (
    <div className="roster-section-header">
      <h2>{title}</h2>
      {lede ? <p>{lede}</p> : null}
    </div>
  );
}

function Members() {
  const { data: allMembers } = useSanityData(MEMBERS_QUERY, mapMemberDocs, MEMBERS);
  const { principalInvestigator: pi, current: currentMembers, alumni, interns } =
    groupMembers(allMembers);

  return (
    <>
      <PageHeader eyebrow="RNA-Binding Proteins Laboratory · IIT Guwahati" title="Our People">
        <p className="page-header-lede">The researchers, scholars, and students who make up the RBP Laboratory — past and present.</p>
        <SectionNav
          items={[
            { label: 'Current Members', href: '#current' },
            { label: 'Alumni', href: '#alumni' },
            { label: 'Interns', href: '#interns' },
          ]}
        />
      </PageHeader>

      <section className="page-width pi-feature" aria-labelledby="pi-feature-heading">
        <PortraitFrame member={pi} featured />
        <div className="pi-feature-copy">
          <div className="eyebrow">Principal Investigator</div>
          <h2 id="pi-feature-heading"><Link href="/members/kusum-k-singh">Prof. Kusum K. Singh</Link></h2>
          <p className="pi-role">{pi.role}</p>
          <p className="pi-description">Department of Biosciences and Bioengineering, IIT Guwahati — post-transcriptional gene regulation, mRNA splicing, and the molecular biology of RNA-binding protein complexes.</p>
          <div className="pi-actions">
            <Link className="text-link" href="/members/kusum-k-singh">Full faculty profile <ArrowRight size={15} aria-hidden="true" /></Link>
            <LinkedInButton name={pi.name} />
          </div>
        </div>
      </section>

      <Section tone="base" id="current" className="members-roster-section">
        <RosterSectionHeader title="Current Members" />
        <div className="members-grid">
          {currentMembers.map((member) => <MemberCard member={member} key={member.slug} />)}
        </div>
      </Section>

      <Section tone="raised" id="alumni" className="members-roster-section">
        <RosterSectionHeader title="Alumni" lede="Former members of the RNA-Binding Proteins Laboratory." />
        <div className="members-grid">
          {alumni.map((member) => <MemberCard member={member} key={member.slug} />)}
        </div>
      </Section>

      <Section tone="base" id="interns" className="members-roster-section members-roster-section--last">
        <RosterSectionHeader title="Interns" />
        <div className="members-grid">
          {interns.map((member) => <MemberCard member={member} key={member.slug} />)}
        </div>
      </Section>
    </>
  );
}

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  return (
    <li className={`timeline-item ${entry.descriptionOnly ? 'timeline-item--description-only' : ''}`.trim()}>
      <div className="timeline-period">{entry.period}</div>
      <div className="timeline-entry">
        {entry.descriptionOnly ? <p>{entry.detail}</p> : (
          <>
            <h3>{entry.title}</h3>
            <p>{entry.detail}</p>
          </>
        )}
      </div>
    </li>
  );
}

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="timeline">
      {entries.map((entry, index) => <TimelineItem entry={entry} key={`${entry.period}-${index}`} />)}
    </ol>
  );
}

function ProfileColumns() {
  return (
    <div className="profile-columns">
      {PROFILE_COLUMNS.map((column) => (
        <div className="profile-column" key={column.label}>
          <div className="eyebrow">{column.label}</div>
          <ul>
            {column.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

function FacultyProfile() {
  const pi: Member = PRINCIPAL_INVESTIGATOR;

  return (
    <>
      <Section tone="raised" className="faculty-header-section">
        <div className="faculty-header-grid">
          <PortraitFrame member={pi} featured className="faculty-portrait" />
          <div className="faculty-header-copy">
            <div className="eyebrow">Faculty Profile</div>
            <h1>Prof. Kusum K. Singh</h1>
            <p>Assistant Professor, Department of Biosciences and Bioengineering, IIT Guwahati. Principal Investigator, RNA-Binding Proteins Laboratory — post-transcriptional gene regulation, mRNA splicing, and the molecular biology of RNA-binding protein complexes.</p>
          </div>
        </div>
        <div className="faculty-nav-wrap">
          <SectionNav
            items={[
              { label: 'Education', href: '#education' },
              { label: 'Experience', href: '#experience' },
              { label: 'Teaching', href: '#teaching' },
              { label: 'Awards', href: '#awards' },
              { label: 'Talks', href: '#talks' },
            ]}
          />
        </div>
      </Section>

      <Section tone="base" id="education" className="faculty-section">
        <div className="profile-section-heading">
          <div className="eyebrow">Background</div>
          <h2>Education</h2>
        </div>
        <Timeline entries={EDUCATION} />
      </Section>

      <Section tone="raised" id="experience" className="faculty-section">
        <div className="profile-section-heading">
          <div className="eyebrow">Career</div>
          <h2>Professional Experience</h2>
        </div>
        <Timeline entries={EXPERIENCE} />
        <ProfileColumns />
      </Section>

      <Section tone="base" id="teaching" className="faculty-section">
        <div className="profile-section-heading">
          <div className="eyebrow">Courses</div>
          <h2>Teaching</h2>
          <p>Course code, title, credit structure (L-T-P-C), and the term most recently taught.</p>
        </div>
        <div className="course-list">
          {COURSES.map((course) => (
            <div className="course-row" key={course.title}>
              <div className="course-code">{course.code}</div>
              <div>
                <h3>{course.title}</h3>
                <p>{course.details}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="raised" id="awards" className="faculty-section">
        <div className="profile-section-heading">
          <div className="eyebrow">Recognition</div>
          <h2>Awards and Fellowships</h2>
        </div>
        <Timeline entries={AWARDS} />
      </Section>

      <Section tone="base" id="talks" className="faculty-section">
        <div className="profile-section-heading">
          <div className="eyebrow">Dissemination</div>
          <h2>Invited Talks, Symposia &amp; Conferences</h2>
          <p>{TALKS.length} entries, most recent first.</p>
        </div>
        <div className="talk-list">
          {TALKS.map((talk) => (
            <div className="talk-row" key={talk.number}>
              <div className="talk-number">{talk.number}</div>
              <div>
                <h3>{talk.title}</h3>
                <p>{talk.details}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sunken" className="faculty-closing">
        <p><ArrowRight size={16} aria-hidden="true" /> See the <Link href="/members">Members</Link> page for the full RBP Laboratory roster, and <Link href="/publications">Publications</Link> for the complete bibliography.</p>
      </Section>
    </>
  );
}

function Home() {
  const newsRail = useRef<HTMLDivElement>(null);
  const { data: newsItems } = useSanityData(NEWS_QUERY, mapNewsDocs, NEWS_ITEMS);

  const moveNews = (direction: 'previous' | 'next') => {
    newsRail.current?.scrollBy({
      left: direction === 'next' ? newsRail.current.clientWidth * 0.72 : -newsRail.current.clientWidth * 0.72,
      behavior: 'smooth',
    });
  };

  return (
    <div className="home-page">
      <Section tone="inverse" className="home-hero-section">
        <h1
          className="home-hero-title"
          id="home-heading"
          data-testid="heading-rna-binding-proteins-laboratory"
        >
          <span className="nowrap">RNA-Binding</span> Proteins Laboratory
        </h1>
        <div className="home-hero-grid">
          <div className="home-hero-copy">
            <p className="home-hero-lede">Investigating the molecular logic of RNA-binding proteins in nonsense-mediated decay, splicing regulation, and gene expression fidelity.</p>
            <div className="keyword-list" aria-label="Research keywords">
              {['Alternative Splicing', 'Splicing', 'Gene Expression', 'EJC Research'].map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="home-hero-actions">
              <Link className="button button--solid" href="/research">Explore Research <ArrowRight size={15} aria-hidden="true" /></Link>
              <Link className="button button--outline" href="/members">Meet the Team <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
          <FigureFrame
            src="/images/lab/Proteomics.jpeg"
            alt="Research figure: western blot of MAGOH and MAGOHB knockouts, ribbon structures of the two paralogs, and a bar chart of mean normalised peptide intensity across knockout and wildtype conditions"
            caption="MAGOH / MAGOHB paralogs · Quantitative proteomics"
            className="hero-figure"
          />
        </div>
      </Section>

      <Section tone="base" id="research-focus">
        <SectionHeader
          eyebrow="Research Focus"
          title="Problems the lab is working on"
          lede="Our programme spans the assembly of ribonucleoprotein complexes, their disruption in disease, and the regulatory consequences downstream."
        />
        <div className="focus-grid stagger-list">
          {focusItems.map(({ number, title, description, icon: Icon }) => (
            <article className="focus-item" key={number}>
              <div className="focus-topline">
                <span className="focus-number">{number}</span>
                <Icon size={22} strokeWidth={1.3} aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <Link className="text-link" href="/research">Read the full research overview <ArrowRight size={15} aria-hidden="true" /></Link>
      </Section>

      <Section tone="raised">
        <SectionHeader eyebrow="Explore the laboratory" title="Start with the work, the people, or the record." />
        <div className="gateway-grid stagger-list">
          {gatewayCards.map((card) => (
            <Link className="gateway-card" href={card.href} key={card.label}>
              <FigureFrame src={card.image} alt={`${card.label} research laboratory image`} />
              <div className="gateway-card-copy">
                <span className="gateway-label">{card.label} <ArrowUpRight size={15} aria-hidden="true" /></span>
                <p>{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="sunken" className="news-section">
        <div className="news-header">
          <SectionHeader eyebrow="Lab News & Achievements" title="Recent work from the laboratory" />
          <div className="news-controls" aria-label="News carousel controls">
            <button type="button" onClick={() => moveNews('previous')} aria-label="Previous news items"><ArrowLeft size={16} aria-hidden="true" /></button>
            <button type="button" onClick={() => moveNews('next')} aria-label="Next news items"><ArrowRight size={16} aria-hidden="true" /></button>
          </div>
        </div>
        <div className="news-rail stagger-list" ref={newsRail} tabIndex={0} aria-label="Lab news">
          {newsItems.map((item) => (
            <article className="news-card" key={item.id}>
              <FigureFrame src={item.image ?? ''} alt="" />
              <h3>{item.summary}</h3>
              <div className="news-meta">
                <span className="news-meta-year">{item.year}</span>
                <span className="news-meta-source">
                  <span className="news-meta-kind">{item.kind}</span>
                  <span className="news-meta-venue">{item.venue}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
        <Link className="text-link" href="/news">See all lab news <ArrowRight size={15} aria-hidden="true" /></Link>
      </Section>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <SiteShell>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/research" component={ResearchPage} />
          <Route path="/members" component={Members} />
          <Route path="/members/kusum-k-singh" component={FacultyProfile} />
          <Route path="/publications" component={PublicationsPage} />
          <Route path="/news" component={NewsPage} />
          <Route path="/equipment" component={EquipmentPage} />
          <Route path="/collaborators" component={CollaboratorsPage} />
          <Route path="/gallery" component={GalleryPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFound} />
        </Switch>
      </SiteShell>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;