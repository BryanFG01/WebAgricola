import { galleryItems } from '../data/gallery'

export function Gallery() {
  return (
    <section id="galeria" className="relative scroll-mt-24 bg-brand-ink">
      {galleryItems.map((item, index) => (
        <div key={item.id} className="relative h-[150dvh]" style={{ zIndex: index + 1 }}>
          <div className="sticky top-0 flex h-dvh items-end overflow-hidden">
            <img src={item.src} alt={item.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="relative mx-auto w-full max-w-6xl px-6 pb-16">
              <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
                {String(index + 1).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')}
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
      ))}
    </section>
  )
}
