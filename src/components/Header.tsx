import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.projects'), path: '/projects' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.about'), path: '/about' },
  ];

  return (
    <header className="header glass-panel">
      <div className="container header-content">
        <Link to="/" className="brand">
          <span className="text-gradient">Trinh Hung</span>
        </Link>
        
        <nav className="nav-links">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`nav-link ${location.pathname.startsWith(link.path) && link.path !== '/' || location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
