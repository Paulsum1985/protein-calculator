'use client'

import React, { useState, useEffect, useCallback } from 'react';
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
import PrintButton from '@/components/PrintButton';
import { themeColors, ThemeKey as AppThemeKey, ThemeColorProperties } from '@/lib/themeColors';

type Meal = {
  title: string;
  items: string;
};

interface FormData {
  age: string;
  sex: string;
  heightFeet: string;
  heightInches: string;
  heightCm: string;
  weight: string;
  goal: string;
  activityLevel: string;
  units: string;
}

function isThemeKey(key: string): key is AppThemeKey {
  return Object.keys(themeColors).includes(key);
}

// Removed themes_gradients object

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Protein Intake Calculator",
  "description": "Calculate your daily protein requirements based on your weight, activity level, and fitness goals.",
  "url": "https://protein-calculator.co.uk",
  "applicationCategory": "HealthApplication",
  "features": [
    "Calculate daily protein needs",
    "Personalized meal plans",
    "Activity level adjustment",
    "Weight management guidance"
  ],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const ProteinCalculator = () => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    sex: 'male',
    heightFeet: '',
    heightInches: '',
    heightCm: '',
    weight: '',
    goal: '',
    activityLevel: '',
    units: 'imperial'
  });
  const [result, setResult] = useState<number | null>(null);
  const [currentTheme, setCurrentTheme] = useState<AppThemeKey>('purple');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const applyThemeColors = (isDarkMode: boolean) => {
      const activeThemePalette = themeColors[currentTheme];
      for (const [key, lightValue] of Object.entries(activeThemePalette)) {
        if (key.endsWith('-dark')) continue; // Skip -dark variants in the main loop

        let colorValue = lightValue;
        if (isDarkMode) {
          const darkKey = `${key}-dark` as ThemeColorProperties;
          if (activeThemePalette[darkKey]) {
            colorValue = activeThemePalette[darkKey];
          }
          // If a specific -dark variant doesn't exist for a color,
          // it will fall back to the light variant.
        }
        // Ensure key is a valid CSS property name
        document.documentElement.style.setProperty(`--theme-${key.replace('-hover', '_hover')}`, colorValue as string);
      }
    };

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    applyThemeColors(darkModeMediaQuery.matches); // Apply on initial load

    // Removed document.body.className manipulation

    const handleChange = (e: MediaQueryListEvent) => {
      applyThemeColors(e.matches);
    };

    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
    };
  }, [currentTheme]); // Re-run when currentTheme changes or dark mode changes
 
  // Progress calculation functions next
  const calculateProgress = useCallback(() => {
    let completedFields = 0;
    let totalFields = 0;

    const requiredFields = [
      { field: 'age', condition: !!formData.age },
      { field: 'weight', condition: !!formData.weight },
      { field: 'height', condition: formData.units === 'imperial' 
        ? !!(formData.heightFeet && formData.heightInches)
        : !!formData.heightCm },
      { field: 'sex', condition: !!formData.sex },
      { field: 'goal', condition: !!formData.goal },
      { field: 'activityLevel', condition: !!formData.activityLevel }
    ];

    totalFields = requiredFields.length;
    completedFields = requiredFields.filter(field => field.condition).length;

    return Math.round((completedFields / totalFields) * 100);
}, [formData]);

useEffect(() => {
  const newProgress = calculateProgress();
  setProgress(newProgress);
}, [formData, calculateProgress]);

  
  // Add this new reset function
  const resetForm = () => {
    setFormData({
        age: '',
        sex: 'male',
        heightFeet: '',
        heightInches: '',
        heightCm: '',
        weight: '',
        goal: '',           // Changed to empty
        activityLevel: '',  // Changed to empty
        units: 'imperial'
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

// Then add the type declarations to the functions
const scaleMealPlan = (baseMeal: Meal, targetProtein: number): Meal => {
  // Calculate total protein in current meal
  const mealProtein = Number(baseMeal.title.match(/\((\d+)g protein\)/)?.[1] || 0);
  
  // Calculate what fraction this meal should be of the target
  const fraction = mealProtein / 195;  // 195g is the base plan total
  
  // Calculate new protein amount for this meal
  const newProtein = Math.round(targetProtein * fraction);
  
  // Get the individual food items
  const items = baseMeal.items.split(' + ');
  
  // Scale each item's protein
  const newItems = items.map(item => {
      const match = item.match(/\((\d+)g\)/);
      if (!match) return item;
      const itemProtein = Number(match[1]);
      const itemFraction = itemProtein / mealProtein;
      const newItemProtein = Math.round(newProtein * itemFraction);
      return item.replace(/\(\d+g\)/, `(${newItemProtein}g)`);
  }).join(' + ');
  
  return {
      title: baseMeal.title.replace(/\(\d+g protein\)/, `(${newProtein}g protein)`),
      items: newItems
  };
};

const getMealPlans = (targetProtein: number) => ({
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
  ].map(meal => scaleMealPlan(meal, targetProtein)),
  
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
  ].map(meal => scaleMealPlan(meal, targetProtein))
});

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

return (
  <div className={`min-h-screen p-4 md:p-6 bg-[hsl(var(--theme-page-bg))] transition-colors duration-300`}>
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 space-y-4">
        <div className="text-center space-y-1">
          {/* Removed style jsx global block for fonts */}
  
  {/* Title Container */}
  <div className="relative inline-block w-full max-w-3xl px-4 animate-fade-in-up">
    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-lg blur-xl opacity-70" />
    
    <div className="relative">
      <h1 
        className={`font-rowdies text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text tracking-tight leading-tight`}
      >
        Protein Calculator
      </h1>
      <div className="relative mt-2">
        <div className={`h-1 w-full bg-gradient-to-r from-primary via-accent to-primary rounded-full`} />
      </div>
    </div>
  </div>

  <p 
    className="mt-2 text-foreground/80 text-xs sm:text-sm md:text-base font-medium tracking-wide px-4 animate-fade-in-up delay-200" // font-sans will be inherited
  >
    Optimize your protein intake for better health and performance
  </p>
</div>
        
<div className="flex justify-center flex-wrap gap-2 sm:gap-6 mt-2">
  {[
    { icon: <DumbbellIcon className="w-4 h-4 sm:w-5 sm:h-5" />, text: "Build muscle", color: "bg-accent/20 text-accent" },
    { icon: <BrainIcon className="w-4 h-4 sm:w-5 sm:h-5" />, text: "Boost recovery", color: "bg-accent/20 text-accent" },
    { icon: <ActivityIcon className="w-4 h-4 sm:w-5 sm:h-5" />, text: "Improve health", color: "bg-accent/20 text-accent" }
  ].map((benefit, index) => (
    <div 
      key={index} 
      className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm backdrop-blur-sm ${benefit.color} 
                 transition-all duration-300 hover:scale-105 hover:shadow-md whitespace-nowrap`}
    >
      {benefit.icon}
      <span className="font-medium">{benefit.text}</span>
    </div>
  ))}
</div>

        <div className="flex items-center justify-center gap-2 mb-1">  {/* Removed mt-4, relying on parent space-y-4 */}
  <span className="text-sm text-foreground/80">Color Theme:</span>
  <div className="flex gap-2">
    <button
      onClick={() => { if (isThemeKey('purple')) setCurrentTheme('purple'); }}
      className={`w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 via-purple-500 to-indigo-500 ${currentTheme === 'purple' ? 'ring-2 ring-offset-2 ring-purple-500' : ''}`}
      aria-label="Purple theme"
    />
              <button
                onClick={() => { if (isThemeKey('blue')) setCurrentTheme('blue'); }}
                className={`w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 ${currentTheme === 'blue' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                aria-label="Blue theme"
              />
              <button
                onClick={() => { if (isThemeKey('green')) setCurrentTheme('green'); }}
                className={`w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 ${currentTheme === 'green' ? 'ring-2 ring-offset-2 ring-emerald-500' : ''}`}
                aria-label="Green theme"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 mb-6"> {/* Increased mt from 0 to 4 */}
  <div className="flex justify-between mb-1 text-sm text-gray-600">
    <span>Form Progress</span>
    <span>{progress}% Complete</span>
  </div>
  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
    <div 
      className={`h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-500 ease-out rounded-full`}
      style={{ width: `${progress}%` }}
    />
  </div>
</div>

<Card> {/* Removed direct styling, relies on Card component's new base style */}
          <CardContent className="p-4 md:p-6">
            {/* New compact unit selector */}
            <div className="mb-6">
  <div className="inline-flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
    <span className="text-xs font-medium text-foreground/80">Units:</span>
    <div className="flex items-center gap-1 text-xs">
      <span className={`${formData.units === 'imperial' ? 'text-primary' : 'text-foreground/60'}`}>lb/ft</span>
      <Switch // Switch component itself is themed, specific classes here might be redundant or simplified
        checked={formData.units === 'metric'}
        onCheckedChange={handleUnitChange}
        className="scale-75" // Simplified, rely on component styles
      />
      <span className={`${formData.units === 'metric' ? 'text-primary' : 'text-foreground/60'}`}>kg/cm</span>
    </div>
  </div>
</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Left Column */}
  <div className="space-y-4">
    {/* Age and Weight Row */}
    <div className="grid grid-cols-2 gap-4">
      <div className="group">
        <Label className="text-sm text-foreground/90 group-hover:text-primary transition-colors">Age</Label>
        <Input // Removed direct styling, relies on Input component's new base style
  type="number"
  placeholder="Years"
  className="mt-1 text-foreground placeholder:text-accent/70"
  value={formData.age}
  onChange={(e) => setFormData({...formData, age: e.target.value})}
/>
      </div>
      <div className="group">
        <Label className="text-sm text-foreground/90 group-hover:text-primary transition-colors">
          Weight ({formData.units === 'imperial' ? 'lbs' : 'kg'})
        </Label>
        <Input // Removed direct styling
  type="number"
  placeholder={formData.units === 'imperial' ? 'lbs' : 'kg'}
  className="mt-1 text-foreground placeholder:text-accent/70"
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
            <Label className="text-sm text-foreground/90 group-hover:text-primary transition-colors">Height (ft)</Label>
            <Input // Removed direct styling
              placeholder="Feet"
              type="number"
              className="mt-1 text-foreground placeholder:text-accent/70"
              value={formData.heightFeet}
              onChange={(e) => setFormData({...formData, heightFeet: e.target.value})}
            />
          </div>
          <div className="group">
            <Label className="text-sm text-foreground/90 group-hover:text-primary transition-colors">Height (in)</Label>
            <Input // Removed direct styling
              placeholder="Inches"
              type="number"
              className="mt-1 text-foreground placeholder:text-accent/70"
              value={formData.heightInches}
              onChange={(e) => setFormData({...formData, heightInches: e.target.value})}
            />
          </div>
        </>
      ) : (
        <div className="group col-span-2">
          <Label className="text-sm text-foreground/90 group-hover:text-primary transition-colors">Height</Label>
          <Input // Removed direct styling
            placeholder="cm"
            type="number"
            className="mt-1 text-foreground placeholder:text-accent/70"
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
      <Label className="text-sm text-foreground/90 group-hover:text-primary transition-colors">Goal</Label>
      {/* Goal Select */}
<Select value={formData.goal} onValueChange={(value) => setFormData({...formData, goal: value})}>
  <SelectTrigger className="mt-1 text-foreground"> {/* Removed direct styling */}
    <SelectValue placeholder="Select your goal" />
  </SelectTrigger>
  <SelectContent> {/* Removed direct styling, relies on component's base style */}
    <SelectItem value="fat-loss">Fat Loss</SelectItem>
    <SelectItem value="maintenance">Maintenance</SelectItem>
    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
  </SelectContent>
</Select>

    </div>

    <div className="group">
      <Label className="text-sm text-foreground/90 group-hover:text-primary transition-colors">Activity Level</Label>
      <Select 
    value={formData.activityLevel} 
    onValueChange={(value) => setFormData({
        ...formData, 
        activityLevel: value,
    })}
>
        <SelectTrigger className="mt-1 text-foreground"> {/* Removed direct styling */}
          <SelectValue placeholder="Select activity level" />
        </SelectTrigger>
        <SelectContent> {/* Removed direct styling */}
        <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
          <SelectItem value="light">Light (1-3 times/week)</SelectItem>
          <SelectItem value="moderate">Moderate (3-5 times/week)</SelectItem>
          <SelectItem value="active">Active (daily exercise)</SelectItem>
          <SelectItem value="very-active">Very Active (6-7 times/week)</SelectItem>
          <SelectItem value="athlete">Professional Athlete</SelectItem>
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
            <div key={sex} className="flex items-center gap-2 bg-card-bg/50 px-4 py-2 rounded-lg border border-card-border hover:border-primary transition-all">
              <RadioGroupItem value={sex} id={sex} /> {/* RadioGroupItem is now themed, direct class might be redundant */}
              <Label htmlFor={sex} className="text-sm capitalize text-foreground">{sex}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <div className="flex w-full gap-4">
        <Button 
          onClick={resetForm}
          variant="outline" // This will now use the themed outline variant
          className="w-1/3 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]" // Removed theme-specific classes
        >
          Reset
        </Button>
        
        <Button 
          onClick={calculateProtein}
          className={"w-2/3 bg-primary hover:bg-primary-hover text-text-on-primary py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"}
        >
          Calculate Protein Needs
        </Button>
      </div>
    </div>
    {result && (
  <div className={`mt-6 p-4 pb-6 bg-card-bg/80 rounded-xl shadow-inner border border-card-border`}>
    <div className="flex items-center justify-between mb-4">
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-foreground">Daily Protein Target</h3>
        <div className={`text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text leading-tight pb-1`}>
          {result}g
        </div>
      </div>
      <div className="space-y-2">
        {[
          { icon: <ActivityIcon className="w-4 h-4" />, text: "Track daily", color: "text-primary" }, 
          { icon: <DumbbellIcon className="w-4 h-4" />, text: "Split between meals", color: "text-accent" }, 
          { icon: <BrainIcon className="w-4 h-4" />, text: "Improve health", color: "text-primary" } 
        ].map((tip, index) => (
          <div key={index} className={`flex items-center gap-2 text-sm ${tip.color}`}>
            {tip.icon}
            <span>{tip.text}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-6 mb-4 flex items-center justify-between bg-card-bg/50 p-3 rounded-lg">
      <span className="text-sm font-medium text-foreground/90">Meal Plan Type:</span>
      <div className="flex items-center gap-2">
        <span className={`text-sm ${!isVegetarian ? 'text-primary' : 'text-foreground/60'}`}>Regular</span>
        <Switch // Switch component itself is themed
          checked={isVegetarian}
          onCheckedChange={setIsVegetarian}
          className="scale-75" // Simplified
        />
        <span className={`text-sm ${isVegetarian ? 'text-primary' : 'text-foreground/60'}`}>Vegetarian</span>
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="font-semibold text-foreground">
        Sample Daily Meal Plan {isVegetarian ? '(Vegetarian)' : ''}
      </h4>
      <div className="grid gap-3">
        {(isVegetarian ? getMealPlans(result).vegetarian : getMealPlans(result).regular).map((meal, index) => (
          <div key={index} className="bg-card-bg/50 p-3 rounded-lg">
            <div className="font-medium text-primary">{meal.title}</div>
            <div className="text-sm text-foreground/80">{meal.items}</div>
          </div>
        ))}
      </div>
          
      <div className="text-xs text-foreground/60 mt-2">
        * Protein content is approximate. Actual values may vary based on portion sizes and specific products.
      </div>

      <PrintButton 
        result={result}
        mealPlan={isVegetarian ? getMealPlans(result).vegetarian : getMealPlans(result).regular}
        isVegetarian={isVegetarian}
      />
    </div>
  </div>
)}

<div className="mt-8 space-y-6">
  <Card> {/* Relies on Card's base styling */}
    <CardContent className="p-6">
      <h2 className="text-2xl font-bold text-foreground mb-4">Understanding Protein Requirements</h2>
      <div className="prose text-foreground/80 space-y-4">
        <p>
          Protein is an essential macronutrient that plays crucial roles in your body, including:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Building and repairing muscle tissue</li>
          <li>Supporting immune system function</li>
          <li>Producing enzymes and hormones</li>
          <li>Maintaining healthy skin, hair, and nails</li>
          <li>Promoting satiety and weight management</li>
        </ul>
      </div>
    </CardContent>
  </Card>

  <div className="grid md:grid-cols-2 gap-6">
    <Card> {/* Relies on Card's base styling */}
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-3">Factors Affecting Protein Needs</h3>
        <ul className="space-y-3 text-foreground/80">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span><strong>Activity Level:</strong> More active individuals require higher protein intake to support muscle recovery and growth.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span><strong>Age:</strong> Protein needs may increase with age to help maintain muscle mass.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span><strong>Goals:</strong> Requirements vary based on whether you are building muscle, losing fat, or maintaining weight.</span>
          </li>
        </ul>
      </CardContent>
    </Card>

    <Card> {/* Relies on Card's base styling */}
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-3">Quality Protein Sources</h3>
        <div className="grid grid-cols-2 gap-4 text-foreground/80">
          <div>
            <h4 className="font-medium text-primary mb-2">Animal Sources</h4>
            <ul className="space-y-1">
              <li>• Chicken Breast (31g/100g)</li>
              <li>• Salmon (25g/100g)</li>
              <li>• Eggs (13g/100g)</li>
              <li>• Greek Yogurt (10g/100g)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-2">Plant Sources</h4>
            <ul className="space-y-1">
              <li>• Lentils (9g/100g)</li>
              <li>• Quinoa (4.4g/100g)</li>
              <li>• Chickpeas (8.9g/100g)</li>
              <li>• Tofu (8g/100g)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>

  <Card> {/* Relies on Card's base styling */}
    <CardContent className="p-6">
      <h2 className="text-2xl font-bold text-foreground mb-4">Tips for Meeting Your Protein Goals</h2>
      <div className="grid md:grid-cols-3 gap-6 text-foreground/80">
        <div>
          <h4 className="font-medium text-primary mb-2">Timing Matters</h4>
          <p>Distribute protein intake evenly throughout the day, aiming for 20-30g per meal to optimize muscle protein synthesis.</p>
        </div>
        <div>
          <h4 className="font-medium text-primary mb-2">Quality Over Quantity</h4>
          <p>Focus on complete protein sources containing all essential amino acids. Combine different plant proteins if following a vegetarian diet.</p>
        </div>
        <div>
          <h4 className="font-medium text-primary mb-2">Post-Workout Nutrition</h4>
          <p>Consume protein within 2 hours after exercise to support muscle recovery and adaptation.</p>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card> {/* Relies on Card's base styling */}
  <CardContent className="p-6">
    <h2 className="text-2xl font-bold text-foreground mb-4">Common Protein Myths</h2>
    <div className="space-y-4 text-foreground/80">
      <div className="flex items-start gap-3">
        <span className="text-primary font-bold text-xl">✕</span>
        <div>
          <h4 className="font-medium text-primary">Myth: More protein is always better</h4>
          <p>Truth: Excessive protein intake offers no additional benefits and may stress kidneys in certain individuals.</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <span className="text-primary font-bold text-xl">✕</span>
        <div>
          <h4 className="font-medium text-primary">Myth: Plant proteins are incomplete</h4>
          <p>Truth: Many plant proteins are complete, and combining different sources ensures adequate amino acid intake.</p>
        </div>
      </div>
    </div>
  </CardContent>
</Card>

<Card> {/* Relies on Card's base styling */}
  <CardContent className="p-6">
    <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
    <div className="space-y-6">
      <div className="border-b border-card-border pb-4">
        <h3 className="text-lg font-medium text-primary mb-2">Should protein intake be different for men and women?</h3>
        <p className="text-foreground/80">While the basic protein requirements are similar, men typically need more total protein due to higher average body weight and muscle mass. However, the recommended amount per pound of body weight remains consistent regardless of gender.</p>
      </div>

      <div className="border-b border-card-border pb-4">
        <h3 className="text-lg font-medium text-primary mb-2">How does illness or injury affect protein needs?</h3>
        <p className="text-foreground/80">During illness or injury, protein requirements often increase to support healing and prevent muscle loss. Consider increasing intake by 20-30% during recovery periods, and consult with a healthcare provider for personalized advice.</p>
      </div>

      <div className="border-b border-card-border pb-4">
        <h3 className="text-lg font-medium text-primary mb-2">Do protein requirements change as we age?</h3>
        <p className="text-foreground/80">Yes, older adults often need more protein to prevent age-related muscle loss (sarcopenia). Research suggests adults over 65 may benefit from 1.0-1.2g of protein per kg body weight, compared to 0.8g for younger adults.</p>
      </div>

      <div className="border-b border-card-border pb-4">
        <h3 className="text-lg font-medium text-primary mb-2">Should I adjust protein intake when cutting calories?</h3>
        <p className="text-foreground/80">Yes, maintaining or slightly increasing protein intake while cutting calories helps preserve muscle mass during weight loss. Aim for the higher end of your recommended protein range when in a caloric deficit.</p>
      </div>

      <div>
        <h3 className="text-lg font-medium text-primary mb-2">How do I track protein intake accurately?</h3>
        <p className="text-foreground/80">Use food scales for precise measurements, read nutrition labels carefully, and consider using food tracking apps. For whole foods without labels, refer to reliable nutrition databases. Be consistent with your tracking method for best results.</p>
      </div>
    </div>
  </CardContent>
</Card>
    <div className="mt-8">
      <AdUnit />
    </div>
    <div className="mt-4 text-left text-xs text-foreground/60 flex gap-4">
  <Link href="/privacy"> {/* General link styles from globals.css will apply hover */}
    Privacy Policy
  </Link>
  <Link href="/about">
    About & Contact
  </Link>
  <Link href="/terms">
    Terms of Service
  </Link>
</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProteinCalculator;