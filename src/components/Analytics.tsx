import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Globe, TrendingUp, Clock, MapPin } from 'lucide-react';

interface AnalyticsData {
  totalClicks: number;
  uniqueUsers: number;
  topCountries: { country: string; clicks: number; percentage: number }[];
  clicksOverTime: { date: string; clicks: number }[];
  topUrls: { url: string; clicks: number; shortUrl: string }[];
  deviceTypes: { device: string; clicks: number; percentage: number }[];
}

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAnalyticsData({
        totalClicks: 12547,
        uniqueUsers: 8932,
        topCountries: [
          { country: 'United States', clicks: 4521, percentage: 36 },
          { country: 'India', clicks: 2876, percentage: 23 },
          { country: 'United Kingdom', clicks: 1654, percentage: 13 },
          { country: 'Germany', clicks: 1234, percentage: 10 },
          { country: 'Canada', clicks: 987, percentage: 8 },
        ],
        clicksOverTime: [
          { date: '2024-01-01', clicks: 1234 },
          { date: '2024-01-02', clicks: 1456 },
          { date: '2024-01-03', clicks: 1789 },
          { date: '2024-01-04', clicks: 2134 },
          { date: '2024-01-05', clicks: 1987 },
          { date: '2024-01-06', clicks: 2345 },
          { date: '2024-01-07', clicks: 2602 },
        ],
        topUrls: [
          { url: 'https://example.com/product-launch', clicks: 3421, shortUrl: 'lnk.pro/launch' },
          { url: 'https://blog.example.com/seo-guide', clicks: 2876, shortUrl: 'lnk.pro/seo' },
          { url: 'https://shop.example.com/deals', clicks: 2134, shortUrl: 'lnk.pro/deals' },
        ],
        deviceTypes: [
          { device: 'Desktop', clicks: 6234, percentage: 50 },
          { device: 'Mobile', clicks: 4987, percentage: 40 },
          { device: 'Tablet', clicks: 1326, percentage: 10 },
        ],
      });
      setIsLoading(false);
    };

    fetchAnalytics();
  }, [timeRange]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600">Track your URL performance and user engagement</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Clicks</p>
                <p className="text-3xl font-bold text-gray-900">{analyticsData?.totalClicks.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12.5% from last period
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Unique Users</p>
                <p className="text-3xl font-bold text-gray-900">{analyticsData?.uniqueUsers.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8.2% from last period
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Click-Through Rate</p>
                <p className="text-3xl font-bold text-gray-900">71.2%</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +5.7% from last period
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg. Session Duration</p>
                <p className="text-3xl font-bold text-gray-900">2m 34s</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +15.3% from last period
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Countries */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center space-x-2 mb-6">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">Top Countries</h3>
            </div>
            
            <div className="space-y-4">
              {analyticsData?.topCountries.map((country, index) => (
                <div key={country.country} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-900">{country.country}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">{country.clicks.toLocaleString()}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${country.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">{country.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Types */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Device Types</h3>
            
            <div className="space-y-4">
              {analyticsData?.deviceTypes.map((device, index) => (
                <div key={device.device} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-semibold ${
                      index === 0 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                      index === 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                      'bg-gradient-to-r from-emerald-500 to-teal-500'
                    }`}>
                      {device.device.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{device.device}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">{device.clicks.toLocaleString()}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === 0 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                          index === 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                          'bg-gradient-to-r from-emerald-500 to-teal-500'
                        }`}
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">{device.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top URLs */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/50">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Top Performing URLs</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Original URL</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Short URL</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData?.topUrls.map((urlData, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-4 px-4">
                      <div className="max-w-md truncate text-gray-900">{urlData.url}</div>
                    </td>
                    <td className="py-4 px-4">
                      <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded font-mono text-sm">
                        {urlData.shortUrl}
                      </code>
                    </td>
                    <td className="py-4 px-4 text-right font-semibold text-gray-900">
                      {urlData.clicks.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;