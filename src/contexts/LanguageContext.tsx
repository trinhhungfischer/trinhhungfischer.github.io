import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.about': 'Resume',
    'home.greeting': 'Hi, I\'m',
    'home.role': 'Game Designer / Product Owner',
    'home.description': 'Game Designer & Gamification Expert. I specialize in crafting meaningful mechanics and engaging player journeys.',
    'home.connect': 'Let\'s connect',
    'home.download_cv': 'Download my CV',
    'home.featured': 'Featured Projects',
    'home.status': 'Available for Work',
    'home.location_label': 'Location',
    'home.location_value': 'Vietnam',
    'home.focus_label': 'Focus',
    'home.focus_value': 'Mechanics & Systems',
    'home.email_label': 'Email',
    'projects.title': 'Projects',
    'projects.view_details': 'View Details',
    'projects.all': 'All',
    'blog.title': 'Blog',
  },
  vi: {
    'nav.home': 'Trang chủ',
    'nav.projects': 'Dự án',
    'nav.blog': 'Blog',
    'nav.about': 'Hồ sơ',
    'home.greeting': 'Chào, mình là',
    'home.role': 'Thiết kế Game / Quản lý Sản phẩm',
    'home.description': 'Chuyên gia Thiết kế Game & Gamification. Mình chuyên tạo ra các cơ chế ý nghĩa và hành trình người chơi hấp dẫn.',
    'home.connect': 'Kết nối nhé',
    'home.download_cv': 'Tải CV của mình',
    'home.featured': 'Dự án Nổi bật',
    'home.status': 'Đang tìm việc',
    'home.location_label': 'Khu vực',
    'home.location_value': 'Việt Nam',
    'home.focus_label': 'Chuyên môn',
    'home.focus_value': 'Cơ chế & Hệ thống',
    'home.email_label': 'Email',
    'projects.title': 'Dự án',
    'projects.view_details': 'Xem chi tiết',
    'projects.all': 'Tất cả',
    'blog.title': 'Blog',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language;
    if (saved && (saved === 'en' || saved === 'vi')) {
      setLanguage(saved);
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'vi' : 'en';
      localStorage.setItem('lang', next);
      return next;
    });
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
