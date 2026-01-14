'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
    return (
        <main className="min-h-screen relative">
            <Header />
            <AnimatedBackground />

            {/* Hero Section */}
            <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-coral-500 to-coral-400 bg-clip-text text-transparent">
                            Discover Your Next Adventure with AI
                        </h1>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                            Personalized Itineraries at Your Fingertips
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/create-trip" className="inline-block">
                                <button className="w-full px-8 py-4 bg-coral-500 text-white rounded-full font-semibold hover:bg-coral-600 transform hover:scale-105 transition-all flex items-center justify-center gap-2">
                                    Get Started, It's Free →
                                </button>
                            </Link>
                            <Link href="#how-it-works" className="inline-block">
                                <button className="w-full px-8 py-4 bg-white text-coral-500 rounded-full font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all border-2 border-coral-500">
                                    See How It Works
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                title: "AI-Powered Planning",
                                description: "Our advanced AI understands your preferences and creates the perfect itinerary tailored just for you.",
                                icon: "🤖"
                            },
                            {
                                title: "Local Insights",
                                description: "Get recommendations for hidden gems and authentic experiences that most tourists miss.",
                                icon: "🗺️"
                            },
                            {
                                title: "Smart Scheduling",
                                description: "Optimize your time with intelligent scheduling that considers opening hours, travel time, and your pace.",
                                icon: "⏰"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Join thousands of happy travelers who've discovered their perfect trips with us.
                        </p>
                        <Link href="/create-trip" className="inline-block">
                            <button className="w-full px-8 py-4 bg-coral-500 text-white rounded-full font-semibold hover:bg-coral-600 transform hover:scale-105 transition-all">
                                Create Your Custom Itinerary →
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 text-gray-600">
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-4">About Us</h4>
                            <p>Your AI-powered travel companion for creating perfect, personalized trip itineraries.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><Link href="/create-trip" className="hover:text-coral-500">Plan a Trip</Link></li>
                                <li><Link href="#how-it-works" className="hover:text-coral-500">How It Works</Link></li>
                                <li><Link href="#features" className="hover:text-coral-500">Features</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-4">Legal</h4>
                            <ul className="space-y-2">
                                <li><Link href="/privacy" className="hover:text-coral-500">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-coral-500">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
                        <p>© 2024 AI Trip Planner. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
} 