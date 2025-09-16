import { useState, useEffect } from 'react';

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

// Demo lessons data
const DEMO_LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Basic Mathematics',
    description: 'Learn fundamental math concepts including addition, subtraction, multiplication, and division.',
    content: 'Welcome to Basic Mathematics!\n\nIn this lesson, we will cover the four basic operations:\n\n1. Addition (+)\nAddition means combining numbers to get a larger number.\nExample: 5 + 3 = 8\n\n2. Subtraction (-)\nSubtraction means taking away one number from another.\nExample: 8 - 3 = 5\n\n3. Multiplication (×)\nMultiplication is repeated addition.\nExample: 4 × 3 = 12 (which is the same as 4 + 4 + 4)\n\n4. Division (÷)\nDivision means splitting a number into equal parts.\nExample: 12 ÷ 3 = 4\n\nPractice these operations with different numbers to become more comfortable with basic math!',
    duration: 30,
    level: 'beginner',
    subject: 'Mathematics',
    teacher_id: '3',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'English Grammar Basics',
    description: 'Understanding nouns, verbs, and adjectives in English language.',
    content: 'English Grammar Fundamentals\n\nLet\'s learn about the basic parts of speech:\n\n1. Nouns\nNouns are words that name people, places, things, or ideas.\nExamples: teacher, school, book, happiness\n\n2. Verbs\nVerbs are action words or words that show a state of being.\nExamples: run, jump, is, are\n\n3. Adjectives\nAdjectives describe or modify nouns.\nExamples: big, small, beautiful, smart\n\nSentence Structure:\nA basic sentence has a subject (noun) and a predicate (verb).\nExample: "The student reads."\n- "student" is the noun (subject)\n- "reads" is the verb (predicate)\n\nPractice identifying these parts of speech in sentences around you!',
    duration: 25,
    level: 'beginner',
    subject: 'English',
    teacher_id: '4',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Digital Literacy: Using a Computer',
    description: 'Learn basic computer skills including mouse, keyboard, and file management.',
    content: 'Introduction to Computer Basics\n\nComputers are powerful tools that can help us learn, work, and communicate.\n\n1. Parts of a Computer\n- Monitor: The screen where you see information\n- Keyboard: Used for typing letters and numbers\n- Mouse: Used to point and click on things\n- CPU: The "brain" of the computer\n\n2. Using the Mouse\n- Left click: Select items\n- Right click: Open menus\n- Double click: Open programs or files\n- Drag: Move items around\n\n3. Using the Keyboard\n- Letters and numbers for typing\n- Space bar for spaces between words\n- Enter key to go to a new line\n- Backspace to delete mistakes\n\n4. Basic File Management\n- Files are documents, pictures, or programs\n- Folders help organize files\n- Desktop is like your computer\'s main workspace\n\nPractice these skills to become comfortable with computers!',
    duration: 40,
    level: 'beginner',
    subject: 'Computer Science',
    teacher_id: '3',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];
export function useLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load demo lessons
    setLessons(DEMO_LESSONS);
    setLoading(false);
  }, []);


  const createLesson = async (lesson: Omit<Lesson, 'id' | 'created_at' | 'updated_at'>) => {
    const newLesson: Lesson = {
      ...lesson,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setLessons(prev => [newLesson, ...prev]);
    return newLesson;
  };

  const updateLesson = async (id: string, updates: Partial<Lesson>) => {
    const updatedLesson = { ...updates, updated_at: new Date().toISOString() };
    setLessons(prev => prev.map(lesson => 
      lesson.id === id ? { ...lesson, ...updatedLesson } : lesson
    ));
    return updatedLesson;
  };

  const deleteLesson = async (id: string) => {
    setLessons(prev => prev.filter(lesson => lesson.id !== id));
  };

  const getLessonProgress = async (studentId: string, lessonId: string) => {
    // Demo implementation - return null for now
    return null;
  };

  const updateLessonProgress = async (progress: Omit<LessonProgress, 'id' | 'created_at' | 'updated_at'>) => {
    // Demo implementation - just return the progress object
    return { ...progress, id: Date.now().toString() };
  };

  return {
    lessons,
    loading,
    createLesson,
    updateLesson,
    deleteLesson,
    getLessonProgress,
    updateLessonProgress,
    refetch: () => setLessons(DEMO_LESSONS),
  };
}