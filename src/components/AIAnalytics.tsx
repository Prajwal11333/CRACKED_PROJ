import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Users, Globe, Zap, Target } from 'lucide-react';

const AIAnalytics: React.FC = () => {
  const [insights, setInsights] = useState({
    predictedClicks: 0,
    optimalPostTime: '',
    audienceSegment: '',
    conversionProbability: 0,
    trendingKeywords: [],
    competitorAnalysis: {}
  });

  useEffect(() => {
    // Simulate AI analysis
    setTimeout(() => {
      setInsights({
        predictedClicks: Math.floor(Math.random() * 1000) + 500,
        optimalPostTime: '2:30 PM - 4:00 PM',
        audienceSegment: 'Tech-savvy millennials',
        conversionProbability: Math.floor(Math.random() * 40) + 60,
        trendingKeywords: ['AI', 'productivity', 'automation', 'efficiency'],
        competitorAnalysis: {
          performance: 'Above average',
          ranking: 'Top 15%'
        }
      });
    }, 2000);
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">AI Insights</h3>
        <div className="px-3 py-1 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs rounded-full font-semibold">
          LIVE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Predicted Clicks</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{insights.predictedClicks.toLocaleString()}</div>
          <div className="text-xs text-green-600">+23% from last week</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Conversion Rate</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{insights.conversionProbability}%</div>
          <div className="text-xs text-blue-600">Optimal performance</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-600">Best Time to Post</span>
          </div>
          <div className="text-lg font-bold text-gray-900">{insights.optimalPostTime}</div>
          <div className="text-xs text-purple-600">Peak engagement window</div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="w-5 h-5" />
          <span className="font-semibold">AI Recommendation</span>
        </div>
        <p className="text-sm opacity-90">
          Your links perform 34% better when shared during weekday afternoons. 
          Consider scheduling your next campaign for maximum impact.
        </p>
      </div>
    </div>
  );
};

export default AIAnalytics;



