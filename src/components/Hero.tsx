import { useIsDesktop } from '../hooks/useIsDesktop'

export function Hero() {
  const isDesktop = useIsDesktop()

  return (
    <section
      id="historia"
      className="relative flex min-h-[100dvh] items-end overflow-hidden bg-brand-ink text-white"
    >
      <img
        src={isDesktop ? '/image.png_20260915165725.jpeg' : '/Movil/01.jpeg'}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/40 to-transparent" />
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
    </section>
  )
}
