import React from 'react';
import { User } from '../types'; // User tipini yangilang!
import { LogOut, Settings, Award, Flame, Zap, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import { signOut } from 'firebase/auth'; 
import { auth } from '../services/firebase'; 
import { ACHIEVEMENTS_LIST } from '../constants'; // <-- Ro'yxatni import qiling

const ProfileScreen = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  const nextLevelXp = (user.level + 1) * 500;
  const progressPercent = (user.xp / nextLevelXp) * 100;

  // Bazadan kelgan obyekt: { streak_3: true, first_login: false ... }
  const userAchievements = user.achievements || {};

  // Nechtasi ochilganini hisoblash
  const unlockedCount = Object.values(userAchievements).filter(val => val === true).length;

  const handleLogout = async () => {
      try {
          await signOut(auth);
          navigate('/login');
      } catch (error) {
          console.error("Chiqishda xatolik:", error);
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header va Statistika (o'zgarmadi) */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 pb-10 rounded-b-3xl text-white shadow-lg">
        {/* ... Header kodlari ... */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Mening Profilim</h1>
          <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"><Settings className="w-6 h-6 text-white" /></button>
        </div>
        <div className="flex items-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-xl border-4 border-white/30 mr-4">👨‍🎓</div>
            <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-blue-100 opacity-90">{user.email}</p>
                <div className="mt-2 bg-blue-800/50 px-3 py-1 rounded-full inline-flex items-center text-xs font-bold border border-blue-400/30">
                <Award className="w-3 h-3 mr-1 text-yellow-400" />{user.level}-Daraja</div>
            </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-end mb-2">
             <span className="text-gray-500 font-bold text-sm">Jami Tajriba (XP)</span>
             <span className="text-2xl font-black text-blue-600">{user.xp} XP</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-400 to-red-500" style={{ width: `${Math.min(progressPercent, 100)}%` }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-right">Keyingi darajaga: {nextLevelXp - user.xp} XP qoldi</p>
          
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
             <div className="text-center">
                <div className="flex items-center justify-center text-orange-500 mb-1"><Flame className="w-5 h-5"/></div>
                <div className="font-bold text-gray-800">{user.streak || 0} Kun</div> 
                <div className="text-xs text-gray-400">Ketma-ketlik</div>
             </div>
             <div className="text-center border-l border-gray-100">
                <div className="flex items-center justify-center text-blue-500 mb-1"><Zap className="w-5 h-5"/></div>
                <div className="font-bold text-gray-800">{user.accuracy || 0}%</div>
                <div className="text-xs text-gray-400">O'rtacha aniqlik</div>
             </div>
          </div>
        </div>

        {/* --- YUTUQLAR QISMI (YANGI) --- */}
        <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center justify-between">
            Yutuqlarim
            <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                {unlockedCount} / {ACHIEVEMENTS_LIST.length}
            </span>
        </h3>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
           {ACHIEVEMENTS_LIST.map((achievement) => {
             // MANTIQ: Bazada bu ID true bo'lsa -> Ochiq
             const isUnlocked = userAchievements[achievement.id] === true;

             return (
               <div 
                  key={achievement.id} 
                  className={`p-3 rounded-xl border flex flex-col items-center text-center aspect-square justify-center transition-all duration-300 ${
                      isUnlocked 
                        ? 'bg-white shadow-sm border-gray-100 scale-100' 
                        : 'bg-gray-50 border-gray-100 opacity-60 grayscale'
                  }`}
               >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 text-xl ${
                      isUnlocked ? 'bg-yellow-100' : 'bg-gray-200'
                  }`}>
                    {isUnlocked ? achievement.icon : <Lock className="w-4 h-4 text-gray-400" />}
                  </div>
                  <span className={`text-[10px] font-bold leading-tight ${
                      isUnlocked ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                      {achievement.name}
                  </span>
               </div>
             );
           })}
        </div>

        <button onClick={handleLogout} className="flex items-center justify-center w-full py-4 text-red-500 font-bold bg-red-50 rounded-xl hover:bg-red-100 transition mt-4">
           <LogOut className="w-5 h-5 mr-2"/> Hisobdan chiqish
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;