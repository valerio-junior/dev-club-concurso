import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Hero from './components/Hero'
import Navbar from './components/NavBar'
import { GlobalStyles } from './styles/GlobalStyles'
import Partners from './components/Partners'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyles />
    <Navbar />
    <Hero />
    <Partners />
  </StrictMode>,
)
