// src/types.ts

// Fan turlari (Enum)
export enum SubjectType {
  CHEMISTRY = 'Chemistry',
  PHYSICS = 'Physics',
  BIOLOGY = 'Biology',
}

// User (Foydalanuvchi) turi - HAMMA KERAKLI MAYDONLAR BILAN
export interface User {
  uid: string;      // Firebase ID (id emas, uid bo'lishi kerak)
  name: string;
  email: string;
  xp: number;
  level: number;
  badges: string[];
  
  // Muhim qo'shimchalar:
  progress: Record<string, any>;          
  streak: number;                         
  lastLoginDate: string;                  
  achievements: Record<string, boolean>;  
  accuracy?: number;                      
}

// Topshiriq konfiguratsiyasi
export interface TaskConfig {
  type: SubjectType;
  instructions: string;
  targetValue: number;
  tolerance: number;
  initialParams: Record<string, number>;
}

// Dars (Lesson) turi
export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  taskConfig: TaskConfig;
}

// Kurs (Course) turi
export interface Course {
  id: SubjectType;
  title: string;
  description: string;
  color: string;
  icon: string;
  lessons: Lesson[];
}

// AI Natijasi
export interface AIResult {
  score: number;
  explanation?: string; // ? qo'ydim, ba'zida bo'lmasligi mumkin
  feedback?: string;
  confidence?: number;
}