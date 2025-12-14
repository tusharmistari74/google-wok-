
import React, { useState, useContext } from 'react';
import Header from '../../components/Header';
import { AppContext } from '../../App';
import ManageRequests from './ManageRequests';
import Earnings from './Earnings';
import Availability from './Availability';
import { Lawyer } from '../../types';

interface LawyerDashboardProps {
  lawyer: Lawyer;
}

const LawyerDashboard: React.FC<LawyerDashboardProps> = ({ lawyer }) => {
  const [activeTab, setActiveTab] = useState('requests');
  const context = useContext(AppContext);
  if (!context) return null;
  const { t } = context;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'requests':
        return <ManageRequests />;
      case 'availability':
        return <Availability lawyer={lawyer} />;
      case 'earnings':
        return <Earnings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header title={t('lawyerDashboard')} />
      <main className="flex-grow overflow-y-auto bg-gray-50">
        {renderTabContent()}
      </main>
      <nav className="border-t bg-white shadow-t-md">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === 'requests' ? 'text-blue-600 border-t-2 border-blue-600' : 'text-gray-500'
            }`}
          >
            {t('bookingRequests')}
          </button>
          <button
            onClick={() => setActiveTab('availability')}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === 'availability' ? 'text-blue-600 border-t-2 border-blue-600' : 'text-gray-500'
            }`}
          >
            {t('availability')}
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === 'earnings' ? 'text-blue-600 border-t-2 border-blue-600' : 'text-gray-500'
            }`}
          >
            {t('earnings')}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default LawyerDashboard;
