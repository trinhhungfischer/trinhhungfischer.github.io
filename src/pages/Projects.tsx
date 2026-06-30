import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { MultiSelectDropdown } from '../components/Dropdowns';
import './Projects.css';
import projectsEn from '../data/projects_en.json';
import projectsVi from '../data/projects_vi.json';

const Projects = () => {
  const { t, language } = useLanguage();
  const allProjects = language === 'vi' ? projectsVi : projectsEn;

  const companyProjects = allProjects.filter(p => p.type === 'company');
  const personalProjects = allProjects.filter(p => p.type === 'personal');

  const [selectedCompanyTags, setSelectedCompanyTags] = useState<string[]>([]);
  const [selectedPersonalTags, setSelectedPersonalTags] = useState<string[]>([]);

  const companyTags = Array.from(new Set(companyProjects.flatMap(p => p.tags)));
  const personalTags = Array.from(new Set(personalProjects.flatMap(p => p.tags)));

  const filteredCompanyProjects = companyProjects.filter(p => {
    if (selectedCompanyTags.length === 0) return true;
    return selectedCompanyTags.some(tag => p.tags.includes(tag));
  });

  const filteredPersonalProjects = personalProjects.filter(p => {
    if (selectedPersonalTags.length === 0) return true;
    return selectedPersonalTags.some(tag => p.tags.includes(tag));
  });

  const renderProjectGrid = (projectsToRender: typeof allProjects) => {
    if (projectsToRender.length === 0) {
      return (
        <div className="blog-empty" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0' }}>
          <p>{language === 'vi' ? 'Không tìm thấy dự án nào phù hợp.' : 'No projects found matching your criteria.'}</p>
        </div>
      );
    }

    return (
      <div className="gallery-grid">
        {projectsToRender.map((project, index) => (
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
    );
  };

  return (
    <div className="container animate-fade-up" style={{ padding: '60px 24px' }}>
      <div className="page-header">
        <h1 className="page-title">{t('projects.title')}</h1>
        <p className="text-secondary" style={{ marginTop: '16px', fontSize: '1.25rem' }}>
          {language === 'vi' ? 'Bộ sưu tập các dự án, thử nghiệm và hệ thống của mình.' : 'A gallery of my selected works, experiments, and systems.'}
        </p>
      </div>

      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>{language === 'vi' ? 'Dự án Công ty' : 'Company Projects'}</h2>
          <MultiSelectDropdown 
            options={companyTags} 
            selected={selectedCompanyTags} 
            onChange={setSelectedCompanyTags} 
            placeholder={language === 'vi' ? 'Lọc theo Tag' : 'Filter by Tag'}
          />
        </div>
        {renderProjectGrid(filteredCompanyProjects)}
      </section>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>{language === 'vi' ? 'Dự án Cá nhân' : 'Personal Projects'}</h2>
          <MultiSelectDropdown 
            options={personalTags} 
            selected={selectedPersonalTags} 
            onChange={setSelectedPersonalTags} 
            placeholder={language === 'vi' ? 'Lọc theo Tag' : 'Filter by Tag'}
          />
        </div>
        {renderProjectGrid(filteredPersonalProjects)}
      </section>
    </div>
  );
};

export default Projects;
