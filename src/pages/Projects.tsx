import { Link } from 'react-router-dom';
import './Projects.css';
import projectsData from '../data/projects.json';

const Projects = () => {
  const projects = projectsData;

  return (
    <div className="container animate-fade-up" style={{ padding: '60px 24px' }}>
      <div className="page-header">
        <h1 className="page-title">Exhibition</h1>
        <p className="text-secondary" style={{ marginTop: '16px', fontSize: '1.25rem' }}>A gallery of my selected works, experiments, and systems.</p>
      </div>

      <div className="gallery-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <div className={`card-image-box ${project.colorClass}`}>
              {project.imagePlaceholder}
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
                <Link to={`/projects/${project.slug}`} className="btn-primary" style={{ display: 'block', textAlign: 'center', padding: '10px 20px', width: '100%', textDecoration: 'none' }}>View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
