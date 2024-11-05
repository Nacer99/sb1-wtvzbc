import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, MoreVertical } from 'lucide-react';
import { Menu } from '@headlessui/react';

const SAMPLE_FARMS = [
  {
    id: '1',
    name: 'Green Valley Farm',
    location: 'Tuscany, Italy',
    status: 'active',
    bookings: 45,
    revenue: '€12,450',
  },
  {
    id: '2',
    name: 'Alpine Meadows',
    location: 'Swiss Alps',
    status: 'active',
    bookings: 32,
    revenue: '€8,920',
  },
  {
    id: '3',
    name: 'Lavender Fields Estate',
    location: 'Provence, France',
    status: 'inactive',
    bookings: 0,
    revenue: '€0',
  },
];

export default function FarmList() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
              Farm Name
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
              Location
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
              Status
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
              Bookings
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
              Revenue
            </th>
            <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {SAMPLE_FARMS.map((farm) => (
            <tr key={farm.id} className="border-b border-gray-200">
              <td className="py-4 px-4">
                <div className="font-medium text-gray-900">{farm.name}</div>
              </td>
              <td className="py-4 px-4 text-gray-600">{farm.location}</td>
              <td className="py-4 px-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    farm.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {farm.status}
                </span>
              </td>
              <td className="py-4 px-4 text-gray-600">{farm.bookings}</td>
              <td className="py-4 px-4 text-gray-600">{farm.revenue}</td>
              <td className="py-4 px-4">
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="p-2 hover:bg-gray-50 rounded-full">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={`/dashboard/farm/${farm.id}`}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } flex items-center px-4 py-2 text-sm text-gray-700`}
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } flex items-center px-4 py-2 text-sm text-red-600 w-full`}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}