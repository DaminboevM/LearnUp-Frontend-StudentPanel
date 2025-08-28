import { Play, Clock, Star, ChevronDown } from "lucide-react"
import { useState } from "react"

const Course = () => {
  const categories = ["All Courses", "Backend", "Frontend", "Foundation", "Mobil", "It Matematika", "Buxgalteriya"]

  const [activeCategory, setActiveCategory] = useState("All Courses")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const mockCourses = [
    {
      id: 1,
      title: "Advanced React Development",
      instructor: "Sarah Johnson",
      rating: 4.9,
      students: 12543,
      duration: "8h 32m",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$89",
      level: "Advanced",
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      instructor: "Michael Chen",
      rating: 4.8,
      students: 8901,
      duration: "12h 15m",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$129",
      level: "Intermediate",
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "Dr. Emily Rodriguez",
      rating: 4.7,
      students: 15632,
      duration: "10h 45m",
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$99",
      level: "Beginner",
    },
    {
      id: 4,
      title: "Digital Marketing Strategy",
      instructor: "James Wilson",
      rating: 4.6,
      students: 7248,
      duration: "6h 20m",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$79",
      level: "Intermediate",
    },
    {
      id: 1,
      title: "Advanced React Development",
      instructor: "Sarah Johnson",
      rating: 4.9,
      students: 12543,
      duration: "8h 32m",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$89",
      level: "Advanced",
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      instructor: "Michael Chen",
      rating: 4.8,
      students: 8901,
      duration: "12h 15m",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$129",
      level: "Intermediate",
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "Dr. Emily Rodriguez",
      rating: 4.7,
      students: 15632,
      duration: "10h 45m",
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$99",
      level: "Beginner",
    },
    {
      id: 4,
      title: "Digital Marketing Strategy",
      instructor: "James Wilson",
      rating: 4.6,
      students: 7248,
      duration: "6h 20m",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$79",
      level: "Intermediate",
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">All Courses</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Handpicked courses from top instructors</p>
        </div>

        {/* Mobile dropdown */}
        <div className="mb-16">
          <div className="block md:hidden">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between py-3 px-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white"
              >
                <span>{activeCategory}</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-10">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category)
                        setIsDropdownOpen(false)
                      }}
                      className={`w-full text-left py-3 px-4 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors ${activeCategory === category
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-gray-900 dark:text-white"
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop horizontal buttons */}
          <div className="hidden md:block text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`py-2 px-6 rounded-lg transition duration-300 whitespace-nowrap ${activeCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-slate-800 text-black dark:text-white border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-slate-900/20 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                    {course.level}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">by {course.instructor}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{course.rating}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      ({course.students.toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{course.price}</span>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-semibold">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Course
