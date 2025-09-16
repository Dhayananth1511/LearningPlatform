import { useState, useEffect } from 'react';

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  lesson_id: string;
  teacher_id: string;
  created_at: string;
  updated_at: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  student_id: string;
  quiz_id: string;
  answers: number[];
  score: number;
  completed_at: string;
}

// Demo quizzes data
const DEMO_QUIZZES: Quiz[] = [
  {
    id: '1',
    title: 'Basic Math Quiz',
    description: 'Test your knowledge of basic mathematical operations',
    lesson_id: '1',
    teacher_id: '3',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    questions: [
      {
        id: '1',
        question: 'What is 5 + 3?',
        options: ['6', '7', '8', '9'],
        correct_answer: 2,
        explanation: '5 + 3 = 8. When adding, we combine the two numbers together.'
      },
      {
        id: '2',
        question: 'What is 12 ÷ 4?',
        options: ['2', '3', '4', '5'],
        correct_answer: 1,
        explanation: '12 ÷ 4 = 3. Division means splitting 12 into 4 equal groups, each group has 3.'
      }
    ]
  }
];
export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load demo quizzes
    setQuizzes(DEMO_QUIZZES);
    setLoading(false);
  }, []);


  const createQuiz = async (quiz: Omit<Quiz, 'id' | 'created_at' | 'updated_at'>) => {
    const newQuiz: Quiz = {
      ...quiz,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setQuizzes(prev => [newQuiz, ...prev]);
    return newQuiz;
  };

  const submitQuizAttempt = async (attempt: Omit<QuizAttempt, 'id' | 'created_at'>) => {
    // Demo implementation - store in localStorage
    const newAttempt: QuizAttempt = {
      ...attempt,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    
    const attempts = JSON.parse(localStorage.getItem('quiz_attempts') || '[]');
    attempts.push(newAttempt);
    localStorage.setItem('quiz_attempts', JSON.stringify(attempts));
    
    return newAttempt;
  };

  const getQuizAttempts = async (studentId: string, quizId?: string) => {
    // Demo implementation - get from localStorage
    const attempts: QuizAttempt[] = JSON.parse(localStorage.getItem('quiz_attempts') || '[]');
    let filtered = attempts.filter(attempt => attempt.student_id === studentId);
    
    if (quizId) {
      filtered = filtered.filter(attempt => attempt.quiz_id === quizId);
    }
    
    return filtered.sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime());
  };

  return {
    quizzes,
    loading,
    createQuiz,
    submitQuizAttempt,
    getQuizAttempts,
    refetch: () => setQuizzes(DEMO_QUIZZES),
  };
}