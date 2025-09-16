import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'teacher' | 'student';
}

// Demo users for offline functionality
const DEMO_USERS = [
  { id: '1', email: 'rajesh@student.com', password: 'demo123', full_name: 'Rajesh Kumar', role: 'student' as const },
  { id: '2', email: 'priya@student.com', password: 'demo123', full_name: 'Priya Singh', role: 'student' as const },
  { id: '3', email: 'sunil@teacher.com', password: 'demo123', full_name: 'Dr. Sunil Sharma', role: 'teacher' as const },
  { id: '4', email: 'kavita@teacher.com', password: 'demo123', full_name: 'Mrs. Kavita Patel', role: 'teacher' as const },
];
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored demo session
    const storedProfile = localStorage.getItem('demo_profile');
    if (storedProfile) {
      try {
        const profile = JSON.parse(storedProfile);
        setProfile(profile);
        setUser({ id: profile.id, email: profile.email } as User);
      } catch (error) {
        console.error('Error parsing stored profile:', error);
      }
    }
    setLoading(false);
  }, []);


  const signUp = async (email: string, password: string, fullName: string, role: 'teacher' | 'student') => {
    // Demo signup - create a new demo user
    const newUser = {
      id: Date.now().toString(),
      email,
      full_name: fullName,
      role,
    };
    
    setProfile(newUser);
    setUser({ id: newUser.id, email: newUser.email } as User);
    localStorage.setItem('demo_profile', JSON.stringify(newUser));
    
    return { user: { id: newUser.id, email } };
  };

  const signIn = async (email: string, password: string) => {
    // Demo signin - check against demo users
    const demoUser = DEMO_USERS.find(u => u.email === email && u.password === password);
    
    if (!demoUser) {
      throw new Error('Invalid email or password');
    }
    
    const profile = {
      id: demoUser.id,
      email: demoUser.email,
      full_name: demoUser.full_name,
      role: demoUser.role,
    };
    
    setProfile(profile);
    setUser({ id: profile.id, email: profile.email } as User);
    localStorage.setItem('demo_profile', JSON.stringify(profile));
    
    return { user: { id: profile.id, email: profile.email } };
  };

  const signOut = async () => {
    setProfile(null);
    setUser(null);
    localStorage.removeItem('demo_profile');
  };

  return {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
  };
}