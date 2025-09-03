import React, { useState } from 'react';

const RegisterPage = ({ isDark, setIsDark, setCurrentPage, setRegisterData, showToast }) => {
  const [formData, setFormData] = useState({ email: '', fullName: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://18.199.221.227:3000/verifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'REGISTER', email: formData.email }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setRegisterData(formData);
        setCurrentPage('otp');
        showToast('Tasdiqlash kodi yuborildi!', 'success');
      } else {
        showToast(data.message || 'Xatolik yuz berdi.', 'error');
      }
    } catch (err) {
      showToast('Internetga ulanishda xatolik.', 'error');
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`} style={isDark ? { backgroundColor: '#0f172b' } : {}}>
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-3 rounded-full ${isDark ? 'bg-slate-800 text-white' : 'bg-white text-gray-800 shadow-md'}`}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="flex items-center justify-center min-h-screen px-6">
        <div className={`w-full max-w-md p-8 rounded-2xl ${isDark ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white shadow-xl border border-gray-200'}`}>
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Ro'yxatdan o'tish</h1>
            <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Hisobingizni yarating</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className={`block mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>To'liq ism</label>
              <input
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-slate-700/50 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                placeholder="Ismingizni kiriting"
              />
            </div>
            <div>
              <label className={`block mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Email</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-slate-700/50 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className={`block mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Parol</label>
              <input
                required
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-slate-700/50 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                placeholder="Parolingizni kiriting"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg"
            >
              {loading ? 'Yuborilmoqda...' : "Ro'yxatdan o'tish"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              Hisobingiz bormi?{' '}
              <button onClick={() => setCurrentPage('login')} className="text-blue-600 hover:text-blue-500 font-medium">
                Kirish
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
