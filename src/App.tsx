import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';

function App() {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <>
        <Header />
        <LandingPage />
      </>
    );
  }

  return (
    <>
      <Header />
      {profile.role === 'teacher' ? (
        <TeacherDashboard userName={profile.full_name} />
      ) : (
        <StudentDashboard userName={profile.full_name} />
      )}
    </>
  );
}

export default App;