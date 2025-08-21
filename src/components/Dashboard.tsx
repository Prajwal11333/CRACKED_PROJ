import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe, 
  Clock, 
  Link,
  Eye,
  MousePointer,
  Calendar,
  Download
} from 'lucide-react';

interface DashboardStats {
  totalUrls: number;
  totalClicks: number;
  uniqueVisitors: number;
  avgClickRate: number;
  topPerformingUrl: string;
  recentActivity: Array<{
    id: string;
    action: string;
    url: string;
    timestamp: string;
  }>;
  clicksToday: number;
  clicksThisWeek: number;
  clicksThisMonth: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalUrls: 156,
        totalClicks: 12547,
        uniqueVisitors: 8932,
        avgClickRate: 71.2,
        topPerformingUrl: 'lnk.pro/product-launch',
        recentActivity: [
          {
            id: '1',
            action: 'URL Created',
            url: 'https://example.com/new-product',
            timestamp: '2 minutes ago'
          },
          {
            id: '2',
            action: 'Link Clicked',
            url: 'lnk.pro/marketing-campaign',
            timestamp: '5 minutes ago'
          },
          {
            id: '3',
            action: 'SEO Analysis',
            url: 'https://blog.example.com/seo-guide',
            timestamp: '12 minutes ago'
          },
          {
            id: '4',
            action: 'Bulk Analysis',
            url: '25 URLs processed',
            timestamp: '1 hour ago'
          }
        ],
        clicksToday: 234,
        clicksThisWeek: 1567,
        clicksThisMonth: 6789
      });
      setIsLoading(false);
    };

    fetchDashboardStats();
  }, [timeRange]);

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Overview of your URL shortening activity</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
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
              
              <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02]">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total URLs</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.totalUrls}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Link className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12 this week
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Clicks</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.totalClicks.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <MousePointer className="w-6 h-6 text-white" />
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
                <p className="text-sm text-gray-600 mb-1">Unique Visitors</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.uniqueVisitors.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +15.3% from last period
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg. Click Rate</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.avgClickRate}%</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +5.7% from last period
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Click Activity */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Click Activity</h3>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats?.clicksToday}</div>
                <div className="text-sm text-gray-600">Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats?.clicksThisWeek.toLocaleString()}</div>
                <div className="text-sm text-gray-600">This Week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{stats?.clicksThisMonth.toLocaleString()}</div>
                <div className="text-sm text-gray-600">This Month</div>
              </div>
            </div>

            {/* Simple chart representation */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Monday</span>
                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-sm font-semibold text-gray-900">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tuesday</span>
                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <span className="text-sm font-semibold text-gray-900">1,456</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Wednesday</span>
                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <span className="text-sm font-semibold text-gray-900">987</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Thursday</span>
                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="text-sm font-semibold text-gray-900">1,789</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Friday</span>
                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-sm font-semibold text-gray-900">876</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
            
            <div className="space-y-4">
              {stats?.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600 truncate">{activity.url}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing URL */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Top Performing URL</h3>
              <p className="text-blue-100 mb-4">Your most clicked shortened URL this period</p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <code className="text-white font-mono">{stats?.topPerformingUrl}</code>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold mb-2">3,421</div>
              <div className="text-blue-200">Total Clicks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;