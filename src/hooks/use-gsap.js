'use client'

import { useRef } from 'react'

import gsap from 'gsap'

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'

export function useGsap(setup, deps = []) {
  const scope = useRef(null)
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(setup, scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return scope
}
