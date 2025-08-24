import React, { useState } from 'react';
import { Search, Download, AlertCircle, CheckCircle, Upload, X } from 'lucide-react';

const SeoAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [bulkUrls, setBulkUrls] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [bulkAnalysis, setBulkAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);

  const generateMockAnalysis = (url) => ({
    url: url,
    overallScore: Math.floor(Math.random() * 30) + 70,
    technicalSeo: {
      score: Math.floor(Math.random() * 30) + 70,
      issues: ['Missing meta description', 'Large images detected'],
      recommendations: ['Add meta descriptions', 'Optimize images']
    },
    contentSeo: {
      score: Math.floor(Math.random() * 30) + 70,
      issues: ['Thin content detected'],
      recommendations: ['Expand content with more details']
    }
  });

  const handleAnalyze = () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const mockAnalysis = generateMockAnalysis(url);
      setAnalysis(mockAnalysis);
      setIsLoading(false);
    }, 2000);
  };

  const handleBulkAnalyze = () => {
    if (!bulkUrls.trim()) return;
    
    const urls = bulkUrls.split('\n').filter(url => url.trim());
    if (urls.length === 0) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const results = urls.map(url => generateMockAnalysis(url.trim()));
      setBulkAnalysis({
        results: results,
        summary: {
          totalUrls: results.length,
          averageScore: Math.floor(results.reduce((sum, r) => sum + r.overallScore, 0) / results.length),
          highPerforming: results.filter(r => r.overallScore >= 80).length,
          needsImprovement: results.filter(r => r.overallScore < 60).length
        }
      });
      setIsLoading(false);
    }, 3000);
  };

  const exportJSON = () => {
    const dataToExport = isBulkMode ? bulkAnalysis : analysis;
    if (!dataToExport) return;
    
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = isBulkMode ? 'bulk-seo-analysis.json' : 'seo-analysis.json';
    link.click();
    URL.revokeObjectURL(downloadUrl);
  };

  const clearResults = () => {
    setAnalysis(null);
    setBulkAnalysis(null);
    setUrl('');
    setBulkUrls('');
  };

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SEO Analyzer
          </h1>
          <p className="text-xl text-gray-600">
            Analyze your website's SEO performance
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setIsBulkMode(false)}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                !isBulkMode 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Single URL
            </button>
            <button
              onClick={() => setIsBulkMode(true)}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                isBulkMode 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Bulk Analysis
            </button>
          </div>
        </div>
        
        {/* Single URL Analysis */}
        {!isBulkMode && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to analyze"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAnalyze}
                disabled={isLoading || !url.trim()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                {isLoading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
          </div>
        )}

        {/* Bulk URL Analysis */}
        {isBulkMode && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk URL Analysis</h3>
            <div className="space-y-4">
              <textarea
                value={bulkUrls}
                onChange={(e) => setBulkUrls(e.target.value)}
                placeholder="Enter URLs (one per line)&#10;https://example1.com&#10;https://example2.com&#10;https://example3.com"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {bulkUrls.split('\n').filter(url => url.trim()).length} URLs ready for analysis
                </p>
                <button
                  onClick={handleBulkAnalyze}
                  disabled={isLoading || !bulkUrls.trim()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload className="w-5 h-5" />
                  )}
                  {isLoading ? 'Analyzing...' : 'Analyze All'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Single Analysis Results */}
        {analysis && !isBulkMode && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Analysis Results</h3>
              <div className="flex gap-2">
                <button
                  onClick={exportJSON}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export JSON
                </button>
                <button
                  onClick={clearResults}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              </div>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">URL:</p>
              <p className="text-blue-600 font-mono text-sm break-all">{analysis.url}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{analysis.overallScore}%</div>
                <div className="text-sm text-gray-600">Overall Score</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{analysis.technicalSeo.score}%</div>
                <div className="text-sm text-gray-600">Technical SEO</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{analysis.contentSeo.score}%</div>
                <div className="text-sm text-gray-600">Content SEO</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  Issues Found
                </h4>
                <ul className="space-y-2">
                  {analysis.technicalSeo.issues.concat(analysis.contentSeo.issues).map((issue, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {analysis.technicalSeo.recommendations.concat(analysis.contentSeo.recommendations).map((rec, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Analysis Results */}
        {bulkAnalysis && isBulkMode && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Bulk Analysis Summary</h3>
                <div className="flex gap-2">
                  <button
                    onClick={exportJSON}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export All
                  </button>
                  <button
                    onClick={clearResults}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{bulkAnalysis.summary.totalUrls}</div>
                  <div className="text-sm text-gray-600">Total URLs</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{bulkAnalysis.summary.averageScore}%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">{bulkAnalysis.summary.highPerforming}</div>
                  <div className="text-sm text-gray-600">High Performing</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{bulkAnalysis.summary.needsImprovement}</div>
                  <div className="text-sm text-gray-600">Needs Improvement</div>
                </div>
              </div>
            </div>

            {/* Individual Results */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Individual Results</h3>
              <div className="space-y-4">
                {bulkAnalysis.results.map((result, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-blue-600 font-mono text-sm break-all flex-1 mr-4">{result.url}</p>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          result.overallScore >= 80 ? 'bg-green-100 text-green-800' :
                          result.overallScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {result.overallScore}%
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Technical SEO: </span>
                        <span className="font-semibold">{result.technicalSeo.score}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Content SEO: </span>
                        <span className="font-semibold">{result.contentSeo.score}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Issues: </span>
                        <span className="font-semibold text-red-600">
                          {result.technicalSeo.issues.length + result.contentSeo.issues.length}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeoAnalyzer;


