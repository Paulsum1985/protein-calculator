'use client'

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

// Add this metadata export
export const metadata = {
  title: 'About Our Protein Calculator | Expert Nutrition Tools',
  description: 'Learn about our free protein calculator tool and how it helps you optimize your nutrition and fitness goals',
  keywords: 'protein calculator about, protein intake tool, nutrition calculator, fitness tools',
};

const AboutContact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-none shadow-2xl">
          <CardContent className="p-6 space-y-6">
            {/* Back to Calculator Link */}
            <Link 
              href="/" 
              className="inline-block text-violet-600 hover:text-violet-700 mb-4"
            >
              ← Back to Calculator
            </Link>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                About & Contact
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-full" />
            </div>

            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">About the Calculator</h2>
                <p>
                  The Protein Intake Calculator is a free tool designed to help individuals optimize their protein consumption based on their specific needs and goals. Our calculator uses scientifically-backed formulas to provide personalized protein recommendations.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">How It Works</h2>
                <p>
                  Our calculator takes into account several key factors:
                </p>
                <ul className="list-disc ml-6 mt-2">
                  <li>Body weight and height</li>
                  <li>Activity level</li>
                  <li>Fitness goals (maintenance, muscle gain, or fat loss)</li>
                  <li>Personal characteristics (age, sex)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Contact Us</h2>
                <p>
                  We value your feedback and questions. You can reach us through any of the following methods:
                </p>
                <ul className="list-disc ml-6 mt-2">
                  <li>Email: <a href="mailto:paulsum1985@hotmail.com" className="text-violet-600 hover:text-violet-700">paulsum1985@hotmail.com</a></li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Disclaimer</h2>
                <p>
                  This calculator provides general recommendations based on commonly accepted guidelines. Individual needs may vary. Always consult with a healthcare provider or registered dietitian for personalized advice.
                </p>
              </section>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutContact;