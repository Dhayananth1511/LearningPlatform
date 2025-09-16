import React from 'react';
import { Book, Home, Users, BookOpen, Award, BarChart3, Share2, Globe, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { profile, signOut } = useAuth();
  
  if (!profile) {
    return (
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Book className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Nabha Learning Platform</h1>
                <p className="text-xs text-gray-500">Government Digital Education Initiative</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-green-600 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                Offline Ready
              </span>
              <span className="text-sm text-blue-600">Multi-Language</span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <Book className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Nabha Learning</h1>
              <p className="text-xs text-gray-500">Digital Education Platform</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-6">
            <button className="flex items-center space-x-1 text-blue-600 font-medium">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            {profile.role === 'teacher' ? (
              <>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <Users className="w-4 h-4" />
                  <span>Students</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <BookOpen className="w-4 h-4" />
                  <span>Lessons</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <Award className="w-4 h-4" />
                  <span>Quizzes</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <BarChart3 className="w-4 h-4" />
                  <span>Progress</span>
                </button>
              </>
            ) : (
              <>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <BookOpen className="w-4 h-4" />
                  <span>Lessons</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <Award className="w-4 h-4" />
                  <span>Quizzes</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <BarChart3 className="w-4 h-4" />
                  <span>Progress</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <BookOpen className="w-4 h-4" />
                  <span>Digital Literacy</span>
                </button>
              </>
            )}
            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
              <Share2 className="w-4 h-4" />
              <span>P2P Share</span>
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <select className="text-sm border-none bg-transparent">
              <option>English</option>
              <option>हिंदी</option>
            </select>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-sm">
                <p className="font-medium">{profile.full_name}</p>
                <p className="text-gray-500 capitalize">{profile.role}</p>
              </div>
            </div>
            <button 
              onClick={signOut}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;