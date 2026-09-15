import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { WhatsAppEggButton } from './components/WhatsAppEggButton'

function App() {
  return (
    <div id="top">
      <Navbar />
      <Hero />
      <Gallery />
      <Footer />
      <WhatsAppEggButton />
    </div>
  )
}

export default App
