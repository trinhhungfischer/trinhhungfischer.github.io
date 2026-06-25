import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-info">
          <h3>Trinh Hung</h3>
          <p className="text-secondary">Game Designer & Gamification Expert</p>
        </div>
        
        <div className="social-links">
          <a href="https://github.com/trinhhungfischer" target="_blank" rel="noreferrer" className="social-icon hover-lift" aria-label="GitHub">
            <FaGithub size={24} />
          </a>
          <a href="https://twitter.com/trinhhungfisch" target="_blank" rel="noreferrer" className="social-icon hover-lift" aria-label="Twitter">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com/in/trinhhungfischer" target="_blank" rel="noreferrer" className="social-icon hover-lift" aria-label="LinkedIn">
            <FaLinkedin size={24} />
          </a>
          <a href="mailto:trinhhungfischer@gmail.com" className="social-icon hover-lift" aria-label="Email">
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p className="text-secondary">© {new Date().getFullYear()} Trinh Hung. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
