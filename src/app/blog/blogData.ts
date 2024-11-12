type BlogPost = {
  title: string;
  date: string;
  content: string;
};

export const blogPosts: Record<string, BlogPost> = {
  "how-much-protein-do-you-need": {
    title: "How Much Protein Do You Really Need? A Science-Based Guide",
    date: "2024-02-15",
    content: `
      <div class="text-gray-700">
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Understanding Your Protein Needs</h2>
        <p class="mb-4">Protein is essential for building and maintaining muscle mass, supporting immune function, and numerous other biological processes. But how much do you really need?</p>
        
        <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">The Science Behind Protein Requirements</h3>
        <p class="mb-4">Research shows that protein needs vary significantly based on several factors:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li class="text-gray-700">Activity level and type of exercise</li>
          <li class="text-gray-700">Body composition goals</li>
          <li class="text-gray-700">Age and current health status</li>
          <li class="text-gray-700">Overall caloric intake</li>
        </ul>

        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Daily Protein Requirements By Goal</h2>
        <div class="space-y-4">
          <div class="bg-white/50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-2">For Muscle Gain:</h4>
            <p class="text-gray-700">1.6-2.2g of protein per kg of body weight</p>
          </div>
          
          <div class="bg-white/50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-2">For Weight Loss:</h4>
            <p class="text-gray-700">1.8-2.4g of protein per kg of body weight</p>
          </div>
          
          <div class="bg-white/50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-2">For Maintenance:</h4>
            <p class="text-gray-700">1.4-1.6g of protein per kg of body weight</p>
          </div>
        </div>
      </div>
    `
  },
  "vegetarian-protein-sources": {
    title: "Complete Guide to Protein Sources for Vegetarians",
    date: "2024-02-10",
    content: `
      <div class="text-gray-700">
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Best Protein Sources for Vegetarians</h2>
        <p class="mb-4">Getting enough protein on a vegetarian diet is completely achievable with the right food choices.</p>
        
        <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Top Vegetarian Protein Sources</h3>
        <div class="grid gap-4 mb-6">
          <div class="bg-white/50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-2">Legumes</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li class="text-gray-700">Lentils (18g per cup)</li>
              <li class="text-gray-700">Chickpeas (15g per cup)</li>
              <li class="text-gray-700">Black beans (15g per cup)</li>
            </ul>
          </div>
          
          <div class="bg-white/50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-2">Whole Grains</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li class="text-gray-700">Quinoa (8g per cup)</li>
              <li class="text-gray-700">Oats (6g per cup)</li>
              <li class="text-gray-700">Wild rice (7g per cup)</li>
            </ul>
          </div>
          
          <div class="bg-white/50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-2">Soy Products</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li class="text-gray-700">Tofu (20g per cup)</li>
              <li class="text-gray-700">Tempeh (31g per cup)</li>
              <li class="text-gray-700">Edamame (17g per cup)</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  "protein-timing-guide": {
    title: "Protein Timing: When Is the Best Time to Consume Protein?",
    date: "2024-02-05",
    content: `
      <div class="text-gray-700">
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Optimal Protein Timing</h2>
        <p class="mb-6">When you consume protein can be just as important as how much you consume. Strategic timing can help maximize muscle growth, recovery, and overall results.</p>
        
        <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-4">Key Timing Windows</h3>
        <div class="space-y-4">
          <div class="bg-white/50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-2">Post-workout Window</h4>
            <p class="text-gray-700">Consume 20-30g protein within 2 hours after exercise to optimize recovery</p>
          </div>
          
          <div class="bg-white/50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-2">Before Bed</h4>
            <p class="text-gray-700">Slow-digesting protein helps prevent muscle breakdown during sleep</p>
          </div>
          
          <div class="bg-white/50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-2">First Thing in Morning</h4>
            <p class="text-gray-700">Replenish protein stores depleted during overnight fasting</p>
          </div>
          
          <div class="bg-white/50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-2">Between Meals</h4>
            <p class="text-gray-700">Maintain steady protein availability throughout the day</p>
          </div>
        </div>

        <h3 class="text-xl font-semibold text-gray-800 mt-8 mb-4">Protein Distribution Tips</h3>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li class="text-gray-700">Aim for 20-30g protein per meal</li>
          <li class="text-gray-700">Space meals 3-4 hours apart</li>
          <li class="text-gray-700">Include protein in pre and post workout meals</li>
          <li class="text-gray-700">Consider a slow-digesting protein before bed</li>
        </ul>
      </div>
    `
  }
};