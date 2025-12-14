
import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { UNLOCK_FEE, PLATFORM_COMMISSION } from '../../constants';

const Settings: React.FC = () => {
    const context = useContext(AppContext);
    const [unlockFee, setUnlockFee] = useState(UNLOCK_FEE);
    const [commission, setCommission] = useState(PLATFORM_COMMISSION * 100);

    if (!context) return null;
    const { t } = context;

    const handleUpdate = () => {
        // In a real app, this would call an API
        alert(`Settings updated: Unlock Fee to ₹${unlockFee}, Commission to ${commission}%`);
    };

    return (
        <div className="p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
                <div>
                    <label htmlFor="unlockFee" className="block text-sm font-medium text-gray-700">{t('unlockFee')}</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input
                            type="number"
                            name="unlockFee"
                            id="unlockFee"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                            value={unlockFee}
                            onChange={(e) => setUnlockFee(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="commission" className="block text-sm font-medium text-gray-700">{t('commissionRate')}</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                         <input
                            type="number"
                            name="commission"
                            id="commission"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-7 sm:text-sm border-gray-300 rounded-md"
                            value={commission}
                            onChange={(e) => setCommission(Number(e.target.value))}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">%</span>
                        </div>
                    </div>
                </div>
                 <button onClick={handleUpdate} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    {t('update')}
                </button>
            </div>
        </div>
    );
};

export default Settings;
