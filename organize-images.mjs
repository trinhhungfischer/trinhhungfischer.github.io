import fs from 'fs';
import path from 'path';

const blogsDir = path.join(process.cwd(), 'src', 'content', 'blogs');
const imagesDir = path.join(process.cwd(), 'public', 'images');
const blogsImagesDir = path.join(imagesDir, 'blogs');

if (!fs.existsSync(blogsImagesDir)) {
  fs.mkdirSync(blogsImagesDir, { recursive: true });
}

const mdFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));

let changesCount = 0;

mdFiles.forEach(file => {
  const filePath = path.join(blogsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract slug from filename (e.g. Hello-World.en.md -> Hello-World)
  const slug = file.replace(/\.(en|vi)\.md$/, '');
  
  // Match ![alt](/images/filename.ext)
  const regex = /!\[.*?\]\(\/images\/([^/)]+)\)/g;
  let match;
  
  const imagesToMove = [];
  
  while ((match = regex.exec(content)) !== null) {
    const imageName = match[1];
    imagesToMove.push(imageName);
  }
  
  if (imagesToMove.length > 0) {
    const targetBlogImagesDir = path.join(blogsImagesDir, slug);
    if (!fs.existsSync(targetBlogImagesDir)) {
      fs.mkdirSync(targetBlogImagesDir, { recursive: true });
    }
    
    imagesToMove.forEach(imageName => {
      const sourceImage = path.join(imagesDir, imageName);
      const targetImage = path.join(targetBlogImagesDir, imageName);
      
      // Move image if it exists in the root /images/ folder
      if (fs.existsSync(sourceImage) && !fs.lstatSync(sourceImage).isDirectory()) {
        fs.renameSync(sourceImage, targetImage);
        console.log(`Moved ${imageName} to blogs/${slug}/`);
      }
      
      // Replace path in markdown
      const oldPath = `/images/${imageName}`;
      const newPath = `/images/blogs/${slug}/${imageName}`;
      content = content.replace(new RegExp(oldPath.replace(/\//g, '\\/'), 'g'), newPath);
    });
    
    fs.writeFileSync(filePath, content, 'utf-8');
    changesCount++;
  }
});

console.log(`Done! Updated ${changesCount} blog files.`);
