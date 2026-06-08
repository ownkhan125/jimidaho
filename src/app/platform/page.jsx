import SiteShell from '@/components/site/site-shell'
import PageHero from '@/components/site/page-hero'
import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import SplitText from '@/components/reveal/split-text'
import KineticButton from '@/components/ui/kinetic-button'
import Scene from '@/components/illustrations/scene'
import PlatformPillar from '@/components/platform/platform-pillar'
import ContactStrip from '@/sections/contact-strip'

export const metadata = {
  title: 'The Platform',
  description:
    "Specific promises — not slogans. Read the seven priorities Jim Hartley will fight for in Idaho's 1st Congressional District.",
}

const PILLARS = [
  {
    id: 'economy',
    eyebrow: 'Pillar I',
    title: 'Economy & Jobs',
    summary:
      "Working families, not Wall Street. A tax code and tariff strategy that backs Idaho's small employers — not the multinationals that ship our jobs overseas.",
    scene: 'farmland',
    promises: [
      'Cut the small-business tax rate to 18% and protect family farms from estate tax.',
      'Triple federal investment in skilled-trade apprenticeships — funded by closing the carried-interest loophole.',
      'Negotiate energy-cost relief for Idaho ratepayers; protect Snake River hydropower.',
    ],
    metric: { label: 'Idahoans employed by SMBs in ID-01', value: '62%' },
  },
  {
    id: 'education',
    eyebrow: 'Pillar II',
    title: 'Education & School Choice',
    summary:
      'Empower parents, fund classrooms, keep DC out of Idaho schools. Education works when local boards lead and federal dollars follow — not the other way around.',
    scene: 'meeting',
    promises: [
      'Codify school choice at the federal level — funds follow the student, not the system.',
      'Expand vocational and CTE pathways in every Idaho high school.',
      'Block any federal curriculum mandate; protect local school-board authority.',
    ],
    metric: { label: 'Idaho students in CTE programs (target +3yr)', value: '+40%' },
  },
  {
    id: 'healthcare',
    eyebrow: 'Pillar III',
    title: 'Healthcare for Families & Veterans',
    summary:
      "Healthcare you can actually use, priced like everything else you buy. Special focus on rural access and veterans' mental health.",
    scene: 'meeting',
    promises: [
      'Rural-clinic grant program for towns under 5,000 — no clinic farther than 30 minutes.',
      'Full VA mental-health reform: same-week appointments, no waitlists.',
      'End surprise billing; require legible up-front pricing for all federally-paid procedures.',
    ],
    metric: { label: 'Idaho counties with no full-time doctor', value: '9' },
  },
  {
    id: 'land',
    eyebrow: 'Pillar IV',
    title: 'Forest & Land Stewardship',
    summary:
      'Active forest management that prevents megafires — and respects multi-use traditions. Idahoans know their own land.',
    scene: 'mountains',
    promises: [
      'Triple the federal forest-thinning budget; cut permitting timelines by 60%.',
      'Defend multi-use access on federal lands: hunting, grazing, recreation.',
      'Local-veto authority on any new federal land designation in ID-01.',
    ],
    metric: { label: 'Acres in ID-01 needing active thinning', value: '2.1M' },
  },
  {
    id: 'housing',
    eyebrow: 'Pillar V',
    title: 'Housing for Idahoans',
    summary:
      'Make it possible to buy a home in the town you grew up in — not just rent one. Permits, supply, and first-time buyer relief.',
    scene: 'vista',
    promises: [
      'First-time-buyer credit of $10,000 for Idaho-born residents.',
      'Federal permitting reform: end the multi-year holds on infrastructure builds.',
      'Workforce-housing fund tied to wage growth, not corporate-subsidy giveaways.',
    ],
    metric: { label: 'ID-01 median rent growth since 2019', value: '+47%' },
  },
  {
    id: 'transport',
    eyebrow: 'Pillar VI',
    title: 'Roads, Rail & River Transport',
    summary:
      'Modernize I-90, protect Snake River shipping, and connect rural Idaho to its markets with reliable broadband and freight.',
    scene: 'river',
    promises: [
      "I-90 corridor modernization — federal match for ITD's reconstruction plan.",
      'Protect the four Lower Snake River dams as working infrastructure.',
      'Universal rural broadband by end of first term — no exceptions.',
    ],
    metric: { label: 'ID-01 households without reliable broadband', value: '31K' },
  },
  {
    id: 'safety',
    eyebrow: 'Pillar VII',
    title: 'Public Safety & The Border',
    summary:
      'Back the blue, defend the border, and stop the fentanyl supply chain into Idaho. Law and order is a quality-of-life issue.',
    scene: 'flag',
    promises: [
      'Restore full COPS-program funding for rural Idaho departments.',
      'Lock in southern-border interdiction funding for the duration of the term.',
      'Federal fentanyl trafficking penalties on par with a Class A felony.',
    ],
    metric: { label: 'Idaho fentanyl overdose deaths, 2024', value: '478' },
  },
]

export default function PlatformPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="The Platform · 7 Pillars"
        title="Specific promises. Not slogans."
        description="Every commitment below is published, signed, and dated. We'll measure them against the record every six months — in public — for the entirety of the term."
      >
        <div className="flex flex-wrap items-center gap-4">
          <KineticButton href="/volunteer" variant="primary" size="lg">
            Join the campaign
          </KineticButton>
          <KineticButton href="/donate" variant="ghost" size="lg">
            Fund the campaign
          </KineticButton>
        </div>
      </PageHero>

      <SectionFrame
        eyebrow="The First 100 Days"
        number="// Bills filed, hearings held"
        className="bg-cream-soft pt-16 lg:pt-24"
        innerClassName="pb-16"
      >
        <div className="grid grid-cols-12 gap-y-10 pt-10 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-7">
            <SplitText
              as="h2"
              text="The campaign isn't the work. It's the audition."
              className="font-display text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-ink-900"
              inView
              stagger={0.04}
            />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <Reveal y={20} delay={0.1}>
              <p className="text-[15px] leading-relaxed text-ink-700 lg:text-base">
                Within the first 100 days of taking office, Jim will introduce four bills tied
                directly to the platform below. The first three are already drafted and available on
                the campaign site.
              </p>
            </Reveal>
          </div>
        </div>
      </SectionFrame>

      {PILLARS.map((p, i) => (
        <PlatformPillar key={p.id} pillar={p} index={i} />
      ))}

      <SectionFrame
        eyebrow="The Record · Once Elected"
        number="// Public ledger, public meetings"
        className="bg-ink-900 text-cream"
        innerClassName="py-24 lg:py-32"
        topBorder={false}
      >
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-7">
            <Reveal y={20} className="relative aspect-[16/10] overflow-hidden rounded-[28px]">
              <Scene
                variant="capitol"
                className="absolute inset-0 size-full"
                label="Idaho Statehouse"
              />
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <Reveal y={20}>
              <SplitText
                as="h2"
                text="Every meeting on the public calendar."
                className="font-display text-[clamp(1.9rem,4.2vw,3.2rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-cream"
                inView
                stagger={0.04}
              />
            </Reveal>
            <Reveal
              y={20}
              delay={0.15}
              className="mt-6 max-w-md space-y-5 text-[15px] leading-relaxed text-cream/75"
            >
              <p>
                A live public ledger of every constituent meeting, every donor call, and every vote
                — published within 24 hours.
              </p>
              <p>
                We&apos;ll measure this platform against the record at the six-, twelve-, and
                twenty-four-month marks. If we miss, we&apos;ll say so. In public. On the record.
              </p>
            </Reveal>
            <Reveal y={20} delay={0.25} className="mt-8 flex flex-wrap gap-4">
              <KineticButton href="/donate" variant="primary" size="md">
                Fund the campaign
              </KineticButton>
              <KineticButton href="/contact" variant="outline" size="md">
                Ask a question
              </KineticButton>
            </Reveal>
          </div>
        </div>
      </SectionFrame>

      <ContactStrip />
    </SiteShell>
  )
}
