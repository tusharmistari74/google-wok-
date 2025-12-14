
import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../App';
import { BookingStatus } from '../../types';
import { PLATFORM_COMMISSION } from '../../constants';

const Earnings: React.FC = () => {
    const context = useContext(AppContext);
    if (!context) return null;
    const { t, bookings, currentUser } = context;

    const { totalEarnings, platformFee, netPayout } = useMemo(() => {
        const completedBookings = bookings.filter(b => b.lawyerId === currentUser?.id && b.status === BookingStatus.COMPLETED);
        const total = completedBookings.reduce((sum, b) => sum + b.payment.amount, 0);
        const fee = total * PLATFORM_COMMISSION;
        const net = total - fee;
        return { totalEarnings: total, platformFee: fee, netPayout: net };
    }, [bookings, currentUser]);

    return (
        <div className="p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">{t('earnings')}</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                        <span className="font-semibold text-gray-600">{t('totalEarnings')}</span>
                        <span className="font-bold text-lg text-gray-800">₹{totalEarnings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                        <span className="font-semibold text-gray-600">{t('platformFee')} ({PLATFORM_COMMISSION * 100}%)</span>
                        <span className="font-bold text-lg text-red-600">- ₹{platformFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-green-100 p-4 rounded-lg border border-green-300">
                        <span className="font-semibold text-green-800">{t('netPayout')}</span>
                        <span className="font-bold text-xl text-green-800">₹{netPayout.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Earnings;
