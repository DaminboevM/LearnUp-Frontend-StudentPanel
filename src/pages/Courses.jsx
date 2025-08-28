import Footer from "../components/Header-Footer/Footer"
import Header from "../components/Header-Footer/Header"
import Course from "../components/Courses/Courses"
import useStore from "../store/useStore"
import { useEffect } from "react"


function Courses() {

  const { initializeTheme } = useStore()

  useEffect(() => {
    initializeTheme()
  }, [initializeTheme])

  return (
    <>
      <div className="min-h-screen transition-colors duration-300">
        <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
          <Header />
          <Course />
          <Footer />
        </div>
      </div >
    </>
  )
}

export default Courses