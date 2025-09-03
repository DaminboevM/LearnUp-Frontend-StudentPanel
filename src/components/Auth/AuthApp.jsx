import React, { useState } from 'react';
import Toast from './Toast';
import RegisterPage from './RegisterPage';
import OTPPage from './OTPPage';
import LoginPage from './LoginPage';

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

  return (
    <>
      {currentPage === 'register' && (
        <RegisterPage
          isDark={isDark}
          setIsDark={setIsDark}
          setCurrentPage={setCurrentPage}
          setRegisterData={setRegisterData}
          showToast={showToast}
        />
      )}
      {currentPage === 'otp' && (
        <OTPPage
          isDark={isDark}
          setIsDark={setIsDark}
          registerData={registerData}
          setCurrentPage={setCurrentPage}
          showToast={showToast}
        />
      )}
      {currentPage === 'login' && (
        <LoginPage
          isDark={isDark}
          setIsDark={setIsDark}
          setCurrentPage={setCurrentPage}
          showToast={showToast}
        />
      )}

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
