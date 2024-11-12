'use client'

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { blogPosts } from '../blogData';

export default function BlogPost() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const post = slug in blogPosts ? blogPosts[slug] : null;

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
        <Link 
          href="/blog" 
          className="inline-flex items-center text-violet-600 hover:text-violet-700 font-medium"
        >
          ← Back to Blog
        </Link>
        
        <article className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {post.title}
          </h1>
          <p className="text-gray-600 mb-8">{post.date}</p>
          
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-violet-600 hover:prose-a:text-violet-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}