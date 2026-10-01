import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { VideoScrollStory } from './components/VideoScrollStory'
import { WhatsAppEggButton } from './components/WhatsAppEggButton'

function App() {
  return (
    <div id="top">
      <Navbar />
      {/* El Hero queda fijo solo dentro de este bloque, mientras el video sube encima */}
      <div className="relative bg-brand-ink">
        <Hero />
        <VideoScrollStory />
      </div>
      <Gallery />
      <Footer />
      <WhatsAppEggButton />
    </div>
  )
}

export default App
