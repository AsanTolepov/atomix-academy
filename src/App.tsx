import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User, AIResult } from './types';
import { ACHIEVEMENTS_LIST } from './constants'; // MOCK_USER olib tashlandi

// Firebase
import { auth, db } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// Komponentlar
import Layout from './components/Layout';
import AchievementPopup from './components/AchievementPopup';
import CourseDetails from './screens/CourseDetails';
import LessonScreen from './screens/LessonScreen';
import ProfileScreen from './screens/ProfileScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import HomeScreen from './screens/HomeScreen'; 
import LoginScreen from './screens/LoginScreen'; 
import WelcomeScreen from './screens/WelcomeScreen';

// Loader
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const useAppStore = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<Record<string, any>>({});
  const [newAchievement, setNewAchievement] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setLoading(true);
        if (currentUser) {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let userData = docSnap.data() as User;
                let shouldUpdate = false;

                // Yutuqlar tekshiruvi
                const currentAchievements = userData.achievements || {};
                const newAchievements = { ...currentAchievements };
                ACHIEVEMENTS_LIST.forEach((ach) => {
                    if (newAchievements[ach.id] === undefined) {
                        newAchievements[ach.id] = false;
                        shouldUpdate = true;
                    }
                });

                // Streak tekshiruvi
                const today = new Date().toDateString();
                const lastLogin = userData.lastLoginDate;
                if (lastLogin !== today) {
                     const yesterday = new Date();
                     yesterday.setDate(yesterday.getDate() - 1);
                     if (lastLogin === yesterday.toDateString()) {
                         userData.streak = (userData.streak || 0) + 1;
                     } else {
                         userData.streak = 1;
                     }
                     userData.lastLoginDate = today;
                     shouldUpdate = true;
                }

                if (shouldUpdate) {
                    await updateDoc(docRef, {
                        achievements: newAchievements,
                        streak: userData.streak,
                        lastLoginDate: userData.lastLoginDate
                    });
                    userData.achievements = newAchievements;
                }
                setUser(userData);
                setProgress(userData.progress || {});
            }
        } else {
            setUser(null);
        }
        setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- MUHIM QISM: VIDEO TUGAGANDA ---
  const completeVideo = async (lessonId: string) => {
    if (!auth.currentUser || !user) return;
    
    console.log("Video tugadi:", lessonId); // Tekshirish uchun log

    // 1. Progress obyektini yangilash (ESKI ma'lumotni saqlab qolgan holda)
    const currentLessonProgress = progress[lessonId] || {};
    const newProgress = { 
        ...progress, 
        [lessonId]: { 
            ...currentLessonProgress, 
            videoWatched: true 
        } 
    };
    
    // 2. Lokal state'ni yangilash (Ikkalasini ham yangilaymiz)
    setProgress(newProgress);
    setUser(prev => prev ? ({ ...prev, progress: newProgress }) : null); // Bu qator ekranni qayta chizadi

    // 3. Firebase-ga yozish
    try {
        await setDoc(doc(db, "users", auth.currentUser.uid), { progress: newProgress }, { merge: true });
    } catch (e) {
        console.error("Firebaseda xatolik:", e);
    }
  };

  const completeTask = async (lessonId: string, aiResult: AIResult) => {
     if (!auth.currentUser || !user) return;
    const newProgress = { ...progress, [lessonId]: { ...progress[lessonId], taskCompleted: true, score: aiResult.score } };
    let newXp = user.xp + aiResult.score;
    
    let currentAchievements = { ...(user.achievements || {}) };
    let updatedBadges = [...user.badges];
    let achievementUnlocked = null;

    if (!currentAchievements['first_discovery']) {
        currentAchievements['first_discovery'] = true;
        updatedBadges.push('first_discovery');
        newXp += 200; 
        achievementUnlocked = ACHIEVEMENTS_LIST.find(a => a.id === 'first_discovery');
    }
    if (aiResult.score === 100 && !currentAchievements['quiz_master']) {
        currentAchievements['quiz_master'] = true;
        updatedBadges.push('quiz_master');
        newXp += 500;
        if (!achievementUnlocked) achievementUnlocked = ACHIEVEMENTS_LIST.find(a => a.id === 'quiz_master');
    }

    setProgress(newProgress);
    setUser(prev => prev ? ({ ...prev, xp: newXp, achievements: currentAchievements, badges: updatedBadges, progress: newProgress }) : null);
    
    if (achievementUnlocked) setNewAchievement(achievementUnlocked);

    await setDoc(doc(db, "users", auth.currentUser.uid), { 
        progress: newProgress, xp: newXp, achievements: currentAchievements, badges: updatedBadges
    }, { merge: true });
  };

  const closeAchievement = () => setNewAchievement(null);
  return { user, progress, loading, completeVideo, completeTask, newAchievement, closeAchievement };
};

const App = () => {
  const { user, progress, loading, completeVideo, completeTask, newAchievement, closeAchievement } = useAppStore();

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start font-sans text-gray-900">
      <div className="w-full max-w-[480px] min-h-screen bg-white shadow-2xl relative overflow-x-hidden">
        
        <HashRouter>
          {newAchievement && (
              <AchievementPopup 
                  title={newAchievement.title}
                  description={newAchievement.description}
                  icon={newAchievement.icon}
                  onClose={closeAchievement}
              />
          )}

          <Routes>
            <Route path="/" element={user ? <Navigate to="/app" replace /> : <Navigate to="/login" replace />} />

            <Route path="/login" element={<LoginScreen />} />
            <Route path="/welcome" element={<WelcomeScreen />} />
            
            <Route 
                path="/app/lesson/:lessonId" 
                element={
                    user ? (
                        <LessonScreen 
                            userProgress={progress} 
                            onVideoComplete={completeVideo} 
                            onTaskComplete={completeTask} 
                        />
                    ) : <Navigate to="/login" />
                } 
            />

            <Route path="/app/*" element={
              user ? (
                  <Layout>
                    <Routes>
                      <Route path="/" element={<HomeScreen user={user} />} />
                      <Route path="/course/:id" element={<CourseDetails />} />
                      <Route path="/profile" element={<ProfileScreen user={user} />} />
                      <Route path="/leaderboard" element={<LeaderboardScreen />} />
                    </Routes>
                  </Layout>
              ) : (
                  <Navigate to="/login" replace />
              )
            } />
          </Routes>
        </HashRouter>

      </div>
    </div>
  );
};

export default App;