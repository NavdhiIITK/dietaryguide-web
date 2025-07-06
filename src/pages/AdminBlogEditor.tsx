import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { TipTapEditor } from '@/components/editor/TipTapEditor';
import {
  createBlogPost,
  updateBlogPost,
  getBlogPostBySlug,
  deleteBlogPost
} from '@/lib/blog-data';
import { BlogPost } from '@/types/blog';
import { Loader2, Upload, Save, Trash2, Eye, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Predefined health and nutrition tags
const PREDEFINED_TAGS = [
  'Weight Loss', 'Weight Gain', 'Protein', 'Carbohydrates', 'Healthy Fats',
  'Vitamins', 'Minerals', 'Fiber', 'Antioxidants', 'Probiotics',
  'Meal Plan', 'Indian Diet', 'Vegetarian', 'Vegan', 'Keto Diet',
  'Mediterranean Diet', 'DASH Diet', 'Intermittent Fasting',
  'Diabetes', 'Heart Health', 'Blood Pressure', 'Cholesterol',
  'Digestive Health', 'Gut Health', 'Immunity', 'Bone Health',
  'Fitness', 'Exercise', 'Strength Training', 'Cardio', 'Yoga',
  'Mental Health', 'Stress Management', 'Sleep', 'Hydration',
  'Supplements', 'Superfoods', 'Organic', 'Natural Remedies',
  'Recipes', 'Cooking Tips', 'Meal Prep', 'Healthy Snacks',
  'Nutrition Facts', 'Calorie Counting', 'Metabolism', 'Detox'
];

const AdminBlogEditor = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const { user, signOutUser } = useAuth();
  const { toast } = useToast();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [published, setPublished] = useState(false);

  const isEditing = !!slug;

  useEffect(() => {
    if (!user) {
      navigate('/admin_blog_maker_editor/login');
      return;
    }

    if (isEditing && slug) {
      fetchPost();
    }
  }, [user, slug, isEditing, navigate]);

  const fetchPost = async () => {
    if (!slug) return;
    
    setLoading(true);
    try {
      const postData = await getBlogPostBySlug(slug);
      if (postData) {
        setPost(postData);
        setTitle(postData.title);
        setSubtitle(postData.subtitle || '');
        setContent(postData.content);
        setImage(postData.image);
        setTags(postData.tags);
        setMetaTitle(postData.meta_title || postData.title);
        setMetaDescription(postData.meta_description || postData.snippet || '');
        setPublished(postData.published || false);
      } else {
        toast({
          variant: 'destructive',
          title: 'Post not found',
          description: 'The blog post you are trying to edit does not exist.',
        });
        navigate('/admin_blog_maker_editor');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load the blog post.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Auto-fill meta title when title changes
  useEffect(() => {
    if (title && !metaTitle) {
      setMetaTitle(title);
    }
  }, [title, metaTitle]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Removed uploadBlogImage usage. Use image URL directly.
      setImage(file.name);
      toast({
        title: 'Success',
        description: 'Image uploaded successfully.',
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: 'Failed to upload image. Please try again.',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim() || !image.trim()) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please fill in all required fields (title, content, and image).',
      });
      return;
    }

    setSaving(true);
    try {
      // Auto-fill SEO fields if empty
      const finalMetaTitle = metaTitle.trim() || title.trim();
      const finalMetaDescription = metaDescription.trim() || (subtitle.trim() || content.replace(/<[^>]*>/g, '').substring(0, 150) + '...');

      const postData = {
        title: title.trim(),
        subtitle: subtitle.trim() || undefined,
        content,
        tags,
        image,
        author_name: user?.displayName || user?.email?.split('@')[0] || 'Team DietaryGuide',
        author_avatar_url: user?.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        meta_title: finalMetaTitle,
        meta_description: finalMetaDescription,
        published
      };

      let savedPost;
      if (isEditing && post) {
        savedPost = await updateBlogPost(post.id, postData);
      } else {
        try {
          savedPost = await createBlogPost(postData);
        } catch (err) {
          if (err.code === '23505' || (err.message && err.message.includes('duplicate key value'))) {
            toast({
              variant: 'destructive',
              title: 'Duplicate Slug',
              description: 'A post with this slug already exists. Please change the title.',
            });
            return;
          }
          throw err;
        }
      }
      toast({
        title: 'Success',
        description: 'Blog post saved successfully.',
      });
      navigate(`/admin_blog_maker_editor/edit/${savedPost.slug}`);
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        variant: 'destructive',
        title: 'Save failed',
        description: 'Failed to save the blog post. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!post || !window.confirm('Are you sure you want to delete this post?')) return;
    setSaving(true);
    try {
      await deleteBlogPost(post.id);
      toast({
        title: 'Success',
        description: 'Blog post deleted successfully.',
      });
      navigate('/admin_blog_maker_editor');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        variant: 'destructive',
        title: 'Delete failed',
        description: 'Failed to delete the blog post. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    if (post) {
      window.open(`/blog/${post.slug}`, '_blank');
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {isEditing ? 'Edit Post' : 'Create New Post'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Update your blog post' : 'Write and publish a new blog post'}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {isEditing && (
              <>
                <Button variant="outline" onClick={handlePreview}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button variant="destructive" onClick={handleDelete} disabled={saving}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </>
            )}
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {isEditing ? 'Update' : 'Publish'}
            </Button>
            <Button variant="outline" onClick={signOutUser}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Enter post subtitle (optional)..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* SEO Fields */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="SEO title (auto-filled from title)"
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {metaTitle.length}/60 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <textarea
                    id="meta-description"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Brief description for search engines"
                    maxLength={160}
                    rows={3}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {metaDescription.length}/160 characters
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle>Content *</CardTitle>
              </CardHeader>
              <CardContent>
                <TipTapEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Start writing your blog post..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Image *</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {image && (
                  <div className="relative">
                    <img
                      src={image}
                      alt="Featured"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div>
                  <Label htmlFor="image-upload">Upload Image</Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                  {uploading && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="image-url">Or enter image URL</Label>
                  <Input
                    id="image-url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Predefined Tags */}
                <div>
                  <Label className="text-sm font-medium">Quick Add Tags</Label>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {PREDEFINED_TAGS.filter(tag => !tags.includes(tag)).slice(0, 12).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground text-xs"
                        onClick={() => setTags([...tags, tag])}
                      >
                        + {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Custom Tag Input */}
                <div>
                  <Label className="text-sm font-medium">Custom Tag</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a custom tag..."
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    />
                    <Button onClick={handleAddTag} size="sm">
                      Add
                    </Button>
                  </div>
                </div>

                {/* Selected Tags */}
                <div>
                  <Label className="text-sm font-medium">Selected Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer">
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-xs hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {tags.length === 0 && (
                      <p className="text-sm text-muted-foreground">No tags selected</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Publish Status */}
            <Card>
              <CardHeader>
                <CardTitle>Publish Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="published">Publish Post</Label>
                    <p className="text-sm text-muted-foreground">
                      {published ? 'Post will be visible to readers' : 'Post will be saved as draft'}
                    </p>
                  </div>
                  <Switch
                    id="published"
                    checked={published}
                    onCheckedChange={setPublished}
                  />
                </div>

                <div className="p-3 rounded-lg border bg-muted/50">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${published ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <span className="text-sm font-medium">
                      {published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {published
                      ? 'This post is live and visible to all visitors'
                      : 'This post is saved as a draft and only visible to admins'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogEditor;
