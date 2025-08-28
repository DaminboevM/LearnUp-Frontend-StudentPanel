import Home from "./pages/Home"
import Courses from "./pages/Courses"
import About from "./pages/About"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Contact from "./pages/Contact"

function App() {
  const baseUrl = import.meta.env.VITE_BASE_URL
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home baseUrl={baseUrl} />} />
          <Route path="/courses" element={<Courses />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<Contact />} /> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App