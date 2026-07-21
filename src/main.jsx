import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Hero from './components/Hero'
import Navbar from './components/NavBar'
import { GlobalStyles } from './styles/GlobalStyles'
import Partners from './components/Partners'
import Courses from './components/Courses'
import AISection from './components/IaTraining'
import IaAgents from './components/IaSpecialist'
import MentoringSection from './components/mentoring'
import StudyPlatform from './components/PlatformSection'
import ProjectsSection from './components/ProjectSection'
import TestimonialsStudents from './components/TestimonialsSection'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyles />
    <Navbar />
    <Hero />
    <Partners />
    <Courses />
    <AISection />
    <IaAgents />
    <MentoringSection />
    <StudyPlatform />
    <ProjectsSection />
    <TestimonialsStudents />
  </StrictMode>,
)
