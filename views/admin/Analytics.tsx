
import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../App';
import { BookingStatus } from '../../types';
import { MOCK_LAWYERS, PLATFORM_COMMISSION } from '../../constants';

const StatCard: React.FC<{ title: string; value: string; color: string }> = ({ title, value, color }) => (
    <div className={`p-4 rounded-lg shadow-md ${color}`}>
        <p className="text-sm font-medium text-white opacity-80">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
    </div>
);


const Analytics: React.FC = () => {
    const context = useContext(AppContext);
    if (!context) return null;
    const { t, bookings } = context;

    const { totalRevenue, totalBookings, activeLawyers } = useMemo(() => {
        const completedBookings = bookings.filter(b => b.status === BookingStatus.COMPLETED || b.status === BookingStatus.CONFIRMED);
        const totalValue = completedBookings.reduce((sum, b) => sum + b.payment.amount, 0);
        const revenue = totalValue * PLATFORM_COMMISSION;
        const lawyers = MOCK_LAWYERS.filter(l => l.isVerified).length;

        return {
            totalRevenue: `₹${revenue.toFixed(0)}`,
            totalBookings: completedBookings.length.toString(),
            activeLawyers: lawyers.toString()
        };
    }, [bookings]);

    return (
        <div className="p-4 space-y-4">
            <StatCard title={t('totalRevenue')} value={totalRevenue} color="bg-gradient-to-r from-green-500 to-green-600" />
            <StatCard title={t('totalBookings')} value={totalBookings} color="bg-gradient-to-r from-blue-500 to-blue-600" />
            <StatCard title={t('activeLawyers')} value={activeLawyers} color="bg-gradient-to-r from-indigo-500 to-indigo-600" />
            <div className="text-center text-gray-500 pt-4">
                <p>Advanced charts and data visualizations would be displayed here.</p>
            </div>
        </div>
    );
};

export default Analytics;
