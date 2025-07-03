import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from 'framer-motion';
import { AnimatedBackground } from '../../components/AnimatedBackground';

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        tripId && GetTripData();
    }, [tripId])

    const validateTripData = (data) => {
        if (!data.tripData) {
            throw new Error('Trip data is missing');
        }

        const tripData = typeof data.tripData === 'string' ? JSON.parse(data.tripData) : data.tripData;

        // Validate hotels
        if (!tripData.hotels || !Array.isArray(tripData.hotels) || tripData.hotels.length === 0) {
            throw new Error('Invalid or empty hotels data');
        }

        // Validate itinerary
        if (!tripData.itinerary || typeof tripData.itinerary !== 'object') {
            throw new Error('Invalid or missing itinerary data');
        }

        // Validate each hotel has required fields
        tripData.hotels.forEach((hotel, index) => {
            if (!hotel.hotelName || !hotel.hotelAddress || !hotel.price || !hotel.rating) {
                throw new Error(`Hotel at index ${index} is missing required fields`);
            }
        });

        // Validate each day in itinerary
        Object.entries(tripData.itinerary).forEach(([day, data]) => {
            if (!data.bestTime || !data.plan || !Array.isArray(data.plan) || data.plan.length === 0) {
                throw new Error(`Invalid or empty plan for ${day}`);
            }
            // Validate each place in the plan
            data.plan.forEach((place, index) => {
                if (!place.placeName || !place.placeDetails || !place.placeAddress) {
                    throw new Error(`Missing required place data in ${day} at index ${index}`);
                }
            });
        });

        return { ...data, tripData };
    };

    const GetTripData = async () => {
        try {
            setLoading(true);
            const docRef = doc(db, 'AITrips', tripId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const tripData = docSnap.data();
                const validatedData = validateTripData(tripData);
                setTrip(validatedData);
            } else {
                throw new Error('No trip found');
            }
        } catch (error) {
            console.error('Error fetching trip:', error);
            setError(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <AiOutlineLoading3Quarters className="h-10 w-10 animate-spin text-coral-500" />
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-10 md:px-20 lg:px-44 xl:px-56">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-4 border rounded-lg bg-red-50"
                >
                    <p className="text-red-500">{error}</p>
                </motion.div>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="p-10 md:px-20 lg:px-44 xl:px-56">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-4 border rounded-lg bg-gray-50"
                >
                    <p className="text-gray-500">No trip data available</p>
                </motion.div>
            </div>
        );
    }

    return (
        <main className="min-h-screen relative">
            <AnimatedBackground />
            <div className='relative z-10 p-10 md:px-20 lg:px-44 xl:px-56'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl"
                >
                    {/* Information Section  */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <InfoSection trip={trip} />
                    </motion.div>

                    {/* Recommended Hotels  */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Hotels trip={trip} />
                    </motion.div>

                    {/* Daily Plan  */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <PlacesToVisit trip={trip} />
                    </motion.div>

                    {/* Footer  */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <Footer trip={trip} />
                        <div className="text-center text-gray-400 text-sm mt-8 mb-4">
                            Created by Atharva Badgujar
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}

export default Viewtrip;