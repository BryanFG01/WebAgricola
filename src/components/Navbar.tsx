import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '#galeria', label: 'Galería' },
  { href: '#historia', label: 'Nuestra Historia' },
  { href: '#contacto', label: 'Contacto' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY >= 100)
      setMenuOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="animate-navbar-in fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={`relative flex items-center overflow-hidden rounded-full bg-[#a89b8a]/45 text-white shadow-lg backdrop-blur-md backdrop-saturate-150 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled ? 'h-14 w-14 justify-center px-0 py-0' : 'w-full max-w-6xl justify-between px-6 py-3'
        }`}
      >
        <a
          href="#top"
          className={`flex shrink-0 items-center gap-2 text-lg font-bold tracking-wide transition-all duration-300 ${
            isScrolled ? 'scale-0 opacity-0' : 'scale-100 opacity-100 delay-300'
          }`}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-xl">🌾</span>
          <span className="whitespace-nowrap">Agrícola</span>
        </a>

        <nav
          className={`hidden items-center gap-8 whitespace-nowrap text-sm font-medium transition-all duration-300 md:flex ${
            isScrolled ? 'scale-0 opacity-0' : 'scale-100 opacity-100 delay-300'
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-white/80">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className={`shrink-0 whitespace-nowrap rounded-full bg-brand-orange px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-orange-dark ${
            isScrolled ? 'scale-0 opacity-0' : 'scale-100 opacity-100 delay-300'
          }`}
        >
          Contáctanos
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          className={`absolute inset-0 m-auto flex h-9 w-9 flex-col items-center justify-center gap-1.5 transition-transform duration-300 ${
            isScrolled ? 'scale-100 delay-500' : 'scale-0'
          }`}
        >
          <span
            className={`h-0.5 w-5 rounded-full bg-white transition-transform duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`h-0.5 w-5 rounded-full bg-white transition-transform duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {isScrolled && (
        <div
          className={`absolute right-4 top-20 flex flex-col gap-1 rounded-2xl bg-[#a89b8a] p-3 text-sm font-medium text-white shadow-xl transition-all duration-300 ${
            menuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="whitespace-nowrap rounded-lg px-3 py-2 transition hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="mt-1 whitespace-nowrap rounded-full bg-brand-orange px-3 py-2 text-center font-semibold transition hover:bg-brand-orange-dark"
          >
            Contáctanos
          </a>
        </div>
      )}
    </header>
  )
}
