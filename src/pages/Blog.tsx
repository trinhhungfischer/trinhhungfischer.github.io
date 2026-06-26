import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
const posts: BlogMeta[] = Object.entries(modules).map(([path, rawContent]) => {
  const rawStr = typeof rawContent === 'string' ? rawContent : (rawContent as any).default;
  const { attributes } = parseFrontmatter(rawStr);
  const slug = path.split('/').pop()?.replace('.md', '') || '';
  return { 
    ...attributes, 
    draft: attributes.draft === 'true' || attributes.draft === true,
    slug 
  } as BlogMeta;
}).filter(p => !p.draft || import.meta.env.DEV).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const MultiSelectDropdown = ({ options, selected, onChange, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item: string) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selected.length > 0 ? `${placeholder} (${selected.length})` : placeholder}
        <span className="dropdown-arrow">▼</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option: string) => (
            <label key={option} className="dropdown-item">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const SingleSelectDropdown = ({ options, selected, onChange, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selected === 'All' ? placeholder : `${placeholder}: ${selected}`}
        <span className="dropdown-arrow">▼</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option: string) => (
            <div 
              key={option} 
              className={`dropdown-item ${selected === option ? 'selected' : ''}`}
              onClick={() => { onChange(option); setIsOpen(false); }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const categories = Array.from(new Set(posts.map(p => p.category)));
  const years = ['All', ...Array.from(new Set(posts.map(p => new Date(p.date).getFullYear().toString())))].sort((a, b) => b.localeCompare(a));

  const filteredPosts = posts.filter(p => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const postYear = new Date(p.date).getFullYear().toString();
    const matchesYear = selectedYear === 'All' || postYear === selectedYear;
    
    return matchesCategory && matchesSearch && matchesYear;
  }).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="container animate-fade-up" style={{ padding: '60px 24px' }}>
      <div className="page-header">
        <h1 className="page-title">Journal</h1>
        <p className="text-secondary" style={{ marginTop: '16px', fontSize: '1.25rem' }}>Thoughts on game design, psychology, and systems.</p>
      </div>

      <div className="blog-controls">
        <input 
          type="text" 
          placeholder="Search articles..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="blog-search"
        />
        <div className="blog-filters">
          <MultiSelectDropdown 
            options={categories} 
            selected={selectedCategories} 
            onChange={setSelectedCategories} 
            placeholder="Categories"
          />
          <SingleSelectDropdown 
            options={years} 
            selected={selectedYear} 
            onChange={setSelectedYear} 
            placeholder="Year"
          />
          <SingleSelectDropdown 
            options={['Newest First', 'Oldest First']} 
            selected={sortOrder === 'newest' ? 'Newest First' : 'Oldest First'} 
            onChange={(val: string) => setSortOrder(val === 'Newest First' ? 'newest' : 'oldest')} 
            placeholder="Sort"
          />
        </div>
      </div>

      <div className="blog-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
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
          ))
        ) : (
          <div className="blog-empty">
            <p>No articles found matching your criteria.</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategories([]); setSelectedYear('All'); setSortOrder('newest'); }} className="clear-filters-btn">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
