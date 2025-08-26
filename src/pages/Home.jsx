"use client"
import CTASection from './../components/CTASection'
import useStore from './../store/useStore'
import { useEffect } from "react"
import Header from '../components/Header'
import Hero from './../components/Hero'
import Courses from './../components/Courses'
import Footer from './../components/Footer'


const Home = () => {
  const { isDarkMode, initializeTheme } = useStore()

  useEffect(() => {
    initializeTheme()
  }, [initializeTheme])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
        <Header />
        <Hero />
        <Courses />
        <CTASection />
        <Footer />
      </div>
    </div>
  )
}

export default Home
