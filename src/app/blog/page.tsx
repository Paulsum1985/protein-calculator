'use client'

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const blogPosts = [
  {
    id: 1,
    title: "How Much Protein Do You Really Need? A Science-Based Guide",
    slug: "how-much-protein-do-you-need",
    excerpt: "Discover the science behind protein requirements and learn how to calculate your optimal daily intake based on your goals and activity level.",
    date: "2024-02-15",
  },
  {
    id: 2,
    title: "Complete Guide to Protein Sources for Vegetarians",
    slug: "vegetarian-protein-sources",
    excerpt: "A comprehensive guide to plant-based protein sources, including complete proteins, combinations, and meal planning for vegetarians.",
    date: "2024-02-10",
  },
  {
    id: 3,
    title: "Protein Timing: When Is the Best Time to Consume Protein?",
    slug: "protein-timing-guide",
    excerpt: "Learn about the optimal timing of protein intake for muscle growth, recovery, and performance, backed by the latest research.",
    date: "2024-02-05",
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 py-8 px-4">
      {/* Title */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text mb-4">
          Protein Calculator Blog
        </h1>
        <p className="text-gray-600">
          Expert insights on protein, nutrition, and achieving your fitness goals
        </p>
      </div>

      {/* Blog Posts */}
      <div className="max-w-4xl mx-auto grid gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm mb-3">{post.date}</p>
              <p className="text-gray-600 mb-4">
                {post.excerpt}
              </p>
              <Link 
                href={`/blog/${post.slug}`}
                className="text-violet-600 hover:text-violet-700 font-medium"
              >
                Read More →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}