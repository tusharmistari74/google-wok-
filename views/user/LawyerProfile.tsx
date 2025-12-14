
import React, { useState, useContext } from 'react';
import { Lawyer, Booking, BookingStatus } from '../../types';
import { AppContext } from '../../App';
import Rating from '../../components/Rating';
import { Icon } from '../../components/Icon';
import { UNLOCK_FEE } from '../../constants';

interface LawyerProfileProps {
  lawyer: Lawyer;
  onBack: () => void;
}

const LawyerProfile: React.FC<LawyerProfileProps> = ({ lawyer, onBack }) => {
    const [isContactUnlocked, setIsContactUnlocked] = useState(lawyer.contactUnlocked);
    const [showBooking, setShowBooking] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [files, setFiles] = useState<File[]>([]);

    const context = useContext(AppContext);
    if (!context) return null;
    const { t, currentUser, bookings, setBookings } = context;

    const handleUnlockContact = () => {
        // Simulate payment
        alert(`Payment of ₹${UNLOCK_FEE} successful!`);
        setIsContactUnlocked(true);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files));
        }
    };
    
    const handleBooking = () => {
        if (!selectedDate || !selectedTime || !currentUser) {
            alert('Please select a date and time.');
            return;
        }

        const newBooking: Booking = {
            id: `booking${bookings.length + 1}`,
            userId: currentUser.id,
            lawyerId: lawyer.id,
            userName: currentUser.name,
            lawyerName: lawyer.name,
            date: selectedDate,
            time: selectedTime,
            status: BookingStatus.PENDING,
            documents: files,
            payment: {
                amount: lawyer.fees,
                status: 'Paid', // Simulate successful payment
                method: 'UPI',
                transactionId: `TXN${Date.now()}`
            }
        };

        setBookings(prev => [...prev, newBooking]);
        alert(`Booking successful with ${lawyer.name} on ${selectedDate} at ${selectedTime}!`);
        setShowBooking(false);
        onBack();
    };

    return (
        <div className="p-4">
            <button onClick={onBack} className="mb-4 text-blue-600 font-semibold">&larr; Back to list</button>
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-4">
                    <img src={lawyer.photo} alt={lawyer.name} className="w-24 h-24 rounded-full object-cover border-4 border-blue-200" />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{lawyer.name}</h2>
                        <div className="flex items-center mt-1">
                            <Rating rating={lawyer.rating} />
                            <span className="ml-2 text-sm text-gray-600">({lawyer.reviews} {t('reviews')})</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t pt-4">
                    <h3 className="font-semibold text-gray-700">{t('services')}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {lawyer.services.map(service => (
                            <span key={service} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1.5 rounded-full">{service}</span>
                        ))}
                    </div>
                </div>
                
                <div className="mt-4 border-t pt-4">
                    {isContactUnlocked ? (
                        <div>
                             <h3 className="font-semibold text-gray-700">{t('contact')}</h3>
                             <p className="text-gray-600 mt-2">Email: {lawyer.id}@legalconnect.com</p>
                             <p className="text-gray-600">Phone: +91 98765 12345</p>
                             <div className="flex space-x-2 mt-3">
                                <button className="flex-1 bg-green-500 text-white py-2 rounded-lg flex items-center justify-center space-x-2"><Icon name="phone" /> <span>{t('callNow')}</span></button>
                                <button className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg flex items-center justify-center space-x-2"><Icon name="chat" /> <span>{t('message')}</span></button>
                             </div>
                        </div>
                    ) : (
                        <button onClick={handleUnlockContact} className="w-full bg-yellow-500 text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition-colors">
                            {t('unlockContact')}
                        </button>
                    )}
                </div>

                <div className="mt-4 border-t pt-4">
                     <button onClick={() => setShowBooking(true)} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        {t('bookAppointment')}
                    </button>
                </div>
                
                {showBooking && (
                     <div className="mt-4 border-t pt-4 space-y-4">
                         <h3 className="font-semibold text-gray-700">{t('bookAppointment')}</h3>
                         <div>
                            <label className="text-sm font-medium text-gray-600">{t('selectDate')}</label>
                            <select onChange={(e) => {setSelectedDate(e.target.value); setSelectedTime('')}} value={selectedDate} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                <option value="">Select Date</option>
                                {Object.keys(lawyer.availability).map(date => <option key={date} value={date}>{date}</option>)}
                            </select>
                         </div>
                         {selectedDate && (
                            <div>
                                <label className="text-sm font-medium text-gray-600">{t('selectTime')}</label>
                                <div className="grid grid-cols-3 gap-2 mt-1">
                                    {lawyer.availability[selectedDate]?.map(time => (
                                        <button key={time} onClick={() => setSelectedTime(time)} className={`p-2 rounded-md text-sm ${selectedTime === time ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>{time}</button>
                                    ))}
                                </div>
                            </div>
                         )}
                         <div>
                            <label className="text-sm font-medium text-gray-600">{t('uploadDocs')}</label>
                            <input type="file" multiple onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                         </div>
                         <button onClick={handleBooking} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors">
                           {t('confirmBooking')}
                        </button>
                     </div>
                )}

            </div>
        </div>
    );
};

export default LawyerProfile;
