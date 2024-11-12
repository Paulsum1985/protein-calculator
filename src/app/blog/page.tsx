'use client'

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Define types for blog post structure
type BlogPost = {
  title: string;
  date: string;
  content: string;
};

type BlogPosts = {
  [key: string]: BlogPost;
};

// Sample blog post data with proper typing
const blogPosts: BlogPosts = {
  "how-much-protein-do-you-need": {
    title: "How Much Protein Do You Really Need? A Science-Based Guide",
    date: "2024-02-15",
    content: `
      <h2>Understanding Your Protein Needs</h2>
      <p>Protein is essential for building and maintaining muscle mass, supporting immune function, and numerous other biological processes. But how much do you really need?</p>
      
      <h3>The Science Behind Protein Requirements</h3>
      <p>Research shows that protein needs vary significantly based on several factors:</p>
      <ul>
        <li>Activity level and type of exercise</li>
        <li>Body composition goals</li>
        <li>Age and current health status</li>
        <li>Overall caloric intake</li>
      </ul>
    `
  },
  "vegetarian-protein-sources": {
    title: "Complete Guide to Protein Sources for Vegetarians",
    date: "2024-02-10",
    content: `
      <h2>Best Protein Sources for Vegetarians</h2>
      <p>Getting enough protein on a vegetarian diet is completely achievable with the right food choices.</p>
      
      <h3>Top Vegetarian Protein Sources</h3>
      <ul>
        <li>Lentils and beans</li>
        <li>Quinoa and other whole grains</li>
        <li>Tofu and tempeh</li>
        <li>Greek yogurt and eggs</li>
      </ul>
    `
  },
  "protein-timing-guide": {
    title: "Protein Timing: When Is the Best Time to Consume Protein?",
    date: "2024-02-05",
    content: `
      <h2>Optimal Protein Timing</h2>
      <p>When you consume protein can be just as important as how much you consume.</p>
      
      <h3>Key Timing Windows</h3>
      <ul>
        <li>Post-workout window</li>
        <li>Before bed</li>
        <li>First thing in morning</li>
        <li>Between meals</li>
      </ul>
    `
  }
};

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h1>
          <Link href="/blog" className="text-violet-600 hover:text-violet-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="text-violet-600 hover:text-violet-700">
          ← Back to Blog
        </Link>
        
        <article className="mt-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {post.title}
          </h1>
          <p className="text-gray-500 mb-8">{post.date}</p>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}