import { User, Phone } from "lucide-react";

export default function ContactForm() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 py-8 transition-colors duration-300">
      <div className="w-full px-[40px] max-w-[700px] bg-white dark:bg-slate-900/90 text-slate-900 dark:text-white rounded-xl p-8 shadow-lg backdrop-blur-md border border-slate-300 dark:border-slate-700 max-sm:max-w-[400px] transition-all">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Murojaatlarni shu yerdan jo'nating!
        </h2>

        <form className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">To'liq ismingizni kiriting</label>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="text"
                placeholder="F.I.Sh"
                className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
              />
              <User className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 text-sm font-medium">Telefon</label>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="tel"
                placeholder="+998"
                className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
              />
              <Phone className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 text-sm font-medium">Xabar</label>
            <textarea
              rows="4"
              placeholder="Matn"
              className="w-full bg-slate-100 dark:bg-slate-800 rounded-md px-4 py-2 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300"
          >
            Yuborish
          </button>
        </form>
      </div>
    </div>
  );
}
