type BlogPost = {
  title: string;
  date: string;
  content: string;
};

export const blogPosts: Record<string, BlogPost> = {
  "protein-basics": {
    title: "Understanding Protein: The Basics",
    date: "2024-03-20",
    content: `
      <div class="text-gray-700">
        <div class="bg-yellow-50 p-4 rounded-lg mb-6">
          <p class="text-sm">Disclaimer: This article is for informational purposes only. While we strive to provide accurate information, we are not nutritionists or healthcare professionals. Always consult a qualified healthcare provider for personalized advice.</p>
        </div>

        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">What is Protein and Why Do We Need It?</h2>
        <p class="mb-4">Protein is one of the essential nutrients our body needs. It's often called the 'building block' of the body, and for good reason. From our muscles to our skin, protein plays a vital role in building and repairing tissues.</p>

        <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Common Sources of Protein</h3>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li class="text-gray-700">Meat and poultry</li>
          <li class="text-gray-700">Fish and seafood</li>
          <li class="text-gray-700">Eggs and dairy products</li>
          <li class="text-gray-700">Legumes and beans</li>
          <li class="text-gray-700">Nuts and seeds</li>
        </ul>

        <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">When Do We Need Protein?</h3>
        <p class="mb-4">We need protein throughout the day, but some key times include:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li class="text-gray-700">After waking up</li>
          <li class="text-gray-700">After exercise</li>
          <li class="text-gray-700">As part of main meals</li>
        </ul>

        <p class="mb-4">Use our protein calculator to get a general idea of your protein needs based on your weight and activity level.</p>
      </div>
    `
  },
  "protein-rich-foods": {
    title: "10 Easy-to-Find Protein-Rich Foods",
    date: "2024-03-15",
    content: `
      <div class="text-gray-700">
        <div class="bg-yellow-50 p-4 rounded-lg mb-6">
          <p class="text-sm">Disclaimer: This article is for informational purposes only. While we strive to provide accurate information, we are not nutritionists or healthcare professionals. Always consult a qualified healthcare provider for personalized advice.</p>
        </div>

        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Everyday Foods High in Protein</h2>
        <p class="mb-4">Finding protein-rich foods doesn't have to be complicated. Here are some common foods that are excellent sources of protein.</p>

        <div class="space-y-4">
          <div class="bg-white/50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-2">1. Eggs</h4>
            <p class="text-gray-700">A versatile breakfast staple that packs about 6g of protein per egg.</p>
          </div>

          <div class="bg-white/50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-2">2. Greek Yogurt</h4>
            <p class="text-gray-700">A creamy snack with roughly 15g of protein per serving.</p>
          </div>

          <div class="bg-white/50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-2">3. Chicken Breast</h4>
            <p class="text-gray-700">A lean meat option with about 25g of protein per serving.</p>
          </div>
        </div>

        <p class="mt-6">Remember to use our calculator to help determine your daily protein needs!</p>
      </div>
    `
  },
  "protein-myths": {
    title: "Common Myths About Protein",
    date: "2024-03-10",
    content: `
      <div class="text-gray-700">
        <div class="bg-yellow-50 p-4 rounded-lg mb-6">
          <p class="text-sm">Disclaimer: This article is for informational purposes only. While we strive to provide accurate information, we are not nutritionists or healthcare professionals. Always consult a qualified healthcare provider for personalized advice.</p>
        </div>

        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Separating Fact from Fiction</h2>
        <p class="mb-4">There are many myths about protein. Let's look at some common ones.</p>

        <div class="space-y-4">
          <div class="bg-white/50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-2">Myth 1: More Protein is Always Better</h4>
            <p class="text-gray-700">While protein is important, eating more than you need won't give extra benefits.</p>
          </div>

          <div class="bg-white/50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-2">Myth 2: You Can Only Get Protein From Meat</h4>
            <p class="text-gray-700">Many plant-based foods are excellent protein sources too.</p>
          </div>
        </div>

        <p class="mt-6">Use our calculator to find a reasonable protein target for your needs.</p>
      </div>
    `
  }
};