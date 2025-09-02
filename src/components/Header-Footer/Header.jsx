import { Menu, X, Sun, Moon } from "lucide-react"
import useStore from "../../store/useStore"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import logo from '../../assets/imgs/logo-1.png'

const Header = () => {
  const [showAuthApp, setShowAuthApp] = useState(false);

  // ✅ HOOKLAR HAR DOIM RETURNDAN OLDIN BO'LISHI KERAK
  const { isDarkMode, toggleDarkMode, isMobileMenuOpen, toggleMobileMenu } = useStore()
  const [activeNav, setActiveNav] = useState("Home")
  const [currentPath, setCurrentPath] = useState("/")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  // ❗ SHOW AUTHAPP SHARTINI RETURNGA YAQIN O'TKAZING
  if (showAuthApp) {
    return <AuthApp />;
  }

  const handleNavClick = (navItem) => {
    setActiveNav(navItem)
    if (isMobileMenuOpen) {
      toggleMobileMenu()
    }
  }

  const links = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact me" },
  ]

  const handleLinkClick = (href, label) => {
    handleNavClick(label)
    setCurrentPath(href)
    if (href !== window.location.pathname) {
      window.history.pushState({}, "", href)
    }
  }

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 py-[10px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <a href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick("/", "Home")
                }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="h-[50px] object-cover"
                />
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-6 ml-6">
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => handleNavClick(link.label)}
                    className={`pb-1 transition cursor-pointer font-medium ${currentPath === link.to
                      ? "border-b-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:border-b-2 hover:border-blue-300 dark:hover:border-blue-500"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <div className="hidden md:flex items-center space-x-3">
              {/* <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  Sign In
                </button> */}
              <a href="/auth" target="_blank" rel="noopener noreferrer">
                <button className="px-6 py-2 bg-[#206fca] text-white rounded-lg transition-all duration-200 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl">
                  Get Started
                </button>
              </a>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-gray-200 dark:border-slate-700">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => handleNavClick(link.label)}
                className={`pb-1 transition cursor-pointer font-medium ${currentPath === link.to
                  ? "border-b-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:border-b-2 hover:border-blue-300 dark:hover:border-blue-500"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-3 border-t border-gray-200 dark:border-slate-700">
              {/* <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-center">
                  Sign In
                </button> */}
              <a href="/auth" target="_blank" rel="noopener noreferrer">
                <button className="px-6 py-2 bg-[#206fca] text-white rounded-lg transition-all duration-200 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl">
                  Get Started
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header
