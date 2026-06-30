import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { GroupedMultiSelectDropdown, SingleSelectDropdown } from '../components/Dropdowns';
import './Projects.css';
import projectsEn from '../data/projects_en.json';
import projectsVi from '../data/projects_vi.json';

const Projects = () => {
  const { t, language } = useLanguage();
  const allProjects = language === 'vi' ? projectsVi : projectsEn;

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Calculate unique options for groups
  const types = Array.from(new Set(allProjects.map(p => p.type)));
  const genres = Array.from(new Set(allProjects.flatMap(p => p.genres || [])));
  const tools = Array.from(new Set(allProjects.flatMap(p => p.tools || [])));

  const filterGroups = [
    { label: language === 'vi' ? 'Loại dự án' : 'Project Type', options: types },
    { label: language === 'vi' ? 'Dòng game' : 'Genres', options: genres },
    { label: language === 'vi' ? 'Công cụ' : 'Tools', options: tools },
  ];

  const filteredProjects = allProjects.filter(p => {
    if (selectedTags.length === 0) return true;
    
    // Check if the project matches ANY of the selected tags (OR logic across all tags)
    const matchesType = selectedTags.includes(p.type);
    const matchesGenre = p.genres && p.genres.some(g => selectedTags.includes(g));
    const matchesTool = p.tools && p.tools.some(t => selectedTags.includes(t));
    
    return matchesType || matchesGenre || matchesTool;
  });

  // Sorting Logic: 
  // 1. Pinned (true first)
  // 2. endDate & startDate based on sortOrder
  filteredProjects.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;

    const getEndDateVal = (dateStr: string | undefined) => {
      if (!dateStr) return 0;
      if (dateStr.toLowerCase() === 'present') return Infinity;
      return new Date(dateStr).getTime();
    };
    
    const getStartDateVal = (dateStr: string | undefined) => {
      if (!dateStr) return 0;
      return new Date(dateStr).getTime();
    };

    const endA = getEndDateVal(a.endDate);
    const endB = getEndDateVal(b.endDate);

    const sortMultiplier = sortOrder === 'newest' ? 1 : -1;

    if (endA !== endB) return (endB - endA) * sortMultiplier;

    const startA = getStartDateVal(a.startDate);
    const startB = getStartDateVal(b.startDate);
    return (startB - startA) * sortMultiplier;
  });

  const sortOptions = language === 'vi' ? ['Mới nhất', 'Cũ nhất'] : ['Newest', 'Oldest'];
  const currentSortOption = sortOrder === 'newest' ? sortOptions[0] : sortOptions[1];

  return (
    <div className="container animate-fade-up" style={{ padding: '60px 24px' }}>
      <div className="page-header">
        <h1 className="page-title">{t('projects.title')}</h1>
        <p className="text-secondary" style={{ marginTop: '16px', fontSize: '1.25rem' }}>
          {language === 'vi' ? 'Bộ sưu tập các dự án, thử nghiệm và hệ thống của mình.' : 'A gallery of my selected works, experiments, and systems.'}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px', gap: '16px', flexWrap: 'wrap' }}>
        <SingleSelectDropdown 
          options={sortOptions} 
          selected={currentSortOption} 
          onChange={(val: string) => setSortOrder(val === sortOptions[0] ? 'newest' : 'oldest')} 
          placeholder={language === 'vi' ? 'Sắp xếp' : 'Sort by'}
        />
        <GroupedMultiSelectDropdown 
          groups={filterGroups} 
          selected={selectedTags} 
          onChange={setSelectedTags} 
          placeholder={language === 'vi' ? 'Lọc dự án' : 'Filter Projects'}
        />
      </div>

      {filteredProjects.length === 0 ? (
        <div className="blog-empty" style={{ textAlign: 'center', padding: '40px 0' }}>
          <p>{language === 'vi' ? 'Không tìm thấy dự án nào phù hợp.' : 'No projects found matching your criteria.'}</p>
        </div>
      ) : (
        <div className="gallery-grid">
          {filteredProjects.map((project, index) => (
            <div className="project-card" key={index} style={{ position: 'relative' }}>
              
              {project.pinned && (
                <div style={{ 
                  position: 'absolute', top: 12, right: 12, zIndex: 10, 
                  background: 'var(--bg-primary)', 
                  width: '36px', height: '36px', 
                  borderRadius: '50%', 
                  border: 'var(--border-width) solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }} title="Pinned">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text-primary)" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 17v5" />
                    <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
                  </svg>
                </div>
              )}

              <div 
                className={`card-image-box ${project.colorClass}`} 
                style={project.imageUrl ? { backgroundImage: `url(${project.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'transparent' } : {}}
              >
                {project.imageUrl ? null : project.imagePlaceholder}
              </div>
              <div className="card-content">
                <div className="tags-row">
                  {project.type === 'personal' && <span className="project-tag" style={{ backgroundColor: 'var(--pale-blue)' }}>Personal</span>}
                  {[...(project.genres || []), ...(project.tools || [])].map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>
                <h3>{project.title}</h3>
                
                {project.startDate && project.endDate && (
                  <p className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '12px', fontWeight: 600 }}>
                    {project.startDate} — {project.endDate}
                  </p>
                )}

                <p className="text-secondary">{project.description}</p>
                
                <div className="card-footer">
                  <Link to={`/projects/${project.slug}`} className="btn-primary" style={{ display: 'block', textAlign: 'center', padding: '10px 20px', width: '100%', textDecoration: 'none' }}>{t('projects.view_details')}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
