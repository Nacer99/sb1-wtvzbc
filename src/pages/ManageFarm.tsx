import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Calendar, Upload, Plus, X } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

interface FarmForm {
  name: string;
  location: string;
  description: string;
  meals: {
    name: string;
    description: string;
    price: number;
    available: number;
  }[];
}

export default function ManageFarm() {
  const { id } = useParams();
  const { register, handleSubmit, watch, setValue } = useForm<FarmForm>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [meals, setMeals] = useState([
    { id: 1, name: '', description: '', price: 0, available: 0 },
  ]);

  const onSubmit = (data: FarmForm) => {
    console.log(data);
    // Handle form submission
  };

  const addMeal = () => {
    setMeals([
      ...meals,
      { id: meals.length + 1, name: '', description: '', price: 0, available: 0 },
    ]);
  };

  const removeMeal = (id: number) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">
        {id ? 'Edit Farm' : 'Add New Farm'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Farm Name
              </label>
              <input
                type="text"
                {...register('name', { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                {...register('location', { required: true })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register('description', { required: true })}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Photos</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-2">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                >
                  <span>Upload files</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                  />
                </label>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Availability</h2>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg"
            >
              <Calendar className="w-5 h-5" />
              <span>Select Available Dates</span>
            </button>
            {showDatePicker && (
              <div className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg p-4">
                <DayPicker
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={(dates) => setSelectedDates(dates || [])}
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Meals</h2>
            <button
              type="button"
              onClick={addMeal}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-500"
            >
              <Plus className="w-5 h-5" />
              Add Meal
            </button>
          </div>
          <div className="space-y-6">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="relative border rounded-lg p-4"
              >
                <button
                  type="button"
                  onClick={() => removeMeal(meal.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meal Name
                    </label>
                    <input
                      type="text"
                      {...register(`meals.${meal.id - 1}.name`)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price per Person
                    </label>
                    <input
                      type="number"
                      {...register(`meals.${meal.id - 1}.price`)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      {...register(`meals.${meal.id - 1}.description`)}
                      rows={2}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Portions
                    </label>
                    <input
                      type="number"
                      {...register(`meals.${meal.id - 1}.available`)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            {id ? 'Update Farm' : 'Create Farm'}
          </button>
        </div>
      </form>
    </div>
  );
}