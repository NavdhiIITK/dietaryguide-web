import React from 'react';
import { BlogPost } from '@/types/blog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface BlogDetailProps {
  post: BlogPost;
}

export function BlogDetail({ post }: BlogDetailProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="gap-2">
          <Link to="/blog">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Hero image */}
      <div className="relative mb-8 rounded-xl overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80';
          }}
        />
      </div>

      {/* Article header */}
      <header className="mb-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Subtitle */}
        {post.subtitle && (
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {post.subtitle}
          </p>
        )}

        {/* Author and meta info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-y border-border">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
              <AvatarFallback>
                {post.author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.reading_time} min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article content */}
      <div
        className="max-w-none text-foreground leading-relaxed [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 [&>h1]:mt-8 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:mt-6 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mb-2 [&>h3]:mt-4 [&>p]:mb-4 [&>p]:leading-relaxed [&>strong]:font-semibold [&>a]:text-primary [&>a]:underline [&>a:hover]:text-primary/80 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:bg-muted/50 [&>blockquote]:py-2 [&>blockquote]:px-4 [&>blockquote]:rounded-r-lg [&>blockquote]:italic [&>code]:bg-muted [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>pre]:bg-muted [&>pre]:border [&>pre]:p-4 [&>pre]:rounded [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>li]:mb-1"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Article footer */}
      <footer className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
              <AvatarFallback>
                {post.author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">Author</p>
            </div>
          </div>

          <Button variant="outline" asChild>
            <Link to="/blog">
              View All Posts
            </Link>
          </Button>
        </div>
      </footer>
    </article>
  );
}
