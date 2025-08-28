import { useState, useEffect } from "react"

// Mentor ma'lumotlari
const mentors = [
  {
    id: 1,
    name: "Alisher Karimov",
    role: "Senior Frontend Developer",
    company: "Tech Solutions",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "5+ yillik tajribaga ega React va Next.js mutaxassisi",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 2,
    name: "Malika Tosheva",
    role: "UX/UI Designer",
    company: "Design Studio",
    image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Kreativ dizayn va foydalanuvchi tajribasi bo'yicha ekspert",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
  },
  {
    id: 3,
    name: "Bobur Rahimov",
    role: "Backend Developer",
    company: "Data Corp",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Kuchli backend tizimlari va API yaratish mutaxassisi",
    skills: ["Node.js", "Python", "PostgreSQL", "Docker"],
  },
  {
    id: 4,
    name: "Nilufar Saidova",
    role: "Product Manager",
    company: "Innovation Hub",
    image: "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Mahsulot strategiyasi va loyiha boshqaruvi bo'yicha tajribali",
    skills: ["Product Strategy", "Agile", "Analytics", "Leadership"],
  },
  {
    id: 5,
    name: "Sardor Umarov",
    role: "DevOps Engineer",
    company: "Cloud Systems",
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Cloud infratuzilma va CI/CD jarayonlari mutaxassisi",
    skills: ["AWS", "Kubernetes", "Jenkins", "Terraform"],
  },
]

function Mentors() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [mentorsPerSlide, setMentorsPerSlide] = useState(3)

  useEffect(() => {
    const updateMentorsPerSlide = () => {
      if (window.innerWidth < 768) {
        setMentorsPerSlide(1) // Mobile: 1 mentor
      } else if (window.innerWidth < 1024) {
        setMentorsPerSlide(2) // Tablet: 2 mentors
      } else {
        setMentorsPerSlide(3) // Desktop: 3 mentors
      }
    }

    updateMentorsPerSlide()
    window.addEventListener("resize", updateMentorsPerSlide)
    return () => window.removeEventListener("resize", updateMentorsPerSlide)
  }, [])

  const totalSlides = Math.ceil(mentors.length / mentorsPerSlide)

  useEffect(() => {
    if (!isAutoPlaying) return

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

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background to-muted">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Our Mentors</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn from experienced professionals and grow your career.
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
                        <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-96">
                          {/* Mentor Image */}
                          <div className="h-full overflow-hidden relative">
                            <img
                              src={mentor.image || "/placeholder.svg?height=400&width=400&query=professional mentor"}
                              alt={mentor.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300 flex items-end">
                              <div className="text-white p-4 w-full md:transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-lg font-bold mb-1">{mentor.name}</h3>
                                <p className="text-sm text-blue-300 mb-1">{mentor.role}</p>
                                <p className="text-xs text-gray-300 mb-2">{mentor.company}</p>
                                <p className="text-xs mb-3 leading-relaxed line-clamp-2">{mentor.bio}</p>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {mentor.skills.slice(0, 3).map((skill, index) => (
                                    <span key={index} className="px-2 py-1 bg-blue-600/80 text-xs rounded-full">
                                      {skill}
                                    </span>
                                  ))}
                                </div>

                                <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors duration-200">
                                  Batafsil
                                </button>
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
