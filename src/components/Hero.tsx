import React from 'react';

const HeroComponent: React.FC = () => (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        Professional URL Shortener with
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block">
          Advanced Analytics
        </span>
      </h1>
      
      <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
        Transform long URLs into branded short links with real-time SEO analysis, 
        clickbait detection, and comprehensive analytics dashboard.
      </p>
    </div>
  </section>
);

export default HeroComponent;
