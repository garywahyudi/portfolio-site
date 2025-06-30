'use client';

import { format } from 'date-fns';

interface BlogPostProps {
  title: string;
  content: string;
  publishedDate: string;
  author: string;
  tags: string[];
}

export default function BlogPost({
  title,
  content,
  publishedDate,
  author,
  tags,
}: BlogPostProps) {
  const formattedDate = format(new Date(publishedDate), 'MMMM d, yyyy');

  return (
    <article className="prose lg:prose-xl mx-auto">
      <h1>{title}</h1>
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <span>By {author}</span>
        <span>•</span>
        <time dateTime={publishedDate}>{formattedDate}</time>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span 
            key={tag} 
            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800"
          >
            {tag}
          </span>
        ))}
      </div>

      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
