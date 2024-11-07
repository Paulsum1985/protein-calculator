// src/types/index.ts

export type ThemeKey = 'purple' | 'blue' | 'green';

export type Theme = {
  gradient: string;
  title: string;
  button: string;
  result: string;
  resultText: string;
  accent: string;
  accentHover: string;
  border: string;
};

export type Themes = {
  [key in ThemeKey]: Theme;
};

export interface FormData {
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