import { useEffect, useState } from 'react'

function evaluate(breakpoint: number) {
  const isWideEnough = window.matchMedia(`(min-width: ${breakpoint}px)`).matches
  const isCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches
  return isWideEnough && !isCoarsePointer
}

export function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(() => evaluate(breakpoint))

  useEffect(() => {
    const widthQuery = window.matchMedia(`(min-width: ${breakpoint}px)`)
    const pointerQuery = window.matchMedia('(hover: none), (pointer: coarse)')
    const onChange = () => setIsDesktop(evaluate(breakpoint))
    onChange()
    widthQuery.addEventListener('change', onChange)
    pointerQuery.addEventListener('change', onChange)
    return () => {
      widthQuery.removeEventListener('change', onChange)
      pointerQuery.removeEventListener('change', onChange)
    }
  }, [breakpoint])

  return isDesktop
}
