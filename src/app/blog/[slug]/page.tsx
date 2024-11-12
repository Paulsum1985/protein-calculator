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