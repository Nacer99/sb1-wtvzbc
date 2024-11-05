import { create } from 'zustand';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from './authStore';

interface Booking {
  id: string;
  farmId: string;
  userId: string;
  date: string;
  guests: {
    adults: number;
    children: number;
  };
  meals: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface BookingStore {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  createBooking: (bookingData: Omit<Booking, 'id' | 'status' | 'createdAt'>) => Promise<string>;
  fetchUserBookings: () => Promise<void>;
}

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  loading: false,
  error: null,
  createBooking: async (bookingData) => {
    try {
      const bookingsRef = collection(db, 'bookings');
      const newBooking = {
        ...bookingData,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      
      const docRef = await addDoc(bookingsRef, newBooking);
      return docRef.id;
    } catch (error) {
      throw new Error('Failed to create booking');
    }
  },
  fetchUserBookings: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ loading: true, error: null });
    try {
      const bookingsRef = collection(db, 'bookings');
      const q = query(bookingsRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      
      const bookings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];
      
      set({ bookings, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch bookings', loading: false });
    }
  }
}));