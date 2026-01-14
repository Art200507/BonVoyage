import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedBackground } from './components/AnimatedBackground';

function App() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
          >
            <span className="text-coral-500">Discover</span> Your Next Adventure with AI
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-gray-700 mb-6"
          >
            Personalized Itineraries at Your Fingertips
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 mb-12"
          >
            Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/create-trip">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-coral-500 text-white rounded-full font-semibold hover:bg-coral-600 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started, It's Free →
              </motion.button>
            </Link>
            <Link to="#how-it-works">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-800 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
              >
                See How It Works
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤖",
                title: "AI-Powered Planning",
                description: "Our advanced AI understands your preferences and creates the perfect itinerary tailored just for you."
              },
              {
                icon: "📍",
                title: "Local Insights",
                description: "Get recommendations for hidden gems and authentic experiences that most tourists miss."
              },
              {
                icon: "⏰",
                title: "Smart Scheduling",
                description: "Optimize your time with intelligent scheduling that considers opening hours, travel time, and your pace."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of happy travelers who've discovered their perfect trips with us.
            </p>
            <Link to="/create-trip">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-coral-500 text-white rounded-full font-semibold hover:bg-coral-600 transition-all shadow-lg hover:shadow-xl"
              >
                Create Your Custom Itinerary →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
        <p>© 2024 Bon Voyage. All rights reserved.</p>
      </footer>
    </main>
  );
}

export default App;
