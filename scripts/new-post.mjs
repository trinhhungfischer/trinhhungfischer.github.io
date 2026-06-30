import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const blogsDir = path.join(process.cwd(), 'src', 'content', 'blogs');

// Ensure directories exist
if (!fs.existsSync(blogsDir)) {
  fs.mkdirSync(blogsDir, { recursive: true });
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // remove diacritics
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log('--- 📝 Tạo Blog Post Mới ---\n');
  
  const title = await ask('Tiêu đề (Title): ');
  if (!title) {
    console.log('Tiêu đề không được để trống.');
    rl.close();
    return;
  }
  
  const slug = slugify(title);
  const date = new Date().toISOString().split('T')[0];
  
  const category = await ask('Danh mục (Category) [VD: Code, Game Design, Life]: ');
  
  console.log('\nChọn màu sắc (Color) cho thẻ blog:');
  console.log('1. var(--pale-blue)');
  console.log('2. var(--pale-yellow)');
  console.log('3. var(--pale-green)');
  console.log('4. var(--pale-pink)');
  console.log('5. var(--pale-orange)');
  
  const colorChoice = await ask('Nhập số (1-5) [Mặc định: 1]: ');
  const colors = [
    'var(--pale-blue)',
    'var(--pale-yellow)',
    'var(--pale-green)',
    'var(--pale-pink)',
    'var(--pale-orange)'
  ];
  const color = colors[parseInt(colorChoice) - 1] || colors[0];
  
  const frontmatter = `---
title: "${title}"
date: "${date}"
category: "${category || 'Uncategorized'}"
excerpt: ""
color: "${color}"
---

Viết nội dung vào đây...
`;

  const viPath = path.join(blogsDir, `${slug}.vi.md`);
  const enPath = path.join(blogsDir, `${slug}.en.md`);

  if (fs.existsSync(viPath) || fs.existsSync(enPath)) {
    console.log('\n⚠️ Cảnh báo: Đã tồn tại bài viết với tiêu đề này!');
    rl.close();
    return;
  }

  fs.writeFileSync(viPath, frontmatter);
  fs.writeFileSync(enPath, frontmatter.replace(`title: "${title}"`, `title: "${title} (EN)"`));

  console.log('\n✅ Tạo bài viết thành công!');
  console.log(`📄 Tiếng Việt: src/content/blogs/${slug}.vi.md`);
  console.log(`📄 Tiếng Anh: src/content/blogs/${slug}.en.md`);
  console.log('\nBây giờ bạn có thể mở các file trên để bắt đầu viết.');

  rl.close();
}

main();
