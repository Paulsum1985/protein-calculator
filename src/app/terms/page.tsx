// app/terms/page.tsx
'use client'

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm border-none shadow-2xl">
          <CardContent className="p-6 space-y-6">
            <Link 
              href="/" 
              className="inline-block text-violet-600 hover:text-violet-700 mb-4"
            >
              ← Back to Calculator
            </Link>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                Terms of Service
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-full" />
            </div>

            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Agreement to Terms</h2>
                <p>
                  By accessing our Protein Calculator, you agree to be bound by these Terms of Service and to use the calculator in accordance with these terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Use License</h2>
                <p>
                  This calculator is free for personal use. The results provided are for informational purposes only.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Medical Disclaimer</h2>
                <p>
                  The Protein Calculator is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding your protein needs.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Limitation of Liability</h2>
                <p>
                  We provide the calculator &apos;as is&apos; without any express or implied warranties. We will not be liable for any damages arising from the use of this calculator.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of the calculator following any changes constitutes acceptance of those changes.
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

export default Terms;