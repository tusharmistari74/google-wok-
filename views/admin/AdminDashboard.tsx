
import React, { useState, useContext } from 'react';
import Header from '../../components/Header';
import { AppContext } from '../../App';
import LawyerVerification from './LawyerVerification';
import Settings from './Settings';
import Analytics from './Analytics';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('verification');
  const context = useContext(AppContext);
  if (!context) return null;
  const { t } = context;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'verification':
        return <LawyerVerification />;
      case 'settings':
        return <Settings />;
      case 'analytics':
        return <Analytics />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header title={t('adminDashboard')} />
      <main className="flex-grow overflow-y-auto bg-gray-50">
        {renderTabContent()}
      </main>
      <nav className="border-t bg-white shadow-t-md">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab('verification')}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === 'verification' ? 'text-blue-600 border-t-2 border-blue-600' : 'text-gray-500'
            }`}
          >
            {t('lawyerVerification')}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === 'settings' ? 'text-blue-600 border-t-2 border-blue-600' : 'text-gray-500'
            }`}
          >
            {t('settings')}
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === 'analytics' ? 'text-blue-600 border-t-2 border-blue-600' : 'text-gray-500'
            }`}
          >
            {t('analytics')}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminDashboard;
