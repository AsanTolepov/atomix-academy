import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { User, AIResult } from './types';
import { MOCK_USER, ACHIEVEMENTS_LIST } from './constants';

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
  const [user, setUser] = useState<User>(MOCK_USER);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<Record<string, any>>(MOCK_USER.progress);
  const [newAchievement, setNewAchievement] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let userData = docSnap.data() as User;
                let shouldUpdate = false;

                // Yutuqlar ro'yxatini tekshirish
                const currentAchievements = userData.achievements || {};
                const newAchievements = { ...currentAchievements };
                ACHIEVEMENTS_LIST.forEach((ach) => {
                    if (newAchievements[ach.id] === undefined) {
                        newAchievements[ach.id] = false;
                        shouldUpdate = true;
                    }
                });

                // Streak (Kunlik kirish) mantiqi
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
        }
        setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const completeVideo = async (lessonId: string) => {
    if (!auth.currentUser) return;
    const newProgress = { ...progress, [lessonId]: { ...progress[lessonId], videoWatched: true } };
    setProgress(newProgress);
    await setDoc(doc(db, "users", auth.currentUser.uid), { progress: newProgress }, { merge: true });
  };

  const completeTask = async (lessonId: string, aiResult: AIResult) => {
     if (!auth.currentUser) return;
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
    setUser(prev => ({ ...prev, xp: newXp, achievements: currentAchievements, badges: updatedBadges }));
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
    // 1. TASHQI FON (Kompyuterda ochganda atrof kulrang bo'ladi)
    <div className="min-h-screen bg-gray-100 flex justify-center items-start font-sans text-gray-900">
      
      {/* 2. MOBIL KONTEYNER (Maksimal 480px) */}
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
            {/* NAVBARSIZ SAHIFALAR (To'liq ekran) */}
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            
            <Route 
                path="/app/lesson/:lessonId" 
                element={
                    <LessonScreen 
                        userProgress={progress} 
                        onVideoComplete={completeVideo} 
                        onTaskComplete={completeTask} 
                    />
                } 
            />

            {/* NAVBARLI SAHIFALAR (Layout ichida) */}
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<HomeScreen user={user} />} />
                  <Route path="/app" element={<HomeScreen user={user} />} />
                  <Route path="/app/course/:id" element={<CourseDetails />} />
                  <Route path="/app/profile" element={<ProfileScreen user={user} />} />
                  <Route path="/app/leaderboard" element={<LeaderboardScreen />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </HashRouter>

      </div>
    </div>
  );
};

export default App;