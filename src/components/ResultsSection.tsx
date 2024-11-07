import React, { useState } from 'react';
import { Share2, Copy, Check, Activity, Dumbbell, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ResultsSection = ({ result, formData, currentTheme, themes }) => {
  const [copied, setCopied] = useState(false);
  
  const createShareText = () => {
    return `My Daily Protein Requirements 💪
Target: ${result}g of protein per day
Goal: ${formData.goal?.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
Activity Level: ${formData.activityLevel?.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}

Calculate yours at: proteincalculator.netlify.app`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(createShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Protein Calculator Results',
          text: createShareText(),
          url: 'https://proteincalculator.netlify.app'
        });
      } else {
        handleCopy();
      }
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  return (
    <div className={`mt-6 p-4 pb-6 bg-gradient-to-r ${themes[currentTheme].result} rounded-xl shadow-inner border ${themes[currentTheme].border}`}>
      <div className="space-y-4">
        {/* Top Section with Result and Tips */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-gray-800">Daily Protein Target</h3>
            <div className={`text-5xl font-bold bg-gradient-to-r ${themes[currentTheme].resultText} text-transparent bg-clip-text leading-tight pb-1`}>
              {result}g
            </div>
          </div>
          <div className="space-y-2">
            {[
              { icon: <Activity className="w-4 h-4" />, text: "Track daily", color: "text-violet-700" },
              { icon: <Dumbbell className="w-4 h-4" />, text: "Split between meals", color: "text-purple-700" },
              { icon: <Brain className="w-4 h-4" />, text: "Adjust as needed", color: "text-indigo-700" }
            ].map((tip, index) => (
              <div key={index} className={`flex items-center gap-2 text-sm ${tip.color}`}>
                {tip.icon}
                <span>{tip.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Share Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 bg-white/80 hover:bg-white transition-colors border-${themes[currentTheme].border}`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Results</span>
              </>
            )}
          </Button>

          <Button
            onClick={handleShare}
            size="sm"
            className={`flex items-center gap-2 bg-gradient-to-r ${themes[currentTheme].button} text-white`}
          >
            <Share2 className="w-4 h-4" />
            <span>Share Results</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;