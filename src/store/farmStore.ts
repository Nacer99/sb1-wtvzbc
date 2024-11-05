import { create } from 'zustand';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Farm {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  priceRange: string;
  availableDates: string[];
  meals: {
    id: string;
    name: string;
    description: string;
    price: number;
    available: number;
  }[];
}

interface SearchParams {
  date?: Date;
  location?: string;
  guests?: number;
}

interface FarmState {
  farms: Farm[];
  loading: boolean;
  error: string | null;
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
  searchFarms: (params: SearchParams) => Promise<void>;
  loadInitialFarms: () => Promise<void>;
}

export const useFarmStore = create<FarmState>((set) => ({
  farms: [],
  loading: false,
  error: null,
  searchParams: {},
  setSearchParams: (params) => set({ searchParams: params }),
  loadInitialFarms: async () => {
    set({ loading: true, error: null });
    try {
      console.log('Loading initial farms...');
      const farmsRef = collection(db, 'farms');
      const q = query(farmsRef);
      const querySnapshot = await getDocs(q);
      
      console.log(`Found ${querySnapshot.size} farms`);
      
      const farms = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log(`Processing farm: ${data.name}`);
        return {
          id: doc.id,
          ...data
        };
      }) as Farm[];
      
      console.log('Farms loaded successfully:', farms);
      set({ farms, loading: false });
    } catch (error) {
      console.error('Error loading farms:', error);
      set({ error: 'Failed to load farms', loading: false });
    }
  },
  searchFarms: async (params) => {
    set({ loading: true, error: null });
    try {
      console.log('Searching farms with params:', params);
      const farmsRef = collection(db, 'farms');
      let q = query(farmsRef);

      if (params.date) {
        const dateString = params.date.toISOString().split('T')[0];
        q = query(q, where('availableDates', 'array-contains', dateString));
      }

      if (params.location) {
        q = query(q, where('location', '>=', params.location), 
                    where('location', '<=', params.location + '\uf8ff'));
      }

      const querySnapshot = await getDocs(q);
      const farms = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Farm[];

      console.log('Search results:', farms);
      set({ farms, loading: false });
    } catch (error) {
      console.error('Error searching farms:', error);
      set({ error: 'Failed to fetch farms', loading: false });
    }
  },
}));