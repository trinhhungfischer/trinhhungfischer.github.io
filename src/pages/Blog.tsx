import { Link } from 'react-router-dom';
import './Blog.css';
import './Projects.css'; // Reuse page-header
import blogsData from '../data/blogs.json';

const Blog = () => {
  const posts = blogsData;

  return (
    <div className="container animate-fade-up" style={{ padding: '60px 24px' }}>
      <div className="page-header">
        <h1 className="page-title">Journal</h1>
        <p className="text-secondary" style={{ marginTop: '16px', fontSize: '1.25rem' }}>Thoughts on game design, psychology, and systems.</p>
      </div>

      <div className="blog-list">
        {posts.map((post, index) => (
          <div className="blog-card" key={index} style={post.color ? { borderLeft: `12px solid ${post.color.replace('var(', '').replace(')', '')}` } : {}}>
            <div className="blog-meta">
              <span>{post.date}</span>
              <span>//</span>
              <span>{post.category}</span>
            </div>
            <h2 className="blog-title">{post.title}</h2>
            <p className="blog-excerpt">{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="read-more" style={{ textDecoration: 'none', color: 'inherit' }}>Read Article →</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
