import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { getBlogPosts } from '@/lib/blog-data';
import type { BlogPost } from '@/types';

const AdminPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated (you can implement your own auth logic here)
    const checkAuth = () => {
      // For now, we'll use a simple check - you can replace this with Firebase auth
      const adminEmail = localStorage.getItem('adminEmail');
      if (adminEmail === 'admin@dietaryguide.in') {
        setIsAuthenticated(true);
      } else {
        navigate('/admin_blog_maker_editor/login');
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchPosts = async () => {
        try {
          const postsData = await getBlogPosts();
          setPosts(postsData);
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [isAuthenticated]);

  const handleDeletePost = async (id: string) => {
    try {
      // Implement delete logic here
      console.log('Deleting post:', id);
      // Refresh posts after deletion
      const updatedPosts = await getBlogPosts();
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('adminEmail');
    navigate('/admin_blog_maker_editor/login');
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminDashboard 
      posts={posts} 
      onDeletePost={handleDeletePost}
      onSignOut={handleSignOut}
    />
  );
};

export default AdminPage; 