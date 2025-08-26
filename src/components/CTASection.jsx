const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Start Learning?</h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          Join thousands of students already learning on LearnUp. Start your journey today with our expert-led courses.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Start Free Trial
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-all duration-300">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTASection
