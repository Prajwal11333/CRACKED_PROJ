import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Hero from './components/Hero';
// import UrlShortener from './components/UrlShortener';
// import Analytics from './components/Analytics';
// import SeoAnalyzer from './components/SeoAnalyzer';
// import Features from './components/Features';
// import Footer from './components/Footer';
// import UrlRedirect from './components/UrlRedirect';
// import Dashboard from './components/Dashboard';

// interface ShortenedUrl {
//   id: string;
//   originalUrl: string;
//   shortUrl: string;
//   customAlias?: string;
//   clicks: number;
//   createdAt: string;
//   seoScore: number;
//   clickbaitScore: number;
//   lastClicked?: string;
// }
// function App() {
//   const [currentTab, setCurrentTab] = useState('dashboard');
//   const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);

//   const handleUpdateClicks = (id: string) => {
//     setShortenedUrls(prev => prev.map(url => 
//       url.id === id 
//         ? { ...url, clicks: url.clicks + 1, lastClicked: new Date().toISOString() }
//         : url
//     ));
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/r/:alias" element={
//           <UrlRedirect 
//             shortenedUrls={shortenedUrls} 
//             onUpdateClicks={handleUpdateClicks} 
//           />
//         } />
//         <Route path="/*" element={
//           <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//             <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
            
//             {currentTab === 'dashboard' && <Dashboard />}
//             {currentTab === 'shorten' && (
//               <>
//                 <Hero />
//                 <UrlShortener />
//                 <Features />
//               </>
//             )}
            
//             {currentTab === 'analytics' && <Analytics />}
//             {currentTab === 'seo' && <SeoAnalyzer />}
            
//             <Footer />
//           </div>
//         } />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Hero from './components/Hero';
// import UrlShortener from './components/UrlShortener';
// import Analytics from './components/Analytics';
// import SeoAnalyzer from './components/SeoAnalyzer';
// import Features from './components/Features';
// import Footer from './components/Footer';
// import UrlRedirect from './components/UrlRedirect';
// import Dashboard from './components/Dashboard';

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

// Header Component
const HeaderComponent: React.FC<{currentTab: string, setCurrentTab: (tab: string) => void}> = ({ currentTab, setCurrentTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'shorten', label: 'URL Shortener', icon: '🔗' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'seo', label: 'SEO Analyzer', icon: '🔍' },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              🔗
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LinkPro
              </h1>
              <p className="text-xs text-gray-500">Professional URL Management</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentTab === item.id
                    ? 'bg-blue-100 text-blue-700 shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '❌' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    currentTab === item.id
                      ? 'bg-blue-100 text-blue-700 shadow-md'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// QR Code Modal Component
const QRCodeModal: React.FC<{url: string, onClose: () => void}> = ({ url, onClose }) => {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(url)}`;

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">QR Code</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            ❌
          </button>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl mb-4">
            <img
              src={qrCodeUrl}
              alt="QR Code"
              className="mx-auto rounded-lg shadow-lg"
              width={256}
              height={256}
            />
          </div>
          
          <p className="text-gray-600 mb-4 break-all font-mono text-sm bg-gray-50 p-2 rounded-lg">
            {url}
          </p>

          <button
            onClick={downloadQRCode}
            className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02]"
          >
            <span>📥</span>
            <span>Download QR Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// URL Shortener Component
const UrlShortenerComponent: React.FC<{
  shortenedUrls: ShortenedUrl[],
  setShortenedUrls: React.Dispatch<React.SetStateAction<ShortenedUrl[]>>
}> = ({ shortenedUrls, setShortenedUrls }) => {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<ShortenedUrl | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generateRandomId = () => Math.random().toString(36).substr(2, 8);

  const analyzeSEO = (url: string): number => {
    let score = 0;
    if (url.includes('https://')) score += 20;
    if (url.length < 100) score += 20;
    if (!url.includes('?utm_')) score += 15;
    if (url.match(/[a-z]/)) score += 15;
    if (url.match(/[A-Z]/)) score += 10;
    if (!url.includes('...')) score += 20;
    return Math.min(score, 100);
  };

  const analyzeClickbait = (url: string): number => {
    const clickbaitWords = ['amazing', 'shocking', 'unbelievable', 'you-wont-believe', 'incredible', 'mind-blowing'];
    const urlLower = url.toLowerCase();
    let score = 0;
    
    clickbaitWords.forEach(word => {
      if (urlLower.includes(word)) score += 20;
    });
    
    if (url.includes('!')) score += 10;
    if (url.match(/\d+.*reasons|ways|things/)) score += 15;
    
    return Math.min(score, 100);
  };

  const handleShortenUrl = async () => {
    if (!url.trim()) return;
    
    try {
      new URL(url);
    } catch {
      alert('Please enter a valid URL');
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const alias = customAlias || generateRandomId();
    const newShortUrl: ShortenedUrl = {
      id: generateRandomId(),
      originalUrl: url,
      shortUrl: `${window.location.origin}/r/${alias}`,
      customAlias: customAlias || undefined,
      clicks: 0,
      createdAt: new Date().toISOString(),
      seoScore: analyzeSEO(url),
      clickbaitScore: analyzeClickbait(url)
    };
    
    setShortenedUrls(prev => [newShortUrl, ...prev]);
    setUrl('');
    setCustomAlias('');
    setIsLoading(false);
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const deleteUrl = (id: string) => {
    setShortenedUrls(prev => prev.filter(item => item.id !== id));
  };

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* URL Input Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-8 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Enter URL to shorten
            </label>
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very-long-url-that-needs-shortening"
                className="w-full px-4 py-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleShortenUrl()}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔗</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Custom alias (optional)
            </label>
            <div className="flex items-center">
              <span className="bg-gray-100 px-4 py-4 border border-r-0 border-gray-200 rounded-l-xl text-gray-600 whitespace-nowrap">
                {window.location.origin}/r/
              </span>
              <input
                type="text"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                placeholder="my-custom-link"
                className="flex-1 px-4 py-4 bg-gray-50 border border-gray-200 rounded-r-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                onKeyPress={(e) => e.key === 'Enter' && handleShortenUrl()}
              />
            </div>
          </div>

          <button
            onClick={handleShortenUrl}
            disabled={!url.trim() || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Shortening URL...</span>
              </div>
            ) : (
              'Shorten URL'
            )}
          </button>
        </div>

        {/* Results Section */}
        {shortenedUrls.length > 0 && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Your Shortened URLs</h3>
              <span className="text-sm text-gray-600">
                {shortenedUrls.length} URL{shortenedUrls.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-4">
              {shortenedUrls.map((shortUrl) => (
                <div key={shortUrl.id} className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl p-6 border border-gray-200/50">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="text-sm font-medium text-gray-500">Original:</p>
                        <a
                          href={shortUrl.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                        >
                          <span className="truncate max-w-md">{shortUrl.originalUrl}</span>
                          <span>🔗</span>
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <p className="text-sm font-medium text-gray-500">Short:</p>
                        <code className="bg-white px-3 py-1 rounded-lg border font-mono text-sm">
                          {shortUrl.shortUrl}
                        </code>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">SEO Score:</span>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            shortUrl.seoScore >= 80 ? 'bg-green-100 text-green-700' :
                            shortUrl.seoScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {shortUrl.seoScore}%
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Clickbait:</span>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            shortUrl.clickbaitScore <= 20 ? 'bg-green-100 text-green-700' :
                            shortUrl.clickbaitScore <= 50 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {shortUrl.clickbaitScore <= 20 ? 'Low' :
                             shortUrl.clickbaitScore <= 50 ? 'Medium' : 'High'}
                          </div>
                        </div>

                        <div className="text-sm text-gray-600">
                          Clicks: <span className="font-semibold">{shortUrl.clicks}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 flex-wrap gap-2">
                      <button
                        onClick={() => copyToClipboard(shortUrl.shortUrl, shortUrl.id)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          copiedId === shortUrl.id 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                        title={copiedId === shortUrl.id ? 'Copied!' : 'Copy to clipboard'}
                      >
                        📋
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedUrl(shortUrl);
                          setShowQRModal(true);
                        }}
                        className="p-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200"
                        title="Generate QR Code"
                      >
                        📱
                      </button>
                      
                      <button
                        onClick={() => deleteUrl(shortUrl.id)}
                        className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                        title="Delete URL"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showQRModal && selectedUrl && (
          <QRCodeModal
            url={selectedUrl.originalUrl}
            onClose={() => {
              setShowQRModal(false);
              setSelectedUrl(null);
            }}
          />
        )}
      </div>
    </section>
  );
};

// URL Redirect Component
const UrlRedirectComponent: React.FC<{
  shortenedUrls: ShortenedUrl[],
  onUpdateClicks: (id: string) => void
}> = ({ shortenedUrls, onUpdateClicks }) => {
  const alias = window.location.pathname.split('/r/')[1];
  const [countdown, setCountdown] = useState(3);
  const [redirecting, setRedirecting] = useState(false);

  const foundUrl = shortenedUrls.find(url => 
    url.shortUrl.endsWith(`/${alias}`) || url.customAlias === alias
  );

  React.useEffect(() => {
    if (foundUrl && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (foundUrl && countdown === 0) {
      setRedirecting(true);
      onUpdateClicks(foundUrl.id);
      window.location.href = foundUrl.originalUrl;
    }
  }, [countdown, foundUrl, onUpdateClicks]);

  if (!foundUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">URL Not Found</h1>
          <p className="text-gray-600 mb-6">
            The shortened URL you're looking for doesn't exist or may have been removed.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02]"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-8">
        <div className="text-6xl mb-4">
          {redirecting ? '⏳' : '⏰'}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {redirecting ? 'Redirecting...' : `Redirecting in ${countdown}s`}
        </h1>
        
        <p className="text-gray-600 mb-6">
          You will be redirected to:
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500 mb-1">Destination:</p>
          <p className="font-mono text-sm text-blue-600 break-all">
            {foundUrl.originalUrl}
          </p>
        </div>

        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            foundUrl.seoScore >= 80 ? 'bg-green-100 text-green-700' :
            foundUrl.seoScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            SEO: {foundUrl.seoScore}%
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            foundUrl.clickbaitScore <= 20 ? 'bg-green-100 text-green-700' :
            foundUrl.clickbaitScore <= 50 ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            Clickbait: {foundUrl.clickbaitScore <= 20 ? 'Low' :
                       foundUrl.clickbaitScore <= 50 ? 'Medium' : 'High'}
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => window.location.href = foundUrl.originalUrl}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02]"
          >
            Continue Now
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced SEO Analyzer Component
const SeoAnalyzerComponent: React.FC<{shortenedUrls: ShortenedUrl[]}> = ({ shortenedUrls }) => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [selectedUrlForAnalysis, setSelectedUrlForAnalysis] = useState<string>('');

  const generateAnalysis = (targetUrl: string) => {
    const seoScore = Math.floor(Math.random() * 40) + 60;
    const clickbaitWords = ['amazing', 'shocking', 'unbelievable', 'you-wont-believe', 'incredible', 'mind-blowing'];
    const urlLower = targetUrl.toLowerCase();
    
    let clickbaitScore = 0;
    const foundIndicators: string[] = [];
    
    clickbaitWords.forEach(word => {
      if (urlLower.includes(word)) {
        clickbaitScore += 15;
        foundIndicators.push(`Contains clickbait word: "${word}"`);
      }
    });
    
    if (targetUrl.includes('!')) {
      clickbaitScore += 10;
      foundIndicators.push('Excessive use of exclamation marks');
    }

    const severity = clickbaitScore <= 20 ? 'low' : clickbaitScore <= 50 ? 'medium' : 'high';

    return {
      url: targetUrl,
      overallScore: seoScore,
      technicalSeo: {
        score: Math.floor(Math.random() * 30) + 70,
        issues: ['Missing meta description', 'No alt text for images', 'Slow server response time'].slice(0, 2),
        recommendations: ['Add structured data markup', 'Optimize images for web', 'Use HTTPS everywhere']
      },
      contentSeo: {
        score: Math.floor(Math.random() * 25) + 65,
        readabilityScore: Math.floor(Math.random() * 30) + 60,
        keywordDensity: Math.random() * 3 + 1,
        recommendations: ['Increase content length', 'Add more keywords', 'Improve internal linking']
      },
      clickbaitAnalysis: {
        score: clickbaitScore,
        severity,
        indicators: foundIndicators,
        suggestions: ['Use descriptive titles', 'Focus on value proposition', 'Include concrete benefits']
      }
    };
  };

  const handleAnalyze = async () => {
    const targetUrl = selectedUrlForAnalysis || url;
    if (!targetUrl.trim()) return;
    
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = generateAnalysis(targetUrl);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">SEO & Clickbait Analyzer</h1>

        {/* Quick Analysis for Shortened URLs */}
        {shortenedUrls.length > 0 && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Analyze Your Shortened URLs</h3>
            <div className="grid gap-4">
              {shortenedUrls.map((shortUrl) => (
                <div key={shortUrl.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-mono text-sm text-blue-600">{shortUrl.shortUrl}</p>
                    <p className="text-xs text-gray-500 truncate">{shortUrl.originalUrl}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedUrlForAnalysis(shortUrl.originalUrl);
                      handleAnalyze();
                    }}
                    className="ml-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    Analyze
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Manual URL Analysis */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-8 mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Enter URL for SEO Analysis
          </label>
          <div className="flex gap-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page-to-analyze"
              className="flex-1 px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <button
              onClick={handleAnalyze}
              disabled={!url.trim() || isAnalyzing}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Overall SEO Score</h3>
                <div className="text-6xl font-bold text-blue-600 mb-4">{analysis.overallScore}%</div>
                <p className="text-gray-600 break-all">{analysis.url}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Technical SEO: {analysis.technicalSeo.score}%</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-red-600 mb-2">Issues:</h5>
                    <ul className="space-y-1">
                      {analysis.technicalSeo.issues.map((issue: string, index: number) => (
                        <li key={index} className="text-sm text-red-600">• {issue}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-600 mb-2">Recommendations:</h5>
                    <ul className="space-y-1">
                      {analysis.technicalSeo.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="text-sm text-green-600">• {rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Content SEO: {analysis.contentSeo.score}%</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Readability</span>
                      <div className="text-lg font-semibold">{analysis.contentSeo.readabilityScore}%</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Keyword Density</span>
                      <div className="text-lg font-semibold">{analysis.contentSeo.keywordDensity.toFixed(1)}%</div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-600 mb-2">Improvements:</h5>
                    <ul className="space-y-1">
                      {analysis.contentSeo.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="text-sm text-blue-600">• {rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Clickbait: {analysis.clickbaitAnalysis.severity.toUpperCase()}
                </h4>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">Clickbait Score</span>
                    <div className="text-2xl font-bold text-gray-900">{analysis.clickbaitAnalysis.score}%</div>
                  </div>
                  
                  {analysis.clickbaitAnalysis.indicators.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-orange-600 mb-2">Indicators:</h5>
                      <ul className="space-y-1">
                        {analysis.clickbaitAnalysis.indicators.map((indicator: string, index: number) => (
                          <li key={index} className="text-sm text-orange-600">• {indicator}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Analytics Component  
const AnalyticsComponent: React.FC<{shortenedUrls: ShortenedUrl[]}> = ({ shortenedUrls }) => {
  const [selectedUrl, setSelectedUrl] = useState<string>('all');
  const [timeRange, setTimeRange] = useState('7d');

  const getFilteredData = () => {
    if (selectedUrl === 'all') return shortenedUrls;
    return shortenedUrls.filter(url => url.id === selectedUrl);
  };

  const filteredUrls = getFilteredData();
  const totalClicks = filteredUrls.reduce((sum, url) => sum + url.clicks, 0);
  const avgSeoScore = filteredUrls.length > 0 
    ? Math.round(filteredUrls.reduce((sum, url) => sum + url.seoScore, 0) / filteredUrls.length)
    : 0;

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <select
                value={selectedUrl}
                onChange={(e) => setSelectedUrl(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All URLs</option>
                {shortenedUrls.map((url) => (
                  <option key={url.id} value={url.id}>
                    {url.shortUrl.split('/').pop()}
                  </option>
                ))}
              </select>
              
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total URLs</p>
                <p className="text-3xl font-bold text-gray-900">{filteredUrls.length}</p>
              </div>
              <div className="text-3xl">🔗</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Clicks</p>
                <p className="text-3xl font-bold text-gray-900">{totalClicks}</p>
              </div>
              <div className="text-3xl">👆</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg SEO Score</p>
                <p className="text-3xl font-bold text-gray-900">{avgSeoScore}%</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Click Rate</p>
                <p className="text-3xl font-bold text-gray-900">
                  {filteredUrls.length > 0 ? Math.round(totalClicks / filteredUrls.length) : 0}
                </p>
              </div>
              <div className="text-3xl">📈</div>
            </div>
          </div>
        </div>

        {/* URL Performance Table */}
        {filteredUrls.length > 0 && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">URL Performance</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold">Short URL</th>
                    <th className="text-left py-3 px-4 font-semibold">Original URL</th>
                    <th className="text-center py-3 px-4 font-semibold">Clicks</th>
                    <th className="text-center py-3 px-4 font-semibold">SEO Score</th>
                    <th className="text-center py-3 px-4 font-semibold">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUrls.map((url) => (
                    <tr key={url.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                          {url.shortUrl.split('/').pop()}
                        </code>
                      </td>
                      <td className="py-4 px-4">
                        <div className="max-w-xs truncate text-gray-900">{url.originalUrl}</div>
                      </td>
                      <td className="py-4 px-4 text-center font-semibold">{url.clicks}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          url.seoScore >= 80 ? 'bg-green-100 text-green-700' :
                          url.seoScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {url.seoScore}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-gray-600">
                        {new Date(url.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Hero Component
const HeroComponent = () => (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        Professional URL Shortener with
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block">
          Advanced Analytics
        </span>
      </h1>
      
      <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
        Transform long URLs into branded short links with real-time SEO analysis, 
        clickbait detection, and comprehensive analytics dashboard.
      </p>
    </div>
  </section>
);

// Dashboard Component
const DashboardComponent: React.FC<{shortenedUrls: ShortenedUrl[]}> = ({ shortenedUrls }) => {
  const totalUrls = shortenedUrls.length;
  const totalClicks = shortenedUrls.reduce((sum, url) => sum + url.clicks, 0);
  const avgSeoScore = totalUrls > 0 
    ? Math.round(shortenedUrls.reduce((sum, url) => sum + url.seoScore, 0) / totalUrls)
    : 0;
  
  const topUrl = shortenedUrls.length > 0 
    ? shortenedUrls.reduce((prev, current) => (prev.clicks > current.clicks) ? prev : current)
    : null;

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total URLs</p>
                <p className="text-3xl font-bold text-gray-900">{totalUrls}</p>
              </div>
              <div className="text-3xl">🔗</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Clicks</p>
                <p className="text-3xl font-bold text-gray-900">{totalClicks}</p>
              </div>
              <div className="text-3xl">👆</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg SEO Score</p>
                <p className="text-3xl font-bold text-gray-900">{avgSeoScore}%</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Click Rate</p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalUrls > 0 ? Math.round(totalClicks / totalUrls) : 0}
                </p>
              </div>
              <div className="text-3xl">📈</div>
            </div>
          </div>
        </div>

        {topUrl && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
            <h3 className="text-2xl font-bold mb-2">Top Performing URL</h3>
            <p className="text-blue-100 mb-4">Your most clicked shortened URL</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
              <code className="text-white font-mono">{topUrl.shortUrl}</code>
            </div>
            <div className="text-4xl font-bold">{topUrl.clicks} clicks</div>
          </div>
        )}

        {shortenedUrls.length > 0 && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent URLs</h3>
            <div className="space-y-4">
              {shortenedUrls.slice(0, 5).map((url) => (
                <div key={url.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <code className="text-blue-600 font-mono text-sm">{url.shortUrl}</code>
                    <p className="text-gray-500 text-xs truncate max-w-md">{url.originalUrl}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{url.clicks}</div>
                    <div className="text-xs text-gray-500">clicks</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
// function App() {
//   const [currentTab, setCurrentTab] = useState('dashboard');
//   const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);

//   const handleUpdateClicks = (id: string) => {
//     setShortenedUrls(prev => prev.map(url => 
//       url.id === id 
//         ? { ...url, clicks: url.clicks + 1, lastClicked: new Date().toISOString() }
//         : url
//     ));
//   };

//   // Check if we're on a redirect route
//   const isRedirectRoute = window.location.pathname.startsWith('/r/');

//   if (isRedirectRoute) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//         <UrlRedirectComponent 
//           shortenedUrls={shortenedUrls} 
//           onUpdateClicks={handleUpdateClicks} 
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       <HeaderComponent currentTab={currentTab} setCurrentTab={setCurrentTab} />
      
//       {currentTab === 'dashboard' && (
//         <DashboardComponent shortenedUrls={shortenedUrls} />
//       )}
      
//       {currentTab === 'shorten' && (
//         <>
//           <HeroComponent />
//           <UrlShortenerComponent 
//             shortenedUrls={shortenedUrls} 
//             setShortenedUrls={setShortenedUrls} 
//           />
//         </>
//       )}
      
//       {currentTab === 'analytics' && (
//         <AnalyticsComponent shortenedUrls={shortenedUrls} />
//       )}
      
//       {currentTab === 'seo' && (
//         <SeoAnalyzerComponent shortenedUrls={shortenedUrls} />
//       )}
//     </div>
//   );
// }

// export default App;

// ...existing code...
function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  // Persist shortenedUrls in localStorage
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>(() => {
    const saved = localStorage.getItem('shortenedUrls');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever shortenedUrls changes
  React.useEffect(() => {
    localStorage.setItem('shortenedUrls', JSON.stringify(shortenedUrls));
  }, [shortenedUrls]);

  const handleUpdateClicks = (id: string) => {
    setShortenedUrls(prev => prev.map(url => 
      url.id === id 
        ? { ...url, clicks: url.clicks + 1, lastClicked: new Date().toISOString() }
        : url
    ));
  };

  // Check if we're on a redirect route
  const isRedirectRoute = window.location.pathname.startsWith('/r/');

  if (isRedirectRoute) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <UrlRedirectComponent 
          shortenedUrls={shortenedUrls} 
          onUpdateClicks={handleUpdateClicks} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <HeaderComponent currentTab={currentTab} setCurrentTab={setCurrentTab} />
      
      {currentTab === 'dashboard' && (
        <DashboardComponent shortenedUrls={shortenedUrls} />
      )}
      
      {currentTab === 'shorten' && (
        <>
          <HeroComponent />
          <UrlShortenerComponent 
            shortenedUrls={shortenedUrls} 
            setShortenedUrls={setShortenedUrls} 
          />
        </>
      )}
      
      {currentTab === 'analytics' && (
        <AnalyticsComponent shortenedUrls={shortenedUrls} />
      )}
      
      {currentTab === 'seo' && (
        <SeoAnalyzerComponent shortenedUrls={shortenedUrls} />
      )}
    </div>
  );
}

export default App;
// // ...existing code...


