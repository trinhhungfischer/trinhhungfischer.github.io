import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import projectsEn from '../data/projects_en.json';
import projectsVi from '../data/projects_vi.json';

interface Project {
  title: string;
  slug: string;
  type: string;
  startDate?: string;
  endDate?: string;
  pinned?: boolean;
  description: string;
  genres?: string[];
  tools?: string[];
  colorClass?: string;
  imagePlaceholder?: string;
  imageUrl?: string;
  content?: string;
}

const ProjectDetail = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const projectsData = language === 'vi' ? projectsVi : projectsEn;
  const project = projectsData.find(p => p.slug === slug) as Project | undefined;

  if (!project) {
    return (
      <div className="container" style={{ padding: '60px 24px' }}>
        <h1>{language === 'vi' ? 'Không tìm thấy dự án' : 'Project not found'}</h1>
        <Link to="/projects" className="back-link">← {language === 'vi' ? 'Quay lại Bộ sưu tập' : 'Back to Exhibition'}</Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-up" style={{ padding: '60px 24px' }}>
      <Link to="/projects" className="back-link">← {language === 'vi' ? 'Quay lại Bộ sưu tập' : 'Back to Exhibition'}</Link>
      
      <div className="page-header" style={{ marginTop: '24px' }}>
        <h1 className="page-title" style={{ fontSize: '3.5rem' }}>{project.title}</h1>
      </div>

      <div 
        className={`card-image-box ${project.colorClass}`} 
        style={project.imageUrl ? { width: '100%', height: '300px', marginBottom: '40px', border: '2px solid #111', backgroundImage: `url(${project.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'transparent' } : { width: '100%', height: '300px', marginBottom: '40px', border: '2px solid #111' }}
      >
        {project.imageUrl ? null : project.imagePlaceholder}
      </div>

      <div className="markdown-content">
        <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{project.description}</p>
        
        {project.startDate && project.endDate && (
          <p className="text-secondary" style={{ marginBottom: '24px' }}>
            <strong>Timeline:</strong> {project.startDate} — {project.endDate}
          </p>
        )}
        
        <h2>{language === 'vi' ? 'Dòng game & Thể loại' : 'Genres'}</h2>
        <ul>
          {project.genres && project.genres.map((genre: string, i: number) => (
            <li key={i}>{genre}</li>
          ))}
        </ul>

        <h2>{language === 'vi' ? 'Công cụ & Nền tảng' : 'Tools & Platforms'}</h2>
        <ul>
          {project.tools && project.tools.map((tool: string, i: number) => (
            <li key={i}>{tool}</li>
          ))}
        </ul>

        {project.content ? (
          <div className="project-markdown-content" style={{ marginTop: '32px' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]}>{project.content}</ReactMarkdown>
          </div>
        ) : (
          <>
            <h2>About the Project</h2>
            <p>
              (This is a detailed description of the project. You can edit <code>src/pages/ProjectDetail.tsx</code> or add a new field in <code>projects.json</code> to display full case studies here.)
            </p>
          </>
        )}

      </div>
    </div>
  );
};

export default ProjectDetail;
