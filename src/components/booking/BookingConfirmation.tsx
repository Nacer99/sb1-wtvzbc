import { Dialog } from '@headlessui/react';
import { X, Mail } from 'lucide-react';
import { format } from 'date-fns';

interface BookingConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    farmName: string;
    date: Date;
    guests: {
      adults: number;
      children: number;
    };
    meals: {
      name: string;
      quantity: number;
      price: number;
    }[];
    totalAmount: number;
  };
}

export default function BookingConfirmation({ isOpen, onClose, booking }: BookingConfirmationProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold">
              Booking Confirmation
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 text-blue-600 p-4 rounded-lg flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <p className="text-sm">A confirmation email has been sent to your inbox.</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">{booking.farmName}</h3>
              <p className="text-gray-600">
                {format(booking.date, 'EEEE, MMMM d, yyyy')}
              </p>
              <p className="text-gray-600">
                {booking.guests.adults} Adults, {booking.guests.children} Children
              </p>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Selected Meals</h4>
              {booking.meals.map((meal, index) => (
                <div key={index} className="flex justify-between text-sm mb-2">
                  <span>{meal.name} × {meal.quantity}</span>
                  <span>€{meal.price * meal.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>€{booking.totalAmount}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}