import { Search, Users, BookOpen, Star } from "lucide-react"
import home from "../../assets/imgs/home.png"
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'



const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 text-left space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-[#054ac6] via-[lime] to-[#51a1a1] bg-clip-text text-transparent">
                Learn Without
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">Limits</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
              Discover thousands of courses from industry experts. Build skills that matter, advance your career, and
              transform your future with LearnUp.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 max-w-lg">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="What do you want to learn?"
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{
                  paddingX: 4,
                  paddingY: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: 3,
                }}
              >
                Explore
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>50,000+ Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>1,200+ Courses</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>4.8 Rating</span>
              </div>
            </div>
          </div>

          <div className="flex-1 lg:flex-none">
            <img
              src={home}
              alt="Learning platform illustration"
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain mx-auto lg:mx-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
