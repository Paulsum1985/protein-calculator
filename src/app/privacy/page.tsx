'use client'

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const PrivacyPolicy = () => {
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
                Privacy Policy
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-full" />
            </div>

            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Introduction</h2>
                <p>
                  Welcome to the Protein Calculator Privacy Policy. This policy explains how we handle information when you use our calculator.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Information We Do Not Collect</h2>
                <p>Our protein calculator is designed to respect your privacy. We do not:</p>
                <ul className="list-disc ml-6 mt-2">
                  <li>Collect personal information</li>
                  <li>Store your calculations</li>
                  <li>Use cookies</li>
                  <li>Track your usage</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">How the Calculator Works</h2>
                <p>
                  All calculations are performed directly in your browser. Your input data is not sent to any server or stored anywhere.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Third-Party Services</h2>
                <p>
                  This website is hosted on Netlify. While we do not collect any data, Netlify may collect basic server logs for operational purposes. You can review the Netlify privacy policy on their website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. Any changes will be posted on this page.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Contact</h2>
                <p>
                  If you have any questions about this privacy policy, you can create an issue on our GitHub repository.
                </p>
              </section>

              <footer className="text-sm text-gray-500 pt-4 border-t">
                Last updated: {new Date().toLocaleDateString()}
              </footer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;