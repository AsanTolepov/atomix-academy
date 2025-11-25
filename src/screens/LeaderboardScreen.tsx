import React, { useEffect, useState } from 'react';
import { Trophy, Crown, Loader2, Flame, Zap } from 'lucide-react';
import { db, auth } from '../services/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const LeaderboardScreen = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRank, setCurrentUserRank] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("xp", "desc"), limit(20));
        
        const querySnapshot = await getDocs(q);
        const usersList = [];

        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() });
        });

        setLeaders(usersList);

        if (currentUserId) {
            const myIndex = usersList.findIndex(u => u.id === currentUserId);
            if (myIndex !== -1) {
                setCurrentUserRank(myIndex + 1);
                setCurrentUserData(usersList[myIndex]);
            } else {
                setCurrentUserRank(21); 
            }
        }
      } catch (error) {
        console.error("Xato:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [currentUserId]);

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  const top1 = leaders[0];
  const top2 = leaders[1];
  const top3 = leaders[2];
  const restUsers = leaders.slice(3, 10);

  const getAvatar = (u) => u?.avatar || "🎓";

  return (
    <div className="min-h-screen bg-slate-50 pb-36"> {/* Padding Bottomni oshirdim */}
        {/* Header */}
        <div className="bg-white p-5 shadow-sm sticky top-0 z-10 max-w-md mx-auto w-full">
            <h1 className="text-2xl font-bold flex items-center gap-2 justify-center">
                <Trophy className="text-yellow-500 fill-yellow-500" /> Reyting
            </h1>
        </div>

        {/* Main Container - Keng ekranlarda ham chiroyli turishi uchun */}
        <div className="max-w-md mx-auto w-full relative">
            
            {/* SHOXSUPA (TOP 3) */}
            <div className="flex justify-center items-end h-48 mb-6 mt-4 gap-2 px-4">
                {/* 2-o'rin */}
                {top2 && (
                    <div className="flex flex-col items-center w-1/3">
                        <div className="w-14 h-14 rounded-full bg-gray-200 border-4 border-gray-300 flex items-center justify-center text-2xl shadow-lg relative">
                            {getAvatar(top2)}
                            <div className="absolute -bottom-2 bg-gray-500 text-white text-[10px] px-2 rounded-full font-bold">#2</div>
                        </div>
                        <p className="font-bold text-xs mt-3 text-center line-clamp-1">{top2.name}</p>
                        <p className="text-xs text-blue-600 font-bold">{top2.xp} XP</p>
                        <div className="h-16 w-full bg-gray-200 rounded-t-lg mt-1 opacity-50"></div>
                    </div>
                )}
                {/* 1-o'rin */}
                {top1 && (
                    <div className="flex flex-col items-center w-1/3 z-10 -mt-6">
                        <Crown className="text-yellow-500 animate-bounce w-6 h-6" />
                        <div className="w-20 h-20 rounded-full bg-yellow-100 border-4 border-yellow-400 flex items-center justify-center text-4xl shadow-xl relative">
                            {getAvatar(top1)}
                            <div className="absolute -bottom-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">#1</div>
                        </div>
                        <p className="font-bold text-sm mt-3 text-center line-clamp-1">{top1.name}</p>
                        <p className="text-sm text-blue-600 font-black">{top1.xp} XP</p>
                        <div className="h-24 w-full bg-yellow-200 rounded-t-lg mt-1 opacity-60"></div>
                    </div>
                )}
                {/* 3-o'rin */}
                {top3 && (
                    <div className="flex flex-col items-center w-1/3">
                        <div className="w-14 h-14 rounded-full bg-orange-100 border-4 border-orange-300 flex items-center justify-center text-2xl shadow-lg relative">
                            {getAvatar(top3)}
                            <div className="absolute -bottom-2 bg-orange-400 text-white text-[10px] px-2 rounded-full font-bold">#3</div>
                        </div>
                        <p className="font-bold text-xs mt-3 text-center line-clamp-1">{top3.name}</p>
                        <p className="text-xs text-blue-600 font-bold">{top3.xp} XP</p>
                        <div className="h-12 w-full bg-orange-200 rounded-t-lg mt-1 opacity-50"></div>
                    </div>
                )}
            </div>

            {/* RO'YXAT (4-10) */}
            <div className="px-4 space-y-3">
                {restUsers.map((u, index) => (
                    <div key={u.id} className={`flex items-center p-3 rounded-xl border ${u.id === currentUserId ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-100'} shadow-sm`}>
                        <span className="w-8 text-center font-bold text-gray-400">#{index + 4}</span>
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl mx-3">{getAvatar(u)}</div>
                        <div className="flex-1">
                            <p className={`font-bold text-sm ${u.id === currentUserId ? 'text-blue-700' : 'text-gray-800'}`}>{u.name}</p>
                            <div className="flex gap-2 text-xs text-gray-400">
                                <span>{u.level}-daraja</span>
                                {u.streak > 0 && <span className="text-orange-500 flex items-center"><Flame className="w-3 h-3"/> {u.streak}</span>}
                            </div>
                        </div>
                        <span className="font-bold text-indigo-600 text-sm">{u.xp} XP</span>
                    </div>
                ))}
            </div>
        </div>

        {/* --- O'ZGARTIRILGAN PASTKI PANEL (DIZAYN TO'G'RILANDI) --- */}
        {currentUserData && (
            <div className="fixed bottom-[80px] left-0 right-0 mx-auto w-[90%] max-w-md z-30 animate-slide-up">
                <div className="bg-gray-900 text-white p-4 rounded-2xl shadow-2xl flex justify-between items-center border border-gray-700 backdrop-blur-sm bg-opacity-95">
                    <div className="flex items-center gap-4">
                        <div className="text-xl font-bold text-yellow-400 border-r border-gray-600 pr-4">
                            #{currentUserRank > 20 ? "20+" : currentUserRank}
                        </div>
                        <div>
                            <p className="font-bold text-sm">Sening Natijang</p>
                            <div className="flex gap-3 text-xs text-gray-300 mt-1">
                                <span className="flex items-center"><Flame className="w-3 h-3 text-orange-500 mr-1"/> {currentUserData.streak || 0} kun</span>
                                <span className="flex items-center"><Zap className="w-3 h-3 text-blue-400 mr-1"/> {currentUserData.accuracy || 0}%</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-xl font-black text-blue-400">{currentUserData.xp} XP</div>
                </div>
            </div>
        )}
    </div>
  );
};

export default LeaderboardScreen;