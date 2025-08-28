import CTASection from "../components/Home/CTASection"
import useStore from "../store/useStore"
import { useEffect } from "react"
import Header from "../components/Header-Footer/Header"
import Hero from "../components/Home/Hero"
import Courses from "../components/Home/Courses"
import Mentors from "../components/Home/Mentors"
import Footer from "../components/Header-Footer/Footer"
import Rewievs from "../components/Home/Rewievs"

const Home = ({baseUrl}) => {
  const { initializeTheme } = useStore()

  useEffect(() => {
    initializeTheme()
  }, [initializeTheme])

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
        <Header />
        <Hero />
        <Courses baseUrl={baseUrl}/>
        <Mentors baseUrl={baseUrl}/>
        <Rewievs/>
        <CTASection />
        <Footer />
      </div>
    </div>
  )
}

export default Home
