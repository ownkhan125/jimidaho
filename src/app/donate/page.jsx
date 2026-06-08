import SiteShell from '@/components/site/site-shell'
import PageHero from '@/components/site/page-hero'
import KineticButton from '@/components/ui/kinetic-button'
import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import DonateForm from '@/components/forms/donate-form'
import Scene from '@/components/illustrations/scene'

export const metadata = {
  title: 'Donate',
  description:
    "Every dollar comes from Idahoans. No corporate PAC money — and we never will. Fund the campaign that's funding nobody else.",
}

const PROOF_POINTS = [
  { value: '100%', label: 'Idaho-funded' },
  { value: '0', label: 'Corporate PACs' },
  { value: '44', label: 'Counties active' },
  { value: '$3,300', label: 'Federal limit / cycle' },
]

export default function DonatePage() {
  return (
    <SiteShell>
      <PageHero
        tone="dark"
        eyebrow="Donate · Fuel the campaign"
        title="Funded by Idaho. For Idaho."
        description="Every dollar is reported. No corporate-PAC money. No dark money. Just Idahoans backing a campaign for their own representation."
      >
        <div className="flex flex-wrap items-center gap-4">
          <KineticButton href="/about" variant="primary" size="lg">
            Why I'm running
          </KineticButton>
          <KineticButton href="/platform" variant="outline" size="lg">
            Read the platform
          </KineticButton>
        </div>
      </PageHero>

      {/* Proof points */}
      <SectionFrame
        eyebrow="The pledge"
        number="// On the record"
        className="bg-cream pt-16 lg:pt-24"
        innerClassName="pb-16"
      >
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink-900/15 bg-ink-900/15 md:grid-cols-4">
          {PROOF_POINTS.map((p, i) => (
            <Reveal key={p.label} y={0} delay={0.05 * i} className="bg-cream-soft p-8 lg:p-10">
              <div className="font-display text-[clamp(2.2rem,4.8vw,3.4rem)] font-semibold leading-none tracking-[-0.045em] text-ink-900">
                {p.value}
              </div>
              <div className="mt-4 font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
                {p.label}
              </div>
            </Reveal>
          ))}
        </div>
      </SectionFrame>

      {/* Donate form */}
      <SectionFrame
        id="give"
        eyebrow="Make a contribution"
        number="// Secure · Reported · Compliant"
        className="bg-cream-soft pt-16 lg:pt-24"
        innerClassName="pb-24 lg:pb-32"
      >
        <div className="grid grid-cols-12 gap-y-10 pt-10 lg:gap-x-10 lg:pt-16">
          <div className="col-span-12 lg:col-span-5">
            <Reveal y={20}>
              <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink-900">
                Every gift gets a face-to-face thank you.
              </h2>
            </Reveal>
            <Reveal y={20} delay={0.1}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-700">
                Jim personally signs and sends a thank-you note to every donor — yes, every single
                one. We&apos;ve done it from day one and we&apos;ll keep doing it on day 365.
              </p>
            </Reveal>

            <Reveal
              y={20}
              delay={0.2}
              className="mt-10 overflow-hidden rounded-3xl border border-ink-900/15"
            >
              <div className="relative aspect-[4/3]">
                <Scene
                  variant="vista"
                  className="absolute inset-0 size-full"
                  label="Idaho landscape"
                />
                <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink-900/15">
                  <div className="bg-cream/90 p-4 backdrop-blur">
                    <div className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500">
                      Treasurer
                    </div>
                    <div className="mt-1 font-display text-sm font-semibold text-ink-900">
                      Hartley for Idaho · CFR&nbsp;ID-001428
                    </div>
                  </div>
                  <div className="bg-cream/90 p-4 backdrop-blur">
                    <div className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500">
                      Reported
                    </div>
                    <div className="mt-1 font-display text-sm font-semibold text-ink-900">
                      Quarterly to the FEC
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <Reveal y={28} delay={0.05}>
              <DonateForm />
            </Reveal>
          </div>
        </div>
      </SectionFrame>

      {/* Compliance */}
      <SectionFrame
        eyebrow="Federal compliance notice"
        number="// Required disclosures"
        className="bg-cream pt-16 lg:pt-24"
        innerClassName="pb-24 lg:pb-32"
      >
        <Reveal
          y={20}
          className="mt-10 max-w-3xl rounded-3xl border border-ink-900/15 bg-cream-soft p-8 lg:p-10"
        >
          <div className="font-mono-display text-[10.5px] uppercase tracking-[0.24em] text-ink-500">
            Required by federal law
          </div>
          <p className="mt-5 text-[14.5px] leading-relaxed text-ink-700">
            Contributions to Hartley for Idaho are not tax-deductible. Federal law requires us to
            report the name, address, occupation, and employer for individuals contributing more
            than $200 in a calendar year. The maximum contribution per individual per election is
            $3,300.
          </p>
          <p className="mt-4 text-[14.5px] leading-relaxed text-ink-700">
            We do not accept contributions from corporations, federal government contractors, labor
            organizations, national banks, or foreign nationals. Contributions from minors are
            limited to $200 per cycle.
          </p>
        </Reveal>
      </SectionFrame>
    </SiteShell>
  )
}
