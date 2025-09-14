import React from 'react';
import { BookOpen, Trophy, Clock, Award, Play, ArrowRight, TrendingUp, BarChart3 } from 'lucide-react';
import { useLessons } from '../hooks/useLessons';
import { useQuizzes } from '../hooks/useQuizzes';
import { useAuth } from '../hooks/useAuth';
import LessonViewer from './LessonViewer';
import QuizTaker from './QuizTaker';
import { useState, useEffect } from 'react';

interface StudentDashboardProps {
  userName: string;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ userName }) => {
  const { profile } = useAuth();
  const { lessons, loading: lessonsLoading } = useLessons();
  const { quizzes, loading: quizzesLoading, getQuizAttempts } = useQuizzes();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [stats, setStats] = useState({
    completedLessons: 0,
    totalLessons: 0,
    averageScore: 0,
    totalAttempts: 0,
    studyTime: 0
  });

  useEffect(() => {
    if (profile?.role === 'student') {
      loadStats();
    }
  }, [profile, lessons, quizzes]);

  const loadStats = async () => {
    if (!profile) return;

    try {
      // Get quiz attempts
      const attempts = await getQuizAttempts(profile.id);
      const averageScore = attempts.length > 0 
        ? Math.round(attempts.reduce((sum, attempt) => sum + attempt.score, 0) / attempts.length)
        : 0;

      setStats({
        completedLessons: 0, // This would need lesson progress data
        totalLessons: lessons.length,
        averageScore,
        totalAttempts: attempts.length,
        studyTime: 0 // This would need time tracking data
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userName}!</h1>
          <p className="text-gray-600">Ready to continue your learning journey? Let's explore new lessons and test your knowledge.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-blue-600 mb-1">0</h3>
            <p className="text-gray-600 text-sm mb-1">{stats.completedLessons}</p>
            <p className="text-xs text-gray-500">out of {stats.totalLessons}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-1">0%</h3>
            <p className="text-gray-600 text-sm mb-1">{stats.averageScore}%</p>
            <p className="text-xs text-gray-500">{stats.totalAttempts} attempts</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-purple-600 mb-1">0m</h3>
            <p className="text-gray-600 text-sm mb-1">{Math.floor(stats.studyTime / 60)}m</p>
            <p className="text-xs text-gray-500">this month</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-orange-600 mb-1">Bronze</h3>
            <p className="text-gray-600 text-sm mb-1">Achievement</p>
            <p className="text-xs text-gray-500">learner badge</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Lessons */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Lessons</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
            </div>

            <div className="space-y-4">
              {lessonsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Loading lessons...</p>
                </div>
              ) : lessons.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No lessons available yet</p>
                </div>
              ) : (
                lessons.slice(0, 3).map((lesson, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{lesson.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {lesson.duration} min
                      </span>
                      <span className="text-xs text-gray-500">
                        👤 {lesson.level}
                      </span>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {lesson.subject}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedLesson(lesson)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start</span>
                  </button>
                </div>
                ))
              )}
            </div>
          </div>

          {/* Continue Learning */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Continue Learning</h2>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">Browse Lessons</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <Trophy className="w-5 h-5" />
                  <span className="font-medium">Browse Quizzes</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-medium">Digital Skills</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Achievements</h3>
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Complete lessons to earn achievements!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Viewer Modal */}
        {selectedLesson && (
          <LessonViewer
            lesson={selectedLesson}
            onClose={() => setSelectedLesson(null)}
            onComplete={() => {
              setSelectedLesson(null);
              loadStats(); // Refresh stats
            }}
          />
        )}

        {/* Quiz Taker Modal */}
        {selectedQuiz && (
          <QuizTaker
            quiz={selectedQuiz}
            onClose={() => setSelectedQuiz(null)}
            onComplete={() => {
              setSelectedQuiz(null);
              loadStats(); // Refresh stats
            }}
          />
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;