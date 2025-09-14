import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuizzes(data || []);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const createQuiz = async (quiz: Omit<Quiz, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('quizzes')
      .insert(quiz)
      .select()
      .single();

    if (error) throw error;
    
    setQuizzes(prev => [data, ...prev]);
    return data;
  };

  const submitQuizAttempt = async (attempt: Omit<QuizAttempt, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert(attempt)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const getQuizAttempts = async (studentId: string, quizId?: string) => {
    let query = supabase
      .from('quiz_attempts')
      .select('*')
      .eq('student_id', studentId);

    if (quizId) {
      query = query.eq('quiz_id', quizId);
    }

    const { data, error } = await query.order('completed_at', { ascending: false });

    if (error) throw error;
    return data || [];
  };

  return {
    quizzes,
    loading,
    createQuiz,
    submitQuizAttempt,
    getQuizAttempts,
    refetch: fetchQuizzes,
  };
}