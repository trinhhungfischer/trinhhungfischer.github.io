
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
          <a href="https://github.com/trinhhungfischer" target="_blank" rel="noreferrer" className="social-icon hover-lift">
            GH
          </a>
          <a href="https://twitter.com/trinhhungfisch" target="_blank" rel="noreferrer" className="social-icon hover-lift">
            TW
          </a>
          <a href="https://linkedin.com/in/trinhhungfischer" target="_blank" rel="noreferrer" className="social-icon hover-lift">
            IN
          </a>
          <a href="mailto:trinhhungfischer@gmail.com" className="social-icon hover-lift">
            EM
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
