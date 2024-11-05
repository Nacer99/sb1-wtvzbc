import { Users, Utensils, Calendar, TrendingUp } from 'lucide-react';

const stats = [
  {
    label: 'Total Bookings',
    value: '245',
    change: '+12.5%',
    icon: Calendar,
    trend: 'up',
  },
  {
    label: 'Total Visitors',
    value: '1,234',
    change: '+18.2%',
    icon: Users,
    trend: 'up',
  },
  {
    label: 'Active Meals',
    value: '12',
    change: '0%',
    icon: Utensils,
    trend: 'neutral',
  },
  {
    label: 'Revenue',
    value: '€15,245',
    change: '+22.4%',
    icon: TrendingUp,
    trend: 'up',
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow-lg p-6 flex items-center"
          >
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p
                className={`text-sm ${
                  stat.trend === 'up'
                    ? 'text-green-600'
                    : stat.trend === 'down'
                    ? 'text-red-600'
                    : 'text-gray-600'
                }`}
              >
                {stat.change} from last month
              </p>
            </div>
            <div
              className={`p-3 rounded-full ${
                stat.trend === 'up'
                  ? 'bg-green-50 text-green-600'
                  : stat.trend === 'down'
                  ? 'bg-red-50 text-red-600'
                  : 'bg-gray-50 text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}