'use client'

import { forwardRef, useId } from 'react'

import { cn } from '@/utils/cn'

/* Field wrapper providing label + hint + error. Used by Input/Textarea/Select. */
export const Field = ({ label, hint, error, required, htmlFor, children, className }) => {
  return (
    <div className={cn('group flex flex-col gap-2', className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="flex items-center justify-between font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500"
        >
          <span>
            {label}
            {required && <span className="ml-1 text-iris">*</span>}
          </span>
          {hint && (
            <span className="font-sans normal-case tracking-normal text-ink-300">{hint}</span>
          )}
        </label>
      )}
      {children}
      {error && (
        <span className="font-mono-display text-[10.5px] uppercase tracking-[0.18em] text-signal">
          {error}
        </span>
      )}
    </div>
  )
}

const baseInput =
  'w-full appearance-none rounded-2xl border border-ink-900/20 bg-cream-soft px-4 py-3.5 text-[15px] text-ink-900 placeholder:text-ink-300 transition-[border-color,background-color,box-shadow] duration-300 focus:border-iris focus:bg-cream focus:outline-none focus:shadow-[0_0_0_4px_rgba(155,142,199,0.18)]'

export const Input = forwardRef(({ className, error, ...rest }, ref) => {
  return (
    <input ref={ref} className={cn(baseInput, error && 'border-signal', className)} {...rest} />
  )
})
Input.displayName = 'Input'

export const Textarea = forwardRef(({ className, error, rows = 5, ...rest }, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(baseInput, 'resize-none', error && 'border-signal', className)}
      {...rest}
    />
  )
})
Textarea.displayName = 'Textarea'

export const Select = forwardRef(({ className, error, children, ...rest }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(baseInput, 'pr-10', error && 'border-signal', className)}
        {...rest}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-500">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M3 5l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  )
})
Select.displayName = 'Select'

export const Checkbox = ({ label, ...rest }) => {
  const id = useId()
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 text-[13.5px] leading-relaxed text-ink-700 hover:text-ink-900"
    >
      <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border border-ink-900/30 bg-cream-soft transition-colors duration-200 group-has-[:checked]:bg-iris">
        <input
          id={id}
          type="checkbox"
          className="peer absolute inset-0 cursor-pointer opacity-0"
          {...rest}
        />
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="scale-0 opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100"
        >
          <path
            d="M2.5 6.5L5 9l4.5-5.5"
            stroke="#f2eae0"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute inset-0 rounded-md border-iris opacity-0 transition-opacity duration-200 peer-checked:opacity-100 peer-checked:bg-iris peer-checked:border" />
      </span>
      <span>{label}</span>
    </label>
  )
}

export const RadioChip = ({ label, name, value, defaultChecked }) => {
  const id = useId()
  return (
    <label htmlFor={id} className="group relative cursor-pointer">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="peer absolute inset-0 cursor-pointer opacity-0"
      />
      <span className="flex items-center justify-center rounded-full border border-ink-900/20 bg-cream-soft px-4 py-2 text-[12.5px] font-medium uppercase tracking-[0.16em] text-ink-700 transition-colors duration-200 peer-checked:border-iris peer-checked:bg-iris peer-checked:text-cream hover:border-ink-900/50">
        {label}
      </span>
    </label>
  )
}

export const Fieldset = ({ legend, children, className }) => (
  <fieldset className={cn('flex flex-col gap-3', className)}>
    {legend && (
      <legend className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
        {legend}
      </legend>
    )}
    {children}
  </fieldset>
)
