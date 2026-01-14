import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigation, Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { generateAvatarPlaceholder } from '@/utils/placeholder-images';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';

export function Header() {
  const [user, setUser] = useState(null);
  const [openDailog, setOpenDailog] = useState(false);
  const placeholderSvg = `data:image/svg+xml;base64,${btoa(generateAvatarPlaceholder())}`;

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      GetUserProfile(codeResponse);
    },
    onError: (error) => {
      console.error('Login Failed:', error);
      toast.error('Login failed. Please try again.');
    }
  });

  const GetUserProfile = async (codeResponse) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
            Accept: 'application/json'
          }
        }
      );
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      toast.success('Successfully logged in!');
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to get user details');
    }
  };

  const handleLogout = () => {
    try {
      googleLogout();
      localStorage.clear();
      setUser(null);
      toast.success('Successfully logged out!');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Failed to logout');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-serif italic text-coral-500 hover:text-coral-600 transition-colors">
                Bon Voyage
              </span>
            </Link>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-6"
          >
            <Link
              to="/create-trip"
              className="text-gray-600 hover:text-coral-500 transition-colors"
            >
              Create Trip
            </Link>
            <Link
              to="/my-trips"
              className="text-gray-600 hover:text-coral-500 transition-colors"
            >
              My Trips
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3"
                >
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-coral-500"
                  />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-all"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => login()}
                className="px-4 py-2 bg-coral-500 text-white rounded-full font-medium hover:bg-coral-600 transition-all transform hover:shadow-lg"
              >
                Sign In
              </motion.button>
            )}
          </motion.nav>
        </div>
      </div>
    </header>
  )
}

export default Header;