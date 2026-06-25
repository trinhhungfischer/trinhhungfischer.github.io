import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './BlogPost.css';
import './Projects.css'; // For page-header

function parseFrontmatter(markdown: string) {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { attributes: {}, body: markdown };
  const yaml = match[1];
  const body = match[2];
  const attributes: any = {};
  yaml.split('\n').forEach(line => {
    const splitIdx = line.indexOf(':');
    if (splitIdx > -1) {
      const key = line.slice(0, splitIdx).trim();
      let val = line.slice(splitIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      attributes[key] = val;
    }
  });
  return { attributes, body };
}

const modules = import.meta.glob('../content/blogs/*.md', { query: '?raw', eager: true });
const allPosts = Object.entries(modules).map(([path, rawContent]) => {
  const rawStr = typeof rawContent === 'string' ? rawContent : (rawContent as any).default;
  const { attributes, body } = parseFrontmatter(rawStr);
  const slug = path.split('/').pop()?.replace('.md', '') || '';
  return { ...attributes, body, slug } as any;
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
