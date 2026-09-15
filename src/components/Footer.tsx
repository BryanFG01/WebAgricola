export function Footer() {
  return (
    <footer id="contacto" className="scroll-mt-24 bg-brand-ink py-12 text-white/70">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-lg font-semibold text-white">¿Listo para hablar con nosotros?</p>
        <p className="mt-2 text-sm">
          Toca el huevo flotante y te respondemos directo por WhatsApp — sin
          carritos, sin formularios.
        </p>
        <p className="mt-8 text-xs">© {new Date().getFullYear()} Agrícola. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
