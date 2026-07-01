import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import GithubSlugger from 'github-slugger';
import { useLanguage } from '../contexts/LanguageContext';
import InteractiveVenn from '../components/InteractiveVenn';
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
  const filename = path.split('/').pop()?.replace('.md', '') || '';
  const parts = filename.split('.');
  const lang = parts.length > 1 ? parts.pop() : 'en';
  const slug = parts.join('.');
  
  return { 
    ...attributes, 
    draft: attributes.draft === 'true' || attributes.draft === true,
    body, 
    slug,
    lang
  } as any;
}).filter(p => !p.draft || import.meta.env.DEV);

const BlogPost = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  
  // Lọc bài theo slug và ngôn ngữ
  const post = allPosts.find(b => b.slug === slug && b.lang === language) 
            || allPosts.find(b => b.slug === slug && b.lang === 'en'); // fallback tiếng anh nếu chưa có bản dịch

  if (!post) {
    return (
      <div className="container" style={{ padding: '60px 24px' }}>
        <h1>{language === 'vi' ? 'Không tìm thấy bài viết' : 'Post not found'}</h1>
        <Link to="/blog">← {language === 'vi' ? 'Quay lại Blog' : 'Back to Blog'}</Link>
      </div>
    );
  }

  // Generate Table of Contents
  const slugger = new GithubSlugger();
  const headings: { level: number; text: string; id: string }[] = [];
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(post.body)) !== null) {
    const level = match[1].length;
    const rawText = match[2].trim();
    // Xóa các ký tự markdown cho text hiển thị (giữ nguyên cho ID)
    const text = rawText.replace(/\[(.*?)\]\(.*?\)/g, '$1').replace(/[*`_]/g, '');
    headings.push({
      level,
      text,
      id: slugger.slug(rawText)
    });
  }

  return (
    <div className="container animate-fade-up" style={{ padding: '60px 24px' }}>
      <Link to="/blog" className="back-link">← {language === 'vi' ? 'Quay lại Nhật ký' : 'Back to Journal'}</Link>
      
      <div className="page-header" style={{ marginTop: '24px' }}>
        <div className="blog-meta" style={{ marginBottom: '16px' }}>
          <span>{post.date}</span>
          <span>//</span>
          <span>{post.category}</span>
        </div>
        <h1 className="page-title" style={{ fontSize: '3.5rem' }}>{post.title}</h1>
      </div>

      <div className="blog-layout">
        <div className="markdown-content">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm, remarkMath]} 
            rehypePlugins={[rehypeRaw, rehypeKatex, rehypeSlug]}
            components={{
              'interactive-venn': InteractiveVenn
            } as any}
          >
            {post.body}
          </ReactMarkdown>
        </div>
        
        {headings.length > 0 && (
          <aside className="blog-toc-sidebar">
            <div className="blog-toc-sticky">
              <h3>{language === 'vi' ? 'Mục lục' : 'Table of Contents'}</h3>
              <ul>
                {headings.map((h, i) => (
                  <li key={i} className={`toc-level-${h.level}`}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
