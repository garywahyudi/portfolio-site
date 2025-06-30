'use client';

import { useEffect, useState } from 'react';
import BlogPost from '@/components/blog/BlogPost';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  published_date: string;
  tags: string[];
}

export default function BlogPostPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Temporarily use mock data for development
  useEffect(() => {
    if (!post && !loading) {
      // Mock data based on ID
      if (id === '1') {
        setPost({
          id: '1',
          title: 'Getting Started with Next.js 14',
          content: `<p>Next.js 14 introduces several new features including improved build times, better developer experience, and enhanced performance. This post explores the key features and how to get started with this powerful framework.</p>
          <h2>Server Components</h2>
          <p>React Server Components allow developers to build applications that span the server and client, combining the rich interactivity of client-side apps with the improved performance of traditional server rendering.</p>
          <h2>Improved Routing</h2>
          <p>The new App Router provides a more intuitive and powerful routing system, making it easier to create complex applications with nested routes.</p>`,
          author: 'John Doe',
          published_date: new Date(2025, 5, 15).toISOString(),
          tags: ['Next.js', 'React', 'Web Development']
        });
      } else if (id === '2') {
        setPost({
          id: '2',
          title: 'Python FastAPI for Modern APIs',
          content: `<p>FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints. It's one of the fastest Python frameworks available, on par with NodeJS and Go.</p>
          <h2>Key Features</h2>
          <ul>
            <li>Fast: Very high performance, on par with NodeJS and Go</li>
            <li>Intuitive: Great editor support with completion everywhere</li>
            <li>Easy: Designed to be easy to use and learn</li>
            <li>Short: Minimize code duplication</li>
          </ul>
          <p>In this post, we'll explore how to build a modern API with FastAPI and deploy it to production.</p>`,
          author: 'Jane Smith',
          published_date: new Date(2025, 5, 10).toISOString(),
          tags: ['Python', 'FastAPI', 'Backend']
        });
      }
    }
  }, [id, loading, post]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {loading && (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading post...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
          <Link 
            href="/blog"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Blog
          </Link>
        </div>
      )}
      
      {post && (
        <>
          <Link 
            href="/blog"
            className="inline-flex items-center mb-6 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Blog
          </Link>
          <BlogPost
            title={post.title}
            content={post.content}
            publishedDate={post.published_date}
            author={post.author}
            tags={post.tags}
          />
        </>
      )}
      
      {!loading && !error && !post && (
        <div className="text-center py-10">
          <p className="text-gray-500">Post not found</p>
          <Link 
            href="/blog"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Blog
          </Link>
        </div>
      )}
    </div>
  );
}
