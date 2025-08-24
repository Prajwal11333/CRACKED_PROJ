import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ExternalLink, AlertTriangle, Clock } from 'lucide-react';

interface RedirectPageProps {
  shortenedUrls: Array<{
    id: string;
    originalUrl: string;
    shortUrl: string;
    customAlias?: string;
    clicks: number;
    createdAt: string;
    seoScore: number;
    clickbaitScore: number;
  }>;
  onUpdateClicks: (id: string) => void;
}

const UrlRedirect: React.FC<RedirectPageProps> = ({ shortenedUrls, onUpdateClicks }) => {
  const { alias } = useParams<{ alias: string }>();
  const [countdown, setCountdown] = useState(5);
  const [redirecting, setRedirecting] = useState(false);

  console.log('Looking for alias:', alias);
  console.log('Available URLs:', shortenedUrls);

  const foundUrl = shortenedUrls.find(url => {
    // First check if it matches the custom alias directly
    if (url.customAlias && url.customAlias === alias) {
      return true;
    }
    // Then check if it matches the generated ID from the short URL
    const urlParts = url.shortUrl.split('/');
    const urlAlias = urlParts[urlParts.length - 1];
    if (urlAlias === alias) {
      return true;
    }
    return false;
  });

  console.log('Found URL:', foundUrl);

  useEffect(() => {
    if (foundUrl && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (foundUrl && countdown === 0) {
      setRedirecting(true);
      onUpdateClicks(foundUrl.id);
      // Use window.location.href for proper redirect
      setTimeout(() => {
        window.location.href = foundUrl.originalUrl;
      }, 500);
    }
  }, [countdown, foundUrl, onUpdateClicks]);

  if (!foundUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">URL Not Found</h1>
          <p className="text-gray-600 mb-6">
            The shortened URL you're looking for doesn't exist or may have been removed.
          </p>
          <a
            href="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02]"
          >
            <span>Go to Homepage</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {redirecting ? (
            <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          ) : (
            <Clock className="w-8 h-8 text-blue-600" />
          )}
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
          <div className="text-center">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              foundUrl.seoScore >= 80 ? 'bg-green-100 text-green-700' :
              foundUrl.seoScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              SEO: {foundUrl.seoScore}%
            </div>
          </div>
          <div className="text-center">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              foundUrl.clickbaitScore <= 20 ? 'bg-green-100 text-green-700' :
              foundUrl.clickbaitScore <= 50 ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              Clickbait: {foundUrl.clickbaitScore <= 20 ? 'Low' :
                         foundUrl.clickbaitScore <= 50 ? 'Medium' : 'High'}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => window.location.href = foundUrl.originalUrl}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02]"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Continue Now</span>
          </button>
          
          <a
            href="/"
            className="inline-flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
          >
            <span>Go Back</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UrlRedirect;




