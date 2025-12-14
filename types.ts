
export enum Role {
  USER = 'USER',
  LAWYER = 'LAWYER',
  ADMIN = 'ADMIN',
}

export enum Language {
  EN = 'en',
  MR = 'mr',
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
}

export interface Lawyer {
  id: string;
  name: string;
  photo: string;
  fees: number;
  services: string[];
  experience: number;
  rating: number;
  reviews: number;
  location: { lat: number; lng: number; address: string };
  isVerified: boolean;
  contactUnlocked: boolean;
  pan: string;
  aadhar: string;
  barId: string;
  availability: Record<string, string[]>; // e.g. { "2024-07-28": ["10:00", "11:00"] }
}

export enum BookingStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export interface Booking {
  id: string;
  userId: string;
  lawyerId: string;
  userName: string;
  lawyerName: string;
  date: string;
  time: string;
  status: BookingStatus;
  documents: File[];
  drafts?: File[];
  payment: {
    amount: number;
    status: 'Paid' | 'Unpaid';
    method: 'UPI' | 'Card' | 'NetBanking';
    transactionId: string;
  };
}

export interface GptResponse {
    summaryPoints: string[];
    potentialIssues: string[];
    recommendations: string[];
}
