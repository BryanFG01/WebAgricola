import { useEffect, useState } from 'react'

export function useIsDesktop(breakpoint = 768) {
  const query = `(min-width: ${breakpoint}px)`
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setIsDesktop(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return isDesktop
}
