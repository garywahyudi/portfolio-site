'use client';

import { useEffect, useState } from 'react';
import BlogCard from '@/components/blog/BlogCard';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  published_date: string;
  tags: string[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Temporarily use mock data for development
  useEffect(() => {
    if (posts.length === 0 && !loading) {
      setPosts([
        {
          id: '1',
          title: 'Getting Started with Next.js 14',
          content: 'Next.js 14 introduces several new features including improved...',
          author: 'John Doe',
          published_date: new Date(2025, 5, 15).toISOString(),
          tags: ['Next.js', 'React', 'Web Development']
        },
        {
          id: '2',
          title: 'Python FastAPI for Modern APIs',
          content: 'FastAPI is a modern, fast (high-performance) web framework for building APIs...',
          author: 'Jane Smith',
          published_date: new Date(2025, 5, 10).toISOString(),
          tags: ['Python', 'FastAPI', 'Backend']
        }
      ]);
    }
  }, [loading, posts]);

  const getPostExcerpt = (content: string): string => {
    return content.length > 150 ? `${content.substring(0, 150)}...` : content;
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Blog</h1>
        
        {loading && (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading posts...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
            <p className="text-gray-500 mt-2">Please try again later.</p>
          </div>
        )}
        
        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No blog posts found.</p>
          </div>
        )}
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              title={post.title}
              excerpt={getPostExcerpt(post.content)}
              publishedDate={post.published_date}
              author={post.author}
              tags={post.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
