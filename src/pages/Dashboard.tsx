import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Settings, Calendar, Users } from 'lucide-react';
import DashboardStats from '../components/dashboard/DashboardStats';
import FarmList from '../components/dashboard/FarmList';

export default function Dashboard() {
  const [view, setView] = useState<'list' | 'calendar'>('list');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Farm Manager Dashboard</h1>
        <Link
          to="/dashboard/farm"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add New Farm</span>
        </Link>
      </div>

      <DashboardStats />

      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                view === 'list'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Manage Farms</span>
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                view === 'calendar'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Bookings</span>
            </button>
          </div>
        </div>

        {view === 'list' ? (
          <FarmList />
        ) : (
          <div className="text-center py-12 text-gray-500">
            Calendar view coming soon
          </div>
        )}
      </div>
    </div>
  );
}