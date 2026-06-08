import SiteShell from '@/components/site/site-shell'
import PageHero from '@/components/site/page-hero'
import KineticButton from '@/components/ui/kinetic-button'
import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import ContactForm from '@/components/forms/contact-form'
import Scene from '@/components/illustrations/scene'

export const metadata = {
  title: 'Contact',
  description:
    'Drop the campaign a note. We answer every message within 48 hours — and we read every single one.',
}

const CONTACT_BLOCKS = [
  {
    label: 'Call',
    value: '(208) 555-0144',
    body: 'Office hours: Mon–Fri, 9 AM – 5 PM Mountain.',
    href: 'tel:+12085550144',
  },
  {
    label: 'Email',
    value: 'hello@jimhartleyforidaho.com',
    body: 'Replies within 48 hours, every business day.',
    href: 'mailto:hello@jimhartleyforidaho.com',
  },
  {
    label: 'Mail',
    value: '420 W Bannock St, Suite 410',
    body: 'Boise, Idaho 83702 · By appointment.',
    href: null,
  },
]

const FAQS = [
  {
    q: 'How can I volunteer?',
    a: 'Head to the Volunteer page — sign up takes about three minutes and a regional captain will reach out within 48 hours.',
  },
  {
    q: 'Can I request a yard sign?',
    a: "Yes. Mention it in the message field below with your address and we'll route it to the nearest county team.",
  },
  {
    q: 'Is Jim available for speaking engagements?',
    a: 'We accept invitations from civic organizations, schools, and community groups across ID-01. Email speaking@jimhartleyforidaho.com.',
  },
  {
    q: 'Who funds the campaign?',
    a: 'Idahoans. We do not take corporate-PAC money and never will. All donors are listed in the federal disclosures on a quarterly basis.',
  },
]

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact · We read every message"
        title="Drop us a note."
        description="Volunteer requests, press inquiries, yard signs, or just a question about the platform — every message gets a reply within 48 hours."
      >
        <div className="flex flex-wrap items-center gap-4">
          <KineticButton href="/volunteer" variant="primary" size="lg">
            Volunteer
          </KineticButton>
          <KineticButton href="/events" variant="ghost" size="lg">
            See upcoming events
          </KineticButton>
        </div>
      </PageHero>

      {/* Contact blocks */}
      <SectionFrame
        eyebrow="Three ways to reach us"
        number="// Pick what fits"
        className="bg-cream pt-16 lg:pt-24"
        innerClassName="pb-16"
      >
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-ink-900/15 bg-ink-900/15 md:grid-cols-3">
          {CONTACT_BLOCKS.map((b, i) => (
            <Reveal key={b.label} y={0} delay={0.05 * i} className="bg-cream-soft p-8 lg:p-9">
              <div className="font-mono-display text-[10.5px] uppercase tracking-[0.24em] text-ink-500">
                {b.label}
              </div>
              <div className="mt-4 font-display text-xl font-semibold leading-tight tracking-[-0.025em] text-ink-900 lg:text-[22px]">
                {b.href ? (
                  <a href={b.href} className="hover:text-iris">
                    {b.value}
                  </a>
                ) : (
                  b.value
                )}
              </div>
              <p className="mt-3 text-[14.5px] text-ink-700">{b.body}</p>
            </Reveal>
          ))}
        </div>
      </SectionFrame>

      {/* Form + map */}
      <SectionFrame
        id="message"
        eyebrow="Send a message"
        number="// 48-hour reply window"
        className="bg-cream-soft pt-16 lg:pt-24"
        innerClassName="pb-24 lg:pb-32"
      >
        <div className="grid grid-cols-12 gap-y-10 pt-10 lg:gap-x-10 lg:pt-16">
          <div className="col-span-12 lg:col-span-5">
            <Reveal y={20}>
              <h2 className="font-display text-[clamp(1.9rem,4.2vw,3.2rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-ink-900">
                What&apos;s on your mind?
              </h2>
            </Reveal>
            <Reveal y={20} delay={0.1}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-700">
                Press, partnership, yard signs, hostings, or a policy question — there&apos;s a real
                human behind every reply.
              </p>
            </Reveal>

            <Reveal
              y={20}
              delay={0.2}
              className="mt-10 overflow-hidden rounded-3xl border border-ink-900/15"
            >
              <div className="relative aspect-[4/3]">
                <Scene
                  variant="capitol"
                  className="absolute inset-0 size-full"
                  label="HQ location: Boise"
                />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-cream/90 px-4 py-4 backdrop-blur">
                  <div className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
                    Campaign HQ
                  </div>
                  <div className="mt-1 font-display text-base font-semibold text-ink-900">
                    420 W Bannock St, Suite 410 · Boise, ID
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <Reveal y={28} delay={0.05}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </SectionFrame>

      {/* FAQ */}
      <SectionFrame
        eyebrow="Frequently asked"
        number="// You're not the first to ask"
        className="bg-cream pt-16 lg:pt-24"
        innerClassName="pb-24 lg:pb-32"
      >
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-8">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} y={20} delay={0.05 * i}>
              <details className="group cursor-pointer rounded-2xl border border-ink-900/15 bg-cream-soft p-6 transition-colors hover:border-ink-900/35 open:bg-cream">
                <summary className="flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-lg font-semibold leading-tight tracking-[-0.025em] text-ink-900 lg:text-xl">
                    {f.q}
                  </h3>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-ink-900/20 text-ink-900 transition-transform duration-500 group-open:rotate-45">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1v12M1 7h12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-[14.5px] leading-relaxed text-ink-700">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </SectionFrame>
    </SiteShell>
  )
}
