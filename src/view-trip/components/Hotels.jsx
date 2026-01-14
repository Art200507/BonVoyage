import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({ trip }) {
  // Add null checks and default values
  const hotels = trip?.tripData?.hotels || [];

  if (!hotels.length) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-gray-500">No hotel recommendations available</p>
      </div>
    );
  }

  return (
    <div className='mt-10'>
      <h2 className='font-bold text-lg'>Recommended Hotels</h2>
      <div className='grid md:grid-cols-2 gap-5'>
        {hotels.map((hotel, index) => (
          <div key={`${hotel.hotelName}-${index}`}>
            <HotelCardItem hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hotels