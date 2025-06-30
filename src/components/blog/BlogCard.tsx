'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  author: string;
  tags: string[];
}

export default function BlogCard({
  id,
  title,
  excerpt,
  publishedDate,
  author,
  tags,
}: BlogCardProps) {
  const formattedDate = formatDistanceToNow(new Date(publishedDate), { addSuffix: true });

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          <Link href={`/blog/${id}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>{excerpt}</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <span>By {author} • {formattedDate}</span>
          </div>
          <div className="flex space-x-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
