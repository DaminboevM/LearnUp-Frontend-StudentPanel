import { BookOpen } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">LearnUp</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Empowering learners worldwide with high-quality, accessible education. Join our community and unlock your
              potential.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="text-sm">f</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="text-sm">t</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="text-sm">in</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Learn</h4>
            <div className="space-y-3 text-gray-400">
              <a href="#" className="block hover:text-white transition-colors">
                Courses
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Categories
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Instructors
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Pricing
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <div className="space-y-3 text-gray-400">
              <a href="#" className="block hover:text-white transition-colors">
                Help Center
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Contact Us
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 LearnUp. All rights reserved. Built with passion for education.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
