import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Lock, CheckCircle, Trophy } from 'lucide-react';
import { COURSES } from '../constants';
import VideoPlayer from '../components/VideoPlayer';
import TaskLab from '../components/TaskLab';
import { AIResult } from '../types';

const LessonScreen = ({ userProgress, onVideoComplete, onTaskComplete }: any) => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  
  const lesson = COURSES.flatMap(c => c.lessons).find(l => l.id === lessonId);
  
  if (!lesson) return <div className="p-10 text-center">Dars topilmadi!</div>;

  const lessonProgress = userProgress[lessonId!] || { videoWatched: false, taskCompleted: false, score: 0 };
  const isLocked = !lessonProgress.videoWatched;
  const [showResult, setShowResult] = useState<AIResult | null>(null);

  const handleTaskSuccess = (result: AIResult) => {
      onTaskComplete(lessonId!, result);
      setShowResult(result);
  };

  return (
      <div className="min-h-screen bg-slate-50 pb-24">
          {/* Header */}
          <div className="sticky top-0 bg-white/90 backdrop-blur-md z-20 px-4 py-3 flex items-center shadow-sm border-b border-gray-100">
              <button onClick={() => navigate(-1)} className="p-2 mr-2 rounded-full hover:bg-gray-100">
                <ChevronLeft className="text-gray-700" />
              </button>
              <h2 className="font-bold text-gray-800 truncate flex-1">{lesson.title}</h2>
          </div>

          <div className="p-4 space-y-6 max-w-2xl mx-auto">
              {/* 1. VIDEO QISMI */}
              <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between px-2 mb-2 mt-1">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">1-Qadam: Videoni ko'ring</h3>
                    {lessonProgress.videoWatched && <span className="text-xs font-bold text-green-500 flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> Bajarildi</span>}
                  </div>
                  <VideoPlayer 
                      src={lesson.videoUrl} 
                      isCompleted={lessonProgress.videoWatched} 
                      onComplete={() => onVideoComplete(lessonId!)} 
                  />
              </div>

              {/* 2. TOPSHIRIQ QISMI (LAB) */}
              <div className="relative">
                  <div className="flex items-center justify-between px-3 mb-2">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">2-Qadam: Amaliy mashg'ulot</h3>
                      {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                  </div>

                  {/* Agar qulf bo'lsa xira qilish */}
                  <div className={`transition-all duration-500 ${isLocked ? 'opacity-40 blur-[2px] pointer-events-none grayscale' : 'opacity-100'}`}>
                      <TaskLab config={lesson.taskConfig} onSuccess={handleTaskSuccess} />
                  </div>

                  {/* Qulf ustidagi yozuv */}
                  {isLocked && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pt-10">
                       <div className="bg-gray-900/90 backdrop-blur text-white p-6 rounded-2xl shadow-xl max-w-[250px] animate-in fade-in zoom-in">
                          <Lock className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                          <h4 className="font-bold text-lg mb-1">Labaratoriya Qulflangan</h4>
                          <p className="text-sm text-gray-300">Iltimos, topshiriqni ochish uchun avval videoni to'liq ko'ring.</p>
                       </div>
                    </div>
                  )}
              </div>
          </div>

          {/* Natija oynasi */}
          {showResult && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm animate-in fade-in">
                  <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">
                      <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Trophy className="w-10 h-10 text-yellow-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-1">Ajoyib Natija!</h2>
                      <div className="text-5xl font-black text-blue-600 mb-4">{showResult.score} <span className="text-lg text-gray-400">/100</span></div>
                      <p className="text-gray-600 mb-6 bg-gray-50 p-3 rounded-xl text-sm border border-gray-100">
                        "{showResult.explanation}"
                      </p>
                      <button 
                          onClick={() => { setShowResult(null); navigate(-1); }}
                          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700"
                      >
                          Davom etish
                      </button>
                  </div>
              </div>
          )}
      </div>
  );
};

export default LessonScreen;