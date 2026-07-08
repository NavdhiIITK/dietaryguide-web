import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getBlogPosts } from '@/lib/blog-data';
import { BlogPost } from '@/types/blog';
import {
  Plus,
  Edit,
  Eye,
  Calendar,
  Clock,
  Tag,
  LogOut,
  Loader2,
  Trash2,
  Database,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useAdminAuth();
  const { toast } = useToast();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    if (!user) {
      navigate('/admin_blog_maker_editor/login');
      return;
    }

    fetchPosts();
  }, [user, navigate]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('AdminDashboard: Fetching posts from Supabase...');
      const postsData = await getBlogPosts();
      
      // Only show posts that have valid data from Supabase
      const validPosts = postsData.filter(post => 
        post && 
        post.id && 
        post.title && 
        post.slug
      );
      
      console.log(`AdminDashboard: Found ${validPosts.length} valid posts from Supabase`);
      setPosts(validPosts);
    } catch (error) {
      console.error('AdminDashboard: Error fetching posts:', error);
      setError('Failed to load blog posts from Supabase.');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load blog posts from Supabase.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    navigate('/admin_blog_maker_editor/new');
  };

  const handleEdit = (slug: string) => {
    navigate(`/admin_blog_maker_editor/edit/${slug}`);
  };

  const handlePreview = (slug: string) => {
    window.open(`/blog/${slug}`, '_blank');
  };

  const filteredPosts = posts.filter(post => {
    if (statusFilter === 'published') return post.published;
    if (statusFilter === 'draft') return !post.published;
    return true;
  });

  const publishedCount = posts.filter(post => post.published).length;
  const draftCount = posts.filter(post => !post.published).length;

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Blog Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your blog posts from Supabase database
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button onClick={handleCreateNew}>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/admin_blog_maker_editor/cleanup')}
              className="text-orange-600 border-orange-200 hover:bg-orange-50"
            >
              <Database className="w-4 h-4 mr-2" />
              Database Cleanup
            </Button>
            <Button variant="outline" onClick={signOutUser}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
              <p className="text-xs text-muted-foreground">From Supabase</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{publishedCount}</div>
              <p className="text-xs text-muted-foreground">Live posts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{draftCount}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tags</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {[...new Set(posts.flatMap(post => post.tags))].length}
              </div>
              <p className="text-xs text-muted-foreground">Unique tags</p>
            </CardContent>
          </Card>
        </div>

        {/* Posts List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Blog Posts from Supabase</CardTitle>
                <CardDescription>
                  Manage and edit your blog posts stored in Supabase
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('all')}
                >
                  All ({posts.length})
                </Button>
                <Button
                  variant={statusFilter === 'published' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('published')}
                >
                  Published ({publishedCount})
                </Button>
                <Button
                  variant={statusFilter === 'draft' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('draft')}
                >
                  Drafts ({draftCount})
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8">
                <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Posts Found</h3>
                <p className="text-muted-foreground mb-4">
                  No blog posts found in Supabase database.
                </p>
                <Button onClick={handleCreateNew}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Post
                </Button>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-lg font-semibold mb-2">No Posts Match Filter</h3>
                <p className="text-muted-foreground">
                  No posts match the current filter criteria.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{post.title}</h3>
                        <Badge variant={post.published ? 'default' : 'secondary'}>
                          {post.published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.reading_time} min read
                        </span>
                        {post.tags.length > 0 && (
                          <span className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {post.tags.slice(0, 2).join(', ')}
                            {post.tags.length > 2 && ` +${post.tags.length - 2}`}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {post.published && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePreview(post.slug)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(post.slug)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
