
import React, { useState, useContext } from 'react';
import Header from '../../components/Header';
import { AppContext } from '../../App';
import LawyerDiscovery from './LawyerDiscovery';
import MyBookings from './MyBookings';
import { Lawyer } from '../../types';

interface UserDashboardProps {
  lawyers: Lawyer[];
}

const UserDashboard: React.FC<UserDashboardProps> = ({ lawyers }) => {
  const [activeTab, setActiveTab] = useState('discover');
  const context = useContext(AppContext);
  if (!context) return null;
  const { t } = context;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'discover':
        return <LawyerDiscovery lawyers={lawyers} />;
      case 'bookings':
        return <MyBookings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header title={t('appName')} />
      <main className="flex-grow overflow-y-auto bg-gray-50">
        {renderTabContent()}
      </main>
      <nav className="border-t bg-white shadow-t-md">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === 'discover' ? 'text-blue-600 border-t-2 border-blue-600' : 'text-gray-500'
            }`}
          >
            {t('findLawyers')}
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === 'bookings' ? 'text-blue-600 border-t-2 border-blue-600' : 'text-gray-500'
            }`}
          >
            {t('myBookings')}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default UserDashboard;
