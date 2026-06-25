import { useLanguage } from '../contexts/LanguageContext';
import './Home.css';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="home-page animate-fade-up">
      <div className="container" style={{ padding: '60px 24px' }}>
        <div className="bento-grid">
          
          {/* Main Info Block */}
          <div className="bento-item bento-hero">
            <div className="info-header">
              <h1 className="hero-title">Trinh Hung</h1>
              <div className="status-badge">{t('home.status')}</div>
            </div>
            
            <p className="hero-subtitle text-secondary">
              {t('home.description')}
            </p>
            
            <div className="personal-details">
              <div className="detail-row">
                <span className="detail-label">{t('home.location_label')}:</span>
                <span className="detail-value">{t('home.location_value')}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">{t('home.focus_label')}:</span>
                <span className="detail-value">{t('home.focus_value')}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">{t('home.email_label')}:</span>
                <span className="detail-value">trinhhungfischer@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Photo Block */}
          <div className="bento-item bento-photo">
            <div className="avatar-wrapper square-shape">
              <img 
                src="/images/my-logo.png" 
                alt="Trinh Hung" 
                className="profile-img"
              />
            </div>
          </div>

          {/* About / Skills Block */}
          <div className="bento-item bento-about">
            <h3>Gamification</h3>
            <p className="text-secondary" style={{ marginTop: '12px' }}>
              Applying game mechanics to non-game contexts to drive engagement and motivation.
            </p>
          </div>

          {/* Project 1 */}
          <div className="bento-item bento-project-1">
            <div className="project-tag">Featured</div>
            <h3>Gamification Engine</h3>
            <p className="text-secondary" style={{ marginTop: '8px' }}>A modular framework.</p>
          </div>

          {/* Download CV Block */}
          <a href="#" className="bento-item bento-project-2 hover-lift" style={{ alignItems: 'center', textAlign: 'center', textDecoration: 'none', color: 'inherit' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '8px', lineHeight: 1 }}>CV</h2>
            <p className="text-secondary" style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>{t('home.download_cv')}</p>
            <div className="icon-btn" style={{ marginTop: '24px', background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>↓</div>
          </a>

          {/* Blog Teaser */}
          <div className="bento-item bento-blog">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div>
                <h3>Latest Thoughts</h3>
                <p className="text-secondary" style={{ marginTop: '8px' }}>Read my latest articles on game design theory.</p>
              </div>
              <button className="icon-btn">→</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
