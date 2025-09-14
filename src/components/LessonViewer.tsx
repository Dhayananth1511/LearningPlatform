import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Lesson } from '../hooks/useLessons';
import { useAuth } from '../hooks/useAuth';
import { useLessons } from '../hooks/useLessons';

interface LessonViewerProps {
  lesson: Lesson;
  onClose: () => void;
  onComplete?: () => void;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ lesson, onClose, onComplete }) => {
  const { profile } = useAuth();
  const { updateLessonProgress } = useLessons();
  const [currentPage, setCurrentPage] = useState(0);
  const [startTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Split lesson content into pages
  const pages = lesson.content.split('\n\n').filter(page => page.trim());
  const totalPages = pages.length;
  const progress = ((currentPage + 1) / totalPages) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (!completed && profile?.role === 'student') {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleComplete = async () => {
    if (profile?.role === 'student') {
      try {
        await updateLessonProgress({
          student_id: profile.id,
          lesson_id: lesson.id,
          completed: true,
          progress_percentage: 100,
          time_spent: timeSpent,
          completed_at: new Date().toISOString(),
        });
        setCompleted(true);
        onComplete?.();
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 text-blue-100 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Lessons</span>
            </button>
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeSpent)}</span>
              </span>
              <span className="bg-blue-500 px-2 py-1 rounded">
                {lesson.subject}
              </span>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
          <p className="text-blue-100 mb-4">{lesson.description}</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-blue-500 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm mt-2 text-blue-100">
            <span>Page {currentPage + 1} of {totalPages}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          <div className="prose max-w-none">
            <div className="text-lg leading-relaxed whitespace-pre-wrap">
              {pages[currentPage]}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 flex items-center justify-between border-t">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-2">
            {completed && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Completed!</span>
              </div>
            )}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>
              {currentPage === totalPages - 1 ? 'Complete Lesson' : 'Next'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;