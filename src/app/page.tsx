'use client'

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from "@/components/ui/switch";
import { DumbbellIcon, ActivityIcon, BrainIcon } from 'lucide-react';
import AdUnit from '@/components/AdUnit';

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
    units: 'imperial'
  });
  const [result, setResult] = useState<number | null>(null);

  const calculateProtein = () => {
    // Convert weight to number first
    let weightInLbs = Number(formData.weight);
    if (formData.units === 'metric') {
      weightInLbs = weightInLbs * 2.20462;
    }

    let multiplier = 0;
    switch(formData.goal) {
      case 'fat-loss': multiplier = 1.2; break;
      case 'maintenance': multiplier = 0.8; break;
      case 'muscle-gain': multiplier = 1.6; break;
      default: multiplier = 0.8;
    }

    switch(formData.activityLevel) {
      case 'sedentary': multiplier *= 1; break;
      case 'light': multiplier *= 1.1; break;
      case 'moderate': multiplier *= 1.2; break;
      case 'active': multiplier *= 1.3; break;
      case 'very-active': multiplier *= 1.4; break;
      case 'athlete': multiplier *= 1.5; break;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 space-y-4">
          <div className="text-center space-y-2">
            <div className="inline-block">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                Protein Intake Calculator
              </h1>
              <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-full mt-2" />
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
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <Label className="text-sm text-gray-600 group-hover:text-violet-700 transition-colors">Age</Label>
                    <Input
                      type="number"
                      placeholder="Years"
                      className="mt-1 bg-white/70 border-violet-100 focus:border-violet-500 focus:ring-violet-500 transition-all"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                    />
                  </div>
                  <div className="group">
                    <Label className="text-sm text-gray-600 group-hover:text-violet-700 transition-colors">
                      Weight ({formData.units === 'imperial' ? 'lbs' : 'kg'})
                    </Label>
                    <Input
                      type="number"
                      placeholder={formData.units === 'imperial' ? 'lbs' : 'kg'}
                      className="mt-1 bg-white/70 border-violet-100 focus:border-violet-500 focus:ring-violet-500 transition-all"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-gray-600">Sex</Label>
                  <RadioGroup
                    value={formData.sex}
                    onValueChange={(value) => setFormData({...formData, sex: value})}
                    className="flex gap-4 mt-1"
                  >
                    {['male', 'female'].map((sex) => (
                      <div key={sex} className="flex items-center gap-2 bg-white/70 px-4 py-2 rounded-lg border border-violet-100 hover:border-violet-300 transition-all">
                        <RadioGroupItem value={sex} id={sex} className="text-violet-600" />
                        <Label htmlFor={sex} className="text-sm capitalize">{sex}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="group">
                  <Label className="text-sm text-gray-600 group-hover:text-violet-700 transition-colors">Height</Label>
                  {formData.units === 'imperial' ? (
                    <div className="grid grid-cols-2 gap-4 mt-1">
                      <Input
                        placeholder="Feet"
                        type="number"
                        className="bg-white/70 border-violet-100 focus:border-violet-500 focus:ring-violet-500 transition-all"
                        value={formData.heightFeet}
                        onChange={(e) => setFormData({...formData, heightFeet: e.target.value})}
                      />
                      <Input
                        placeholder="Inches"
                        type="number"
                        className="bg-white/70 border-violet-100 focus:border-violet-500 focus:ring-violet-500 transition-all"
                        value={formData.heightInches}
                        onChange={(e) => setFormData({...formData, heightInches: e.target.value})}
                      />
                    </div>
                  ) : (
                    <Input
                      placeholder="cm"
                      type="number"
                      className="mt-1 bg-white/70 border-violet-100 focus:border-violet-500 focus:ring-violet-500 transition-all"
                      value={formData.heightCm}
                      onChange={(e) => setFormData({...formData, heightCm: e.target.value})}
                    />
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="group">
                  <Label className="text-sm text-gray-600 group-hover:text-violet-700 transition-colors">Goal</Label>
                  <Select value={formData.goal} onValueChange={(value) => setFormData({...formData, goal: value})}>
                    <SelectTrigger className="mt-1 bg-white/70 border-violet-100 focus:border-violet-500 focus:ring-violet-500 transition-all">
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fat-loss">Fat Loss</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="group">
                  <Label className="text-sm text-gray-600 group-hover:text-violet-700 transition-colors">Activity Level</Label>
                  <Select value={formData.activityLevel} onValueChange={(value) => setFormData({...formData, activityLevel: value})}>
                    <SelectTrigger className="mt-1 bg-white/70 border-violet-100 focus:border-violet-500 focus:ring-violet-500 transition-all">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                      <SelectItem value="light">Light (1-3 times/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (3-5 times/week)</SelectItem>
                      <SelectItem value="active">Active (daily exercise)</SelectItem>
                      <SelectItem value="very-active">Very Active (6-7 times/week)</SelectItem>
                      <SelectItem value="athlete">Professional Athlete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={calculateProtein}
                  className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 hover:from-violet-600 hover:via-purple-600 hover:to-indigo-600 text-white py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Calculate Protein Needs
                </Button>
              </div>
            </div>

            {result && (
              <div className="mt-6 p-4 pb-6 bg-gradient-to-r from-violet-100 via-purple-100 to-indigo-100 rounded-xl shadow-inner border border-violet-200">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-gray-800">Daily Protein Target</h3>
                    <div className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text leading-tight pb-1">
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
              </div>
            )}
            <div className="mt-8">
              <AdUnit />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProteinCalculator;
