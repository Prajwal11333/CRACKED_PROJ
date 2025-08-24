import React, { useState } from 'react';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Globe } from 'lucide-react';

const SecurityDashboard: React.FC = () => {
  const [securityScore, setSecurityScore] = useState(96);
  const [threats, setThreats] = useState([
    { type: 'Malware', status: 'blocked', count: 3 },
    { type: 'Phishing', status: 'detected', count: 1 },
    { type: 'Spam', status: 'filtered', count: 7 }
  ]);

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Security Center</h3>
        <div className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold">
          PROTECTED
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Security Score</h4>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-600">Excellent</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${securityScore}%` }}
              ></div>
            </div>
            <div className="text-center mt-2">
              <span className="text-2xl font-bold text-gray-900">{securityScore}/100</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h4 className="font-semibold text-gray-900 mb-4">Threat Detection</h4>
          <div className="space-y-3">
            {threats.map((threat, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium">{threat.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{threat.count}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    threat.status === 'blocked' ? 'bg-green-500' : 
                    threat.status === 'detected' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border">
          <Lock className="w-8 h-8 text-blue-600" />
          <div>
            <div className="font-semibold text-gray-900">SSL Encryption</div>
            <div className="text-sm text-green-600">Active</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border">
          <Eye className="w-8 h-8 text-purple-600" />
          <div>
            <div className="font-semibold text-gray-900">Privacy Mode</div>
            <div className="text-sm text-green-600">Enabled</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border">
          <Globe className="w-8 h-8 text-green-600" />
          <div>
            <div className="font-semibold text-gray-900">GDPR Compliant</div>
            <div className="text-sm text-green-600">Verified</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
