import React from 'react';
import { Zap, Shield, BarChart } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Professional URL Shortener with
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block">
              Advanced Analytics
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform long URLs into branded short links with real-time SEO analysis, 
            clickbait detection, and comprehensive analytics dashboard.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Instant URL shortening with custom aliases and QR code generation</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">SEO Analysis</h3>
              <p className="text-gray-600">Real-time SEO scoring and clickbait detection for better performance</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Analytics</h3>
              <p className="text-gray-600">Track clicks, geographic data, and user engagement metrics</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;