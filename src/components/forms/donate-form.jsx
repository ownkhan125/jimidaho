'use client'

import { useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'

import { Field, Input, Select, Checkbox } from '@/components/form/field'
import KineticButton from '@/components/ui/kinetic-button'

import { cn } from '@/utils/cn'

const AMOUNTS = [25, 50, 100, 250, 500, 1000]

const initial = {
  amount: 100,
  custom: '',
  frequency: 'one-time',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  zip: '',
  employer: '',
  occupation: '',
  attest: false,
}

const DonateForm = () => {
  const [data, setData] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const onChange = (k) => (e) =>
    setData((p) => ({
      ...p,
      [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }))

  const setAmount = (n) => setData((p) => ({ ...p, amount: n, custom: '' }))
  const onCustomChange = (e) => setData((p) => ({ ...p, custom: e.target.value, amount: null }))

  const amountValue = data.amount ?? parseFloat(data.custom || 0)
  const requiresEmp = amountValue >= 200

  const validate = () => {
    const next = {}
    if (!amountValue || amountValue <= 0) next.amount = 'Pick an amount'
    if (!data.firstName.trim()) next.firstName = 'Required'
    if (!data.lastName.trim()) next.lastName = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = 'Valid email required'
    if (!data.zip.trim()) next.zip = 'Required'
    if (requiresEmp) {
      if (!data.employer.trim()) next.employer = 'Required over $200'
      if (!data.occupation.trim()) next.occupation = 'Required over $200'
    }
    if (!data.attest) next.attest = 'Required attestation'
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
    <div className="relative overflow-hidden rounded-[28px] border border-ink-900/15 bg-cream p-7 lg:p-10">
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
              Thank you, {data.firstName}.
            </h3>
            <p className="max-w-md text-[15px] leading-relaxed text-ink-700">
              A receipt is on its way. Jim will personally sign and mail a handwritten thank-you
              note this week — that&apos;s a promise we make on every donation, full stop.
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
            className="flex flex-col gap-8"
          >
            {/* Amount */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-display text-[10.5px] uppercase tracking-[0.24em] text-ink-500">
                  Contribution amount
                </span>
                <span className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
                  Max $3,300 / cycle
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAmount(a)}
                    className={cn(
                      'relative rounded-2xl border px-4 py-3 font-display text-base font-semibold transition-all duration-300',
                      data.amount === a
                        ? 'border-iris bg-iris text-cream shadow-[0_0_0_4px_rgba(155,142,199,0.2)]'
                        : 'border-ink-900/20 bg-cream-soft text-ink-900 hover:border-ink-900/45',
                    )}
                  >
                    ${a}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-display text-lg font-semibold text-ink-700">
                  $
                </span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="1"
                  max="3300"
                  placeholder="Or enter custom amount"
                  value={data.custom}
                  onChange={onCustomChange}
                  className={cn(
                    'w-full appearance-none rounded-2xl border bg-cream-soft pl-10 pr-4 py-3.5 text-[15px] text-ink-900 placeholder:text-ink-300 focus:border-iris focus:bg-cream focus:outline-none focus:shadow-[0_0_0_4px_rgba(155,142,199,0.18)]',
                    errors.amount ? 'border-signal' : 'border-ink-900/20',
                  )}
                />
              </div>
              {errors.amount && (
                <span className="font-mono-display text-[10.5px] uppercase tracking-[0.18em] text-signal">
                  {errors.amount}
                </span>
              )}
            </div>

            {/* Frequency */}
            <div className="flex flex-col gap-3">
              <span className="font-mono-display text-[10.5px] uppercase tracking-[0.24em] text-ink-500">
                Frequency
              </span>
              <div className="flex gap-3">
                {['one-time', 'monthly'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setData((p) => ({ ...p, frequency: f }))}
                    className={cn(
                      'flex-1 rounded-2xl border px-5 py-3 font-display text-[15px] font-semibold capitalize transition-colors duration-300',
                      data.frequency === f
                        ? 'border-iris bg-iris text-cream'
                        : 'border-ink-900/20 bg-cream-soft text-ink-900 hover:border-ink-900/45',
                    )}
                  >
                    {f === 'one-time' ? 'One-time' : 'Monthly · Sustain'}
                  </button>
                ))}
              </div>
            </div>

            {/* Donor info */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="First name" required error={errors.firstName} htmlFor="d-fn">
                <Input
                  id="d-fn"
                  name="firstName"
                  autoComplete="given-name"
                  value={data.firstName}
                  onChange={onChange('firstName')}
                  error={errors.firstName}
                  placeholder="Jim"
                />
              </Field>
              <Field label="Last name" required error={errors.lastName} htmlFor="d-ln">
                <Input
                  id="d-ln"
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
              <Field label="Email" required error={errors.email} htmlFor="d-em">
                <Input
                  id="d-em"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={onChange('email')}
                  error={errors.email}
                  placeholder="you@email.com"
                />
              </Field>
              <Field label="Phone" hint="Optional" htmlFor="d-ph">
                <Input
                  id="d-ph"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={data.phone}
                  onChange={onChange('phone')}
                  placeholder="(208) 555-0144"
                />
              </Field>
            </div>
            <Field label="ZIP code" required error={errors.zip} htmlFor="d-zip">
              <Input
                id="d-zip"
                name="zip"
                autoComplete="postal-code"
                value={data.zip}
                onChange={onChange('zip')}
                error={errors.zip}
                placeholder="83814"
              />
            </Field>

            {requiresEmp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 gap-5 overflow-hidden border-t border-ink-900/15 pt-6 sm:grid-cols-2"
              >
                <Field
                  label="Employer"
                  required
                  error={errors.employer}
                  htmlFor="d-emp"
                  hint="Required over $200"
                >
                  <Input
                    id="d-emp"
                    name="employer"
                    value={data.employer}
                    onChange={onChange('employer')}
                    error={errors.employer}
                    placeholder="Self-employed if applicable"
                  />
                </Field>
                <Field
                  label="Occupation"
                  required
                  error={errors.occupation}
                  htmlFor="d-occ"
                  hint="Required over $200"
                >
                  <Input
                    id="d-occ"
                    name="occupation"
                    value={data.occupation}
                    onChange={onChange('occupation')}
                    error={errors.occupation}
                    placeholder="e.g. Carpenter"
                  />
                </Field>
              </motion.div>
            )}

            <div className="rounded-2xl border border-ink-900/10 bg-cream-soft p-5">
              <Checkbox
                checked={data.attest}
                onChange={onChange('attest')}
                label={
                  <span>
                    I confirm I am a US citizen or lawful permanent resident, using my own personal
                    funds, and not contributing on behalf of any corporation or foreign entity.
                    (Required.)
                  </span>
                }
              />
              {errors.attest && (
                <p className="mt-2 font-mono-display text-[10.5px] uppercase tracking-[0.18em] text-signal">
                  {errors.attest}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div>
                <div className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
                  Total {data.frequency === 'monthly' ? '/ month' : ''}
                </div>
                <div className="mt-1 font-display text-2xl font-semibold tracking-[-0.03em] text-ink-900">
                  ${amountValue || 0}
                </div>
              </div>
              <KineticButton onClick={onSubmit} variant="primary" size="lg">
                {status === 'submitting' ? 'Processing…' : 'Contribute'}
              </KineticButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DonateForm
