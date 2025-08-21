import React, { useState } from 'react';
import { Link, Copy, Download, QrCode, ExternalLink, AlertTriangle } from 'lucide-react';
import QRCodeModal from './QRCodeModal';

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

const UrlShortener: React.FC = () => {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
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

  const handleRedirect = (shortUrl: ShortenedUrl) => {
    // Update click count and last clicked time
    setShortenedUrls(prev => prev.map(item => 
      item.id === shortUrl.id 
        ? { ...item, clicks: item.clicks + 1, lastClicked: new Date().toISOString() }
        : item
    ));
    
    // Open the original URL in a new tab
    window.open(shortUrl.originalUrl, '_blank', 'noopener,noreferrer');
  };
  const handleShortenUrl = async () => {
    if (!url.trim()) return;
    
    // Basic URL validation
    try {
      new URL(url);
    } catch {
      alert('Please enter a valid URL');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newShortUrl: ShortenedUrl = {
      id: generateRandomId(),
      originalUrl: url,
      shortUrl: `https://lnk.pro/${customAlias || generateRandomId()}`,
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
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

  const exportData = () => {
    const dataStr = JSON.stringify(shortenedUrls, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'shortened-urls.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
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
              <Link className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Custom alias (optional)
            </label>
            <div className="flex items-center">
              <span className="bg-gray-100 px-4 py-4 border border-r-0 border-gray-200 rounded-l-xl text-gray-600 whitespace-nowrap">
                lnk.pro/
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
            {customAlias && (
              <p className="text-xs text-gray-500 mt-2">
                Preview: lnk.pro/{customAlias}
              </p>
            )}
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
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {shortenedUrls.length} URL{shortenedUrls.length !== 1 ? 's' : ''}
                </span>
                <button
                  onClick={exportData}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
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
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <p className="text-sm font-medium text-gray-500">Short:</p>
                        <button
                          onClick={() => handleRedirect(shortUrl)}
                          className="bg-white px-3 py-1 rounded-lg border font-mono text-sm hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200 cursor-pointer"
                          title="Click to visit original URL"
                        >
                          {shortUrl.shortUrl}
                        </button>
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
                        
                        {shortUrl.lastClicked && (
                          <div className="text-sm text-gray-600">
                            Last clicked: <span className="font-semibold">
                              {new Date(shortUrl.lastClicked).toLocaleDateString()}
                            </span>
                          </div>
                        )}
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
                        <Copy className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedUrl(shortUrl);
                          setShowQRModal(true);
                        }}
                        className="p-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200"
                        title="Generate QR Code"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => deleteUrl(shortUrl.id)}
                        className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                        title="Delete URL"
                      >
                        <AlertTriangle className="w-4 h-4" />
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
            url={selectedUrl.shortUrl}
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

export default UrlShortener;