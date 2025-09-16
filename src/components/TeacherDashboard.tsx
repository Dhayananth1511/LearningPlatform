import React from 'react';
import { Users, BookOpen, Award, BarChart3, Plus, TrendingUp } from 'lucide-react';

interface TeacherDashboardProps {
  userName: string;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ userName }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName}!</h1>
        <p className="text-gray-600 mt-2">Manage your classes and track student progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Lessons</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <BookOpen className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Quizzes Created</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <Award className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Progress</p>
              <p className="text-2xl font-bold text-gray-900">78%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Plus className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Create New Lesson</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="font-medium">Create New Quiz</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span className="font-medium">View Progress Reports</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm">New student enrolled in Math Class</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-sm">Quiz "Basic Algebra" completed by 15 students</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="text-sm">Lesson "Fractions" viewed 23 times</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;