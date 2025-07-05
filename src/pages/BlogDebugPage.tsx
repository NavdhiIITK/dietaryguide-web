import { blogs } from "@/data/blogs";

const BlogDebugPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold mb-8">Blog Debug Page</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Available Blogs:</h2>
          <div className="grid gap-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="border border-gray-600 p-4 rounded">
                <h3 className="text-xl font-semibold text-green-400">{blog.title}</h3>
                <p className="text-gray-400">ID: {blog.id}</p>
                <p className="text-gray-400">Date: {blog.date}</p>
                <p className="text-gray-400">Category: {blog.category}</p>
                <p className="text-gray-400">Content Length: {blog.content?.length || 0} characters</p>
                <p className="text-gray-400">Has Content: {!!blog.content ? 'Yes' : 'No'}</p>
                
                {blog.content && (
                  <div className="mt-4">
                    <h4 className="font-semibold">Content Preview:</h4>
                    <div className="bg-gray-800 p-2 rounded text-sm mt-2">
                      {blog.content.substring(0, 200)}...
                    </div>
                  </div>
                )}
                
                <div className="mt-4">
                  <a 
                    href={`/blog/${blog.id}`} 
                    className="text-blue-400 hover:text-blue-300 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Blog Page
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Test Specific Blogs:</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Protein Power Blog:</h3>
              <p>ID: protein-power</p>
              <p>Found: {blogs.find(b => b.id === 'protein-power') ? 'Yes' : 'No'}</p>
              <a href="/blog/protein-power" className="text-blue-400 hover:text-blue-300 underline">
                Test Link
              </a>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">Fiber First Blog:</h3>
              <p>ID: fiber-first-india-2025</p>
              <p>Found: {blogs.find(b => b.id === 'fiber-first-india-2025') ? 'Yes' : 'No'}</p>
              <a href="/blog/fiber-first-india-2025" className="text-blue-400 hover:text-blue-300 underline">
                Test Link
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDebugPage; 