import { useEffect, useRef, useState } from 'react'

const STEPS = [
  {
    kicker: '¡Saborea la diferencia!',
    title: 'Huevos',
    accent: 'Campesinos',
    sub: 'De alta calidad',
    foot: 'Del campo a tu mesa.',
    note: 'Puros, frescos y deliciosos',
  },
  {
    kicker: 'Recolección a mano',
    title: 'Uno a uno',
    accent: 'Recogidos',
    sub: 'Con cuidado',
    foot: 'El mismo día.',
    note: 'Directo del nido',
  },
  {
    kicker: 'Selección y calidad',
    title: 'Huevo',
    accent: 'Por huevo',
    sub: 'Revisado',
    foot: 'Tamaño, cáscara y frescura.',
    note: 'Antes de empacar',
  },
  {
    kicker: 'Alianza campesina',
    title: 'Crecemos',
    accent: 'Con el campo',
    sub: 'Colombiano',
    foot: 'Productores locales.',
    note: 'Que cuidan cada detalle',
  },
  {
    kicker: '¡Tu panal está listo!',
    title: 'Huevos',
    accent: 'Frescos',
    sub: 'De campo',
    foot: 'Pídelos hoy.',
    note: 'Puros, frescos y deliciosos',
  },
]

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))

export function VideoScrollStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  // El scroll solo decide qué texto se muestra; el video se reproduce solo
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = sectionRef.current
      if (!el) return
      const scrollable = el.offsetHeight - window.innerHeight
      setProgress(clamp(-el.getBoundingClientRect().top / scrollable))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const activeStep = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length))

  return (
    <section
      ref={sectionRef}
      id="proceso"
      // Sube como una tarjeta y se monta sobre el Hero, que queda fijo debajo
      className="relative z-10 h-[500lvh] rounded-t-[10px] bg-brand-ink md:rounded-t-xl"
    >
      {/* Borde superior difuminado: se funde con el Hero y se va con el scroll */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-40 bg-gradient-to-b from-black/45 via-black/15 to-transparent md:h-56" />
      <div className="sticky top-0 h-[100lvh] overflow-hidden rounded-t-[10px] bg-brand-ink md:rounded-t-xl">
        {/* Video a pantalla completa */}
        <div className="absolute inset-0">
          <video
            src="/video/panal-huevos.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Panal de huevos campesinos grabado de cerca"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(0_0_0/0.45)_100%)]" />
        </div>



        <div className="absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-brand-ink/85 via-brand-ink/40 to-transparent md:inset-y-0 md:left-0 md:h-auto md:w-3/5 md:bg-gradient-to-r md:from-brand-ink/80 md:via-brand-ink/35" />

        {/* Textos: cada paso entra línea por línea y se acomoda */}
        {/* svh: los textos quedan siempre en la zona visible, aunque la barra del navegador esté abierta */}
        <div className="relative z-10 mx-auto flex h-[100svh] w-full max-w-6xl items-end px-6 pb-14 md:items-center md:pb-0">
          <div className="grid font-display leading-[0.95] text-white uppercase [text-shadow:0_3px_18px_rgb(0_0_0/0.4)]">
            {STEPS.map((step, i) => {
              const state = i === activeStep ? 'in' : i < activeStep ? 'past' : 'next'
              const lines = [
                { text: step.kicker, className: 'mb-2 text-xl font-light tracking-wide md:text-4xl' },
                { text: step.title, className: 'text-6xl font-normal md:text-9xl' },
                { text: step.accent, className: 'text-4xl font-light text-[#f4e78a] md:text-7xl' },
                { text: step.sub, className: 'text-2xl font-light text-[#f4e78a] md:text-5xl' },
                { text: step.foot, className: 'mt-5 text-lg font-light md:mt-10 md:text-3xl' },
                { text: step.note, className: 'text-sm font-light md:text-xl' },
              ]
              return (
                <div key={i} aria-hidden={state !== 'in'} className="col-start-1 row-start-1">
                  {lines.map((line, j) => (
                    <div key={j} className={`overflow-hidden pb-1 ${line.className}`}>
                      <span
                        className="block transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        style={{
                          transform:
                            state === 'in' ? 'translateY(0)' : state === 'past' ? 'translateY(-105%)' : 'translateY(105%)',
                          opacity: state === 'in' ? 1 : 0,
                          transitionDelay: state === 'in' ? `${120 + j * 70}ms` : `${j * 30}ms`,
                        }}
                      >
                        {line.text}
                      </span>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
