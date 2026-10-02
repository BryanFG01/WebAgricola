import { useEffect, useState } from 'react'
import { useIsDesktop } from '../hooks/useIsDesktop'

export function Hero() {
  const isDesktop = useIsDesktop()
  // Cuánto ha subido el video por encima del Hero (0 → 1)
  const [covered, setCovered] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      setCovered(Math.min(1, window.scrollY / window.innerHeight))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      id="historia"
      className="sticky top-0 flex h-[100lvh] items-end overflow-hidden pb-[calc(100lvh-100svh)] bg-brand-ink text-white md:will-change-transform"
      // Parallax solo en escritorio: en móvil un elemento fijo que se mueve con el scroll tiembla
      style={isDesktop ? { transform: `translate3d(0, ${-covered * 18}vh, 0)` } : undefined}
    >
      <img
        src={isDesktop ? '/image.png_20260915165725.jpeg' : '/Movil/01.jpeg'}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink from-5% via-brand-ink/40 to-transparent" />
      <div className="relative mx-auto w-full max-w-6xl pb-16 pl-6 pr-20 sm:pr-6">
        <span className="mb-4 inline-block rounded-full bg-brand-orange px-4 py-1 text-xs font-semibold uppercase tracking-wide">
          Líderes en agroindustria sostenible
        </span>
        <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-6xl">
          Haciendo Historia
        </h1>
        <p className="mt-4 max-w-xl text-white/80">
          Transformando el potencial del agro colombiano con tecnología, bienestar
          animal y alianzas sólidas con el productor campesino.
        </p>
      </div>
      {/* Se oscurece suavemente mientras el video lo cubre */}
      <div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: covered * 0.45 }} />
    </section>
  )
}
