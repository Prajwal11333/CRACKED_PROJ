import React, { useState } from 'react';
import { Users, MessageCircle, Share2, Crown, UserPlus } from 'lucide-react';

const TeamCollaboration: React.FC = () => {
  const [activeUsers, setActiveUsers] = useState([
    { id: 1, name: 'Alex Chen', avatar: '👨‍💻', status: 'online', role: 'Admin' },
    { id: 2, name: 'Sarah Kim', avatar: '👩‍🎨', status: 'online', role: 'Editor' },
    { id: 3, name: 'Mike Johnson', avatar: '👨‍💼', status: 'away', role: 'Viewer' }
  ]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Team Workspace</h3>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <UserPlus className="w-4 h-4" />
          <span>Invite</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Active Collaborators</span>
          <div className="flex -space-x-2">
            {activeUsers.map(user => (
              <div key={user.id} className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white">
                  {user.avatar}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  user.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
                }`}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-green-200 rounded-lg bg-green-50">
            <div className="flex items-center space-x-2 mb-2">
              <Share2 className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Shared Links</span>
            </div>
            <div className="text-2xl font-bold text-green-900">24</div>
            <div className="text-sm text-green-600">This month</div>
          </div>

          <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <div className="flex items-center space-x-2 mb-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Comments</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">12</div>
            <div className="text-sm text-blue-600">Pending review</div>
          </div>

          <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-800">Team Score</span>
            </div>
            <div className="text-2xl font-bold text-purple-900">94%</div>
            <div className="text-sm text-purple-600">Efficiency rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCollaboration;
