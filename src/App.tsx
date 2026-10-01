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
      <Hero />
      <VideoScrollStory />
      <Gallery />
      <Footer />
      <WhatsAppEggButton />
    </div>
  )
}

export default App
