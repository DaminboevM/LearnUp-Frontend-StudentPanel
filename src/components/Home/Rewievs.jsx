// "use client"

// import axios from "axios"
// import { useState, useEffect } from "react"

// function Reviews({ baseUrl }) {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [ratings, setRating] = useState([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     setLoading(true)
//     axios.get(`${baseUrl}/rating/all`)
//       .then((res) => (console.log((res.data)), setRating(res.data)))
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false))
//   }, [])


//   const reviews = [
//     {
//       name: "avazbek joraboyev",
//       rating: 5,
//       time: "5 oy oldin",
//       course: "HTML CSS kursi o'quvchisi",
//       comment: "Judaxam Zo'r",
//       avatar: "👨‍💻",
//     },
//     {
//       name: "Eldorbek Baxronov",
//       rating: 5,
//       time: "7 oy oldin",
//       course: "HTML CSS kursi o'quvchisi",
//       comment: "Judaxam Zo'r",
//       avatar: "👤",
//     },
//     {
//       name: "Tursunqulov Islom",
//       rating: 5,
//       time: "7 oy oldin",
//       course: "HTML CSS kursi o'quvchisi",
//       comment: "zo'r",
//       avatar: "👨‍🎓",
//     },
//     {
//       name: "Aziza Karimova",
//       rating: 5,
//       time: "3 oy oldin",
//       course: "JavaScript kursi o'quvchisi",
//       comment: "Juda yaxshi tushuntirilgan",
//       avatar: "👩‍💻",
//     },
//     {
//       name: "Bobur Rahimov",
//       rating: 5,
//       time: "4 oy oldin",
//       course: "React kursi o'quvchisi",
//       comment: "Mukammal kurs",
//       avatar: "👨‍🎓",
//     },
//     {
//       name: "Malika Tosheva",
//       rating: 5,
//       time: "2 oy oldin",
//       course: "Node.js kursi o'quvchisi",
//       comment: "Juda foydali bo'ldi",
//       avatar: "👩‍🎓",
//     },
//   ]

//   const getItemsPerSlide = () => {
//     if (typeof window !== "undefined") {
//       if (window.innerWidth < 768) return 1 // mobile
//       if (window.innerWidth < 1024) return 2 // tablet
//       return 3 // desktop
//     }
//     return 3
//   }

//   const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide)

//   useEffect(() => {
//     const handleResize = () => {
//       setItemsPerSlide(getItemsPerSlide())
//       setCurrentSlide(0) // Reset to first slide on resize
//     }

//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % Math.ceil(reviews.length / itemsPerSlide))
//     }, 4000)
//     return () => clearInterval(interval)
//   }, [reviews.length, itemsPerSlide])

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, i) => (
//       <span key={i} className={`text-xl ${i < rating ? "text-yellow-400" : "text-muted-foreground/50"}`}>
//         ⭐
//       </span>
//     ))
//   }

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % Math.ceil(reviews.length / itemsPerSlide))
//   }

//   const prevSlide = () => {
//     setCurrentSlide(
//       (prev) => (prev - 1 + Math.ceil(reviews.length / itemsPerSlide)) % Math.ceil(reviews.length / itemsPerSlide),
//     )
//   }

//   const goToSlide = (index) => {
//     setCurrentSlide(index)
//   }

//   const totalSlides = Math.ceil(reviews.length / itemsPerSlide)

//   return (
//     <div className="py-16 px-4 bg-background">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-5xl text-foreground mb-4 tracking-wide font-bold">Comments</h1>
//           <p className="text-xl text-muted-foreground font-light">O'quvchilarimiz tomonidan qoldirilgan izohlar</p>
//         </div>

//         <div className="relative mb-12">
//           {/* Navigation Buttons */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors shadow-lg"
//           >
//             <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>

//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors shadow-lg"
//           >
//             <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>

//           <div className="py-[20px] overflow-hidden mx-12">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//             >
//               {Array.from({ length: totalSlides }).map((_, slideIndex) => (
//                 <div key={slideIndex} className="w-full flex-shrink-0">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {reviews
//                       .slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide)
//                       .map((review, index) => (
//                         <div
//                           key={slideIndex * itemsPerSlide + index}
//                           className="bg-white dark:bg-[#1c232c] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-lg shadow-sm"
//                         >
//                           {/* Quote Icon */}
//                           <div className="text-4xl text-blue-600 dark:text-blue-400 font-bold mb-6">"</div>

//                           {/* Comment */}
//                           <div className="mb-6">
//                             <p className="text-gray-900 dark:text-white text-lg font-medium">{review.comment}</p>
//                           </div>

//                           {/* User Info */}
//                           <div className="flex items-center mb-4">
//                             <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center text-xl mr-4">
//                               {review.avatar}
//                             </div>
//                             <div>
//                               <h3 className="text-gray-900 dark:text-white font-semibold text-lg">{review.name}</h3>
//                               <p className="text-gray-600 dark:text-gray-400 text-sm">{review.time}</p>
//                             </div>
//                           </div>

//                           {/* Rating */}
//                           <div className="flex items-center mb-4">{renderStars(review.rating)}</div>

//                           {/* Course Info */}
//                           <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">{review.course}</div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-center space-x-2">
//           {Array.from({ length: totalSlides }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-primary" : "bg-muted hover:bg-muted-foreground/20"
//                 }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Reviews






"use client"

import axios from "axios"
import { useState, useEffect } from "react"

function Reviews({ baseUrl }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [ratings, setRatings] = useState([])
  const [loading, setLoading] = useState(false)

  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    return 3
  }

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide)

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide())
      setCurrentSlide(0)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setLoading(true)
    axios.get(`${baseUrl}/rating/all`)
      .then((res) => setRatings(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(ratings.length / itemsPerSlide))
    }, 4000)
    return () => clearInterval(interval)
  }, [ratings.length, itemsPerSlide])

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, i) => (
      <span key={i} className="text-xl text-yellow-400">
        ⭐
      </span>
    ))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(ratings.length / itemsPerSlide))
  }

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + Math.ceil(ratings.length / itemsPerSlide)) % Math.ceil(ratings.length / itemsPerSlide)
    )
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const totalSlides = Math.ceil(ratings.length / itemsPerSlide)

  return (
    <div className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl text-foreground mb-4 tracking-wide font-bold">Comments</h1>
          <p className="text-xl text-muted-foreground font-light">Our students' opinions about the courses</p>
        </div>

        {loading ? (
          <div className="text-center text-lg text-muted-foreground">Loading reviews...</div>
        ) : (
          <>
            <div className="relative mb-12">
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors shadow-lg"
              >
                <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors shadow-lg"
              >
                <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="py-[20px] overflow-hidden mx-12">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ratings
                          .slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide)
                          .map((review, index) => (
                            <div
                              key={review.id}
                              className="bg-white dark:bg-[#1c232c] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-lg shadow-sm"
                            >
                              {/* Quote Icon */}
                              <div className="text-4xl text-blue-600 dark:text-blue-400 font-bold mb-6">"</div>

                              {/* Comment */}
                              <div className="mb-6">
                                <p className="text-gray-900 dark:text-white text-lg font-medium">{review.comment}</p>
                              </div>

                              {/* User Info */}
                              {/* <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center text-xl mr-4">
                                  👤
                                </div>
                                <div>
                                  <h3 className="text-gray-900 dark:text-white font-semibold text-lg">Пользователь #{review.usersId}</h3>
                                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {new Date(review.createdAt).toLocaleDateString("ru-RU")}
                                  </p>
                                </div>
                              </div> */}

                              {/* Rating */}
                              <div className="flex items-center mb-4">
                                {renderStars((review.rate))}
                              </div>

                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide
                    ? "bg-primary"
                    : "bg-muted hover:bg-muted-foreground/20"
                    }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Reviews
