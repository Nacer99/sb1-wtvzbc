import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Users, ChevronRight, Utensils } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import toast from 'react-hot-toast';
import BookingConfirmation from '../components/booking/BookingConfirmation';

export default function FarmDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [farm, setFarm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMeals, setSelectedMeals] = useState<Record<string, number>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const date = searchParams.get('date') ? new Date(searchParams.get('date')!) : undefined;
  const guests = searchParams.get('guests') ? JSON.parse(searchParams.get('guests')!) : { adults: 2, children: 0 };

  useEffect(() => {
    const fetchFarm = async () => {
      try {
        const farmDoc = await getDoc(doc(db, 'farms', id!));
        if (farmDoc.exists()) {
          setFarm({ id: farmDoc.id, ...farmDoc.data() });
        } else {
          navigate('/');
          toast.error('Farm not found');
        }
      } catch (error) {
        toast.error('Error loading farm details');
      } finally {
        setLoading(false);
      }
    };

    fetchFarm();
  }, [id, navigate]);

  const handleMealSelection = (mealId: string, quantity: number) => {
    setSelectedMeals(prev => ({
      ...prev,
      [mealId]: Math.max(0, quantity),
    }));
  };

  const totalAmount = Object.entries(selectedMeals).reduce((total, [mealId, quantity]) => {
    const meal = farm?.meals.find((m: any) => m.id === mealId);
    return total + (meal?.price ?? 0) * quantity;
  }, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!farm) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
        <img
          src={farm.image}
          alt={farm.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="text-white p-8">
            <h1 className="text-4xl font-bold mb-2">{farm.name}</h1>
            <p className="text-xl">{farm.location}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">About the Farm</h2>
            <p className="text-gray-600 mb-4">{farm.description}</p>
            <div className="grid grid-cols-2 gap-4">
              {farm.images?.slice(0, 2).map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${farm.name} view ${index + 1}`}
                  className="rounded-lg h-48 w-full object-cover"
                />
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Available Meals</h2>
            <div className="space-y-6">
              {farm.meals.map((meal: any) => (
                <div key={meal.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{meal.name}</h3>
                    <p className="text-gray-600">{meal.description}</p>
                    <p className="text-blue-600 font-medium mt-2">€{meal.price} per person</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMealSelection(meal.id, (selectedMeals[meal.id] || 0) - 1)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{selectedMeals[meal.id] || 0}</span>
                    <button
                      onClick={() => handleMealSelection(meal.id, (selectedMeals[meal.id] || 0) + 1)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
            <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">
                    {guests.adults} Adults, {guests.children} Children
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-semibold">€{totalAmount}</span>
                </div>
                <button
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => setShowConfirmation(true)}
                  disabled={totalAmount === 0}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <BookingConfirmation
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          booking={{
            farmName: farm.name,
            date: date!,
            guests,
            meals: Object.entries(selectedMeals).map(([mealId, quantity]) => {
              const meal = farm.meals.find((m: any) => m.id === mealId);
              return {
                name: meal.name,
                quantity,
                price: meal.price
              };
            }),
            totalAmount
          }}
        />
      )}
    </div>
  );
}