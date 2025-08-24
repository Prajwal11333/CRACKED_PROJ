import React from 'react';

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

interface DashboardProps {
  shortenedUrls: ShortenedUrl[];
}

const DashboardComponent: React.FC<DashboardProps> = ({ shortenedUrls }) => {
  const totalUrls = shortenedUrls.length;
  const totalClicks = shortenedUrls.reduce((sum, url) => sum + url.clicks, 0);
  const avgSeoScore = totalUrls > 0 ? Math.round(shortenedUrls.reduce((sum, url) => sum + url.seoScore, 0) / totalUrls) : 0;
  const topUrl = shortenedUrls.length > 0 ? shortenedUrls.reduce((prev, current) => (prev.clicks > current.clicks) ? prev : current) : null;

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

export default DashboardComponent;
