import { Course, SubjectType, User } from './types';

// 1. Ranglar
export const COLORS = {
  primary: '#0068FF',
  secondary: '#00C2A8',
  accent: '#FF9F43',
  background: '#F7FAFF',
  surface: '#FFFFFF',
  success: '#2DD4BF',
  error: '#FF5A5F',
  text: '#0F172A',
  muted: '#475569',
  white: '#FFFFFF'
};

// 2. YUTUQLAR RO'YXATI (6 ta)
export const ACHIEVEMENTS_LIST = [
  { 
    id: 'first_discovery', 
    title: 'Birinchi Kashfiyot', 
    description: 'Ilk bor laboratoriya topshirig\'ini muvaffaqiyatli bajardingiz!', 
    icon: '🚀' 
  },
  { 
    id: 'streak_3', 
    title: 'Barqarorlik', 
    description: '3 kun ketma-ket mashg\'ulot qildingiz.', 
    icon: '🔥' 
  },
  { 
    id: 'quiz_master', 
    title: 'Viktorina Ustasi', 
    description: 'Topshiriqda 100% natija ko\'rsatdingiz.', 
    icon: '🎯' 
  },
  { 
    id: 'science_nerd', 
    title: 'Fanat', 
    description: 'Bitta fandan barcha darslarni ko\'rib chiqdingiz.', 
    icon: '🤓' 
  },
  { 
    id: 'speed_runner', 
    title: 'Tezkor', 
    description: 'Topshiriqni 1 daqiqadan kam vaqtda bajardingiz.', 
    icon: '⚡' 
  },
  { 
    id: 'level_5', 
    title: 'Professional', 
    description: '5-darajaga (Level 5) yetdingiz.', 
    icon: '🏆' 
  }
];

// 3. MOCK USER
export const MOCK_USER: User = {
  uid: 'u1',
  name: 'Aziz Oquvchi',
  email: 'aziz@example.com',
  xp: 0,
  level: 1,
  badges: [],
  progress: {},
  streak: 0,
  lastLoginDate: '',
  achievements: {}, // Boshida bo'sh
  accuracy: 0
};

// 4. KURSLAR VA DARSLAR RO'YXATI
export const COURSES: Course[] = [
  {
    id: SubjectType.CHEMISTRY,
    title: 'Kimyo',
    description: 'Moddalar, elementlar va reaksiyalar.',
    color: COLORS.primary,
    icon: 'Atom',
    lessons: [
      {
        id: 'chem-1',
        title: '1. Kislota va Asoslar',
        description: 'pH balansi va neytrallash.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail: 'https://picsum.photos/400/225?random=10',
        duration: '5 daq',
        taskConfig: {
          type: SubjectType.CHEMISTRY,
          instructions: 'Eritmani neytrallang! Kislotaga asos qo\'shib, pH darajasini 7.0 ga keltiring.',
          targetValue: 7.0,
          tolerance: 0.5,
          initialParams: { ph: 2.0, volume: 50 },
        },
      },
      {
        id: 'chem-2',
        title: '2. Kovalent Bog\'lanish',
        description: 'Atomlar elektronlarni qanday bo\'lishadi?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://picsum.photos/400/225?random=11',
        duration: '8 daq',
        taskConfig: {
          type: SubjectType.CHEMISTRY,
          instructions: 'Barqaror molekula hosil qilish uchun elektronlar sonini to\'g\'rilang.',
          targetValue: 8,
          tolerance: 0,
          initialParams: { electrons: 4, volume: 0 },
        },
      },
    ],
  },
  {
    id: SubjectType.PHYSICS,
    title: 'Fizika',
    description: 'Kuch, energiya va harakat qonunlari.',
    color: COLORS.accent,
    icon: 'Zap',
    lessons: [
      {
        id: 'phys-1',
        title: '1. Om Qonuni',
        description: 'Kuchlanish, Tok va Qarshilik.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        thumbnail: 'https://picsum.photos/400/225?random=20',
        duration: '6 daq',
        taskConfig: {
          type: SubjectType.PHYSICS,
          instructions: 'Tok kuchi (I) roppa-rosa 2.0 Amper bo\'lishi uchun Kuchlanish (V) va Qarshilikni (R) sozlang.',
          targetValue: 2.0,
          tolerance: 0.1,
          initialParams: { voltage: 5, resistance: 10 },
        },
      },
    ],
  },
  {
    id: SubjectType.BIOLOGY,
    title: 'Biologiya',
    description: 'Hayot, hujayralar va ekotizim.',
    color: COLORS.secondary,
    icon: 'Sprout',
    lessons: [
      {
        id: 'bio-1',
        title: '1. Fotosintez',
        description: 'Yorug\'lik energiyasi va o\'simliklar.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://picsum.photos/400/225?random=30',
        duration: '7 daq',
        taskConfig: {
          type: SubjectType.BIOLOGY,
          instructions: 'O\'simlik o\'sishi 100% bo\'lishi uchun Yorug\'lik va CO2 miqdorini optimallashtiring.',
          targetValue: 100,
          tolerance: 5,
          initialParams: { light: 20, co2: 20 },
        },
      },
    ],
  },
];