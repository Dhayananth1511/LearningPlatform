import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: 'teacher' | 'student';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role: 'teacher' | 'student';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: 'teacher' | 'student';
          created_at?: string;
          updated_at?: string;
        };
      };
      lessons: {
        Row: {
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
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          content: string;
          duration: number;
          level: 'beginner' | 'intermediate' | 'advanced';
          subject: string;
          teacher_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          content?: string;
          duration?: number;
          level?: 'beginner' | 'intermediate' | 'advanced';
          subject?: string;
          teacher_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      quizzes: {
        Row: {
          id: string;
          title: string;
          description: string;
          questions: any;
          lesson_id: string;
          teacher_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          questions: any;
          lesson_id: string;
          teacher_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          questions?: any;
          lesson_id?: string;
          teacher_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      lesson_progress: {
        Row: {
          id: string;
          student_id: string;
          lesson_id: string;
          completed: boolean;
          progress_percentage: number;
          time_spent: number;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          lesson_id: string;
          completed?: boolean;
          progress_percentage?: number;
          time_spent?: number;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          lesson_id?: string;
          completed?: boolean;
          progress_percentage?: number;
          time_spent?: number;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      quiz_attempts: {
        Row: {
          id: string;
          student_id: string;
          quiz_id: string;
          answers: any;
          score: number;
          completed_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          quiz_id: string;
          answers: any;
          score: number;
          completed_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          quiz_id?: string;
          answers?: any;
          score?: number;
          completed_at?: string;
          created_at?: string;
        };
      };
    };
  };
};