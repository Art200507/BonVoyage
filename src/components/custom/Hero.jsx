import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Hero() {
  return (
    <div className='flex flex-col items-center gap-9 relative'>
      <div className='flex flex-col items-center mx-8 md:mx-56 gap-9 z-10'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='font-extrabold text-[40px] md:text-[50px] text-center mt-16'
        >
          <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='text-xl text-gray-500 text-center'
        >
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link to={'/create-trip'}>
            <Button className="bg-[#f56551] hover:bg-[#e54531] text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
              Get Started, It's Free
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className='w-full relative mt-8'
      >
        <div className='absolute inset-0 bg-gradient-to-b from-white via-white/50 to-transparent z-10'></div>
        <img
          src='/landing.png'
          alt="Las Vegas Strip"
          className='w-full h-[600px] object-cover rounded-lg shadow-2xl'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-white to-transparent z-10'></div>
      </motion.div>
    </div>
  )
}

export default Hero