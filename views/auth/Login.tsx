
import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { User, Role } from '../../types';

interface LoginProps {
  users: User[];
}

const Login: React.FC<LoginProps> = ({ users }) => {
  const context = useContext(AppContext);

  if (!context) {
    return <div>Loading...</div>;
  }
  
  const { setCurrentUser, t } = context;

  const handleLogin = (role: Role) => {
    const user = users.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-sm text-center">
        <div className="mb-8">
            <svg className="w-20 h-20 mx-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            <h1 className="text-3xl font-bold text-gray-800 mt-4">{t('appName')}</h1>
            <p className="text-gray-600 mt-2">{t('loginSubtitle')}</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => handleLogin(Role.USER)}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition-transform hover:scale-105"
          >
            {t('userLogin')}
          </button>
          <button
            onClick={() => handleLogin(Role.LAWYER)}
            className="w-full bg-white text-blue-600 border-2 border-blue-600 font-semibold py-3 px-4 rounded-lg shadow-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition-transform hover:scale-105"
          >
            {t('lawyerLogin')}
          </button>
          <button
            onClick={() => handleLogin(Role.ADMIN)}
            className="w-full bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transform transition-transform hover:scale-105"
          >
            {t('adminLogin')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
