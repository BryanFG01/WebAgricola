import { galleryItems, mobileGalleryItems } from '../data/gallery'
import { useIsDesktop } from '../hooks/useIsDesktop'

export function Gallery() {
  const isDesktop = useIsDesktop()
  const items = isDesktop ? galleryItems : mobileGalleryItems

  return (
    <section id="galeria" className="relative scroll-mt-24 bg-brand-ink">
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="footer-wave" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L1,0 L1,0.97 C0.75,1 0.25,1 0,0.97 Z" />
          </clipPath>
        </defs>
      </svg>

      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <div key={item.id} className="relative h-[150dvh]" style={{ zIndex: index + 1 }}>
            <div className="sticky top-0 flex h-dvh items-end overflow-hidden">
              <div className="absolute inset-0" style={isLast ? { clipPath: 'url(#footer-wave)' } : undefined}>
                <img src={item.src} alt={item.alt} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="relative mx-auto w-full max-w-6xl px-6 pb-16">
                <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
                  {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
                <a
                  href="#contacto"
                  className="mt-3 inline-block rounded-full border border-white px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white hover:text-brand-ink"
                >
                  Ver más
                </a>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
