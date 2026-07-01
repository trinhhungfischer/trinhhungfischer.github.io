import fs from 'fs';
import path from 'path';

const publicBlogsDir = path.join(process.cwd(), 'public', 'content', 'blogs');
const srcBlogsDir = path.join(process.cwd(), 'src', 'content', 'blogs');
const blogsJsonPath = path.join(process.cwd(), 'src', 'data', 'blogs.json');

// Create src/content/blogs
fs.mkdirSync(srcBlogsDir, { recursive: true });

if (fs.existsSync(blogsJsonPath)) {
  const blogsMeta = JSON.parse(fs.readFileSync(blogsJsonPath, 'utf-8'));
  
  for (const meta of blogsMeta) {
    const pubFile = path.join(publicBlogsDir, `${meta.slug}.md`);
    let content = '';
    if (fs.existsSync(pubFile)) {
      content = fs.readFileSync(pubFile, 'utf-8');
    }
    
    const newContent = `---
title: "${meta.title}"
date: "${meta.date}"
category: "${meta.category}"
excerpt: "${meta.excerpt}"
color: "${meta.color}"
---

${content}
`;
    fs.writeFileSync(path.join(srcBlogsDir, `${meta.slug}.md`), newContent);
  }
}

console.log("Transferred blogs to src/content/blogs with frontmatter.");
