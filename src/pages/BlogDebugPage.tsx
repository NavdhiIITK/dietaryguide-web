import { useEffect, useState } from 'react';
import { getBlogPosts, getAllTags } from '@/lib/blog-data';
import { BlogPost } from '@/types/blog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Database, RefreshCw, CheckCircle, XCircle, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { addSamplePosts, checkIfPostsEmpty } from '@/utils/add-sample-posts';

const BlogDebugPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'failed'>('checking');
  const [isAddingPosts, setIsAddingPosts] = useState(false);

  const testConnection = async () => {
    try {
      setConnectionStatus('checking');
      const { data, error } = await supabase
        .from('posts')
        .select('count')
        .limit(1);
      
      if (error) {
        console.error('Connection test failed:', error);
        setConnectionStatus('failed');
        setError(`Database connection failed: ${error.message}`);
      } else {
        console.log('Connection test successful');
        setConnectionStatus('connected');
        setError(null);
      }
    } catch (err) {
      console.error('Connection test error:', err);
      setConnectionStatus('failed');
      setError('Failed to connect to Supabase database');
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('BlogDebugPage: Testing Supabase connection...');
      await testConnection();
      
      console.log('BlogDebugPage: Fetching blog data...');
      const [postsData, tagsData] = await Promise.all([
        getBlogPosts(),
        getAllTags()
      ]);

      console.log('BlogDebugPage: Raw posts data:', postsData);
      console.log('BlogDebugPage: Raw tags data:', tagsData);

      setPosts(postsData);
      setTags(tagsData);
    } catch (error) {
      console.error('BlogDebugPage: Error:', error);
      setError(`Error fetching data: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSamplePosts = async () => {
    try {
      setIsAddingPosts(true);
      await addSamplePosts();
      await fetchData(); // Refresh the data
    } catch (error) {
      console.error('Error adding sample posts:', error);
      setError('Failed to add sample posts');
    } finally {
      setIsAddingPosts(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRetry = () => {
    fetchData();
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'checking':
        return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'checking':
        return 'Checking connection...';
      case 'connected':
        return 'Connected to Supabase';
      case 'failed':
        return 'Connection failed';
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Blog System Debug</h1>
          <p className="text-muted-foreground">
            Debug information for the blog system and Supabase integration
          </p>
        </div>

        {/* Connection Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Supabase Connection Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              {getConnectionStatusIcon()}
              <span className="font-medium">{getConnectionStatusText()}</span>
            </div>
            
            {connectionStatus === 'failed' && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error || 'Failed to connect to Supabase database'}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button onClick={testConnection} variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Test Connection
              </Button>
              
              {connectionStatus === 'connected' && posts.length === 0 && (
                <Button 
                  onClick={handleAddSamplePosts} 
                  disabled={isAddingPosts}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {isAddingPosts ? 'Adding Posts...' : 'Add Sample Posts'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Data Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Posts Found</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{posts.length}</div>
              <p className="text-sm text-muted-foreground">
                {loading ? 'Loading...' : 'Total posts in database'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Published Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {posts.filter(p => p.published).length}
              </div>
              <p className="text-sm text-muted-foreground">
                Live posts available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Unique Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{tags.length}</div>
              <p className="text-sm text-muted-foreground">
                Available tags
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Posts List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Posts from Supabase</CardTitle>
                <CardDescription>
                  Raw data from the posts table
                </CardDescription>
              </div>
              <Button onClick={handleRetry} variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh Data
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
                <p>Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8">
                <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Posts Found</h3>
                <p className="text-muted-foreground mb-4">
                  No posts found in the Supabase database.
                </p>
                {connectionStatus === 'connected' && (
                  <Button 
                    onClick={handleAddSamplePosts} 
                    disabled={isAddingPosts}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    {isAddingPosts ? 'Adding Sample Posts...' : 'Add Sample Posts'}
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="border rounded-lg p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{post.title}</h3>
                      <Badge variant={post.published ? 'default' : 'secondary'}>
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <p><strong>ID:</strong> {post.id}</p>
                      <p><strong>Slug:</strong> {post.slug}</p>
                      <p><strong>Created:</strong> {new Date(post.created_at).toLocaleString()}</p>
                      <p><strong>Author:</strong> {post.author.name}</p>
                      <p><strong>Tags:</strong> {post.tags.join(', ') || 'None'}</p>
                      <p><strong>Reading Time:</strong> {post.reading_time} min</p>
                    </div>

                    {post.subtitle && (
                      <p className="text-sm italic">{post.subtitle}</p>
                    )}

                    <div className="text-xs text-muted-foreground">
                      <p><strong>Content Length:</strong> {post.content.length} characters</p>
                      <p><strong>Snippet:</strong> {post.snippet}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tags List */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Available Tags</CardTitle>
            <CardDescription>
              All unique tags from the posts
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tags.length === 0 ? (
              <p className="text-muted-foreground">No tags found</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogDebugPage; 