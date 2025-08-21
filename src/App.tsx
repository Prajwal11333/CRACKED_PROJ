import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import UrlShortener from './components/UrlShortener';
import Analytics from './components/Analytics';
import SeoAnalyzer from './components/SeoAnalyzer';
import Features from './components/Features';
import Footer from './components/Footer';
import UrlRedirect from './components/UrlRedirect';
import Dashboard from './components/Dashboard';

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  customAlias?: string;
  clicks: number;
  createdAt: string;
  seoScore: number;
  clickbaitScore: number;
  lastClicked?: string;
}
function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);

  const handleUpdateClicks = (id: string) => {
    setShortenedUrls(prev => prev.map(url => 
      url.id === id 
        ? { ...url, clicks: url.clicks + 1, lastClicked: new Date().toISOString() }
        : url
    ));
  };

  return (
    <Router>
      <Routes>
        <Route path="/r/:alias" element={
          <UrlRedirect 
            shortenedUrls={shortenedUrls} 
            onUpdateClicks={handleUpdateClicks} 
          />
        } />
        <Route path="/*" element={
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
            
            {currentTab === 'dashboard' && <Dashboard />}
            {currentTab === 'shorten' && (
              <>
                <Hero />
                <UrlShortener />
                <Features />
              </>
            )}
            
            {currentTab === 'analytics' && <Analytics />}
            {currentTab === 'seo' && <SeoAnalyzer />}
            
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;