const WHATSAPP_NUMBER = '573000000000' // TODO: reemplazar por el número real (solo dígitos, con código de país)
const WHATSAPP_MESSAGE = 'Hola, quisiera más información'
const EGG_RADIUS = '50% 50% 50% 50% / 58% 58% 42% 42%'

export function WhatsAppEggButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-6 right-6 z-[60] flex flex-col items-center md:bottom-10 md:right-10"
    >
      {/* <span className="mb-2 hidden rounded-full bg-brand-ink px-3 py-1 text-xs font-medium text-white opacity-0 shadow transition group-hover:opacity-100 md:block">
        Escríbenos
      </span> */}

      <span className="relative flex h-16 w-14 items-center justify-center md:h-20 md:w-16">
        <span className="animate-bubble-pop absolute -top-6 -left-4 z-0">
          <span
            className="inline-block whitespace-nowrap text-base font-black italic tracking-wide text-white"
            style={{
              transform: 'rotate(-8deg)',
              textShadow:
                '0 0 3px rgba(36,26,18,0.9), 1px 1px 0 rgba(36,26,18,0.9), -1px -1px 0 rgba(36,26,18,0.9), 1px -1px 0 rgba(36,26,18,0.9), -1px 1px 0 rgba(36,26,18,0.9)',
            }}
          >
            ¡Escribe!
          </span>
        </span>

        <span
          className="animate-egg-echo absolute inset-0 z-0 bg-brand-green/50"
          style={{ borderRadius: EGG_RADIUS, animationDelay: '0s' }}
        />
        <span
          className="animate-egg-echo absolute inset-0 z-0 bg-brand-green/50"
          style={{ borderRadius: EGG_RADIUS, animationDelay: '0.7s' }}
        />
        <span
          className="animate-egg-echo absolute inset-0 z-0 bg-brand-green/50"
          style={{ borderRadius: EGG_RADIUS, animationDelay: '1.4s' }}
        />

        <span
          className="animate-egg-wobble relative z-10 h-full w-full bg-gradient-to-b from-[#f2d9b4] to-[#d9a25c] shadow-lg ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105"
          style={{ borderRadius: EGG_RADIUS }}
        />
      </span>
    </a>
  )
}
