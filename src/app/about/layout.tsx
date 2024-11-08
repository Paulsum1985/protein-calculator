import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Our Protein Calculator | Expert Nutrition Tools',
  description: 'Learn about our free protein calculator tool and how it helps you optimize your nutrition and fitness goals',
  keywords: 'protein calculator about, protein intake tool, nutrition calculator, fitness tools',
  openGraph: {
    title: 'About Our Protein Calculator | Expert Nutrition Tools',
    description: 'Learn about our free protein calculator tool and how it helps you optimize your nutrition and fitness goals',
    url: 'https://protein-calculator.co.uk/about',
  },
  alternates: {
    canonical: 'https://protein-calculator.co.uk/about'
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}