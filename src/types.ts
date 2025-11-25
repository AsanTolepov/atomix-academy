export enum SubjectType {
    CHEMISTRY = 'chemistry',
    PHYSICS = 'physics',
    BIOLOGY = 'biology',
  }
  
  export interface TaskConfig {
    type: SubjectType;
    instructions: string;
    targetValue: number;
    tolerance: number;
    initialParams: Record<string, number>;
  }
  
  export interface Lesson {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnail: string;
    duration: string;
    taskConfig: TaskConfig;
  }
  
  export interface Course {
    id: string;
    title: string;
    description: string;
    color: string;
    icon: 'Atom' | 'Zap' | 'Sprout';
    lessons: Lesson[];
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    xp: number;
    level: number;
    badges: string[];
  }
  
  export interface AIResult {
    score: number;
    explanation: string;
    confidence: number;
  }