import React, { useState } from 'react';
import { Copy, QrCode, Trash2, ExternalLink, Check } from 'lucide-react';
import { ShortenedUrl } from '../types';
import QRCodeModal from './QRCodeModal';

interface UrlShortenerProps {
  shortenedUrls: ShortenedUrl[];
  setShortenedUrls: React.Dispatch<React.SetStateAction<ShortenedUrl[]>>;
}

const UrlShortenerComponent: React.FC<UrlShortenerProps> = ({ shortenedUrls, setShortenedUrls }) => {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [qrModalData, setQrModalData] = useState<{url: string, originalUrl: string} | null>(null);

  const generateRandomId = () => Math.random().toString(36).substring(2, 8);

  const handleShortenUrl = async () => {
    if (!url.trim()) return;
    
    try {
      new URL(url);
    } catch {
      alert('Please enter a valid URL');
      return;
    }

    // Check if custom alias already exists
    if (customAlias.trim() && shortenedUrls.some(existingUrl => existingUrl.customAlias === customAlias.trim())) {
      alert('This custom alias is already taken. Please choose a different one.');
      return;
    }
  
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    const finalAlias = customAlias.trim() || generateRandomId();
    const newShortUrl: ShortenedUrl = {
      id: generateRandomId(),
      originalUrl: url,
      shortUrl: `${window.location.origin}/${finalAlias}`,
      customAlias: customAlias.trim() || undefined,
      clicks: 0,
      createdAt: new Date().toISOString(),
      seoScore: Math.floor(Math.random() * 40) + 60,
      clickbaitScore: Math.floor(Math.random() * 30) + 10
    };
    
    setShortenedUrls(prev => [newShortUrl, ...prev]);
    setUrl('');
    setCustomAlias('');
    setIsLoading(false);
  };

  const handleCopy = async (shortUrl: string, id: string) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this shortened URL?')) {
      setShortenedUrls(prev => prev.filter(url => url.id !== id));
    }
  };

  const handleQRCode = (shortUrl: string, originalUrl: string) => {
    setQrModalData({ url: shortUrl, originalUrl });
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Shorten Your URL</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter URL to shorten
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very-long-url"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom alias (optional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  lnk.pro/
                </span>
                <input
                  type="text"
                  value={customAlias}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z0-9-_]/g, '');
                    setCustomAlias(value);
                  }}
                  placeholder="my-custom-link"
                  className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={50}
                />
              </div>
              {customAlias && shortenedUrls.some(url => url.customAlias === customAlias) && (
                <p className="text-red-500 text-sm mt-1">This alias is already taken</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Only letters, numbers, hyphens, and underscores allowed
              </p>
            </div>
            
            <button
              onClick={handleShortenUrl}
              disabled={isLoading || !url.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Shortening...' : 'Shorten URL'}
            </button>
          </div>
        </div>

        {shortenedUrls.length > 0 && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Shortened URLs</h3>
            
            <div className="space-y-4">
              {shortenedUrls.map((shortUrl) => (
                <div key={shortUrl.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-blue-600 text-lg font-semibold mb-1">
                        {shortUrl.shortUrl}
                      </div>
                      <div className="text-gray-500 text-sm truncate">
                        {shortUrl.originalUrl}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-gray-900">{shortUrl.clicks}</div>
                      <div className="text-xs text-gray-500">clicks</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm mb-4">
                    <span className="text-green-600 bg-green-50 px-2 py-1 rounded">
                      SEO: {shortUrl.seoScore}%
                    </span>
                    <span className="text-orange-600 bg-orange-50 px-2 py-1 rounded">
                      Clickbait: {shortUrl.clickbaitScore}%
                    </span>
                    <span className="text-gray-500">
                      Created: {new Date(shortUrl.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleCopy(shortUrl.shortUrl, shortUrl.id)}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                    >
                      {copiedId === shortUrl.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleQRCode(shortUrl.shortUrl, shortUrl.originalUrl)}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 transition-colors"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>QR Code</span>
                    </button>
                    
                    <button
                      onClick={() => window.open(shortUrl.shortUrl, '_blank')}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit</span>
                    </button>
                    
                    <button
                      onClick={() => handleDelete(shortUrl.id)}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {qrModalData && (
        <QRCodeModal
          url={qrModalData.url}
          originalUrl={qrModalData.originalUrl}
          onClose={() => setQrModalData(null)}
        />

      )}
    </div>
  );
};

export default UrlShortenerComponent;









