import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
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

// Giữ URL khớp với ngôn ngữ đang chọn để link copy từ thanh địa chỉ mở đúng ngôn ngữ.
// Tiếng Anh là mặc định nên không gắn tag; tiếng Việt thêm ?lang=vi.
const LanguageUrlSync = () => {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const prevLanguage = useRef(language);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlLang = params.get('lang') === 'vi' ? 'vi' : 'en';
    const languageChanged = prevLanguage.current !== language;
    prevLanguage.current = language;

    // Mở link / back / forward (POP) → ngôn ngữ đi theo URL.
    // Bấm link nội bộ (PUSH, link không mang lang) → giữ ngôn ngữ hiện tại, chỉ sửa URL bên dưới.
    if (!languageChanged && navigationType === 'POP' && urlLang !== language) {
      setLanguage(urlLang);
      return;
    }
    // Đổi ngôn ngữ, link nội bộ thiếu lang, hoặc URL còn ?lang=en cũ → chuẩn hóa URL
    const hasCanonicalParam = language === 'vi' ? params.get('lang') === 'vi' : !params.has('lang');
    if (!hasCanonicalParam) {
      if (language === 'vi') params.set('lang', 'vi');
      else params.delete('lang');
      const search = params.toString();
      navigate(
        { pathname: location.pathname, search: search ? `?${search}` : '', hash: location.hash },
        { replace: true }
      );
    }
  }, [location, language, navigationType, navigate, setLanguage]);

  return null;
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <LanguageUrlSync />
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
