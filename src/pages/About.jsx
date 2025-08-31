import Header from '../components/Header-Footer/Header'
import Footer from '../components/Header-Footer/Footer'
import Mentors from '../components/About/Mentors'
import useStore from "../store/useStore"
import { useEffect } from "react"
import Info from '../components/About/Info'
import Galereya from '../components/About/Galereya'
import Sertifikat from '../components/About/Sertifikat'


function About({baseUrl}) {

  const { initializeTheme } = useStore()

  useEffect(() => {
    initializeTheme()
  }, [initializeTheme])


  return (
    <>
      <div className="min-h-screen transition-colors duration-300">
        <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
          <Header />
          <Info/>
          <Galereya/>
          <Sertifikat/>
          <Mentors baseUrl={baseUrl}/>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default About