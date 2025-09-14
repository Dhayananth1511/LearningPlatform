import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  subject: string;
  teacher_id: string;
  created_at: string;
  updated_at: string;
}

export interface LessonProgress {
  id: string;
  student_id: string;
  lesson_id: string;
  completed: boolean;
  progress_percentage: number;
  time_spent: number;
  completed_at: string | null;
}

export function useLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLessons(data || []);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const createLesson = async (lesson: Omit<Lesson, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('lessons')
      .insert(lesson)
      .select()
      .single();

    if (error) throw error;
    
    setLessons(prev => [data, ...prev]);
    return data;
  };

  const updateLesson = async (id: string, updates: Partial<Lesson>) => {
    const { data, error } = await supabase
      .from('lessons')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    setLessons(prev => prev.map(lesson => 
      lesson.id === id ? data : lesson
    ));
    return data;
  };

  const deleteLesson = async (id: string) => {
    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    setLessons(prev => prev.filter(lesson => lesson.id !== id));
  };

  const getLessonProgress = async (studentId: string, lessonId: string) => {
    const { data, error } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('student_id', studentId)
      .eq('lesson_id', lessonId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  };

  const updateLessonProgress = async (progress: Omit<LessonProgress, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('lesson_progress')
      .upsert(progress)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  return {
    lessons,
    loading,
    createLesson,
    updateLesson,
    deleteLesson,
    getLessonProgress,
    updateLessonProgress,
    refetch: fetchLessons,
  };
}