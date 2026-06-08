'use client'

import { useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'

import { Field, Input, Select, Checkbox, Fieldset } from '@/components/form/field'
import KineticButton from '@/components/ui/kinetic-button'

const COUNTIES = [
  'Ada',
  'Adams',
  'Benewah',
  'Boise',
  'Bonner',
  'Boundary',
  'Canyon',
  'Clearwater',
  'Custer',
  'Elmore',
  'Gem',
  'Idaho',
  'Kootenai',
  'Latah',
  'Lemhi',
  'Lewis',
  'Nez Perce',
  'Owyhee',
  'Payette',
  'Shoshone',
  'Valley',
  'Washington',
]

const REGIONS = [
  'North Idaho',
  'Treasure Valley',
  'Clearwater Valley',
  'Magic Valley',
  'East Idaho',
  'Wood River Valley',
  'Other',
]

const HELP_OPTIONS = [
  'Phone Banking',
  'Door Knocking',
  'Host a Meet & Greet',
  'Host a Fundraiser',
  'Event Planning',
  'Digital / Social Media',
  'Volunteer Coordination',
  'Media / Press',
]

const AVAILABILITY = [
  '1-2 hours / week',
  '3-5 hours / week',
  '5-10 hours / week',
  '10-20 hours / week',
  'Evenings & weekends only',
  'Remote help only',
]

const EXPERIENCE = [
  'None — first campaign',
  'Some volunteering',
  'Regular campaign volunteer',
  'Former campaign staff',
  'Campaign management',
  'Elected / appointed office',
]

const initial = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  zip: '',
  county: '',
  region: '',
  registered: '',
  experience: '',
  helpOptions: [],
  availability: '',
  issues: '',
  anythingElse: '',
  smsConsent: false,
  promoConsent: false,
}

const VolunteerForm = () => {
  const [data, setData] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const onChange = (k) => (e) =>
    setData((p) => ({
      ...p,
      [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }))

  const toggleHelp = (opt) =>
    setData((p) => ({
      ...p,
      helpOptions: p.helpOptions.includes(opt)
        ? p.helpOptions.filter((o) => o !== opt)
        : [...p.helpOptions, opt],
    }))

  const validate = () => {
    const next = {}
    if (!data.firstName.trim()) next.firstName = 'Required'
    if (!data.lastName.trim()) next.lastName = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = 'Valid email required'
    if (!data.region) next.region = 'Pick a region'
    if (!data.availability) next.availability = 'Pick an availability'
    if (data.helpOptions.length === 0) next.helpOptions = 'Pick at least one'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    await new Promise((r) => setTimeout(r, 900))
    setStatus('success')
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-ink-900/15 bg-cream-soft p-7 lg:p-10">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-5 py-6"
          >
            <span className="grid size-12 place-items-center rounded-full bg-iris text-cream">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 10.5L8.5 14l6.5-8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-ink-900">
              Welcome to the team.
            </h3>
            <p className="max-w-md text-[15px] leading-relaxed text-ink-700">
              A regional captain will reach out within 48 hours. In the meantime, check your inbox
              for the welcome packet — and feel free to RSVP to any upcoming event.
            </p>
            <KineticButton href="/events" variant="dark" size="md">
              See upcoming events
            </KineticButton>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col gap-7"
          >
            {/* Name + email */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="First name" required error={errors.firstName} htmlFor="v-fn">
                <Input
                  id="v-fn"
                  name="firstName"
                  autoComplete="given-name"
                  value={data.firstName}
                  onChange={onChange('firstName')}
                  error={errors.firstName}
                  placeholder="Jim"
                />
              </Field>
              <Field label="Last name" required error={errors.lastName} htmlFor="v-ln">
                <Input
                  id="v-ln"
                  name="lastName"
                  autoComplete="family-name"
                  value={data.lastName}
                  onChange={onChange('lastName')}
                  error={errors.lastName}
                  placeholder="Hartley"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Email" required error={errors.email} htmlFor="v-em">
                <Input
                  id="v-em"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={onChange('email')}
                  error={errors.email}
                  placeholder="you@email.com"
                />
              </Field>
              <Field label="Phone" hint="Optional" htmlFor="v-ph">
                <Input
                  id="v-ph"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={data.phone}
                  onChange={onChange('phone')}
                  placeholder="(208) 555-0144"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <Field label="ZIP code" htmlFor="v-zip">
                <Input
                  id="v-zip"
                  name="zip"
                  autoComplete="postal-code"
                  value={data.zip}
                  onChange={onChange('zip')}
                  placeholder="83814"
                />
              </Field>
              <Field label="County" htmlFor="v-county">
                <Select
                  id="v-county"
                  name="county"
                  value={data.county}
                  onChange={onChange('county')}
                >
                  <option value="">— Choose —</option>
                  {COUNTIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Region" required error={errors.region} htmlFor="v-region">
                <Select
                  id="v-region"
                  name="region"
                  value={data.region}
                  onChange={onChange('region')}
                  error={errors.region}
                >
                  <option value="">— Choose —</option>
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Registered to vote in Idaho?" htmlFor="v-reg">
                <Select
                  id="v-reg"
                  name="registered"
                  value={data.registered}
                  onChange={onChange('registered')}
                >
                  <option value="">— Choose —</option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>Not sure</option>
                </Select>
              </Field>
              <Field label="Prior campaign experience" htmlFor="v-exp">
                <Select
                  id="v-exp"
                  name="experience"
                  value={data.experience}
                  onChange={onChange('experience')}
                >
                  <option value="">— Choose —</option>
                  {EXPERIENCE.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            {/* Help options */}
            <Fieldset legend="How would you like to help? Pick all that apply.">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {HELP_OPTIONS.map((o) => (
                  <Checkbox
                    key={o}
                    checked={data.helpOptions.includes(o)}
                    onChange={() => toggleHelp(o)}
                    label={o}
                  />
                ))}
              </div>
              {errors.helpOptions && (
                <span className="font-mono-display text-[10.5px] uppercase tracking-[0.18em] text-signal">
                  {errors.helpOptions}
                </span>
              )}
            </Fieldset>

            <Field label="Availability" required error={errors.availability} htmlFor="v-av">
              <Select
                id="v-av"
                name="availability"
                value={data.availability}
                onChange={onChange('availability')}
                error={errors.availability}
              >
                <option value="">— Choose —</option>
                {AVAILABILITY.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="What issues matter most to you?" htmlFor="v-iss" hint="Optional">
              <textarea
                id="v-iss"
                name="issues"
                rows={3}
                value={data.issues}
                onChange={onChange('issues')}
                placeholder="Tell us — it shapes our outreach."
                className="w-full resize-none appearance-none rounded-2xl border border-ink-900/20 bg-cream-soft px-4 py-3.5 text-[15px] text-ink-900 placeholder:text-ink-300 focus:border-iris focus:bg-cream focus:outline-none focus:shadow-[0_0_0_4px_rgba(155,142,199,0.18)]"
              />
            </Field>

            <Field label="Anything else?" htmlFor="v-else" hint="Optional">
              <textarea
                id="v-else"
                name="anythingElse"
                rows={3}
                value={data.anythingElse}
                onChange={onChange('anythingElse')}
                placeholder="Skills we should know about, ideas, etc."
                className="w-full resize-none appearance-none rounded-2xl border border-ink-900/20 bg-cream-soft px-4 py-3.5 text-[15px] text-ink-900 placeholder:text-ink-300 focus:border-iris focus:bg-cream focus:outline-none focus:shadow-[0_0_0_4px_rgba(155,142,199,0.18)]"
              />
            </Field>

            <div className="flex flex-col gap-3 rounded-2xl border border-ink-900/10 bg-cream p-5">
              <Checkbox
                checked={data.smsConsent}
                onChange={onChange('smsConsent')}
                label="I'd like SMS campaign updates. Reply STOP to opt out, HELP for help. Message rates may apply."
              />
              <Checkbox
                checked={data.promoConsent}
                onChange={onChange('promoConsent')}
                label="I'm OK receiving event invitations and fundraising messages by SMS."
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <p className="max-w-sm font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
                By submitting, you agree to the privacy policy.
              </p>
              <KineticButton onClick={onSubmit} variant="primary" size="lg">
                {status === 'submitting' ? 'Sending…' : 'Sign me up'}
              </KineticButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default VolunteerForm
