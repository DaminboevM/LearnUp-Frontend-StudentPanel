import axios from "axios"
import { useState, useEffect } from "react"
import user from '../../assets/imgs/user.svg.png'

function Mentors({baseUrl}) {
  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [mentorsPerSlide, setMentorsPerSlide] = useState(3)

  // Backend datani fetch qilish
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${baseUrl}/user/all/mentors`)
        
        console.log(response)
        const formattedMentors = response.data.map(mentor => ({
          id: mentor.id,
          name: mentor.fullName,
          role: mentor.mentorProfile[0]?.job || "Mentor",
          company: "Tech Company", // Agar backend da company yo'q bo'lsa default qiymat
          image: mentor.image,
          bio: mentor.mentorProfile[0]?.about || "Tajribali mutaxassis",
          experience: mentor.mentorProfile[0]?.experience || 0,
          social: {
            telegram: mentor.mentorProfile[0]?.telegram,
            instagram: mentor.mentorProfile[0]?.instagram,
            linkedin: mentor.mentorProfile[0]?.linkedin,
            facebook: mentor.mentorProfile[0]?.facebook,
            github: mentor.mentorProfile[0]?.github
          }
        }))
        
        setMentors(formattedMentors)
        setError(null)
      } catch (err) {
        console.error("Ma'lumotlarni yuklashda xatolik:", err)
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi")
      } finally {
        setLoading(false)
      }
    }

    if (baseUrl) {
      fetchMentors()
    }
  }, [baseUrl])

  useEffect(() => {
    const updateMentorsPerSlide = () => {
      if (window.innerWidth < 768) {
        setMentorsPerSlide(1)
      } else if (window.innerWidth < 1024) {
        setMentorsPerSlide(2)
      } else {
        setMentorsPerSlide(3)
      }
    }

    updateMentorsPerSlide()
    window.addEventListener("resize", updateMentorsPerSlide)
    return () => window.removeEventListener("resize", updateMentorsPerSlide)
  }, [])

  const totalSlides = Math.ceil(mentors.length / mentorsPerSlide)

  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, totalSlides])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // Loading holatini ko'rsatish
  if (loading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-background to-muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Mentorlar yuklanmoqda...</p>
          </div>
        </div>
      </section>
    )
  }

  // Error holatini ko'rsatish
  if (error) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-background to-muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Qayta urinish
            </button>
          </div>
        </div>
      </section>
    )
  }

  // Agar mentorlar bo'sh bo'lsa
  if (mentors.length === 0) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-background to-muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-muted-foreground">Hozircha mentorlar mavjud emas</p>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background to-muted">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Bizning Mentorlar</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tajribali mutaxassislardan o'rganing va karyerangizni rivojlantiring.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden rounded-2xl bg-card shadow-2xl"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => {
              const startIndex = slideIndex * mentorsPerSlide
              const slideMentors = mentors.slice(startIndex, startIndex + mentorsPerSlide)

              return (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {slideMentors.map((mentor) => (
                      <div key={mentor.id} className="relative group w-full">
                        {/* Mentor Card */}
                        <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 md:h-96 h-auto">
                          
                          {/* Mobile Layout */}
                          <div className="md:hidden">
                            {/* Image */}
                            <div className="h-64 overflow-hidden">
                              <img
                                src={(mentor.image ?? user) || "/placeholder.svg?height=400&width=400&query=professional mentor"}
                                alt={mentor.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {/* Info below image */}
                            <div className="p-4 bg-card text-foreground">
                              <h3 className="text-lg font-bold mb-1">{mentor.name}</h3>
                              <p className="text-sm text-blue-600 mb-1">{mentor.role}</p>
                              <p className="text-xs text-muted-foreground mb-2">{mentor.company}</p>
                              <p className="text-xs mb-3 leading-relaxed line-clamp-2">{mentor.bio}</p>
                              
                              {/* Experience badge */}
                              {mentor.experience > 0 && (
                                <div className="mb-3">
                                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                    {mentor.experience} yil tajriba
                                  </span>
                                </div>
                              )}

                              {/* Social Media Links */}
                              <div className="flex gap-2 mb-3">
                                {mentor.social.telegram && (
                                  <a href={mentor.social.telegram} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                                    </svg>
                                  </a>
                                )}
                                {mentor.social.linkedin && (
                                  <a href={mentor.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                  </a>
                                )}
                                {mentor.social.github && (
                                  <a href={mentor.social.github} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-gray-800 hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                  </a>
                                )}
                                {mentor.social.instagram && (
                                  <a href={mentor.social.instagram} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-colors">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                  </a>
                                )}
                              </div>

                              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors duration-200">
                                Batafsil
                              </button>
                            </div>
                          </div>

                          {/* Desktop Layout - Image always visible with subtle overlay on hover */}
                          <div className="hidden md:block h-full overflow-hidden relative">
                            {/* Background Image */}
                            <img
                              src={(mentor.image ?? user) || "/placeholder.svg?height=400&width=400&query=professional mentor"}
                              alt={mentor.name}
                              className="w-full h-full object-cover transition-transform duration-300"
                            />

                            {/* Subtle overlay on hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                              {/* Info overlay - only appears on hover */}
                              <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="text-white p-4 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                                  <h3 className="text-lg font-bold mb-1 text-white drop-shadow-lg">{mentor.name}</h3>
                                  <p className="text-sm text-blue-200 mb-1 drop-shadow-md">{mentor.role}</p>
                                  <p className="text-xs text-gray-300 mb-2 drop-shadow-md">{mentor.company}</p>
                                  <p className="text-xs mb-3 leading-relaxed line-clamp-2 text-gray-200 drop-shadow-md">{mentor.bio}</p>

                                  {/* Experience badge */}
                                  {mentor.experience > 0 && (
                                    <div className="mb-3">
                                      <span className="inline-block px-2 py-1 bg-green-500/80 text-white text-xs rounded-full drop-shadow-md">
                                        {mentor.experience} yil tajriba
                                      </span>
                                    </div>
                                  )}

                                  {/* Social Media Links */}
                                  <div className="flex gap-2 mb-3">
                                    {mentor.social.telegram && (
                                      <a href={mentor.social.telegram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                                        </svg>
                                      </a>
                                    )}
                                    {mentor.social.linkedin && (
                                      <a href={mentor.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                      </a>
                                    )}
                                    {mentor.social.github && (
                                      <a href={mentor.social.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                      </a>
                                    )}
                                    {mentor.social.instagram && (
                                      <a href={mentor.social.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-colors">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                      </a>
                                    )}
                                  </div>

                                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors duration-200 drop-shadow-lg">
                                    Batafsil
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card border border-border shadow-lg z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                onClick={goToPrevious}
              >
                <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card border border-border shadow-lg z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                onClick={goToNext}
              >
                <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Pagination Dots */}
          {totalSlides > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex ? "bg-primary scale-110" : "bg-primary/50 hover:bg-primary/70"
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Mentors
