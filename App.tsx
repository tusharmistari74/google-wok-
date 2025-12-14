
import React, { useState, createContext, useMemo } from 'react';
import { User, Role, Language, Booking } from './types';
import { MOCK_USERS, MOCK_LAWYERS, MOCK_BOOKINGS } from './constants';
import Login from './views/auth/Login';
import UserDashboard from './views/user/UserDashboard';
import LawyerDashboard from './views/lawyer/LawyerDashboard';
import AdminDashboard from './views/admin/AdminDashboard';
import { TRANSLATIONS } from './constants';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  t: (key: keyof typeof TRANSLATIONS['en']) => string;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
}

export const AppContext = createContext<AppContextType | null>(null);

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);

  const logout = () => {
    setCurrentUser(null);
  };

  const t = (key: keyof typeof TRANSLATIONS['en']) => {
    return TRANSLATIONS[language][key] || TRANSLATIONS[Language.EN][key];
  };

  const appContextValue = useMemo(() => ({
    currentUser,
    setCurrentUser,
    logout,
    language,
    setLanguage,
    t,
    bookings,
    setBookings
  }), [currentUser, language, bookings]);

  const renderContent = () => {
    if (!currentUser) {
      return <Login users={MOCK_USERS} />;
    }
    switch (currentUser.role) {
      case Role.USER:
        return <UserDashboard lawyers={MOCK_LAWYERS} />;
      case Role.LAWYER:
        return <LawyerDashboard lawyer={MOCK_LAWYERS.find(l => l.id === currentUser.id)!} />;
      case Role.ADMIN:
        return <AdminDashboard />;
      default:
        return <Login users={MOCK_USERS} />;
    }
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <div className="bg-gray-100 min-h-screen font-sans">
        <div className="container mx-auto max-w-lg min-h-screen bg-white shadow-2xl flex flex-col">
          {renderContent()}
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
