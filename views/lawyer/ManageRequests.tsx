
import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { BookingStatus } from '../../types';

const ManageRequests: React.FC = () => {
    const context = useContext(AppContext);
    if (!context) return null;
    const { t, bookings, setBookings, currentUser } = context;

    const lawyerBookings = bookings.filter(b => b.lawyerId === currentUser?.id);
    const pendingRequests = lawyerBookings.filter(b => b.status === BookingStatus.PENDING);

    const handleUpdateStatus = (bookingId: string, status: BookingStatus) => {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
    };

    return (
        <div className="p-4 space-y-4">
            {pendingRequests.length > 0 ? (
                pendingRequests.map(booking => (
                    <div key={booking.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800">{booking.userName}</h3>
                        <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                        <p className="text-sm mt-2 text-gray-600">Uploaded Documents: {booking.documents.length}</p>
                        <div className="flex space-x-2 mt-4">
                            <button onClick={() => handleUpdateStatus(booking.id, BookingStatus.CONFIRMED)} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700">{t('confirm')}</button>
                            <button onClick={() => handleUpdateStatus(booking.id, BookingStatus.CANCELLED)} className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-700">{t('reject')}</button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500 mt-8">No new booking requests.</p>
            )}
        </div>
    );
};

export default ManageRequests;
