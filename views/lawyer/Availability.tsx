
import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Lawyer } from '../../types';
import { Icon } from '../../components/Icon';

interface AvailabilityProps {
    lawyer: Lawyer;
}

const Availability: React.FC<AvailabilityProps> = ({ lawyer }) => {
    const context = useContext(AppContext);
    if (!context) return null;
    const { t } = context;

    return (
        <div className="p-4 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <Icon name="calendar" className="w-6 h-6 mr-2 text-blue-600" />
                    {t('availability')}
                </h3>
                {Object.entries(lawyer.availability).map(([date, times]) => (
                    <div key={date} className="mb-3 p-3 bg-gray-50 rounded-md">
                        <p className="font-semibold text-gray-700">{date}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {times.map(time => (
                                <span key={time} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">{time}</span>
                            ))}
                        </div>
                    </div>
                ))}
                <p className="text-xs text-gray-500 mt-4">Note: This is a read-only view. Availability management would be implemented here.</p>
            </div>
        </div>
    );
};

export default Availability;
