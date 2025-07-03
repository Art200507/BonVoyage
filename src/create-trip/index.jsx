import React, { useState } from 'react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { motion } from 'framer-motion';
import { useGoogleMapsLoader } from '../components/GoogleMapsLoader';
import LocationSearch from '../components/LocationSearch';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';
import { AI_PROMPT } from '../constants/options';
import { chatSession } from '../service/AIModal';

export default function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { isLoaded, error } = useGoogleMapsLoader();
  const navigate = useNavigate();

  const handleLocationSelect = (selectedPlace) => {
    setPlace(selectedPlace);
    handleInputChange('location', selectedPlace);
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      OnGenerateTrip();
    });
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      toast.error("Please sign in to continue");
      login();
      return;
    }

    if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.traveler) {
      toast.error("Please fill all details");
      return;
    }

    if (formData.noOfDays > 5) {
      toast.error("Maximum trip duration is 5 days");
      return;
    }

    setLoading(true);
    toast('Please wait... We are working on it...');

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result.response.text();
      const cleanedText = responseText.replace(/```json\s*|\s*```/g, '').trim();

      let tripData = JSON.parse(cleanedText);

      if (!tripData || typeof tripData !== 'object') {
        throw new Error('Invalid trip data format');
      }

      setLoading(false);
      await SaveAiTrip(tripData);
    } catch (error) {
      console.error('Error generating trip:', error);
      toast.error('Failed to generate trip: ' + error.message);
      setLoading(false);
    }
  };

  const SaveAiTrip = async (tripData) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?.email) {
        throw new Error('User not authenticated');
      }

      // Sanitize location object
      const sanitizedFormData = { ...formData };
      if (sanitizedFormData.location && sanitizedFormData.location.location) {
        const loc = sanitizedFormData.location.location;
        // Handle Google Maps LatLng object or plain object
        if (loc && typeof loc.lat === 'function' && typeof loc.lng === 'function') {
          sanitizedFormData.location.location = {
            lat: loc.lat(),
            lng: loc.lng(),
          };
        } else if (loc && typeof loc.lat === 'number' && typeof loc.lng === 'number') {
          sanitizedFormData.location.location = {
            lat: loc.lat,
            lng: loc.lng,
          };
        } else {
          sanitizedFormData.location.location = null;
        }
      }

      const docId = Date.now().toString();
      const tripDocument = {
        userSelection: sanitizedFormData,
        tripData: {
          ...tripData,
          createdAt: new Date().toISOString(),
          userId: user.email
        },
        userEmail: user.email,
        id: docId
      };

      await setDoc(doc(db, "AITrips", docId), tripDocument);
      setLoading(false);
      toast.success('Trip generated successfully!');
      navigate('/view-trip/' + docId);
    } catch (error) {
      console.error('Error saving trip:', error);
      toast.error('Failed to save trip: ' + error.message);
      setLoading(false);
    }
  };

  const travelOptions = [
    {
      icon: "🎒",
      title: "Just Me",
      value: "Solo",
      description: "A solo traveler in exploration"
    },
    {
      icon: "👫",
      title: "A Couple",
      value: "Couple",
      description: "Two travelers in tandem"
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Family",
      value: "Family",
      description: "A group of fun-loving adventurers"
    },
    {
      icon: "👥",
      title: "Friends",
      value: "Friends",
      description: "A bunch of thrill-seekers"
    }
  ];

  const budgetOptions = [
    {
      icon: "💰",
      title: "Budget",
      value: "Budget",
      description: "Stay conscious of costs"
    },
    {
      icon: "💎",
      title: "Moderate",
      value: "Moderate",
      description: "Balance comfort and cost"
    },
    {
      icon: "👑",
      title: "Luxury",
      value: "Luxury",
      description: "Focus on the best experiences"
    }
  ];

  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />

      {/* Header Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
          >
            <h1 className="text-3xl font-serif italic text-coral-500">Bon Voyage</h1>
            <nav className="flex gap-6">
              <a href="/my-trips" className="text-gray-600 hover:text-coral-500 transition-colors">My Trips</a>
              <a href="/create-trip" className="text-coral-500 font-semibold">Create Trip</a>
            </nav>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Plan Your Dream Trip ✨</h2>
            <p className="text-lg text-gray-600">
              Tell us about your travel preferences and let our AI create the perfect itinerary for you.
            </p>
          </div>

          <div className="space-y-10">
            {/* Destination */}
            <div>
              <label className="block text-xl font-semibold text-gray-800 mb-4">Destination</label>
              {error ? (
                <div className="p-4 rounded-xl bg-red-50 text-red-500 border border-red-100">
                  {error}
                </div>
              ) : isLoaded ? (
                <div className="relative">
                  <LocationSearch
                    onSelect={handleLocationSelect}
                    className="w-full px-6 py-4 bg-white rounded-xl border border-gray-200 focus:border-coral-500 focus:ring-2 focus:ring-coral-200 transition-all text-lg"
                  />
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-gray-50 animate-pulse flex items-center justify-center">
                  <p className="text-gray-500">Loading destinations...</p>
                </div>
              )}
            </div>

            {/* Trip Duration */}
            <div>
              <label className="block text-xl font-semibold text-gray-800 mb-4">Trip Duration</label>
              <input
                type="number"
                placeholder="Number of days (max 5)"
                className="w-full px-6 py-4 bg-white rounded-xl border border-gray-200 focus:border-coral-500 focus:ring-2 focus:ring-coral-200 transition-all text-lg"
                onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                value={formData.noOfDays || ''}
              />
            </div>

            {/* Who's Traveling */}
            <div>
              <label className="block text-xl font-semibold text-gray-800 mb-4">Who's Traveling?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {travelOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-white rounded-xl p-4 cursor-pointer border-2 transition-all ${formData.traveler === option.value
                        ? 'border-coral-500 bg-coral-50'
                        : 'border-transparent hover:border-coral-500'
                      }`}
                    onClick={() => handleInputChange('traveler', option.value)}
                  >
                    <div className="text-4xl mb-2">{option.icon}</div>
                    <h3 className="font-semibold text-gray-800">{option.title}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Budget Preference */}
            <div>
              <label className="block text-xl font-semibold text-gray-800 mb-4">Budget Preference</label>
              <div className="grid grid-cols-3 gap-4">
                {budgetOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-white rounded-xl p-6 cursor-pointer border-2 transition-all text-center ${formData.budget === option.value
                        ? 'border-coral-500 bg-coral-50'
                        : 'border-transparent hover:border-coral-500'
                      }`}
                    onClick={() => handleInputChange('budget', option.value)}
                  >
                    <div className="text-4xl mb-3">{option.icon}</div>
                    <h3 className="font-semibold text-gray-800 mb-1">{option.title}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-coral-500 text-white rounded-xl font-semibold text-lg hover:bg-coral-600 transition-all shadow-lg hover:shadow-xl mt-8 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              onClick={OnGenerateTrip}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating your perfect trip...</span>
                </>
              ) : (
                'Generate Trip Plan'
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}