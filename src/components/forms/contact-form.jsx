'use client'

import { useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'

import { Field, Input, Select, Checkbox } from '@/components/form/field'
import KineticButton from '@/components/ui/kinetic-button'

const SUBJECTS = [
  'General inquiry',
  'Press / Media',
  'Yard sign request',
  'Volunteer question',
  'Speaking engagement',
  'Donation question',
  'Other',
]

const initial = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  smsConsent: false,
}

const ContactForm = () => {
  const [data, setData] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

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
    if (!data.subject) next.subject = 'Pick a topic'
    if (!data.message.trim() || data.message.trim().length < 10)
      next.message = 'Tell us a bit more (10+ characters)'
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
              Message received.
            </h3>
            <p className="max-w-md text-[15px] leading-relaxed text-ink-700">
              Thanks, {data.firstName}. A real person on the team will reply within 48 hours.
            </p>
            <KineticButton href="/" variant="dark" size="md">
              Back to home
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
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="First name" required error={errors.firstName} htmlFor="c-fn">
                <Input
                  id="c-fn"
                  name="firstName"
                  autoComplete="given-name"
                  value={data.firstName}
                  onChange={onChange('firstName')}
                  error={errors.firstName}
                  placeholder="Jim"
                />
              </Field>
              <Field label="Last name" required error={errors.lastName} htmlFor="c-ln">
                <Input
                  id="c-ln"
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
              <Field label="Email" required error={errors.email} htmlFor="c-em">
                <Input
                  id="c-em"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={onChange('email')}
                  error={errors.email}
                  placeholder="you@email.com"
                />
              </Field>
              <Field label="Phone" hint="Optional" htmlFor="c-ph">
                <Input
                  id="c-ph"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={data.phone}
                  onChange={onChange('phone')}
                  placeholder="(208) 555-0144"
                />
              </Field>
            </div>

            <Field label="Topic" required error={errors.subject} htmlFor="c-sub">
              <Select
                id="c-sub"
                name="subject"
                value={data.subject}
                onChange={onChange('subject')}
                error={errors.subject}
              >
                <option value="">— Choose —</option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Your message" required error={errors.message} htmlFor="c-msg">
              <textarea
                id="c-msg"
                name="message"
                rows={6}
                value={data.message}
                onChange={onChange('message')}
                placeholder="What can we help with?"
                className="w-full resize-none appearance-none rounded-2xl border border-ink-900/20 bg-cream-soft px-4 py-3.5 text-[15px] text-ink-900 placeholder:text-ink-300 focus:border-iris focus:bg-cream focus:outline-none focus:shadow-[0_0_0_4px_rgba(155,142,199,0.18)]"
              />
            </Field>

            <Checkbox
              checked={data.smsConsent}
              onChange={onChange('smsConsent')}
              label="OK to follow up by SMS. Reply STOP anytime."
            />

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <p className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
                We reply within 48 hours.
              </p>
              <KineticButton onClick={onSubmit} variant="primary" size="lg">
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </KineticButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ContactForm
