import React, { useState } from 'react';
import { Share2, Copy, Check, Activity, Dumbbell, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";
import { FormData, ThemeKey, Themes } from '@/types';

interface ResultsSectionProps {
  result: number;
  formData: FormData;
  currentTheme: ThemeKey;
  themes: Themes;
  isVegetarian: boolean;
  setIsVegetarian: React.Dispatch<React.SetStateAction<boolean>>;
  mealPlans: {
    regular: Array<{
      title: string;
      items: string;
    }>;
    vegetarian: Array<{
      title: string;
      items: string;
    }>;
  };
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  result, 
  formData, 
  currentTheme, 
  themes, 
  isVegetarian, 
  setIsVegetarian, 
  mealPlans 
}) => {
  const [copied, setCopied] = useState(false);
  
  const createShareText = () => {
    return `My Daily Protein Requirements 💪
Target: ${result}g of protein per day
Goal: ${formData.goal?.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
Activity Level: ${formData.activityLevel?.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}

Calculate yours at: protein-calculator.co.uk`;
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
          url: 'https://protein-calculator.co.uk'
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

        {/* Diet Toggle Section */}
        <div className="mt-6 mb-4 flex items-center justify-between bg-white/50 p-3 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Meal Plan Type:</span>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${!isVegetarian ? 'text-violet-700' : 'text-gray-500'}`}>Regular</span>
            <Switch
              checked={isVegetarian}
              onCheckedChange={setIsVegetarian}
              className="scale-75 data-[state=checked]:bg-violet-600 data-[state=unchecked]:bg-gray-200 [&>span]:bg-white [&>span]:border-gray-200"
            />
            <span className={`text-sm ${isVegetarian ? 'text-violet-700' : 'text-gray-500'}`}>Vegetarian</span>
          </div>
        </div>

        {/* Meal Plan Section */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800">Sample Daily Meal Plan {isVegetarian ? '(Vegetarian)' : ''}</h4>
          <div className="grid gap-3">
            {(isVegetarian ? mealPlans.vegetarian : mealPlans.regular).map((meal, index) => (
              <div key={index} className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-violet-700">{meal.title}</div>
                <div className="text-sm text-gray-600">{meal.items}</div>
              </div>
            ))}
          </div>

          <div className="text-xs text-gray-500 mt-2">
            * Protein content is approximate. Actual values may vary based on portion sizes and specific products.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;