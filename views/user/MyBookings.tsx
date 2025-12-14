
import React, { useContext, useState, useCallback } from 'react';
import { AppContext } from '../../App';
import { Booking, BookingStatus, GptResponse } from '../../types';
import { getDocumentSummary } from '../../services/geminiService';
import { Icon } from '../../components/Icon';

const BookingCard: React.FC<{ booking: Booking; t: (key: string) => string; }> = ({ booking, t }) => {
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [summary, setSummary] = useState<GptResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getStatusColor = (status: BookingStatus) => {
        switch (status) {
            case BookingStatus.CONFIRMED: return 'bg-green-100 text-green-800';
            case BookingStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
            case BookingStatus.COMPLETED: return 'bg-blue-100 text-blue-800';
            case BookingStatus.CANCELLED: return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    const handleGetSummary = useCallback(async () => {
        if (booking.documents.length === 0) {
            alert("Please upload a document first.");
            return;
        }
        setIsSummarizing(true);
        setError(null);
        setSummary(null);
        try {
            // Using the first document name for the prompt
            const result = await getDocumentSummary(booking.documents[0].name);
            setSummary(result);
        } catch (err) {
            setError(t('summaryError'));
        } finally {
            setIsSummarizing(false);
        }
    }, [booking.documents, t]);


    return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{booking.lawyerName}</h3>
                    <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status}
                </span>
            </div>
            <div className="mt-4 border-t pt-2">
                 <p className="text-sm"><span className="font-semibold text-gray-600">Payment:</span> {booking.payment.status} (₹{booking.payment.amount})</p>
                 <p className="text-sm"><span className="font-semibold text-gray-600">Documents:</span> {booking.documents.length} file(s) uploaded.</p>
            </div>
             {booking.documents.length > 0 && (
                 <div className="mt-3">
                    <button onClick={handleGetSummary} disabled={isSummarizing} className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors">
                        <Icon name="ai" className="w-5 h-5" />
                        <span>{isSummarizing ? t('summarizing') : t('documentSummary')}</span>
                    </button>
                 </div>
             )}
             {summary && (
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-bold text-indigo-800">{t('summaryTitle')}</h4>
                    <div className="mt-2 space-y-3 text-sm text-gray-700">
                        <div>
                            <h5 className="font-semibold">{t('summaryPoints')}</h5>
                            <ul className="list-disc list-inside pl-2">
                                {summary.summaryPoints.map((p, i) => <li key={i}>{p}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold">{t('potentialIssues')}</h5>
                             <ul className="list-disc list-inside pl-2">
                                {summary.potentialIssues.map((p, i) => <li key={i}>{p}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold">{t('recommendations')}</h5>
                             <ul className="list-disc list-inside pl-2">
                                {summary.recommendations.map((p, i) => <li key={i}>{p}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
             )}
             {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
};

const MyBookings: React.FC = () => {
    const context = useContext(AppContext);
    if (!context) return null;
    const { t, bookings, currentUser } = context;

    const userBookings = bookings.filter(b => b.userId === currentUser?.id);
    
    return (
        <div className="p-4 space-y-4">
             {userBookings.length > 0 ? (
                userBookings.map(booking => <BookingCard key={booking.id} booking={booking} t={t} />)
             ) : (
                <p className="text-center text-gray-500 mt-8">No bookings found.</p>
             )}
        </div>
    );
};

export default MyBookings;
