'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from "@/components/ui/switch";
import { DumbbellIcon, ActivityIcon, BrainIcon } from 'lucide-react';
import AdUnit from '@/components/AdUnit';
import Link from 'next/link';

type ThemeKey = 'purple' | 'blue' | 'green';

type Theme = {
  gradient: string;
  title: string;
  button: string;
  result: string;
  resultText: string;
  accent: string;
  accentHover: string;
  border: string;
};

type Themes = {
  [key in ThemeKey]: Theme;
};

function isThemeKey(key: string): key is ThemeKey {
  return ['purple', 'blue', 'green'].includes(key);
}

const themes: Themes = {
  purple: {
    gradient: "from-violet-50 via-indigo-50 to-purple-50",
    title: "from-violet-500 via-purple-500 to-indigo-500",
    button: "from-violet-500 via-purple-500 to-indigo-500 hover:from-violet-600 hover:via-purple-600 hover:to-indigo-600",
    result: "from-violet-100 via-purple-100 to-indigo-100",
    resultText: "from-violet-600 via-purple-600 to-indigo-600",
    accent: "text-violet-600",
    accentHover: "hover:text-violet-700",
    border: "border-violet-200",
  },
  blue: {
    gradient: "from-blue-50 via-sky-50 to-cyan-50",
    title: "from-blue-500 via-sky-500 to-cyan-500",
    button: "from-blue-500 via-sky-500 to-cyan-500 hover:from-blue-600 hover:via-sky-600 hover:to-cyan-600",
    result: "from-blue-100 via-sky-100 to-cyan-100",
    resultText: "from-blue-600 via-sky-600 to-cyan-600",
    accent: "text-blue-600",
    accentHover: "hover:text-blue-700",
    border: "border-blue-200",
  },
  green: {
    gradient: "from-emerald-50 via-green-50 to-teal-50",
    title: "from-emerald-500 via-green-500 to-teal-500",
    button: "from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600",
    result: "from-emerald-100 via-green-100 to-teal-100",
    resultText: "from-emerald-600 via-green-600 to-teal-600",
    accent: "text-emerald-600",
    accentHover: "hover:text-emerald-700",
    border: "border-emerald-200",
  }
};

const ProteinCalculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: 'male',
    heightFeet: '',
    heightInches: '',
    heightCm: '',
    weight: '',
    goal: 'maintenance',
    activityLevel: 'sedentary',
    units: 'imperial',
    _goalSelected: false, 
    _activitySelected: false
  });
  const [result, setResult] = useState<number | null>(null);
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('purple');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [progress, setProgress] = useState(0);
  // Progress calculation functions next
  const calculateProgress = () => {
    let completedFields = 0;
    let totalFields = 0;

    const requiredFields = [
      { field: 'age', condition: !!formData.age },
      { field: 'weight', condition: !!formData.weight },
      { field: 'height', condition: formData.units === 'imperial' 
        ? !!(formData.heightFeet && formData.heightInches)
        : !!formData.heightCm },
      { field: 'sex', condition: !!formData.sex },
      // Modified these conditions to check if they've been actively selected
      { field: 'goal', condition: formData.goal !== 'maintenance' || formData._goalSelected },
      { field: 'activityLevel', condition: formData.activityLevel !== 'sedentary' || formData._activitySelected }
    ];

    totalFields = requiredFields.length;
    completedFields = requiredFields.filter(field => field.condition).length;

    return Math.round((completedFields / totalFields) * 100);
};

  useEffect(() => {
    const newProgress = calculateProgress();
    setProgress(newProgress);
  }, [formData]);

  const mealPlans = {
    regular: [
      {
        title: "Breakfast (40g protein)",
        items: "• 3 eggs (18g) + Greek yogurt (15g) + Oatmeal with milk (7g)"
      },
      {
        title: "Lunch (50g protein)",
        items: "• Chicken breast (35g) + Quinoa (8g) + Mixed beans (7g)"
      },
      {
        title: "Post-Workout Snack (25g protein)",
        items: "• Whey protein shake (25g)"
      },
      {
        title: "Dinner (55g protein)",
        items: "• Salmon fillet (40g) + Lentils (9g) + Green peas (6g)"
      },
      {
        title: "Evening Snack (25g protein)",
        items: "• Cottage cheese (15g) + Handful of almonds (10g)"
      }
    ],
    vegetarian: [
      {
        title: "Breakfast (40g protein)",
        items: "• Tofu scramble (20g) + Greek yogurt (15g) + Protein oatmeal (5g)"
      },
      {
        title: "Lunch (50g protein)",
        items: "• Tempeh (30g) + Quinoa (8g) + Edamame (12g)"
      },
      {
        title: "Post-Workout Snack (25g protein)",
        items: "• Plant-based protein shake (25g)"
      },
      {
        title: "Dinner (55g protein)",
        items: "• Seitan (40g) + Lentils (9g) + Green peas (6g)"
      },
      {
        title: "Evening Snack (25g protein)",
        items: "• Soy yogurt (8g) + Mixed nuts (12g) + Hemp seeds (5g)"
      }
    ]
  };
  
  // Add this new reset function
  const resetForm = () => {
    setFormData({
        age: '',
        sex: 'male',
        heightFeet: '',
        heightInches: '',
        heightCm: '',
        weight: '',
        goal: 'maintenance',
        activityLevel: 'sedentary',
        units: 'imperial',
        _goalSelected: false,
        _activitySelected: false
    });
    setResult(null);
};

  const calculateProtein = () => {
    // Convert weight to number first
    let weightInLbs = Number(formData.weight);
    if (formData.units === 'metric') {
      weightInLbs = weightInLbs * 2.20462;
    }

    let multiplier = 0;
    switch(formData.goal) {
      case 'fat-loss': multiplier = 0.8; break;      // Was 1.2
      case 'maintenance': multiplier = 0.6; break;    // Keep same
      case 'muscle-gain': multiplier = 1.0; break;    // Was 1.6
    }
    
    switch(formData.activityLevel) {
      case 'sedentary': multiplier *= 1; break;       // Keep same
      case 'light': multiplier *= 1.05; break;        // Was 1.1
      case 'moderate': multiplier *= 1.1; break;      // Was 1.2
      case 'active': multiplier *= 1.15; break;       // Was 1.3
      case 'very-active': multiplier *= 1.2; break;   // Was 1.4
      case 'athlete': multiplier *= 1.25; break;      // Was 1.5
    }

    const proteinGrams = Math.round(weightInLbs * multiplier);
    setResult(proteinGrams);
};



const handleUnitChange = (checked: boolean) => {
  const newValue = checked ? 'metric' : 'imperial';
  const newFormData = { ...formData, units: newValue };
  
  if (newValue === 'metric' && formData.weight) {
    newFormData.weight = (Number(formData.weight) * 0.453592).toFixed(2);
    if (formData.heightFeet && formData.heightInches) {
      const totalInches = (parseInt(formData.heightFeet) * 12) + parseInt(formData.heightInches);
      newFormData.heightCm = Math.round(totalInches * 2.54).toString();
      newFormData.heightFeet = '';
      newFormData.heightInches = '';
    }
  } else if (newValue === 'imperial' && formData.weight) {
    newFormData.weight = (Number(formData.weight) * 2.20462).toFixed(2);
    if (formData.heightCm) {
      const totalInches = Number(formData.heightCm) / 2.54;
      newFormData.heightFeet = Math.floor(totalInches / 12).toString();
      newFormData.heightInches = Math.round(totalInches % 12).toString();
      newFormData.heightCm = '';
    }
  }
  
  setFormData(newFormData);
};

const safeTheme = isThemeKey(currentTheme) ? currentTheme : 'purple';

return (
  <div className={`min-h-screen bg-gradient-to-br ${themes[safeTheme].gradient} p-4 md:p-6`}>
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 space-y-4">
        <div className="text-center space-y-2">
          <div className="inline-block">
            <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${themes[safeTheme].title} text-transparent bg-clip-text`}>
              Protein Intake Calculator
            </h1>
            <div className={`h-1 w-full bg-gradient-to-r ${themes[safeTheme].title} rounded-full mt-2`} />
          </div>
          <p className="text-gray-600 text-lg">
            Optimize your protein intake for better health and performance
          </p>
        </div>

        
        <div className="flex justify-center gap-6">
          {[
            { icon: <DumbbellIcon className="w-5 h-5" />, text: "Build muscle", color: "bg-violet-100 text-violet-700" },
            { icon: <BrainIcon className="w-5 h-5" />, text: "Boost recovery", color: "bg-purple-100 text-purple-700" },
            { icon: <ActivityIcon className="w-5 h-5" />, text: "Improve health", color: "bg-indigo-100 text-indigo-700" }
          ].map((benefit, index) => (
            <div key={index} className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full shadow-sm ${benefit.color} transition-all duration-300 hover:scale-105`}>
              {benefit.icon}
              <span>{benefit.text}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-6 mb-3">  {/* Changed my-6 to mt-6 mb-4 */}
  <span className="text-sm text-gray-600">Color Theme:</span>
  <div className="flex gap-2">
    <button
      onClick={() => setCurrentTheme('purple')}
      className={`w-6 h-6 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 ${currentTheme === 'purple' ? 'ring-2 ring-offset-2 ring-purple-500' : ''}`}
      aria-label="Purple theme"
    />
              <button
                onClick={() => setCurrentTheme('blue')}
                className={`w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 ${currentTheme === 'blue' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                aria-label="Blue theme"
              />
              <button
                onClick={() => setCurrentTheme('green')}
                className={`w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 ${currentTheme === 'green' ? 'ring-2 ring-offset-2 ring-emerald-500' : ''}`}
                aria-label="Green theme"
              />
            </div>
          </div>
        </div>

        <div className="relative pt-8">
  <div className="flex justify-between mb-1 text-sm text-gray-600">
    <span>Form Progress</span>
    <span>{progress}% Complete</span>
  </div>
  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
    <div 
      className={`h-full bg-gradient-to-r ${themes[safeTheme].button} transition-all duration-500 ease-out rounded-full`}
      style={{ width: `${progress}%` }}
    />
  </div>
</div>

        <Card className="bg-white/90 backdrop-blur-sm border-none shadow-2xl transition-all duration-300 hover:shadow-3xl">
          <CardContent className="p-4 md:p-6">
            {/* New compact unit selector */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-violet-50 rounded-lg">
                <span className="text-xs font-medium text-gray-600">Units:</span>
                <div className="flex items-center gap-1 text-xs">
                  <span className={`${formData.units === 'imperial' ? 'text-violet-700' : 'text-gray-500'}`}>lb/ft</span>
                  <Switch
                    checked={formData.units === 'metric'}
                    onCheckedChange={handleUnitChange}
                    className="scale-75 data-[state=checked]:bg-violet-600"
                  />
                  <span className={`${formData.units === 'metric' ? 'text-violet-700' : 'text-gray-500'}`}>kg/cm</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Left Column */}
  <div className="space-y-4">
    {/* Age and Weight Row */}
    <div className="grid grid-cols-2 gap-4">
      <div className="group">
        <Label className="text-sm text-gray-700 group-hover:text-violet-700 transition-colors">Age</Label>
        <Input
  type="number"
  placeholder="Years"
  className="mt-1 bg-white/70 border-violet-300 focus:border-violet-500 focus:ring-violet-500 transition-all text-gray-800 placeholder:text-gray-500"
  value={formData.age}
  onChange={(e) => setFormData({...formData, age: e.target.value})}
/>
      </div>
      <div className="group">
        <Label className="text-sm text-gray-700 group-hover:text-violet-700 transition-colors">
          Weight ({formData.units === 'imperial' ? 'lbs' : 'kg'})
        </Label>
        <Input
  type="number"
  placeholder={formData.units === 'imperial' ? 'lbs' : 'kg'}
  className="mt-1 bg-white/70 border-violet-300 focus:border-violet-500 focus:ring-violet-500 transition-all text-gray-800 placeholder:text-gray-500"
  value={formData.weight}
  onChange={(e) => setFormData({...formData, weight: e.target.value})}
/>
      </div>
    </div>

    {/* Height Row - Using same grid as Age/Weight */}
    <div className="grid grid-cols-2 gap-4">
      {formData.units === 'imperial' ? (
        <>
          <div className="group">
            <Label className="text-sm text-gray-700 group-hover:text-violet-700 transition-colors">Height (ft)</Label>
            <Input
              placeholder="Feet"
              type="number"
              className="mt-1 bg-white/70 border-violet-300 focus:border-violet-500 focus:ring-violet-500 transition-all text-gray-800 placeholder:text-gray-500"
              value={formData.heightFeet}
              onChange={(e) => setFormData({...formData, heightFeet: e.target.value})}
            />
          </div>
          <div className="group">
            <Label className="text-sm text-gray-700 group-hover:text-violet-700 transition-colors">Height (in)</Label>
            <Input
              placeholder="Inches"
              type="number"
              className="mt-1 bg-white/70 border-violet-300 focus:border-violet-500 focus:ring-violet-500 transition-all text-gray-800 placeholder:text-gray-500"
              value={formData.heightInches}
              onChange={(e) => setFormData({...formData, heightInches: e.target.value})}
            />
          </div>
        </>
      ) : (
        <div className="group col-span-2">
          <Label className="text-sm text-gray-700 group-hover:text-violet-700 transition-colors">Height</Label>
          <Input
            placeholder="cm"
            type="number"
            className="mt-1 bg-white/70 border-violet-300 focus:border-violet-500 focus:ring-violet-500 transition-all text-gray-800 placeholder:text-gray-500"
            value={formData.heightCm}
            onChange={(e) => setFormData({...formData, heightCm: e.target.value})}
          />
        </div>
      )}
    </div>
  </div>

  {/* Right Column */}
  <div className="space-y-4">
    <div className="group">
      <Label className="text-sm text-gray-700 group-hover:text-violet-700 transition-colors">Goal</Label>
      <Select 
    value={formData.goal} 
    onValueChange={(value) => setFormData({
        ...formData, 
        goal: value, 
        _goalSelected: true
    })}
>
        <SelectTrigger className="mt-1 bg-white/70 border-violet-300 focus:border-violet-500 focus:ring-violet-500 transition-all text-gray-800">
          <SelectValue placeholder="Select your goal" className="text-gray-800" />
        </SelectTrigger>
        <SelectContent className="bg-white border-violet-200 text-gray-800">
          <SelectItem value="fat-loss" className="text-gray-800 hover:bg-violet-50">Fat Loss</SelectItem>
          <SelectItem value="maintenance" className="text-gray-800 hover:bg-violet-50">Maintenance</SelectItem>
          <SelectItem value="muscle-gain" className="text-gray-800 hover:bg-violet-50">Muscle Gain</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="group">
      <Label className="text-sm text-gray-700 group-hover:text-violet-700 transition-colors">Activity Level</Label>
      <Select 
    value={formData.activityLevel} 
    onValueChange={(value) => setFormData({
        ...formData, 
        activityLevel: value, 
        _activitySelected: true
    })}
>
        <SelectTrigger className="mt-1 bg-white/70 border-violet-300 focus:border-violet-500 focus:ring-violet-500 transition-all text-gray-800">
          <SelectValue placeholder="Select activity level" className="text-gray-800" />
        </SelectTrigger>
        <SelectContent className="bg-white border-violet-200 text-gray-800">
          <SelectItem value="sedentary" className="text-gray-800 hover:bg-violet-50">Sedentary (little or no exercise)</SelectItem>
          <SelectItem value="light" className="text-gray-800 hover:bg-violet-50">Light (1-3 times/week)</SelectItem>
          <SelectItem value="moderate" className="text-gray-800 hover:bg-violet-50">Moderate (3-5 times/week)</SelectItem>
          <SelectItem value="active" className="text-gray-800 hover:bg-violet-50">Active (daily exercise)</SelectItem>
          <SelectItem value="very-active" className="text-gray-800 hover:bg-violet-50">Very Active (6-7 times/week)</SelectItem>
          <SelectItem value="athlete" className="text-gray-800 hover:bg-violet-50">Professional Athlete</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</div>

{/* Sex and Calculate Button Row */}
<div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-end mt-4">
      <div className="w-full md:w-auto">
        <RadioGroup
          value={formData.sex}
          onValueChange={(value) => setFormData({...formData, sex: value})}
          className="flex gap-4"
        >
          {['male', 'female'].map((sex) => (
            <div key={sex} className="flex items-center gap-2 bg-white/70 px-4 py-2 rounded-lg border border-violet-300 hover:border-violet-500 transition-all">
              <RadioGroupItem value={sex} id={sex} className="text-violet-600 border-violet-400" />
              <Label htmlFor={sex} className="text-sm capitalize text-gray-800">{sex}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <div className="flex w-full gap-4">
        <Button 
          onClick={resetForm}
          variant="outline"
          className="w-1/3 bg-white border-2 border-violet-300 text-violet-600 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-violet-500"
        >
          Reset
        </Button>
        
        <Button 
          onClick={calculateProtein}
          className={"w-2/3 bg-gradient-to-r " + themes[safeTheme].button + " text-white py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"}
        >
          Calculate Protein Needs
        </Button>
      </div>
    </div>
    {result && (
      <div className={`mt-6 p-4 pb-6 bg-gradient-to-r ${themes[currentTheme].result} rounded-xl shadow-inner border ${themes[currentTheme].border}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-gray-800">Daily Protein Target</h3>
            <div className={`text-5xl font-bold bg-gradient-to-r ${themes[currentTheme].resultText} text-transparent bg-clip-text leading-tight pb-1`}>
              {result}g
            </div>
          </div>
          <div className="space-y-2">
            {[
              { icon: <ActivityIcon className="w-4 h-4" />, text: "Track daily", color: "text-violet-700" },
              { icon: <DumbbellIcon className="w-4 h-4" />, text: "Split between meals", color: "text-purple-700" },
              { icon: <BrainIcon className="w-4 h-4" />, text: "Adjust as needed", color: "text-indigo-700" }
            ].map((tip, index) => (
              <div key={index} className={`flex items-center gap-2 text-sm ${tip.color}`}>
                {tip.icon}
                <span>{tip.text}</span>
              </div>
            ))}
          </div>
        </div>

    {/* New Diet Toggle Section */}
    <div className="mt-6 mb-4 flex items-center justify-between bg-white/50 p-3 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Meal Plan Type:</span>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${!isVegetarian ? 'text-violet-700' : 'text-gray-500'}`}>Regular</span>
            <Switch
              checked={isVegetarian}
              onCheckedChange={setIsVegetarian}
              className="data-[state=checked]:bg-violet-600"
            />
            <span className={`text-sm ${isVegetarian ? 'text-violet-700' : 'text-gray-500'}`}>Vegetarian</span>
          </div>
        </div>

        {/* Updated Meal Plan Section */}
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
    )}
            <div className="mt-8">
  <AdUnit />
</div>
<div className="mt-4 text-left text-xs text-gray-400 flex gap-4"> {/* Added flex and gap-4 */}
  <Link href="/privacy" className="hover:text-violet-600 transition-colors">
    Privacy Policy
  </Link>
  <Link href="/about" className="hover:text-violet-600 transition-colors">
    About & Contact
  </Link>
</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProteinCalculator;
