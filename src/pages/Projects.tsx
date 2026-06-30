import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './Projects.css';
import projectsEn from '../data/projects_en.json';
import projectsVi from '../data/projects_vi.json';

const Projects = () => {
  const { t, language } = useLanguage();
  const projects = language === 'vi' ? projectsVi : projectsEn;

  return (
    <div className="container animate-fade-up" style={{ padding: '60px 24px' }}>
      <div className="page-header">
        <h1 className="page-title">{t('projects.title')}</h1>
        <p className="text-secondary" style={{ marginTop: '16px', fontSize: '1.25rem' }}>
          {language === 'vi' ? 'Bộ sưu tập các dự án, thử nghiệm và hệ thống của mình.' : 'A gallery of my selected works, experiments, and systems.'}
        </p>
      </div>

      <div className="gallery-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <div 
              className={`card-image-box ${project.colorClass}`} 
              style={project.imageUrl ? { backgroundImage: `url(${project.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'transparent' } : {}}
            >
              {project.imageUrl ? null : project.imagePlaceholder}
            </div>
            <div className="card-content">
              <div className="tags-row">
                {project.tags.map((tag, i) => (
                  <span key={i} className="project-tag">{tag}</span>
                ))}
              </div>
              <h3>{project.title}</h3>
              <p className="text-secondary">{project.description}</p>
              
              <div className="card-footer">
                <Link to={`/projects/${project.slug}`} className="btn-primary" style={{ display: 'block', textAlign: 'center', padding: '10px 20px', width: '100%', textDecoration: 'none' }}>{t('projects.view_details')}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
