import React, { useState, useRef, useEffect } from 'react';

const Toast = ({ message, type, onClose, isDark }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    const baseStyles = "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out max-w-sm";
    
    if (type === 'error') {
      return `${baseStyles} ${
        isDark 
          ? 'bg-red-900/90 text-red-100 border border-red-700/50' 
          : 'bg-red-50 text-red-800 border border-red-200'
      }`;
    } else if (type === 'success') {
      return `${baseStyles} ${
        isDark 
          ? 'bg-green-900/90 text-green-100 border border-green-700/50' 
          : 'bg-green-50 text-green-800 border border-green-200'
      }`;
    }
    return baseStyles;
  };

  const getIcon = () => {
    if (type === 'error') return '❌';
    if (type === 'success') return '✅';
    return 'ℹ️';
  };

  return (
    <div className={getToastStyles()}>
      <div className="flex items-start">
        <span className="text-lg mr-3 flex-shrink-0">{getIcon()}</span>
        <div className="flex-1">
          <p className="text-sm font-medium leading-relaxed">{message}</p>
        </div>
        <button
          onClick={onClose}
          className={`ml-3 flex-shrink-0 text-lg hover:opacity-70 transition-opacity ${
            isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Main App Component
const AuthApp = () => {
  const [isDark, setIsDark] = useState(true);
  const [currentPage, setCurrentPage] = useState('register');
  const [registerData, setRegisterData] = useState({ email: '', fullName: '', password: '' });
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const RegisterPage = () => {
    const [formData, setFormData] = useState({ email: '', fullName: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      try {
        const response = await fetch('http://18.199.221.227:3000/verifications/send', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'REGISTER',
            email: formData.email
          })
        });

        const data = await response.json();

        if (response.status === 201) {
          setRegisterData(formData);
          setCurrentPage('otp');
          showToast('Tasdiqlash kodi yuborildi!', 'success');
        } else {
          showToast(data.message || 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('Internetga ulanishda xatolik. Qaytadan urinib ko\'ring.', 'error');
      }
      setLoading(false);
    };

    return (
      <div className={`min-h-screen transition-all duration-300 ${
        isDark ? 'bg-slate-900' : 'bg-gray-50'
      }`} style={isDark ? {backgroundColor: '#0f172b'} : {}}>
        {/* Theme Toggle */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-full transition-all duration-300 ${
              isDark 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-white text-gray-800 hover:bg-gray-100 shadow-md'
            }`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="flex items-center justify-center min-h-screen px-6">
          <div className={`w-full max-w-md p-8 rounded-2xl transition-all duration-300 ${
            isDark 
              ? 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50' 
              : 'bg-white shadow-xl border border-gray-200'
          }`}>
            <div className="text-center mb-8">
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Ro'yxatdan o'tish
              </h1>
              <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                Hisobingizni yarating
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  To'liq ism
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isDark 
                      ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Ismingizni kiriting"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isDark 
                      ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  Parol
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isDark 
                      ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Parolingizni kiriting"
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? 'Yuborilmoqda...' : "Ro'yxatdan o'tish"}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                Hisobingiz bormi?{' '}
                <button 
                  onClick={() => setCurrentPage('login')}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Kirish
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const OTPPage = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
      inputRefs.current[0]?.focus();
    }, []);

    const handleOtpChange = (index, value) => {
      if (value.length > 1) return;
      if (!/^\d*$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index, e) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };

    const handleVerify = async () => {
      const otpCode = otp.join('');
      if (otpCode.length !== 6) return;

      setLoading(true);
      try {
        // Verify OTP
        const verifyResponse = await fetch('http://18.199.221.227:3000/verifications/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'REGISTER',
            email: registerData.email,
            otp: otpCode
          })
        });

        const verifyData = await verifyResponse.json();

        if (verifyResponse.ok) {
          // Register user
          const registerResponse = await fetch('http://18.199.221.227:3000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: registerData.email,
              fullName: registerData.fullName,
              password: registerData.password,
              otp: parseInt(otpCode)
            })
          });

          const registerResponseData = await registerResponse.json();

          if (registerResponse.ok) {
            showToast('Muvaffaqiyatli ro\'yxatdan o\'tdingiz!', 'success');
            setTimeout(() => {
              setCurrentPage('login');
            }, 1500);
          } else {
            showToast(registerResponseData.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi.', 'error');
          }
        } else {
          showToast(verifyData.message || 'Tasdiqlash kodida xatolik. Qaytadan urinib ko\'ring.', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('Internetga ulanishda xatolik. Qaytadan urinib ko\'ring.', 'error');
      }
      setLoading(false);
    };

    const handleResendOTP = async () => {
      try {
        const response = await fetch('http://18.199.221.227:3000/verifications/send', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'REGISTER',
            email: registerData.email
          })
        });

        if (response.status === 201) {
          showToast('Yangi tasdiqlash kodi yuborildi!', 'success');
          setOtp(['', '', '', '', '', '']);
        } else {
          const data = await response.json();
          showToast(data.message || 'Kod qayta yuborishda xatolik.', 'error');
        }
      } catch (error) {
        showToast('Internetga ulanishda xatolik.', 'error');
      }
    };

    return (
      <div className={`min-h-screen transition-all duration-300 ${
        isDark ? 'bg-slate-900' : 'bg-gray-50'
      }`} style={isDark ? {backgroundColor: '#0f172b'} : {}}>
        {/* Theme Toggle */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-full transition-all duration-300 ${
              isDark 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-white text-gray-800 hover:bg-gray-100 shadow-md'
            }`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="flex items-center justify-center min-h-screen px-6">
          <div className={`w-full max-w-md p-8 rounded-2xl transition-all duration-300 ${
            isDark 
              ? 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50' 
              : 'bg-white shadow-xl border border-gray-200'
          }`}>
            <div className="text-center mb-8">
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Tasdiqlash kodi
              </h1>
              <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                {registerData.email} manziliga yuborilgan kodni kiriting
              </p>
            </div>

            <div className="flex justify-center space-x-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => inputRefs.current[index] = el}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-xl font-bold rounded-lg border-2 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isDark 
                      ? 'bg-slate-700/50 border-slate-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || otp.join('').length !== 6}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? 'Tekshirilmoqda...' : 'Tasdiqlash'}
            </button>

            <div className="mt-6 text-center space-y-2">
              <button 
                onClick={handleResendOTP}
                className="text-blue-600 hover:text-blue-500 font-medium text-sm"
              >
                Kodni qayta yuborish
              </button>
              <br />
              <button 
                onClick={() => setCurrentPage('register')}
                className="text-blue-600 hover:text-blue-500 font-medium text-sm"
              >
                ← Orqaga qaytish
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LoginPage = () => {
    const [formData, setFormData] = useState({
      phone: '',
      password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      try {
        const response = await fetch('http://18.199.221.227:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: formData.phone,
            password: formData.password
          })
        });

        const data = await response.json();

        if (response.ok) {
          showToast('Muvaffaqiyatli kirdingiz!', 'success');
        } else {
          showToast(data.message || 'Login yoki parolda xatolik.', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('Internetga ulanishda xatolik. Qaytadan urinib ko\'ring.', 'error');
      }
      setLoading(false);
    };

    return (
      <div className={`min-h-screen transition-all duration-300 ${
        isDark ? 'bg-slate-900' : 'bg-gray-50'
      }`} style={isDark ? {backgroundColor: '#0f172b'} : {}}>
        {/* Theme Toggle */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-full transition-all duration-300 ${
              isDark 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-white text-gray-800 hover:bg-gray-100 shadow-md'
            }`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="flex items-center justify-center min-h-screen px-6">
          <div className={`w-full max-w-md p-8 rounded-2xl transition-all duration-300 ${
            isDark 
              ? 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50' 
              : 'bg-white shadow-xl border border-gray-200'
          }`}>
            <div className="text-center mb-8">
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Kirish
              </h1>
              <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                Hisobingizga kiring
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  Telefon / Email
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isDark 
                      ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Telefon yoki email kiriting"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  Parol
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isDark 
                      ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Parolingizni kiriting"
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? 'Kirilmoqda...' : 'Kirish'}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                Hisobingiz yo'qmi?{' '}
                <button 
                  onClick={() => setCurrentPage('register')}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Ro'yxatdan o'ting
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render current page with toast
  return (
    <>
      {currentPage === 'register' && <RegisterPage />}
      {currentPage === 'otp' && <OTPPage />}
      {currentPage === 'login' && <LoginPage />}
      
      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast}
          isDark={isDark}
        />
      )}
    </>
  );
};

export default AuthApp;