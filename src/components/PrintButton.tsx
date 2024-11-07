import React from 'react';
import { Button } from '@/components/ui/button';

const PrintButton = ({ result, mealPlan, isVegetarian }) => {
  const handlePrint = () => {
    // Create a new window for the printable content
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      // Generate HTML content for printing
      printWindow.document.write(`
        <html>
          <head>
            <title>Your Protein & Meal Plan</title>
            <style>
              body {
                font-family: -apple-system, system-ui, sans-serif;
                line-height: 1.5;
                padding: 2rem;
                max-width: 800px;
                margin: 0 auto;
              }
              .header {
                text-align: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid #e5e7eb;
              }
              .result {
                text-align: center;
                font-size: 1.5rem;
                margin-bottom: 2rem;
                padding: 1rem;
                background-color: #f3f4f6;
                border-radius: 0.5rem;
              }
              .meal {
                margin-bottom: 1.5rem;
                padding: 1rem;
                background-color: #f9fafb;
                border-radius: 0.5rem;
              }
              .meal-title {
                font-weight: bold;
                margin-bottom: 0.5rem;
                color: #4f46e5;
              }
              .footer {
                margin-top: 2rem;
                text-align: center;
                font-size: 0.875rem;
                color: #6b7280;
              }
              @media print {
                body {
                  padding: 1rem;
                }
                .meal {
                  break-inside: avoid;
                }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Your Daily Protein & Meal Plan</h1>
              <p>Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="result">
              <h2>Daily Protein Target: ${result}g</h2>
            </div>

            <h3>${isVegetarian ? 'Vegetarian' : 'Regular'} Meal Plan</h3>
            ${mealPlan.map(meal => `
              <div class="meal">
                <div class="meal-title">${meal.title}</div>
                <div>${meal.items}</div>
              </div>
            `).join('')}
            
            <div class="footer">
              <p>💪 Protein Calculator - Optimize your protein intake for better health and performance</p>
              <p>Remember to adjust portions as needed and consult with a healthcare professional.</p>
            </div>
          </body>
        </html>
      `);
      
      // Trigger print dialog
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <Button
      onClick={handlePrint}
      variant="outline"
      className="w-full bg-white/80 hover:bg-white/90 border border-violet-200 text-violet-600 hover:text-violet-700 transition-colors mt-4"
    >
      📄 Print Meal Plan
    </Button>
  );
};

export default PrintButton;