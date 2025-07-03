import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import { useGoogleMapsLoader } from '@/components/GoogleMapsLoader';

function HotelCardItem({ hotel }) {
  const { isLoaded } = useGoogleMapsLoader();
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hotel?.hotelName && isLoaded) {
      GetPlacePhoto();
    }
  }, [hotel, isLoaded]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: hotel.hotelName
      };
      const response = await GetPlaceDetails(data);

      if (response.data.places && response.data.places[0]?.photos?.length > 0) {
        const photo = response.data.places[0].photos[0];
        setPhotoUrl(photo.reference);
      }
    } catch (error) {
      console.error('Error fetching hotel photo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hotel.hotelName + "," + hotel?.hotelAddress)} target='_blank'>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='bg-white/80 backdrop-blur-sm border rounded-xl p-3 mt-2 flex gap-5 hover:shadow-lg cursor-pointer'
      >
        <div className='w-[130px] h-[130px] relative overflow-hidden rounded-xl'>
          {loading ? (
            <motion.div
              animate={{
                background: ['hsl(0, 0%, 98%)', 'hsl(0, 0%, 88%)', 'hsl(0, 0%, 98%)'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
              className='w-full h-full rounded-xl'
            />
          ) : (
            <motion.img
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={photoUrl || '/placeholder-place.jpg'}
              className='w-full h-full object-cover'
              alt={hotel.hotelName}
              onError={(e) => {
                e.target.src = '/placeholder-place.jpg';
              }}
            />
          )}
        </div>
        <div className='flex-1'>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className='font-bold text-lg text-gray-800'
          >
            {hotel.hotelName}
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className='text-sm text-gray-500'
          >
            {hotel.hotelAddress}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className='mt-2 flex flex-col gap-2'
          >
            <div className='flex items-center gap-2'>
              <span className='text-lg'>💰</span>
              <span className='text-coral-500 font-medium'>{hotel.price}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-lg'>⭐</span>
              <span className='text-yellow-500 font-medium'>{hotel.rating}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

export default HotelCardItem;