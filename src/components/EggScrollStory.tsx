import { useEffect, useRef, useState } from 'react'

// Medidas en píxeles de la escena original (escena-fondo.jpg)
const SCENE_W = 1058
const SCENE_H = 642
// Recorte de la capa frontal del nido (escena-nido-frente.png)
const RIM = { x: 215, y: 360, w: 585, h: 240 }
// Tamaño base del huevo vertical (antes de rotarlo)
const EGG_W = 74
const EGG_H = 74
// Altura desde la que caen (fuera de cuadro, por encima de la escena)
const DROP_FROM_Y = -120

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
    kicker: 'Frescura de origen',
    title: 'Del nido',
    accent: 'A tu mesa',
    sub: 'Sin escalas',
    foot: 'Frescos de verdad.',
    note: 'Como recién recogidos',
  },
  {
    kicker: '¡Tu canasta está lista!',
    title: 'Huevos',
    accent: 'Frescos',
    sub: 'De campo',
    foot: 'Pídelos hoy.',
    note: 'Puros, frescos y deliciosos',
  },
]

// Pseudoaleatorio determinista para que cada huevo siempre se vea igual
function seeded(seed: number) {
  let s = seed * 9301 + 49297
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

type Egg = {
  x: number
  y: number
  rot: number
  scale: number
  shade: number
  spin: number
  tiltX: number
  tiltY: number
  start: number
  speckles: { cx: number; cy: number; r: number }[]
}

// Capas del montón dentro del nido: de abajo (casi oculta por el borde) hacia arriba
const LAYERS = [
  { y: 446, xs: [372, 432, 492, 552, 612], shade: 0.78 },
  { y: 428, xs: [344, 400, 458, 516, 574, 632], shade: 0.86 },
  { y: 410, xs: [380, 440, 500, 560, 616], shade: 0.94 },
  { y: 394, xs: [428, 488, 548], shade: 1 },
]

const EGGS: Egg[] = (() => {
  const list: Omit<Egg, 'start'>[] = []
  let n = 0
  for (const layer of LAYERS) {
    for (const x of layer.xs) {
      const rnd = seeded(++n)
      list.push({
        x: x + (rnd() - 0.5) * 14,
        y: layer.y + (rnd() - 0.5) * 6,
        rot: 70 + rnd() * 40 * (rnd() > 0.5 ? 1 : -1),
        scale: 0.9 + rnd() * 0.22,
        shade: layer.shade - rnd() * 0.05,
        spin: (rnd() > 0.5 ? 1 : -1) * (240 + rnd() * 300),
        tiltX: 35 + rnd() * 30,
        tiltY: (rnd() - 0.5) * 70,
        speckles: Array.from({ length: 16 }, () => {
          const a = rnd() * Math.PI * 2
          const d = Math.sqrt(rnd())
          return { cx: Math.cos(a) * d * 36, cy: Math.sin(a) * d * 48 + 6, r: 0.7 + rnd() * 1.4 }
        }),
      })
    }
  }
  const span = 0.76
  return list.map((egg, i) => ({ ...egg, start: 0.03 + (i / (list.length - 1)) * span }))
})()

const FALL = 0.1

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
const pct = (v: number, total: number) => `${(v / total) * 100}%`

function eggPose(egg: Egg, progress: number) {
  const t = clamp((progress - egg.start) / FALL)
  if (t <= 0) return null
  // Caída con gravedad hasta el 80 %, luego un pequeño rebote al tocar el nido
  const fallT = clamp(t / 0.8)
  const bounceT = clamp((t - 0.8) / 0.2)
  const fall = fallT * fallT
  const bounce = Math.sin(bounceT * Math.PI) * 0.18
  const offsetY = (1 - fall) * (DROP_FROM_Y - egg.y) - bounce * EGG_H
  const ease = 1 - (1 - fallT) ** 3
  const squash = fallT === 1 && bounceT < 0.35 ? 1 - Math.sin((bounceT / 0.35) * Math.PI) * 0.08 : 1
  return {
    offsetY,
    rot: egg.rot + (1 - ease) * egg.spin,
    tiltX: (1 - ease) * egg.tiltX,
    tiltY: (1 - ease) * egg.tiltY,
    squash,
    landed: t >= 0.8,
    opacity: clamp(fallT / 0.15),
    // Más lejos del nido se ve un poco más grande (más cerca de la cámara)
    depth: 1 + (1 - fall) * 0.25,
  }
}

function EggSvg({ egg, rot }: { egg: Egg; rot: number }) {
  return (
    <svg viewBox="-64 -64 128 128" className="h-full w-full overflow-visible">
      {/* La forma y las pecas giran; la luz se queda fija arriba a la izquierda */}
      <g transform={`rotate(${rot}) scale(${egg.scale})`}>
        <path
          d="M0 -58C28 -58 44 -12 44 14C44 41 24 58 0 58C-24 58 -44 41 -44 14C-44 -12 -28 -58 0 -58Z"
          fill="#d6705a"
        />
        {egg.speckles.map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#7d2f20" opacity={0.45} />
        ))}
      </g>
      <g transform={`rotate(${rot}) scale(${egg.scale})`}>
        <path
          d="M0 -58C28 -58 44 -12 44 14C44 41 24 58 0 58C-24 58 -44 41 -44 14C-44 -12 -28 -58 0 -58Z"
          fill="url(#egg-light)"
        />
      </g>
    </svg>
  )
}

export function EggScrollStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let target = 0
    let current = 0
    let frame = 0

    const readTarget = () => {
      const el = sectionRef.current
      if (!el) return
      const scrollable = el.offsetHeight - window.innerHeight
      target = clamp(-el.getBoundingClientRect().top / scrollable)
    }
    // Interpolación suave hacia el scroll real: elimina los saltos de la rueda del mouse
    const tick = () => {
      current += (target - current) * (reduceMotion ? 1 : 0.12)
      if (Math.abs(target - current) < 0.0005) current = target
      setProgress(current)
      frame = current === target ? 0 : requestAnimationFrame(tick)
    }
    const onScroll = () => {
      readTarget()
      if (!frame) frame = requestAnimationFrame(tick)
    }

    readTarget()
    current = target
    frame = requestAnimationFrame(tick)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const position = progress * STEPS.length
  const activeStep = Math.min(STEPS.length - 1, Math.floor(position))
  const eggsIn = EGGS.filter((egg) => progress >= egg.start + FALL * 0.8).length

  return (
    <section ref={sectionRef} id="proceso" className="relative h-[500dvh] bg-brand-ink">
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <radialGradient id="egg-light" gradientUnits="userSpaceOnUse" cx="-16" cy="-24" r="78">
            <stop offset="0" stopColor="#fff0e8" stopOpacity="0.85" />
            <stop offset="0.2" stopColor="#ffb39b" stopOpacity="0.45" />
            <stop offset="0.55" stopColor="#d6705a" stopOpacity="0" />
            <stop offset="0.82" stopColor="#4a170e" stopOpacity="0.4" />
            <stop offset="1" stopColor="#2e0d07" stopOpacity="0.65" />
          </radialGradient>
        </defs>
      </svg>

      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* Relleno desenfocado para pantallas verticales */}
        <img
          src="/secuencia/escena-fondo.jpg"
          alt=""
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-md"
        />

        {/* Escena fija: el nido nunca se mueve, solo caen los huevos */}
        <div
          className="absolute bottom-0 left-1/2 aspect-[1058/642] w-[175vw] -translate-x-[46.8%] md:top-1/2 md:bottom-auto md:w-[max(100vw,164.8dvh)] md:-translate-x-1/2 md:-translate-y-1/2"
          style={{ perspective: '900px' }}
        >
          <img
            src="/secuencia/escena-fondo.jpg"
            alt="Nido sobre una pradera de trébol"
            className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,transparent,black_18%)] md:[mask-image:none]"
          />

          {EGGS.map((egg, i) => {
            const pose = eggPose(egg, progress)
            if (!pose) return null
            return (
              <div
                key={i}
                className="absolute will-change-transform"
                style={{
                  left: pct(egg.x - EGG_W / 2, SCENE_W),
                  top: pct(egg.y - EGG_H / 2, SCENE_H),
                  width: pct(EGG_W, SCENE_W),
                  height: pct(EGG_H, SCENE_H),
                  zIndex: Math.round(egg.y),
                  opacity: pose.opacity,
                  transform: `translateY(${(pose.offsetY / EGG_H) * 100}%) scale(${pose.depth}) rotateX(${pose.tiltX}deg) rotateY(${pose.tiltY}deg) scaleY(${pose.squash})`,
                  filter: `brightness(${pose.landed ? egg.shade : 1}) drop-shadow(0 ${pose.landed ? 3 : 10}px ${pose.landed ? 3 : 8}px rgb(0 0 0 / ${pose.landed ? 0.45 : 0.25}))`,
                  transition: 'filter 0.4s ease-out',
                }}
              >
                <EggSvg egg={egg} rot={pose.rot} />
              </div>
            )
          })}

          <img
            src="/secuencia/escena-nido-frente.png"
            alt=""
            className="pointer-events-none absolute"
            style={{
              left: pct(RIM.x, SCENE_W),
              top: pct(RIM.y, SCENE_H),
              width: pct(RIM.w, SCENE_W),
              height: pct(RIM.h, SCENE_H),
              zIndex: 1000,
            }}
          />
        </div>

        <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-[#1f3a12]/80 via-[#2f5a1e]/40 to-transparent md:inset-y-0 md:right-0 md:left-auto md:h-auto md:w-3/5 md:bg-gradient-to-l md:from-[#2a5418]/80 md:via-[#2f5a1e]/45" />

        <div className="relative mx-auto flex h-full w-full max-w-6xl px-6 pt-24 md:items-start md:justify-end md:pt-[14dvh]">
          {/* Cada paso entra línea por línea y se acomoda, como los huevos en la canasta */}
          <div className="grid w-full font-display uppercase leading-[0.95] text-white [text-shadow:0_3px_18px_rgb(0_0_0/0.35)] md:w-auto md:min-w-[30rem]">
            {STEPS.map((step, i) => {
              const state = i === activeStep ? 'in' : i < activeStep ? 'past' : 'next'
              const lines = [
                { text: step.kicker, className: 'mb-2 text-2xl font-light tracking-wide md:text-4xl' },
                { text: step.title, className: 'text-7xl font-normal md:text-9xl' },
                { text: step.accent, className: 'text-5xl font-light text-[#f4e78a] md:text-7xl' },
                { text: step.sub, className: 'text-3xl font-light text-[#f4e78a] md:text-5xl' },
                { text: step.foot, className: 'mt-6 text-xl font-light md:mt-10 md:text-3xl' },
                { text: step.note, className: 'text-base font-light md:text-xl' },
              ]
              return (
                <div
                  key={step.title + i}
                  aria-hidden={state !== 'in'}
                  className="col-start-1 row-start-1"
                >
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

            <p className="mt-6 font-sans text-sm font-semibold normal-case tracking-normal text-white/90 md:absolute md:bottom-10 md:left-6 md:mt-0">
              <span className="font-display text-3xl font-normal text-[#f4e78a] tabular-nums">{eggsIn}</span>
              <span className="text-white/70"> / {EGGS.length}</span> huevos en la canasta
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
