import React, { useState, useRef, useEffect } from 'react';

const OTPPage = ({ isDark, setIsDark, registerData, setCurrentPage, showToast }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (index, value) => {
    if (value.length > 1 || !/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) inputRefs.current[index + 1]?.focus();
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
      const verifyRes = await fetch('http://18.199.221.227:3000/verifications/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'REGISTER',
          email: registerData.email,
          otp: otpCode,
        }),
      });

      const verifyData = await verifyRes.json();

      if (verifyRes.ok) {
        const registerRes = await fetch('http://18.199.221.227:3000/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...registerData,
            otp: parseInt(otpCode),
          }),
        });

        const registerDataRes = await registerRes.json();

        if (registerRes.ok) {
          showToast("Muvaffaqiyatli ro'yxatdan o'tdingiz!", 'success');
          setTimeout(() => setCurrentPage('login'), 1500);
        } else {
          showToast(registerDataRes.message || 'Xatolik yuz berdi.', 'error');
        }
      } else {
        showToast(verifyData.message || 'Kod noto‘g‘ri.', 'error');
      }
    } catch {
      showToast('Internetga ulanishda xatolik.', 'error');
    }
    setLoading(false);
  };

  const handleResendOTP = async () => {
    try {
      const response = await fetch('http://18.199.221.227:3000/verifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'REGISTER',
          email: registerData.email,
        }),
      });

      if (response.status === 201) {
        showToast('Yangi kod yuborildi!', 'success');
        setOtp(['', '', '', '', '', '']);
      } else {
        const data = await response.json();
        showToast(data.message || 'Xatolik yuz berdi.', 'error');
      }
    } catch {
      showToast('Internetga ulanishda xatolik.', 'error');
    }
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
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Tasdiqlash kodi</h1>
            <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
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
                className={`w-12 h-12 text-center text-xl font-bold rounded-lg border-2 ${isDark ? 'bg-slate-700/50 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={loading || otp.join('').length !== 6}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg"
          >
            {loading ? 'Tekshirilmoqda...' : 'Tasdiqlash'}
          </button>

          <div className="mt-6 text-center space-y-2">
            <button onClick={handleResendOTP} className="text-blue-600 hover:text-blue-500 font-medium text-sm">
              Kodni qayta yuborish
            </button>
            <br />
            <button onClick={() => setCurrentPage('register')} className="text-blue-600 hover:text-blue-500 font-medium text-sm">
              ← Orqaga qaytish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
