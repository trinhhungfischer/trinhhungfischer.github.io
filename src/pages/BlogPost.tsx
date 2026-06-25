import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import blogsData from '../data/blogs.json';
import './BlogPost.css';
import './Projects.css'; // For page-header

const BlogPost = () => {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  
  const postMeta = blogsData.find(b => b.slug === slug);

  useEffect(() => {
    if (slug) {
      // Fetch the markdown file from public/content/blogs
      fetch(`/content/blogs/${slug}.md`)
        .then(res => {
          if (!res.ok) throw new Error('Not found');
          return res.text();
        })
        .then(text => {
          setContent(text);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setContent('# Article not found.');
          setLoading(false);
        });
    }
  }, [slug]);

  if (!postMeta) {
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
          <span>{postMeta.date}</span>
          <span>//</span>
          <span>{postMeta.category}</span>
        </div>
        <h1 className="page-title" style={{ fontSize: '3.5rem' }}>{postMeta.title}</h1>
      </div>

      <div className="markdown-content">
        {loading ? (
          <p>Loading content...</p>
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
