import { Link } from 'react-router-dom';
import fm from 'front-matter';
import './Blog.css';
import './Projects.css'; // Reuse page-header

interface BlogMeta {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  color: string;
  slug: string;
}

const modules = import.meta.glob('../content/blogs/*.md', { query: '?raw', eager: true });
const posts: BlogMeta[] = Object.entries(modules).map(([path, rawContent]) => {
  // @ts-ignore
  const { attributes } = fm(rawContent.default || rawContent);
  const slug = path.split('/').pop()?.replace('.md', '') || '';
  return { ...attributes, slug } as BlogMeta;
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const Blog = () => {

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
