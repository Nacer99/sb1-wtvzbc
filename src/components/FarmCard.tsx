import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FarmCardProps {
  farm: {
    id: string;
    name: string;
    location: string;
    description: string;
    image: string;
    rating: number;
    priceRange: string;
  };
  searchParams?: {
    date?: Date;
    guests?: {
      adults: number;
      children: number;
    };
  };
}

export default function FarmCard({ farm, searchParams }: FarmCardProps) {
  const queryParams = new URLSearchParams();
  if (searchParams?.date) {
    queryParams.set('date', searchParams.date.toISOString());
  }
  if (searchParams?.guests) {
    queryParams.set('guests', JSON.stringify(searchParams.guests));
  }

  return (
    <Link to={`/farm/${farm.id}?${queryParams.toString()}`} className="block">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
        <div className="relative h-48">
          <img
            src={farm.image}
            alt={farm.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">{farm.rating}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{farm.name}</h3>
          <p className="text-gray-600 mb-2">{farm.location}</p>
          <p className="text-gray-700 mb-4 line-clamp-2">{farm.description}</p>
          <p className="text-blue-600 font-medium">{farm.priceRange} per person</p>
        </div>
      </div>
    </Link>
  );
}