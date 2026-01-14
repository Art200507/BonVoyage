import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
    // Get itinerary object from trip data
    const itinerary = trip?.tripData?.itinerary || {};

    // Check if itinerary is empty
    if (Object.keys(itinerary).length === 0) {
        return (
            <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-gray-500">No itinerary data available</p>
            </div>
        );
    }

    // Sort days in numerical order
    const sortedDays = Object.entries(itinerary).sort((a, b) => {
        const dayNumA = parseInt(a[0].replace('day', ''));
        const dayNumB = parseInt(b[0].replace('day', ''));
        return dayNumA - dayNumB;
    });

    return (
        <div>
            <h2 className='font-bold text-lg'>Places to Visit</h2>

            <div>
                {sortedDays.map(([day, dayData], index) => (
                    <div key={index} className='mt-5'>
                        <h2 className='font-medium text-lg capitalize'>{day}</h2>
                        <h3 className='text-sm text-gray-500'>Best Time: {dayData.bestTime}</h3>
                        <div className='grid md:grid-cols-2 gap-5 mt-3'>
                            {dayData.plan?.map((place, placeIndex) => (
                                <div key={placeIndex}>
                                    <h2 className='font-medium text-sm text-orange-600'>{place.timeTravel}</h2>
                                    <PlaceCardItem place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesToVisit