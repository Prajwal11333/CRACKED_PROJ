import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShortenedUrl } from './types';
import HeaderComponent from './components/Header';
import UrlShortenerComponent from './components/UrlShortener';
import AnalyticsComponent from './components/Analytics';
import SeoAnalyzerComponent from './components/SeoAnalyzer';
import DashboardComponent from './components/Dashboard';
import UrlRedirect from './components/UrlRedirect';
import AIChatbot from './components/AIChatbot';

const STORAGE_KEY = 'linkpro-urls';
const TAB_STORAGE_KEY = 'linkpro-tab';

const MainApp: React.FC = () => {
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('Loaded URLs:', parsed.length);
        return parsed;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    return [];
  });

  const [currentTab, setCurrentTab] = useState(() => {
    try {
      const savedTab = localStorage.getItem(TAB_STORAGE_KEY);
      return savedTab || 'dashboard';
    } catch (error) {
      return 'dashboard';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shortenedUrls));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [shortenedUrls]);

  useEffect(() => {
    try {
      localStorage.setItem(TAB_STORAGE_KEY, currentTab);
    } catch (error) {
      console.error('Error saving tab:', error);
    }
  }, [currentTab]);

  const handleUpdateClicks = (id: string) => {
    setShortenedUrls(prev => 
      prev.map(url => 
        url.id === id 
          ? { ...url, clicks: url.clicks + 1, lastClicked: new Date().toISOString() }
          : url
      )
    );
  };

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardComponent shortenedUrls={shortenedUrls} />;
      case 'shorten':
        return <UrlShortenerComponent shortenedUrls={shortenedUrls} setShortenedUrls={setShortenedUrls} />;
      case 'analytics':
        return <AnalyticsComponent shortenedUrls={shortenedUrls} />;
      case 'seo':
        return <SeoAnalyzerComponent />;
      default:
        return <DashboardComponent shortenedUrls={shortenedUrls} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <HeaderComponent currentTab={currentTab} setCurrentTab={setCurrentTab} />
      
      <main>
        {renderCurrentTab()}
      </main>

      <AIChatbot shortenedUrls={shortenedUrls} />
    </div>
  );
};

const App: React.FC = () => {
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    return [];
  });

  const handleUpdateClicks = (id: string) => {
    setShortenedUrls(prev => {
      const updated = prev.map(url => 
        url.id === id 
          ? { ...url, clicks: url.clicks + 1, lastClicked: new Date().toISOString() }
          : url
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route 
          path="/:alias" 
          element={
            <UrlRedirect 
              shortenedUrls={shortenedUrls} 
              onUpdateClicks={handleUpdateClicks} 
            />
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;


