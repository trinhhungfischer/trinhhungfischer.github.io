import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: 'var(--text-primary)',
        color: 'var(--bg-color)',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        boxShadow: 'var(--shadow)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {language.toUpperCase()}
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
