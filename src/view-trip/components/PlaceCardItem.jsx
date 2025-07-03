import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGoogleMapsLoader } from '@/components/GoogleMapsLoader';

function PlaceCardItem({ place }) {
  const { isLoaded } = useGoogleMapsLoader();
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (place?.placeName && isLoaded) {
      GetPlacePhoto();
    }
  }, [place, isLoaded]);

  const GetPlacePhoto = async () => {
    try {
      setError(false);
      const data = {
        textQuery: place.placeName,
        languageCode: "en"
      };
      const response = await GetPlaceDetails(data);

      if (response.data.places && response.data.places[0]?.photos?.length > 0) {
        const photo = response.data.places[0].photos[0];
        if (photo.reference) {
          setPhotoUrl(photo.reference);
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Error fetching place photo:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const generatePlaceholderImage = () => {
    return `https://placehold.co/130x130/f3f4f6/94a3b8/png?text=${encodeURIComponent(place.placeName.charAt(0))}`;
  };

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place.placeName + "," + place.placeAddress)} target='_blank'>
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
              src={photoUrl || (error ? generatePlaceholderImage() : '/placeholder-place.jpg')}
              className='w-full h-full object-cover'
              alt={place.placeName}
              onError={(e) => {
                setError(true);
                e.target.src = generatePlaceholderImage();
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
            {place.placeName}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className='text-sm text-gray-500'
          >
            {place.placeDetails}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className='mt-2 space-y-2'
          >
            <div className='flex items-center gap-2'>
              <span className='text-lg'>🕙</span>
              <span className='text-coral-500'>{place.timeTravel}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-lg'>🎟️</span>
              <span className='text-coral-500'>{place.ticketPricing}</span>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className='text-sm text-gray-500'
            >
              {place.placeAddress}
            </motion.p>
            {place.rating && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className='flex items-center gap-1'
              >
                <span className='text-lg'>⭐</span>
                <span className='text-yellow-500 font-medium'>{place.rating}</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

export default PlaceCardItem;