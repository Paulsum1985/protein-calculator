import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CookieIcon } from 'lucide-react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6 z-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CookieIcon className="w-6 h-6 text-violet-600" />
          <p className="text-sm text-gray-600">
            We use cookies to enhance your experience and analyze site performance. By clicking "Accept", you agree to our use of cookies.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="text-sm border-violet-200 hover:border-violet-300"
            onClick={handleDecline}
          >
            Decline
          </Button>
          <Button
            className="text-sm bg-violet-600 hover:bg-violet-700"
            onClick={handleAccept}
          >
            Accept Cookies
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;