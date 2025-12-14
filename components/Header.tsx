
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Language } from '../types';
import { Icon } from './Icon';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { t, language, setLanguage, logout } = context;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <header className="bg-white sticky top-0 z-10 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Icon name="language" className="w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          <select
            value={language}
            onChange={handleLanguageChange}
            className="pl-8 pr-4 py-1.5 border border-gray-300 rounded-md appearance-none bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={Language.EN}>English</option>
            <option value={Language.MR}>मराठी</option>
          </select>
        </div>
        <button onClick={logout} className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-100 rounded-full transition-colors">
          <Icon name="logout" className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
