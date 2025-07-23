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
    // TODO: Open modal/form and add hotel to Supabase hotel_usuario table
    // Example: onAddHotel(newHotelFromForm)
  };
  return <button onClick={handleAddHotel} className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300">
      <PlusCircle size={18} className="mr-2" />
      Agregar Hotel
    </button>;
};
export default AddHotelButton;