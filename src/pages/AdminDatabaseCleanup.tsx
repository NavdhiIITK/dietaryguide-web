import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  analyzeBlogPosts, 
  getCleanupSummary, 
  deleteIrrelevantPosts 
} from '@/utils/database-cleanup';
import { 
  Loader2, 
  Trash2, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  LogOut,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CleanupSummary {
  totalPosts: number;
  relevantPosts: number;
  irrelevantPosts: number;
  postsToDelete: any[];
  postsToKeep: any[];
}

const AdminDatabaseCleanup = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useAdminAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [summary, setSummary] = useState<CleanupSummary | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/admin_blog_maker_editor/login');
      return;
    }
  }, [user, navigate]);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const cleanupSummary = await getCleanupSummary();
      setSummary(cleanupSummary);
      toast({
        title: 'Analysis Complete',
        description: `Found ${cleanupSummary.irrelevantPosts} irrelevant posts out of ${cleanupSummary.totalPosts} total.`,
      });
    } catch (error) {
      console.error('Error analyzing posts:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'Failed to analyze blog posts. Please try again.',
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDryRun = async () => {
    if (!summary) return;
    
    setLoading(true);
    try {
      const result = await deleteIrrelevantPosts(true);
      toast({
        title: 'Dry Run Complete',
        description: `Would delete ${result.deletedCount} posts. Check console for details.`,
      });
    } catch (error) {
      console.error('Error in dry run:', error);
      toast({
        variant: 'destructive',
        title: 'Dry Run Failed',
        description: 'Failed to perform dry run. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!summary || !window.confirm(
      `Are you sure you want to permanently delete ${summary.irrelevantPosts} irrelevant blog posts? This action cannot be undone.`
    )) {
      return;
    }
    
    setDeleting(true);
    try {
      const result = await deleteIrrelevantPosts(false);
      
      if (result.errors.length > 0) {
        toast({
          variant: 'destructive',
          title: 'Partial Success',
          description: `Deleted ${result.deletedCount} posts with ${result.errors.length} errors.`,
        });
      } else {
        toast({
          title: 'Cleanup Complete',
          description: `Successfully deleted ${result.deletedCount} irrelevant posts.`,
        });
      }
      
      // Refresh the analysis
      await handleAnalyze();
    } catch (error) {
      console.error('Error deleting posts:', error);
      toast({
        variant: 'destructive',
        title: 'Deletion Failed',
        description: 'Failed to delete posts. Please try again.',
      });
    } finally {
      setDeleting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Database Cleanup</h1>
            <p className="text-muted-foreground">
              Remove irrelevant tech/IoT/blockchain posts and keep only health-related content
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate('/admin_blog_maker_editor')}>
              Back to Dashboard
            </Button>
            <Button variant="outline" onClick={signOutUser}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Warning Alert */}
        <Alert className="mb-6 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Warning:</strong> This tool will permanently delete blog posts that are identified as irrelevant 
            (tech, IoT, blockchain, etc.). Always run a dry run first to review what will be deleted.
          </AlertDescription>
        </Alert>

        {/* Analysis Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Step 1: Analyze Blog Posts</CardTitle>
            <CardDescription>
              Scan all published blog posts to identify irrelevant content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleAnalyze} 
              disabled={analyzing}
              className="mb-4"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Analyze Posts
                </>
              )}
            </Button>

            {summary && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{summary.totalPosts}</div>
                  <div className="text-sm text-muted-foreground">Total Posts</div>
                </div>
                <div className="p-4 border rounded-lg border-green-200 bg-green-50">
                  <div className="text-2xl font-bold text-green-700">{summary.relevantPosts}</div>
                  <div className="text-sm text-green-600">Relevant Posts (Keep)</div>
                </div>
                <div className="p-4 border rounded-lg border-red-200 bg-red-50">
                  <div className="text-2xl font-bold text-red-700">{summary.irrelevantPosts}</div>
                  <div className="text-sm text-red-600">Irrelevant Posts (Delete)</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions Section */}
        {summary && summary.irrelevantPosts > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Step 2: Cleanup Actions</CardTitle>
              <CardDescription>
                Review and delete irrelevant posts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={handleDryRun}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Dry Run (Preview)
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="destructive" 
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Irrelevant Posts
                    </>
                  )}
                </Button>
              </div>

              <Button 
                variant="ghost" 
                onClick={() => setShowDetails(!showDetails)}
                className="text-sm"
              >
                {showDetails ? 'Hide' : 'Show'} Post Details
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Details Section */}
        {summary && showDetails && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Posts to Keep */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Posts to Keep ({summary.relevantPosts})
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  {summary.postsToKeep.slice(0, 20).map((post) => (
                    <div key={post.id} className="p-3 border rounded-lg border-green-200 bg-green-50">
                      <div className="font-medium text-sm">{post.title}</div>
                      <div className="text-xs text-muted-foreground">
                        Score: {post.relevanceScore} | Category: {post.category || 'None'}
                      </div>
                    </div>
                  ))}
                  {summary.postsToKeep.length > 20 && (
                    <div className="text-sm text-muted-foreground text-center">
                      ... and {summary.postsToKeep.length - 20} more
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Posts to Delete */}
            <Card>
              <CardHeader>
                <CardTitle className="text-red-700 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Posts to Delete ({summary.irrelevantPosts})
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  {summary.postsToDelete.slice(0, 20).map((post) => (
                    <div key={post.id} className="p-3 border rounded-lg border-red-200 bg-red-50">
                      <div className="font-medium text-sm">{post.title}</div>
                      <div className="text-xs text-muted-foreground">
                        Score: {post.relevanceScore} | Category: {post.category || 'None'}
                      </div>
                      <div className="text-xs text-red-600 mt-1">
                        {post.reasons.slice(0, 2).join(', ')}
                      </div>
                    </div>
                  ))}
                  {summary.postsToDelete.length > 20 && (
                    <div className="text-sm text-muted-foreground text-center">
                      ... and {summary.postsToDelete.length - 20} more
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDatabaseCleanup;
