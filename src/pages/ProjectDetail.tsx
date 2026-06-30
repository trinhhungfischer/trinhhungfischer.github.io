import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import projectsEn from '../data/projects_en.json';
import projectsVi from '../data/projects_vi.json';

const ProjectDetail = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const projectsData = language === 'vi' ? projectsVi : projectsEn;
  const project = projectsData.find(p => p.slug === slug);

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
        
        <h2>Technologies & Systems</h2>
        <ul>
          {project.tags.map((tag, i) => (
            <li key={i}>{tag}</li>
          ))}
        </ul>

        <h2>About the Project</h2>
        <p>
          (This is a detailed description of the project. You can edit <code>src/pages/ProjectDetail.tsx</code> or add a new field in <code>projects.json</code> to display full case studies here.)
        </p>

      </div>
    </div>
  );
};

export default ProjectDetail;
