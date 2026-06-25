import fs from 'fs';
import path from 'path';

const postsDir = path.join(process.cwd(), '_posts');
const outDir = path.join(process.cwd(), 'public', 'content', 'blogs');
const dataFile = path.join(process.cwd(), 'src', 'data', 'blogs.json');

// Ensure output directories exist
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(path.dirname(dataFile), { recursive: true });

const files = fs.readdirSync(postsDir);
const blogsMeta = [];

files.forEach((file, index) => {
  if (!file.endsWith('.md')) return;
  
  const rawContent = fs.readFileSync(path.join(postsDir, file), 'utf-8');
  
  // Extract frontmatter
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = rawContent.match(frontmatterRegex);
  
  let title = "Untitled";
  let content = rawContent;
  
  if (match) {
    const fm = match[1];
    const titleMatch = fm.match(/title:\s*(.*)/);
    if (titleMatch) title = titleMatch[1].trim();
    content = rawContent.replace(frontmatterRegex, '');
  }

  // Parse date and slug from filename
  // format: YYYY-MM-DD-title.md
  const nameParts = file.replace('.md', '').split('-');
  const year = nameParts[0];
  const month = nameParts[1];
  const day = nameParts[2];
  
  const slug = nameParts.slice(3).join('-');
  const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  
  // Determine an excerpt
  const firstParagraph = content.split('\n\n').find(p => p.trim().length > 0 && !p.startsWith('#')) || '';
  const excerpt = firstParagraph.substring(0, 150).replace(/[#*_]/g, '') + '...';
  
  const colors = ['var(--pale-blue)', 'var(--pale-yellow)', 'var(--pale-green)', 'var(--pale-pink)', 'var(--pale-orange)'];

  blogsMeta.push({
    title,
    slug,
    date: dateStr,
    category: "Archive",
    excerpt,
    color: colors[index % colors.length]
  });
  
  fs.writeFileSync(path.join(outDir, `${slug}.md`), content);
});

// Sort by date descending
blogsMeta.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

fs.writeFileSync(dataFile, JSON.stringify(blogsMeta, null, 2));

console.log('Migration complete!');
