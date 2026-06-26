import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Globe } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import './App.css';

const LanguageToggleButton = () => {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button 
      onClick={toggleLanguage}
      className="hover-lift"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        padding: '10px 16px',
        borderRadius: '30px',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        border: '2px solid var(--text-primary)',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: 'bold',
        boxShadow: '4px 4px 0px rgba(17, 17, 17, 1)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      <Globe size={18} />
      {language === 'vi' ? 'VI' : 'EN'}
    </button>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
          <LanguageToggleButton />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
