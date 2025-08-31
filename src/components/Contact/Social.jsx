import { Phone, Mail, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-blue-600 dark:text-blue-400 text-lg font-medium mb-6 tracking-wide">Connection</p>
          <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-semibold text-balance leading-tight">
            Please contact us if you have any questions.
          </h1>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Phone Card */}
          <div className="bg-white dark:bg-slate-800/80 backdrop-blur-sm border border-slate-300 dark:border-slate-700/50 rounded-2xl p-6 lg:p-8 hover:bg-slate-100 dark:hover:bg-slate-800/90 hover:border-slate-400 dark:hover:border-slate-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group">
            <div className="flex flex-col items-start gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-slate-900 dark:text-white text-xl font-semibold">Phone</h3>
                <p className="text-slate-700 dark:text-slate-300 text-lg font-medium">+998(33) 524 29 81</p>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white dark:bg-slate-800/80 backdrop-blur-sm border border-slate-300 dark:border-slate-700/50 rounded-2xl p-6 lg:p-8 hover:bg-slate-100 dark:hover:bg-slate-800/90 hover:border-slate-400 dark:hover:border-slate-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group">
            <div className="flex flex-col items-start gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-slate-900 dark:text-white text-xl font-semibold">Email</h3>
                <p className="text-slate-700 dark:text-slate-300 text-lg font-medium break-words">m701rizo@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white dark:bg-slate-800/80 backdrop-blur-sm border border-slate-300 dark:border-slate-700/50 rounded-2xl p-6 lg:p-8 hover:bg-slate-100 dark:hover:bg-slate-800/90 hover:border-slate-400 dark:hover:border-slate-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group">
            <div className="flex flex-col items-start gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-slate-900 dark:text-white text-xl font-semibold">Address</h3>
                <p className="text-slate-700 dark:text-slate-300 text-lg font-medium leading-relaxed">
                  Margilan city, Fergana region
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



