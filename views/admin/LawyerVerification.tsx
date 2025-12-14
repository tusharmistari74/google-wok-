
import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { MOCK_LAWYERS } from '../../constants';
import { Lawyer } from '../../types';

const LawyerVerification: React.FC = () => {
    const context = useContext(AppContext);
    // In a real app, this state would be managed globally or fetched.
    const [lawyers, setLawyers] = useState<Lawyer[]>(MOCK_LAWYERS);

    if (!context) return null;
    const { t } = context;

    const unverifiedLawyers = lawyers.filter(l => !l.isVerified);

    const handleApprove = (lawyerId: string) => {
        setLawyers(prev => prev.map(l => l.id === lawyerId ? { ...l, isVerified: true } : l));
        alert('Lawyer approved!');
    };
    
    const handleReject = (lawyerId: string) => {
        setLawyers(prev => prev.filter(l => l.id !== lawyerId));
        alert('Lawyer rejected and removed.');
    };

    return (
        <div className="p-4 space-y-4">
            {unverifiedLawyers.length > 0 ? (
                unverifiedLawyers.map(lawyer => (
                    <div key={lawyer.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <div className="flex items-center space-x-4">
                            <img src={lawyer.photo} alt={lawyer.name} className="w-16 h-16 rounded-full object-cover" />
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">{lawyer.name}</h3>
                                <p className="text-sm text-gray-500">Bar ID: {lawyer.barId}</p>
                            </div>
                        </div>
                        <div className="mt-3 border-t pt-3 text-sm text-gray-600">
                            <p><strong>PAN:</strong> {lawyer.pan}</p>
                            <p><strong>Aadhar:</strong> {lawyer.aadhar}</p>
                        </div>
                        <div className="flex space-x-2 mt-4">
                            <button onClick={() => handleApprove(lawyer.id)} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700">{t('approve')}</button>
                            <button onClick={() => handleReject(lawyer.id)} className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-700">{t('reject')}</button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500 mt-8">No lawyers pending verification.</p>
            )}
        </div>
    );
};

export default LawyerVerification;
