import { useState, useEffect } from 'react';
import { Users, Calendar } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { useFarmStore } from '../store/farmStore';
import FarmCard from '../components/FarmCard';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [date, setDate] = useState<Date>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  
  const { farms, loading, error, searchParams, setSearchParams, searchFarms, loadInitialFarms } = useFarmStore();

  useEffect(() => {
    loadInitialFarms();
  }, []);

  const handleDateSelect = async (newDate: Date | undefined) => {
    setDate(newDate);
    setShowDatePicker(false);
    const params = {
      ...searchParams,
      date: newDate,
      guests: guests.adults + guests.children
    };
    setSearchParams(params);
    await searchFarms(params);
  };

  const handleGuestUpdate = async (newGuests: typeof guests) => {
    setGuests(newGuests);
    const params = {
      ...searchParams,
      guests: newGuests.adults + newGuests.children
    };
    setSearchParams(params);
    await searchFarms(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative h-[500px] rounded-xl overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Discover Authentic Farm Experiences</h1>
            <p className="text-xl mb-8">Book unique dining experiences at tourist farms</p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SearchBar />
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-full flex items-center gap-2 p-3 border rounded-lg hover:border-blue-500"
            >
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">
                {date ? date.toLocaleDateString() : 'Select Date'}
              </span>
            </button>
            {showDatePicker && (
              <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg z-10">
                <DayPicker
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                />
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowGuestPicker(!showGuestPicker)}
              className="w-full flex items-center gap-2 p-3 border rounded-lg hover:border-blue-500"
            >
              <Users className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">
                {guests.adults + guests.children} Guests
              </span>
            </button>
            {showGuestPicker && (
              <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg p-4 z-10 w-full">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Adults</label>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => handleGuestUpdate({ ...guests, adults: Math.max(1, guests.adults - 1) })}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{guests.adults}</span>
                      <button
                        onClick={() => handleGuestUpdate({ ...guests, adults: guests.adults + 1 })}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Children</label>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => handleGuestUpdate({ ...guests, children: Math.max(0, guests.children - 1) })}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{guests.children}</span>
                      <button
                        onClick={() => handleGuestUpdate({ ...guests, children: guests.children + 1 })}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Farms List */}
      <section>
        <h2 className="text-3xl font-bold mb-6">
          {searchParams.date ? 'Available Farms' : 'Featured Farms'}
        </h2>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : farms.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            No farms available for the selected criteria
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farms.map(farm => (
              <FarmCard 
                key={farm.id} 
                farm={farm} 
                searchParams={{
                  date,
                  guests
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}