import Header from '../components/Header-Footer/Header'
import Footer from '../components/Header-Footer/Footer'
import useStore from "../store/useStore"
import { useEffect } from "react"
import ContactForm from '../components/Contact/Contactme'
import Social from '../components/Contact/Social'


function Contact({baseUrl}) {

  const { initializeTheme } = useStore()

  useEffect(() => {
    initializeTheme()
  }, [initializeTheme])


  return (
    <>
      <div className="min-h-screen transition-colors duration-300">
        <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
          <Header />
          <Social/>
          <ContactForm baseUrl={baseUrl}/>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Contact