import { useState } from 'react';
import { Search } from 'lucide-react';
import { useFarmStore } from '../store/farmStore';

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const { searchParams, setSearchParams, searchFarms } = useFarmStore();

  const handleSearch = async () => {
    const params = {
      ...searchParams,
      location: location || undefined
    };
    setSearchParams(params);
    await searchFarms(params);
  };

  return (
    <div className="relative flex gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search by location..."
          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Search
      </button>
    </div>
  );
}