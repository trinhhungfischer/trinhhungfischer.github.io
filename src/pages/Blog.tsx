import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { GroupedMultiSelectDropdown, SingleSelectDropdown } from '../components/Dropdowns';
import './Blog.css';
import './Projects.css'; // Reuse page-header

interface BlogMeta {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  color: string;
  slug: string;
  draft?: boolean;
  lang?: string;
}

function parseFrontmatter(markdown: string) {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { attributes: {} };
  const yaml = match[1];
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
  return { attributes };
}

const modules = import.meta.glob('../content/blogs/*.md', { query: '?raw', eager: true });
const allPosts: BlogMeta[] = Object.entries(modules).map(([path, rawContent]) => {
  const rawStr = typeof rawContent === 'string' ? rawContent : (rawContent as any).default;
  const { attributes } = parseFrontmatter(rawStr);
  const filename = path.split('/').pop()?.replace('.md', '') || '';
  const parts = filename.split('.');
  const lang = parts.length > 1 ? parts.pop() : 'en';
  const slug = parts.join('.');

  return { 
    ...attributes, 
    draft: attributes.draft === 'true' || attributes.draft === true,
    slug,
    lang
  } as BlogMeta;
}).filter(p => !p.draft || import.meta.env.DEV).sort((a, b) => new Date(b.date || Date.now()).getTime() - new Date(a.date || Date.now()).getTime());


const Blog = () => {
  const { t, language } = useLanguage();
  const posts = allPosts.filter(p => p.lang === language);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const categories = Array.from(new Set(posts.map(p => p.category).filter(Boolean)));
  const years = ['All', ...Array.from(new Set(posts.map(p => new Date(p.date || Date.now()).getFullYear().toString())))].sort((a, b) => b.localeCompare(a));
  
  const filterGroups = [
    { label: language === 'vi' ? 'Danh mục' : 'Categories', options: categories },
    { label: language === 'vi' ? 'Năm' : 'Year', options: years.filter(y => y !== 'All') }
  ];

  const filteredPosts = posts.filter(p => {
    const postYear = new Date(p.date || Date.now()).getFullYear().toString();
    
    // Check if category passes
    const hasCategorySelected = categories.some(c => selectedFilters.includes(c));
    const passCategory = hasCategorySelected ? selectedFilters.includes(p.category) : true;
    
    // Check if year passes
    const hasYearSelected = years.some(y => selectedFilters.includes(y));
    const passYear = hasYearSelected ? selectedFilters.includes(postYear) : true;

    const matchesSearch = (p.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    return passCategory && passYear && matchesSearch;
  }).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="container animate-fade-up" style={{ padding: '60px 24px' }}>
      <div className="page-header">
        <h1 className="page-title">{t('blog.title') || 'Journal'}</h1>
        <p className="text-secondary" style={{ marginTop: '16px', fontSize: '1.25rem' }}>
          {language === 'vi' ? 'Những suy nghĩ về thiết kế game, tâm lý học và hệ thống.' : 'Thoughts on game design, psychology, and systems.'}
        </p>
      </div>

      <div className="blog-controls">
        <input 
          type="text" 
          placeholder={language === 'vi' ? 'Tìm bài viết...' : 'Search articles...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="blog-search"
        />
        <div className="blog-filters">
          <GroupedMultiSelectDropdown 
            groups={filterGroups} 
            selected={selectedFilters} 
            onChange={setSelectedFilters} 
            placeholder={language === 'vi' ? 'Lọc bài viết' : 'Filter Articles'}
          />
          <SingleSelectDropdown 
            options={language === 'vi' ? ['Mới nhất', 'Cũ nhất'] : ['Newest First', 'Oldest First']} 
            selected={sortOrder === 'newest' ? (language === 'vi' ? 'Mới nhất' : 'Newest First') : (language === 'vi' ? 'Cũ nhất' : 'Oldest First')} 
            onChange={(val: string) => setSortOrder((val === 'Newest First' || val === 'Mới nhất') ? 'newest' : 'oldest')} 
            placeholder={language === 'vi' ? 'Sắp xếp' : 'Sort'}
          />
        </div>
      </div>

      <div className="blog-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div className="blog-card" key={index} style={post.color ? { borderLeft: `12px solid ${post.color.replace('var(', '').replace(')', '')}` } : {}}>
              <div className="blog-meta" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span className="project-tag" style={{ margin: 0 }}>{post.category}</span>
                <span className="text-secondary" style={{ fontSize: '0.85rem', fontWeight: 600 }}>{post.date}</span>
              </div>
              <h2 className="blog-title" style={{ marginTop: '0' }}>{post.title}</h2>
              <p className="blog-excerpt">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="read-more" style={{ textDecoration: 'none', color: 'inherit' }}>{language === 'vi' ? 'Đọc bài viết →' : 'Read Article →'}</Link>
            </div>
          ))
        ) : (
          <div className="blog-empty">
            <p>{language === 'vi' ? 'Không tìm thấy bài viết nào phù hợp.' : 'No articles found matching your criteria.'}</p>
            <button onClick={() => { setSearchQuery(''); setSelectedFilters([]); setSortOrder('newest'); }} className="clear-filters-btn">
              {language === 'vi' ? 'Xóa bộ lọc' : 'Clear Filters'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
