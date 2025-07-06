import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';
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
  Database
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useAuth();
  const { toast } = useToast();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
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
      const postsData = await getBlogPosts();
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load blog posts.',
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
              Manage your blog posts and content
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{publishedCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{draftCount}</div>
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
            </CardContent>
          </Card>
        </div>

        {/* Posts List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>
                  Manage and edit your blog posts
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
                <p className="text-muted-foreground mb-4">No blog posts yet.</p>
                <Button onClick={handleCreateNew}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Post
                </Button>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  No {statusFilter === 'all' ? '' : statusFilter} posts found.
                </p>
                {statusFilter !== 'all' && (
                  <Button
                    variant="outline"
                    onClick={() => setStatusFilter('all')}
                  >
                    View All Posts
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold truncate">{post.title}</h3>
                        <Badge
                          variant={post.published ? "default" : "secondary"}
                          className={`text-xs ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                        >
                          {post.published ? 'Published' : 'Draft'}
                        </Badge>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {post.subtitle && (
                        <p className="text-sm text-muted-foreground mb-2 truncate">
                          {post.subtitle}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.reading_time} min read</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePreview(post.slug)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
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
