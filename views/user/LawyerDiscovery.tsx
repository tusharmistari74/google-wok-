
import React, { useState, useContext } from 'react';
import { Lawyer } from '../../types';
import { AppContext } from '../../App';
import { Icon } from '../../components/Icon';
import Rating from '../../components/Rating';
import LawyerProfile from './LawyerProfile';

interface LawyerDiscoveryProps {
  lawyers: Lawyer[];
}

const MapPlaceholder: React.FC = () => (
  <div className="h-full bg-gray-200 rounded-lg flex items-center justify-center">
    <div className="text-center text-gray-500">
      <Icon name="map" className="w-16 h-16 mx-auto text-gray-400" />
      <p className="mt-2 font-semibold">Map View is for demonstration</p>
      <p className="text-sm">Lawyers would be pinned here based on location.</p>
    </div>
  </div>
);

const LawyerCard: React.FC<{ lawyer: Lawyer; onViewProfile: () => void; t: (key: string) => string; }> = ({ lawyer, onViewProfile, t }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex space-x-4">
    <img src={lawyer.photo} alt={lawyer.name} className="w-20 h-20 rounded-full object-cover border-2 border-gray-300" />
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-800">{lawyer.name}</h3>
        {lawyer.isVerified && (
          <div className="flex items-center text-green-600 text-xs font-semibold bg-green-100 px-2 py-1 rounded-full">
            <Icon name="verified" className="w-4 h-4 mr-1" />
            <span>{t('verified')}</span>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500">{lawyer.services[0]}</p>
      <div className="flex items-center space-x-4 mt-2 text-sm">
        <div className="flex items-center text-gray-600">
            <Rating rating={lawyer.rating} />
            <span className="ml-1">({lawyer.reviews} {t('reviews')})</span>
        </div>
        <div className="flex items-center text-gray-600">
            <Icon name="briefcase" className="w-4 h-4 mr-1 text-blue-500" />
            <span>{lawyer.experience} {t('experience')}</span>
        </div>
      </div>
      <button onClick={onViewProfile} className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
        {t('viewProfile')}
      </button>
    </div>
  </div>
);

const LawyerDiscovery: React.FC<LawyerDiscoveryProps> = ({ lawyers }) => {
  const [view, setView] = useState<'list' | 'map'>('list');
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const context = useContext(AppContext);
  if (!context) return null;
  const { t } = context;

  const verifiedLawyers = lawyers.filter(l => l.isVerified);

  if (selectedLawyer) {
    return <LawyerProfile lawyer={selectedLawyer} onBack={() => setSelectedLawyer(null)} />;
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex justify-center mb-4">
        <div className="bg-gray-200 p-1 rounded-full flex">
          <button
            onClick={() => setView('list')}
            className={`px-6 py-1.5 text-sm font-semibold rounded-full transition-colors ${
              view === 'list' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'
            }`}
          >
            {t('listView')}
          </button>
          <button
            onClick={() => setView('map')}
            className={`px-6 py-1.5 text-sm font-semibold rounded-full transition-colors ${
              view === 'map' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'
            }`}
          >
            {t('mapView')}
          </button>
        </div>
      </div>
      <div className="flex-grow">
        {view === 'list' ? (
          <div className="space-y-4">
            {verifiedLawyers.map(lawyer => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} onViewProfile={() => setSelectedLawyer(lawyer)} t={t} />
            ))}
          </div>
        ) : (
          <MapPlaceholder />
        )}
      </div>
    </div>
  );
};

export default LawyerDiscovery;
