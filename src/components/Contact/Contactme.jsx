import { User, Mail } from "lucide-react";
import TelegramIcon from '@mui/icons-material/Telegram';
import { useState } from "react";
import axios from "axios";

export default function ContactForm({ baseUrl }) {

  const [fullName, setFullname] = useState('')
  const [email, setemail] = useState('')
  const [telegram, setTelegarm] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function contact(e) {
    e.preventDefault();

    if (!fullName || !email || !message) {
      alert("Iltimos, barcha majburiy maydonlarni to‘ldiring.");
      return;
    }

    
    try {
      setLoading(true)
      const res = await axios.post(`${baseUrl}/contact/contact`, {
        fullName,
        email,
        telegram,
        message
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });


      console.log('Yuborildi ', res)

      alert("Xabar muvaffaqiyatli yuborildi!");


      setFullname('');
      setemail('');
      setTelegarm('');
      setMessage('');
    } catch (error) {
      console.log('Xatolik', error)
      alert("Xatolik yuz berdi. Qayta urinib ko‘ring.");
    } finally {
      setLoading(false)
    }
  }


  if (loading) {

  }


  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 py-8 transition-colors duration-300">
      <div className="w-full px-[40px] max-w-[700px] bg-white dark:bg-slate-900/90 text-slate-900 dark:text-white rounded-xl p-8 shadow-lg backdrop-blur-md border border-slate-300 dark:border-slate-700 max-sm:max-w-[400px] transition-all">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Submit your applications here !
        </h2>

        {loading && (
          <div className="text-center text-blue-600 mb-4 font-medium">
            Loading...
          </div>
        )}

        <form className="space-y-6" onSubmit={contact}>
          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">Enter your full name.</label>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="text"
                value={fullName}
                placeholder="John Michael Doe"
                className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                onChange={(e) => setFullname(e.target.value)}
                required
              />
              <User className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <input required
                type="email"
                value={email}
                placeholder="example@gmail.com"
                className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                onChange={(e) => setemail(e.target.value)}
              />
              <Mail className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Telegram */}
          <div>
            <label className="block mb-2 text-sm font-medium">Telegram</label>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                required
                type="text"
                value={telegram}
                placeholder="@username"
                className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                onChange={(e) => setTelegarm(e.target.value)}
              />
              <TelegramIcon className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 text-sm font-medium">Message</label>
            <textarea
              rows="4"
              value={message}
              placeholder="Text"
              className="w-full bg-slate-100 dark:bg-slate-800 rounded-md px-4 py-2 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 rounded-md transition duration-300`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );

}
