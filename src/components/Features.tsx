import React from 'react';
import { 
  Link, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  Target, 
  TrendingUp,
  Lock,
  Download,
  Smartphone,
  Eye
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Link,
      title: 'Smart URL Shortening',
      description: 'Create professional short links with custom aliases, QR codes, and branded domains.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track clicks, geographic data, device types, and user engagement with detailed insights.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'SEO Analysis',
      description: 'Real-time SEO scoring with technical analysis, content optimization, and performance metrics.',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Target,
      title: 'Clickbait Detection',
      description: 'Intelligent analysis to identify and score clickbait content with severity indicators.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Globe,
      title: 'Bulk Processing',
      description: 'Analyze multiple URLs simultaneously with comprehensive batch reporting capabilities.',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: TrendingUp,
      title: 'Performance Monitoring',
      description: 'Monitor load times, page sizes, and mobile optimization for better user experience.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Enterprise-grade security with privacy protection and data encryption.',
      gradient: 'from-gray-600 to-gray-800'
    },
    {
      icon: Download,
      title: 'Export & Reports',
      description: 'Export detailed reports in multiple formats for presentations and analysis.',
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Fully responsive design that works perfectly on all devices and screen sizes.',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: Eye,
      title: 'Real-time Updates',
      description: 'Live tracking and instant notifications for link performance and analytics.',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share links and analytics with team members with role-based access control.',
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with CDN integration and global edge locations.',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Enterprise-Grade Features for
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block">
              Professional Teams
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to manage URLs professionally with advanced analytics, 
            SEO insights, and team collaboration tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-2xl hover:border-gray-300/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Professionals Worldwide
            </h3>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Join thousands of companies and individuals who rely on our platform 
              for their URL management and SEO optimization needs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">1M+</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">URLs Shortened</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">150+</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;