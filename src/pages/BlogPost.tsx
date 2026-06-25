import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import fm from 'front-matter';
import './BlogPost.css';
import './Projects.css'; // For page-header

const modules = import.meta.glob('../content/blogs/*.md', { query: '?raw', eager: true });
const allPosts = Object.entries(modules).map(([path, rawContent]) => {
  // @ts-ignore
  const { attributes, body } = fm(rawContent.default || rawContent);
  const slug = path.split('/').pop()?.replace('.md', '') || '';
  return { ...(attributes as any), body, slug } as any;
});

const BlogPost = () => {
  const { slug } = useParams();
  
  const post = allPosts.find(b => b.slug === slug);

  if (!post) {
    return (
      <div className="container" style={{ padding: '60px 24px' }}>
        <h1>Post not found</h1>
        <Link to="/blog">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-up" style={{ padding: '60px 24px' }}>
      <Link to="/blog" className="back-link">← Back to Journal</Link>
      
      <div className="page-header" style={{ marginTop: '24px' }}>
        <div className="blog-meta" style={{ marginBottom: '16px' }}>
          <span>{post.date}</span>
          <span>//</span>
          <span>{post.category}</span>
        </div>
        <h1 className="page-title" style={{ fontSize: '3.5rem' }}>{post.title}</h1>
      </div>

      <div className="markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogPost;
