'use client'

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { blogPosts } from './blogData';
import { ArrowLeft } from 'lucide-react';

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 py-8 px-4">
      {/* Calculator Link */}
      <div className="max-w-4xl mx-auto mb-4">
        <Link 
          href="/" 
          className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 hover:bg-white/90 text-violet-600 text-sm font-medium transition-all duration-200 hover:shadow-sm backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calculator
        </Link>
      </div>

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
        {Object.entries(blogPosts).map(([slug, post]) => (
          <Card key={slug} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm mb-4">{post.date}</p>
              <Link 
                href={`/blog/${slug}`}
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