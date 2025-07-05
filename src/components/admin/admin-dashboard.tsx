import { Link } from 'react-router-dom';
import type { BlogPost } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface AdminDashboardProps {
  posts: BlogPost[];
  onDeletePost: (id: string) => Promise<void>;
  onSignOut: () => void;
}

export function AdminDashboard({ posts, onDeletePost, onSignOut }: AdminDashboardProps) {
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await onDeletePost(id);
      toast({
        title: "Post Deleted",
        description: "The blog post has been successfully deleted.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete post. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-primary">DietaryGuide</div>
                <div className="text-sm text-muted-foreground border-l pl-4">Admin Panel</div>
            </div>
          <div className="flex items-center gap-4">
            <Link to="/blog">
              <Button variant="outline">View Site</Button>
            </Link>
            <Button onClick={onSignOut}>Logout</Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>Manage your articles here. Create, edit, or delete posts.</CardDescription>
            </div>
            <Link to="/admin_blog_maker_editor/edit/new">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Post
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map(post => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={new Date(post.created_at) > new Date() ? 'text-amber-500 border-amber-500/50' : 'text-green-500 border-green-500/50'}>
                        {new Date(post.created_at) > new Date() ? 'Scheduled' : 'Published'}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(post.created_at), 'MMMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/admin_blog_maker_editor/edit/${post.slug}`}>
                            <Button aria-label="Edit" variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Button aria-label="Delete" variant="ghost" size="icon" className="text-destructive hover:text-destructive/80" onClick={() => handleDelete(post.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 