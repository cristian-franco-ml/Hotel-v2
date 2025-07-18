import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Hotel } from '../../types/hotel';
interface AddHotelButtonProps {
  onAddHotel: (hotel: Hotel) => void;
}
const AddHotelButton: React.FC<AddHotelButtonProps> = ({
  onAddHotel
}) => {
  const handleAddHotel = () => {
    // This would typically open a modal with a form
    // For now, we'll just add a sample hotel
    const newHotel: Hotel = {
      id: `hotel-${Date.now()}`,
      name: 'Hotel Nuevo',
      stars: 4,
      location: 'Cancún',
      status: 'active',
      rooms: 120,
      occupancyRate: 78,
      averageRate: 156,
      revenueLastMonth: 458000
    };
    onAddHotel(newHotel);
  };
  return <button onClick={handleAddHotel} className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
      <PlusCircle size={18} className="mr-2" />
      Agregar Hotel
    </button>;
};
export default AddHotelButton;