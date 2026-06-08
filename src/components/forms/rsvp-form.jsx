'use client'

import { useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'
import PropTypes from 'prop-types'

import { Field, Input, Select, Checkbox } from '@/components/form/field'
import KineticButton from '@/components/ui/kinetic-button'

const initial = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  guests: '1',
  notes: '',
  smsConsent: false,
}

const RsvpForm = ({ event }) => {
  const [data, setData] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') /* idle | submitting | success */

  const onChange = (k) => (e) =>
    setData((p) => ({
      ...p,
      [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }))

  const validate = () => {
    const next = {}
    if (!data.firstName.trim()) next.firstName = 'Required'
    if (!data.lastName.trim()) next.lastName = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = 'Valid email required'
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
    <div className="relative overflow-hidden rounded-[28px] border border-ink-900/15 bg-cream-soft p-7 lg:p-9">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
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
              You&apos;re in.
            </h3>
            <p className="max-w-md text-[15px] leading-relaxed text-ink-700">
              We&apos;ll see you at <span className="text-ink-900">{event.venue}</span> on{' '}
              <span className="text-ink-900">
                {event.month} {event.day}, {event.year}
              </span>
              . A confirmation just landed in your inbox.
            </p>
            <KineticButton href="/events" variant="dark" size="md">
              Browse more events
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
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="First name" htmlFor="rsvp-fn" required error={errors.firstName}>
                <Input
                  id="rsvp-fn"
                  name="firstName"
                  autoComplete="given-name"
                  value={data.firstName}
                  onChange={onChange('firstName')}
                  error={errors.firstName}
                  placeholder="Barbara"
                />
              </Field>
              <Field label="Last name" htmlFor="rsvp-ln" required error={errors.lastName}>
                <Input
                  id="rsvp-ln"
                  name="lastName"
                  autoComplete="family-name"
                  value={data.lastName}
                  onChange={onChange('lastName')}
                  error={errors.lastName}
                  placeholder="Kahl"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Email" htmlFor="rsvp-em" required error={errors.email}>
                <Input
                  id="rsvp-em"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={onChange('email')}
                  error={errors.email}
                  placeholder="you@email.com"
                />
              </Field>
              <Field label="Phone" htmlFor="rsvp-ph" hint="Optional">
                <Input
                  id="rsvp-ph"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={data.phone}
                  onChange={onChange('phone')}
                  placeholder="(208) 555-0144"
                />
              </Field>
            </div>

            <Field label="How many in your party?" htmlFor="rsvp-guests">
              <Select
                id="rsvp-guests"
                name="guests"
                value={data.guests}
                onChange={onChange('guests')}
              >
                <option value="1">Just me</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
                <option value="5+">5+ people</option>
              </Select>
            </Field>

            <Field label="Anything we should know?" htmlFor="rsvp-notes" hint="Optional">
              <textarea
                id="rsvp-notes"
                name="notes"
                rows={3}
                value={data.notes}
                onChange={onChange('notes')}
                placeholder="Wheelchair access, ASL, dietary needs…"
                className="w-full resize-none appearance-none rounded-2xl border border-ink-900/20 bg-cream-soft px-4 py-3.5 text-[15px] text-ink-900 placeholder:text-ink-300 focus:border-iris focus:bg-cream focus:outline-none focus:shadow-[0_0_0_4px_rgba(155,142,199,0.18)]"
              />
            </Field>

            <Checkbox
              checked={data.smsConsent}
              onChange={onChange('smsConsent')}
              label={
                <>
                  I&apos;d like a quick text reminder the day before the event. Message rates may
                  apply.
                </>
              }
            />

            <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
                Free · Open to public
              </p>
              <KineticButton onClick={onSubmit} variant="primary" size="lg">
                {status === 'submitting' ? 'Sending…' : 'Confirm RSVP'}
              </KineticButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

RsvpForm.propTypes = {
  event: PropTypes.shape({
    month: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    venue: PropTypes.string.isRequired,
  }).isRequired,
}

export default RsvpForm
