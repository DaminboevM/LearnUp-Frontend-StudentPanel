import { ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"

const Courses = ({ baseUrl }) => {
    const [categories, setCategories] = useState([])
    const [courses, setCourses] = useState([])
    const [activeCategory, setActiveCategory] = useState({})
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        setError(null)
        axios.get(`${baseUrl}/course-category`)
            .then(res => {
                setCategories(res.data)
                if (!activeCategory?.id && res.data.length > 0) {
                    setActiveCategory(res.data[0])
                }
            })
            .catch(err => {
                console.error(err)
                setError("Kategoriyalarni yuklashda xatolik yuz berdi")
            })
            .finally(() => setLoading(false))
    }, [baseUrl])

    useEffect(() => {
        if (!activeCategory?.id) return
        
        setLoading(true)
        setError(null)
        
        let url = `${baseUrl}/course/all`
        if (activeCategory?.id) {
            url += `?courseCategoryId=${activeCategory.id}`
        }
        
        axios.get(url)
            .then(res => {
                setCourses(res.data.data || [])
            })
            .catch(err => {
                console.error("Kurslarni olishda xatolik:", err.name, err.message)
                setError("Kurslarni yuklashda xatolik yuz berdi")
            })
            .finally(() => setLoading(false))
    }, [activeCategory, baseUrl])

    // Loading holati
    if (loading && categories.length === 0) {
        return (
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center min-h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                </div>
            </section>
        )
    }

    // Xatolik holati
    if (error) {
        return (
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="text-red-500 dark:text-red-400 mb-4">
                            {error}
                        </div>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Reload
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                        All Courses
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                        Explore our best courses in various categories
                    </p>
                </div>

                {/* Mobile dropdown */}
                <div className="mb-16 block md:hidden relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between py-3 px-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white"
                    >
                        <span>{activeCategory.name || "Select a category"}</span>
                        <ChevronDown className={`h-5 w-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
                            {categories.map((el) => (
                                <button
                                    key={el.id}
                                    onClick={() => {
                                        setActiveCategory(el)
                                        setIsDropdownOpen(false)
                                    }}
                                    className={`w-full text-left py-3 px-4 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors
                                        ${activeCategory.id === el.id
                                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                            : "text-gray-900 dark:text-white"
                                        }`}
                                >
                                    {el.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Desktop horizontal buttons */}
                <div className="hidden md:flex justify-center gap-2 mb-16 flex-wrap">
                    {Array.isArray(categories) && categories.map((el) => (
                        <button
                            key={el.id}
                            onClick={() => setActiveCategory(el)}
                            className={`py-2 px-6 rounded-lg font-semibold transition duration-300 whitespace-nowrap
                                ${activeCategory.id === el.id
                                    ? "bg-blue-600 text-white"
                                    : "bg-white dark:bg-slate-800 text-black dark:text-white border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
                                }`}
                        >
                            {el.name}
                        </button>
                    ))}
                </div>

                {/* Loading holati kurslar uchun */}
                {loading && courses.length === 0 && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {/* Kurslar */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {!loading && courses.length === 0 && (
                        <p className="text-center text-gray-500 dark:text-gray-400 col-span-full py-11">
                            No courses found.
                        </p>
                    )}
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-slate-900/20 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={course.banner ? `${baseUrl}/files/public/${course.banner}` : "/placeholder.svg"}
                                    alt={course.name}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                    {course.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {course.MentorProfile?.Users?.fullName || "Unknown author"}
                                </p>
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center">
                                        <span className="text-yellow-400">★</span>
                                        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                                            {course.ratingAvg?.toFixed(1) || "0.0"} ({course.ratingCount || 0})
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        ${course.price}
                                    </span>
                                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition duration-300 text-sm font-semibold hover:from-blue-700 hover:to-purple-700">
                                        View course
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

export default Courses