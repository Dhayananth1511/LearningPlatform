import React, { useState } from 'react';
import { Book, Users, GraduationCap } from 'lucide-react';
import AuthForm from './AuthForm';

const LandingPage: React.FC = () => {
  // Component will re-render when auth state changes

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Nabha Learning Platform
          </h1>
          <p className="text-lg text-gray-600">
            Empowering rural education through technology
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg p-8 text-center shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Book className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-600">Interactive Lessons</p>
          </div>
          
          <div className="bg-white rounded-lg p-8 text-center shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">2000+</h3>
            <p className="text-gray-600">Active Students</p>
          </div>
          
          <div className="bg-white rounded-lg p-8 text-center shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
            <p className="text-gray-600">Qualified Teachers</p>
          </div>
        </div>

        <AuthForm />
      </div>
    </div>
  );
};

export default LandingPage;