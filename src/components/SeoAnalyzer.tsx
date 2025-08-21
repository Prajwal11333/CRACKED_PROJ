import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, XCircle, TrendingUp, Eye, Clock, Target } from 'lucide-react';

interface SEOAnalysis {
  url: string;
  overallScore: number;
  technicalSeo: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  contentSeo: {
    score: number;
    readabilityScore: number;
    keywordDensity: number;
    issues: string[];
    recommendations: string[];
  };
  clickbaitAnalysis: {
    score: number;
    severity: 'low' | 'medium' | 'high';
    indicators: string[];
    suggestions: string[];
  };
  performance: {
    loadTime: number;
    sizeKB: number;
    mobileOptimized: boolean;
  };
  socialMedia: {
    hasOpenGraph: boolean;
    hasTwitterCard: boolean;
    shareabilityScore: number;
  };
}

const SeoAnalyzer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [bulkUrls, setBulkUrls] = useState('');
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkResults, setBulkResults] = useState<SEOAnalysis[]>([]);

  const generateMockAnalysis = (targetUrl: string): SEOAnalysis => {
    const seoScore = Math.floor(Math.random() * 40) + 60;
    const clickbaitWords = ['amazing', 'shocking', 'unbelievable', 'you-wont-believe', 'incredible', 'mind-blowing', 'secret', 'this-will', 'never-fails'];
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
    
    if (urlLower.match(/\d+.*reasons|ways|things|tips/)) {
      clickbaitScore += 20;
      foundIndicators.push('Uses numbered list format (potentially clickbait)');
    }

    const severity = clickbaitScore <= 20 ? 'low' : clickbaitScore <= 50 ? 'medium' : 'high';

    return {
      url: targetUrl,
      overallScore: seoScore,
      technicalSeo: {
        score: Math.floor(Math.random() * 30) + 70,
        issues: [
          'Missing meta description',
          'No alt text for images',
          'Slow server response time'
        ].slice(0, Math.floor(Math.random() * 3) + 1),
        recommendations: [
          'Add structured data markup',
          'Optimize images for web',
          'Implement lazy loading',
          'Use HTTPS everywhere'
        ]
      },
      contentSeo: {
        score: Math.floor(Math.random() * 25) + 65,
        readabilityScore: Math.floor(Math.random() * 30) + 60,
        keywordDensity: Math.random() * 3 + 1,
        issues: [
          'Low keyword density',
          'Missing H1 tag',
          'Content too short'
        ].slice(0, Math.floor(Math.random() * 2) + 1),
        recommendations: [
          'Increase content length to 1500+ words',
          'Add more relevant keywords naturally',
          'Improve internal linking structure'
        ]
      },
      clickbaitAnalysis: {
        score: clickbaitScore,
        severity,
        indicators: foundIndicators,
        suggestions: [
          'Use more descriptive, specific titles',
          'Focus on value proposition rather than curiosity gaps',
          'Include concrete benefits in headlines'
        ]
      },
      performance: {
        loadTime: Math.random() * 3 + 1,
        sizeKB: Math.floor(Math.random() * 500) + 200,
        mobileOptimized: Math.random() > 0.3
      },
      socialMedia: {
        hasOpenGraph: Math.random() > 0.4,
        hasTwitterCard: Math.random() > 0.5,
        shareabilityScore: Math.floor(Math.random() * 40) + 50
      }
    };
  };

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = generateMockAnalysis(url);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleBulkAnalyze = async () => {
    if (!bulkUrls.trim()) return;
    
    setIsAnalyzing(true);
    const urls = bulkUrls.split('\n').filter(url => url.trim());
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const results = urls.map(url => generateMockAnalysis(url.trim()));
    setBulkResults(results);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getClickbaitColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const exportAnalysis = () => {
    const dataToExport = bulkMode ? bulkResults : (analysis ? [analysis] : []);
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `seo-analysis-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SEO & Clickbait Analyzer</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Comprehensive SEO analysis with real-time clickbait detection. Get detailed insights 
            about your URLs' search engine optimization and content quality.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-gray-200/50 w-fit">
            <button
              onClick={() => setBulkMode(false)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                !bulkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Single URL Analysis
            </button>
            <button
              onClick={() => setBulkMode(true)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                bulkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Bulk Analysis
            </button>
          </div>
        </div>

        {/* Analysis Input */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-8 mb-8">
          {!bulkMode ? (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Enter URL for SEO Analysis
              </label>
              <div className="relative mb-6">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/page-to-analyze"
                  className="w-full px-4 py-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <button
                onClick={handleAnalyze}
                disabled={!url.trim() || isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing SEO...</span>
                  </div>
                ) : (
                  'Analyze URL'
                )}
              </button>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Enter URLs for Bulk Analysis (one per line)
              </label>
              <textarea
                value={bulkUrls}
                onChange={(e) => setBulkUrls(e.target.value)}
                placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3"
                rows={6}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg mb-6 resize-none"
              />
              <button
                onClick={handleBulkAnalyze}
                disabled={!bulkUrls.trim() || isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing URLs...</span>
                  </div>
                ) : (
                  `Analyze ${bulkUrls.split('\n').filter(url => url.trim()).length} URLs`
                )}
              </button>
            </div>
          )}
        </div>

        {/* Single Analysis Results */}
        {!bulkMode && analysis && (
          <div className="space-y-8">
            {/* Overall Score */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Overall SEO Score</h3>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#e5e7eb"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="url(#gradient)"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${analysis.overallScore * 2.83} 283`}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">{analysis.overallScore}</span>
                  </div>
                </div>
                <p className="text-gray-600 max-w-md mx-auto break-all">{analysis.url}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Technical SEO */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="w-5 h-5 text-blue-600" />
                  <h4 className="text-xl font-bold text-gray-900">Technical SEO</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(analysis.technicalSeo.score)}`}>
                    {analysis.technicalSeo.score}%
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <XCircle className="w-4 h-4 text-red-500 mr-2" />
                      Issues Found
                    </h5>
                    <ul className="space-y-1">
                      {analysis.technicalSeo.issues.map((issue, index) => (
                        <li key={index} className="text-sm text-red-600 pl-6">• {issue}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Recommendations
                    </h5>
                    <ul className="space-y-1">
                      {analysis.technicalSeo.recommendations.slice(0, 3).map((rec, index) => (
                        <li key={index} className="text-sm text-green-600 pl-6">• {rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Content SEO */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Eye className="w-5 h-5 text-purple-600" />
                  <h4 className="text-xl font-bold text-gray-900">Content SEO</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(analysis.contentSeo.score)}`}>
                    {analysis.contentSeo.score}%
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Readability</span>
                      <div className="text-lg font-semibold text-gray-900">{analysis.contentSeo.readabilityScore}%</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Keyword Density</span>
                      <div className="text-lg font-semibold text-gray-900">{analysis.contentSeo.keywordDensity.toFixed(1)}%</div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
                      Improvements
                    </h5>
                    <ul className="space-y-1">
                      {analysis.contentSeo.recommendations.slice(0, 3).map((rec, index) => (
                        <li key={index} className="text-sm text-blue-600 pl-6">• {rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Clickbait Analysis */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <h4 className="text-xl font-bold text-gray-900">Clickbait Analysis</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getClickbaitColor(analysis.clickbaitAnalysis.severity)}`}>
                    {analysis.clickbaitAnalysis.severity.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">Clickbait Score</span>
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl font-bold text-gray-900">{analysis.clickbaitAnalysis.score}%</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            analysis.clickbaitAnalysis.severity === 'high' ? 'bg-red-500' :
                            analysis.clickbaitAnalysis.severity === 'medium' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(analysis.clickbaitAnalysis.score, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {analysis.clickbaitAnalysis.indicators.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Indicators Found</h5>
                      <ul className="space-y-1">
                        {analysis.clickbaitAnalysis.indicators.map((indicator, index) => (
                          <li key={index} className="text-sm text-orange-600 pl-6">• {indicator}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-5 h-5 text-green-600" />
                  <h4 className="text-xl font-bold text-gray-900">Performance</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Load Time</span>
                      <div className="text-lg font-semibold text-gray-900">{analysis.performance.loadTime.toFixed(1)}s</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Page Size</span>
                      <div className="text-lg font-semibold text-gray-900">{analysis.performance.sizeKB} KB</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Mobile Optimized</span>
                    <div className={`flex items-center space-x-1 ${
                      analysis.performance.mobileOptimized ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {analysis.performance.mobileOptimized ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {analysis.performance.mobileOptimized ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Open Graph Tags</span>
                      <span className={`text-sm font-medium ${
                        analysis.socialMedia.hasOpenGraph ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {analysis.socialMedia.hasOpenGraph ? 'Present' : 'Missing'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Twitter Card</span>
                      <span className={`text-sm font-medium ${
                        analysis.socialMedia.hasTwitterCard ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {analysis.socialMedia.hasTwitterCard ? 'Present' : 'Missing'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={exportAnalysis}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02]"
              >
                Export Analysis Report
              </button>
            </div>
          </div>
        )}

        {/* Bulk Results */}
        {bulkMode && bulkResults.length > 0 && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Bulk Analysis Results</h3>
              <button
                onClick={exportAnalysis}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02]"
              >
                Export All Results
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">URL</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">Overall Score</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">Technical SEO</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">Content SEO</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">Clickbait Risk</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">Load Time</th>
                  </tr>
                </thead>
                <tbody>
                  {bulkResults.map((result, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-4 px-4">
                        <div className="max-w-xs truncate text-blue-600 hover:text-blue-700">
                          <a href={result.url} target="_blank" rel="noopener noreferrer">
                            {result.url}
                          </a>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(result.overallScore)}`}>
                          {result.overallScore}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(result.technicalSeo.score)}`}>
                          {result.technicalSeo.score}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(result.contentSeo.score)}`}>
                          {result.contentSeo.score}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${getClickbaitColor(result.clickbaitAnalysis.severity)}`}>
                          {result.clickbaitAnalysis.severity}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-gray-900 font-medium">
                        {result.performance.loadTime.toFixed(1)}s
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

export default SeoAnalyzer;