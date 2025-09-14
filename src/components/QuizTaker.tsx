import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Quiz, QuizQuestion } from '../hooks/useQuizzes';
import { useAuth } from '../hooks/useAuth';
import { useQuizzes } from '../hooks/useQuizzes';

interface QuizTakerProps {
  quiz: Quiz;
  onClose: () => void;
  onComplete?: (score: number) => void;
}

const QuizTaker: React.FC<QuizTakerProps> = ({ quiz, onClose, onComplete }) => {
  const { profile } = useAuth();
  const { submitQuizAttempt } = useQuizzes();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(quiz.questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    // Calculate score
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);

    // Submit to database if user is a student
    if (profile?.role === 'student') {
      try {
        await submitQuizAttempt({
          student_id: profile.id,
          quiz_id: quiz.id,
          answers,
          score: finalScore,
          completed_at: new Date().toISOString(),
        });
        onComplete?.(finalScore);
      } catch (error) {
        console.error('Error submitting quiz:', error);
      }
    }
  };

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
          <div className="bg-green-600 text-white p-6 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
            <p className="text-green-100">Your Score: {score}%</p>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Review Your Answers</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {quiz.questions.map((question, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <p className="font-medium mb-2">
                    {index + 1}. {question.question}
                  </p>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-2 rounded text-sm ${
                          optionIndex === question.correct_answer
                            ? 'bg-green-100 text-green-800 border border-green-300'
                            : answers[index] === optionIndex
                            ? 'bg-red-100 text-red-800 border border-red-300'
                            : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {optionIndex === question.correct_answer && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                          {answers[index] === optionIndex && optionIndex !== question.correct_answer && (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                          <span>{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {question.explanation && (
                    <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-800">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-purple-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 text-purple-100 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div className="text-sm">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </div>
          </div>
          
          <h1 className="text-xl font-bold mb-2">{quiz.title}</h1>
          
          {/* Progress Bar */}
          <div className="w-full bg-purple-500 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">{currentQ.question}</h2>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                  answers[currentQuestion] === index
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    answers[currentQuestion] === index
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 flex items-center justify-between border-t">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="text-sm text-gray-500">
            {answers.filter(a => a !== -1).length} of {quiz.questions.length} answered
          </div>

          <button
            onClick={handleNext}
            disabled={answers[currentQuestion] === -1}
            className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>
              {currentQuestion === quiz.questions.length - 1 ? 'Submit Quiz' : 'Next'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizTaker;