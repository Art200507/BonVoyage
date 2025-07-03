import { Button } from '@/components/ui/button'
import { GetPlaceDetails } from '../../service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { motion } from 'framer-motion';
import { useGoogleMapsLoader } from '@/components/GoogleMapsLoader';

function InfoSection({ trip }) {
  const { isLoaded } = useGoogleMapsLoader();
  const [photoUrl, setPhotoUrl] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (trip?.userSelection?.location?.label && isLoaded) {
      GetPlacePhoto();
    }
  }, [trip, isLoaded])

  const GetPlacePhoto = () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label
    }
    GetPlaceDetails(data).then(resp => {
      if (resp.data.places && resp.data.places[0]?.photos) {
        const photo = resp.data.places[0].photos[0];
        if (photo.reference) {
          setPhotoUrl(photo.reference);
        } else {
          setError(true);
        }
      }
    }).catch(error => {
      console.error('Error fetching place photo:', error);
      setError(true);
    });
  }

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-xl overflow-hidden"
      >
        <motion.img
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={photoUrl || '/placeholder.jpg'}
          className='h-[340px] w-full object-cover'
          onError={(e) => {
            setError(true);
            e.target.src = '/placeholder.jpg';
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
        />
      </motion.div>

      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='font-bold text-2xl text-gray-800'
          >
            {trip?.userSelection?.location?.label}
          </motion.h2>
          <div className='hidden sm:flex flex-wrap gap-3'>
            <motion.div
              variants={tagVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.4 }}
              className='p-2 px-4 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 shadow-sm flex items-center gap-2'
            >
              <span className="text-lg">📅</span>
              <span>{trip?.userSelection?.noOfDays} Day</span>
            </motion.div>
            <motion.div
              variants={tagVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.5 }}
              className='p-2 px-4 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 shadow-sm flex items-center gap-2'
            >
              <span className="text-lg">💰</span>
              <span>{trip?.userSelection?.budget} Budget</span>
            </motion.div>
            <motion.div
              variants={tagVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.6 }}
              className='p-2 px-4 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 shadow-sm flex items-center gap-2'
            >
              <span className="text-lg">🥂</span>
              <span>No. Of Traveler: {trip?.userSelection?.traveler}</span>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button className="bg-coral-500 hover:bg-coral-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all">
            <IoIosSend className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default InfoSection