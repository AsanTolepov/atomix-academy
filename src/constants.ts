import { Course, SubjectType } from './types';

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

// 2. YUTUQLAR RO'YXATI
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

// VIDEO LINKLAR (15 soniyalik tezkor videolar)
const VID_1 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
const VID_2 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";
const VID_3 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
const VID_4 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4";
const VID_5 = "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4";

// 3. KURSLAR VA DARSLAR RO'YXATI
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
        description: 'pH balansi va neytrallash jarayoni.',
        videoUrl: VID_1, // 15 sek
        thumbnail: 'https://picsum.photos/400/225?random=1',
        duration: '15 soniya',
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
        videoUrl: VID_2, // 15 sek
        thumbnail: 'https://picsum.photos/400/225?random=2',
        duration: '15 soniya',
        taskConfig: {
          type: SubjectType.CHEMISTRY,
          instructions: 'Barqaror molekula hosil qilish uchun elektronlar sonini to\'g\'rilang (Oktet qoidasi).',
          targetValue: 8,
          tolerance: 0,
          initialParams: { electrons: 4, volume: 0 },
        },
      },
      {
        id: 'chem-3',
        title: '3. Davriy Jadval',
        description: 'Elementlarning xossalari va joylashuvi.',
        videoUrl: VID_3, // 15 sek
        thumbnail: 'https://picsum.photos/400/225?random=3',
        duration: '15 soniya',
        taskConfig: {
          type: SubjectType.CHEMISTRY,
          instructions: 'Ideal gaz holati uchun temperaturani Selsiyda sozlang (25°C xona harorati).',
          targetValue: 25,
          tolerance: 2,
          initialParams: { temp: 0, pressure: 1 },
        },
      },
      {
        id: 'chem-4',
        title: '4. Kimyoviy Reaksiyalar',
        description: 'Ekzotermik va endotermik jarayonlar.',
        videoUrl: VID_4, // 15 sek
        thumbnail: 'https://picsum.photos/400/225?random=4',
        duration: '15 soniya',
        taskConfig: {
          type: SubjectType.CHEMISTRY,
          instructions: 'Reaksiya tezligini oshirish uchun katalizator miqdorini 50mg ga yetkazing.',
          targetValue: 50,
          tolerance: 5,
          initialParams: { catalyst: 10, heat: 30 },
        },
      },
      {
        id: 'chem-5',
        title: '5. Eritmalar',
        description: 'Konsentratsiya va to\'yinish.',
        videoUrl: VID_5, // Qisqa
        thumbnail: 'https://picsum.photos/400/225?random=5',
        duration: '15 soniya',
        taskConfig: {
          type: SubjectType.CHEMISTRY,
          instructions: 'Eritma konsentratsiyasini 10% ga tushirish uchun suv qo\'shing.',
          targetValue: 10,
          tolerance: 1,
          initialParams: { concentration: 50, water: 0 },
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
        videoUrl: VID_2,
        thumbnail: 'https://picsum.photos/400/225?random=6',
        duration: '15 soniya',
        taskConfig: {
          type: SubjectType.PHYSICS,
          instructions: 'Tok kuchi (I) roppa-rosa 2.0 Amper bo\'lishi uchun Kuchlanishni (V) sozlang (R=5 Om).',
          targetValue: 2.0,
          tolerance: 0.1,
          initialParams: { voltage: 5, resistance: 5 },
        },
      },
      {
        id: 'phys-2',
        title: '2. Nyuton Qonunlari',
        description: 'Kuch va harakat.',
        videoUrl: VID_3,
        thumbnail: 'https://picsum.photos/400/225?random=7',
        duration: '15 soniya',
        taskConfig: {
          type: SubjectType.PHYSICS,
          instructions: 'Jism tezlanishi 5 m/s² bo\'lishi uchun unga ta\'sir qiluvchi kuchni toping (m=10kg).',
          targetValue: 50,
          tolerance: 2,
          initialParams: { force: 0, mass: 10 },
        },
      },
      {
        id: 'phys-3',
        title: '3. Gravitatsiya',
        description: 'Erkin tushish tezlanishi.',
        videoUrl: VID_4,
        thumbnail: 'https://picsum.photos/400/225?random=8',
        duration: '15 soniya',
        taskConfig: {
          type: SubjectType.PHYSICS,
          instructions: 'Raketa uchishi uchun tortish kuchini (G) yengib o\'tadigan kuchlanishni 100% ga yetkazing.',
          targetValue: 100,
          tolerance: 1,
          initialParams: { thrust: 0, gravity: 9.8 },
        },
      },
      {
        id: 'phys-4',
        title: '4. Optika',
        description: 'Yorug\'likning sinishi va qaytishi.',
        videoUrl: VID_1,
        thumbnail: 'https://picsum.photos/400/225?random=9',
        duration: '15 soniya',
        taskConfig: {
          type: SubjectType.PHYSICS,
          instructions: 'Yorug\'likni to\'liq qaytarish uchun tushish burchagini 45 gradusga sozlang.',
          targetValue: 45,
          tolerance: 2,
          initialParams: { angle: 0, refraction: 1.5 },
        },
      },
      {
        id: 'phys-5',
        title: '5. Termodinamika',
        description: 'Issiqlik uzatish usullari.',
        videoUrl: VID_5,
        thumbnail: 'https://picsum.photos/400/225?random=10',
        duration: '15 soniya',
        taskConfig: {
          type: SubjectType.PHYSICS,
          instructions: 'Tizim muvozanatga kelishi uchun temperaturani 50°C ga tushiring.',
          targetValue: 50,
          tolerance: 5,
          initialParams: { temp: 100, energy: 500 },
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
        videoUrl: VID_3,
        thumbnail: 'https://picsum.photos/400/225?random=11',
        duration: '15 soniya',
        taskConfig: {
          type: SubjectType.BIOLOGY,
          instructions: 'O\'simlik o\'sishi 100% bo\'lishi uchun Yorug\'lik va CO2 miqdorini optimallashtiring.',
          targetValue: 100,
          tolerance: 5,
          initialParams: { light: 20, co2: 20 },
        },
      },
      {
        id: 'bio-2',
        title: '2. Hujayra Tuzilishi',
        description: 'Membrana, yadro va mitoxondriya.',
        videoUrl: VID_1,
        thumbnail: 'https://picsum.photos/400/225?random=12',
        duration: '15 soniya',
        taskConfig: {
          type: SubjectType.BIOLOGY,
          instructions: 'Hujayra energiyasini (ATP) oshirish uchun mitoxondriya faolligini 80% ga ko\'taring.',
          targetValue: 80,
          tolerance: 5,
          initialParams: { activity: 20, glucose: 50 },
        },
      },
      {
        id: 'bio-3',
        title: '3. DNK va Genetika',
        description: 'Irsiyat qonunlari.',
        videoUrl: VID_4,
        thumbnail: 'https://picsum.photos/400/225?random=13',
        duration: '15 soniya',
        taskConfig: {
          type: SubjectType.BIOLOGY,
          instructions: 'DNK zanjirini barqarorlashtirish uchun haroratni 37°C (tana harorati) ga sozlang.',
          targetValue: 37,
          tolerance: 0.5,
          initialParams: { temp: 20, stability: 0 },
        },
      },
      {
        id: 'bio-4',
        title: '4. Ekotizimlar',
        description: 'Oziq zanjiri va muvozanat.',
        videoUrl: VID_2,
        thumbnail: 'https://picsum.photos/400/225?random=14',
        duration: '15 soniya',
        taskConfig: {
          type: SubjectType.BIOLOGY,
          instructions: 'Ekotizim balansi uchun yirtqichlar va o\'lja nisbatini 1:10 ga keltiring (10 yirtqich).',
          targetValue: 10,
          tolerance: 1,
          initialParams: { predators: 2, prey: 100 },
        },
      },
      {
        id: 'bio-5',
        title: '5. Inson Anatomiyasi',
        description: 'Yurak va qon aylanish tizimi.',
        videoUrl: VID_5,
        thumbnail: 'https://picsum.photos/400/225?random=15',
        duration: '15 soniya',
        taskConfig: {
          type: SubjectType.BIOLOGY,
          instructions: 'Yurak urish tezligini (Puls) normal holatga, ya\'ni 70 zarba/daqiqaga tushiring.',
          targetValue: 70,
          tolerance: 5,
          initialParams: { bpm: 120, adrenaline: 50 },
        },
      },
    ],
  },
];