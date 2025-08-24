import React from 'react';
import { BarChart3, TrendingUp, Users, Globe } from 'lucide-react';

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

interface AnalyticsProps {
  shortenedUrls: ShortenedUrl[];
}

const AnalyticsComponent: React.FC<AnalyticsProps> = ({ shortenedUrls }) => {
  const totalClicks = shortenedUrls.reduce((sum, url) => sum + url.clicks, 0);
  const avgSeoScore = shortenedUrls.length > 0 ? Math.round(shortenedUrls.reduce((sum, url) => sum + url.seoScore, 0) / shortenedUrls.length) : 0;

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <h3 className="text-lg font-semibold">Total Clicks</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalClicks}</p>
            <p className="text-green-600 text-sm">+12% from last week</p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <h3 className="text-lg font-semibold">Avg SEO Score</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{avgSeoScore}%</p>
            <p className="text-green-600 text-sm">+5% improvement</p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-8 h-8 text-purple-600" />
              <h3 className="text-lg font-semibold">Active URLs</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{shortenedUrls.length}</p>
            <p className="text-blue-600 text-sm">All time</p>
          </div>
        </div>

        {shortenedUrls.length > 0 && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">URL Performance</h3>
            <div className="space-y-4">
              {shortenedUrls.map((url) => (
                <div key={url.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-blue-600 font-mono text-sm">{url.shortUrl}</code>
                    <span className="text-lg font-bold text-gray-900">{url.clicks} clicks</span>
                  </div>
                  <p className="text-gray-500 text-xs mb-2 truncate">{url.originalUrl}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-green-600">SEO: {url.seoScore}%</span>
                    <span className="text-orange-600">Clickbait: {url.clickbaitScore}%</span>
                    <span className="text-gray-500">Created: {new Date(url.createdAt).toLocaleDateString()}</span>
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

export default AnalyticsComponent;
