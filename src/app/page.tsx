'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Camera, Sparkles, TrendingUp, Calendar, Flame, ChevronRight, Star, Droplets, Sun, Check } from 'lucide-react';

export default function Home() {
  const [streak, setStreak] = useState(7);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // State for routine steps
  const [routineSteps, setRoutineSteps] = useState([
    { id: 1, name: 'Gentle Cleanser', brand: 'CeraVe', completed: false, time: 'Morning' },
    { id: 2, name: 'Vitamin C Serum', brand: 'The Ordinary', completed: false, time: 'Morning' },
    { id: 3, name: 'Moisturizer', brand: 'CeraVe', completed: false, time: 'Morning' },
    { id: 4, name: 'Sunscreen SPF 50', brand: 'La Roche-Posay', completed: false, time: 'Morning' },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('userAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Check if onboarding is completed
    const completed = localStorage.getItem('onboardingCompleted');
    if (!completed) {
      router.push('/onboarding');
    } else {
      setIsLoading(false);
      // Load routine from localStorage
      const savedRoutine = localStorage.getItem('todayRoutine');
      if (savedRoutine) {
        setRoutineSteps(JSON.parse(savedRoutine));
      }
    }
  }, [mounted, router]);

  // Save routine to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading && mounted) {
      localStorage.setItem('todayRoutine', JSON.stringify(routineSteps));
    }
  }, [routineSteps, isLoading, mounted]);

  // Toggle individual step
  const toggleStep = (id: number) => {
    setRoutineSteps(prev => 
      prev.map(step => 
        step.id === id ? { ...step, completed: !step.completed } : step
      )
    );
  };

  // Mark all as complete
  const markAllComplete = () => {
    setRoutineSteps(prev => 
      prev.map(step => ({ ...step, completed: true }))
    );
  };

  // Calculate completion percentage
  const completedCount = routineSteps.filter(step => step.completed).length;
  const totalCount = routineSteps.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#b8a4d9] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-500 font-light">Loading...</p>
        </div>
      </div>
    );
  }

  const insights = [
    { icon: Droplets, label: 'Hydration', value: '78%', trend: '+5%', color: 'text-[#7eb8da]' },
    { icon: Sun, label: 'Texture', value: '82%', trend: '+12%', color: 'text-[#f4c790]' },
    { icon: Sparkles, label: 'Clarity', value: '85%', trend: '+8%', color: 'text-[#b8a4d9]' },
  ];

  return (
    <div className="min-h-screen pb-24 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#e8dff5] to-[#f5f0fa] px-6 pt-16 pb-10 rounded-b-[2.5rem]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-gray-800 mb-2">Good Morning</h1>
            <p className="text-gray-600 font-light">Your skin is glowing today</p>
          </div>
          <Link href="/profile" className="bg-white/60 backdrop-blur-sm p-3 rounded-full hover:bg-white/80 transition-all shadow-sm">
            <Star className="w-5 h-5 text-[#b8a4d9]" />
          </Link>
        </div>

        {/* Streak */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-5 flex items-center justify-between shadow-sm border border-white/50">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-[#f4a261] to-[#e76f51] p-3 rounded-2xl shadow-sm">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-light text-gray-800">{streak} Day Streak</p>
              <p className="text-sm text-gray-500 font-light">Keep it going</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 mt-8 space-y-6">
        {/* Quick Scan Button */}
        <Link href="/scan" className="block">
          <div className="bg-gradient-to-br from-[#b8a4d9] to-[#9b87c6] rounded-3xl p-8 text-white shadow-md hover:shadow-lg transition-all border border-[#d4c5e8]/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-light mb-2">AI Skin Scan</h3>
                <p className="text-white/80 font-light text-sm">Get instant analysis</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Camera className="w-7 h-7" />
              </div>
            </div>
          </div>
        </Link>

        {/* Today's Routine - IMPROVED & FUNCTIONAL */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-light text-gray-800">Today's Routine</h2>
              <p className="text-sm text-gray-500 font-light mt-1">
                {completedCount} of {totalCount} completed ({completionPercentage}%)
              </p>
            </div>
            <Link href="/routine" className="text-[#b8a4d9] text-sm font-light hover:text-[#9b87c6] transition-colors">
              Edit
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="mb-5">
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#b8a4d9] to-[#9b87c6] h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Routine Steps */}
          <div className="space-y-3">
            {routineSteps.map((step) => (
              <div 
                key={step.id} 
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                  step.completed 
                    ? 'bg-[#e8dff5]/30 border-[#b8a4d9]/30' 
                    : 'bg-gray-50/50 border-gray-100/50 hover:bg-gray-50'
                }`}
                onClick={() => toggleStep(step.id)}
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={step.completed}
                    onChange={() => toggleStep(step.id)}
                    className="w-5 h-5 rounded-full border-2 border-[#b8a4d9] text-[#b8a4d9] focus:ring-[#b8a4d9]/30 focus:ring-offset-0 cursor-pointer"
                  />
                  {step.completed && (
                    <Check className="w-3 h-3 text-white absolute top-1 left-1 pointer-events-none" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-light transition-all ${
                    step.completed ? 'text-gray-400 line-through' : 'text-gray-800'
                  }`}>
                    {step.name}
                  </p>
                  <p className="text-sm text-gray-500 font-light">{step.brand}</p>
                </div>
                <span className="text-xs text-gray-400 font-light">{step.time}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-5 flex gap-3">
            <button 
              onClick={markAllComplete}
              disabled={completedCount === totalCount}
              className={`flex-1 py-3.5 rounded-2xl font-light transition-all ${
                completedCount === totalCount
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#b8a4d9] to-[#9b87c6] text-white hover:shadow-md'
              }`}
            >
              {completedCount === totalCount ? 'All Complete! 🎉' : 'Mark All Complete'}
            </button>
          </div>

          {/* Completion Message */}
          {completedCount === totalCount && (
            <div className="mt-4 p-4 bg-gradient-to-r from-[#e8dff5] to-[#f5f0fa] rounded-2xl text-center border border-[#b8a4d9]/20">
              <p className="text-[#b8a4d9] font-light">
                ✨ Amazing! You completed your routine today!
              </p>
            </div>
          )}
        </div>

        {/* Skin Insights */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-light text-gray-800">Skin Insights</h2>
            <Link href="/journal" className="text-[#b8a4d9] text-sm font-light hover:text-[#9b87c6] transition-colors">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {insights.map((insight, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 rounded-2xl p-4 text-center border border-gray-100/50">
                <insight.icon className={`w-6 h-6 mx-auto mb-3 ${insight.color}`} />
                <p className="text-2xl font-light text-gray-800">{insight.value}</p>
                <p className="text-xs text-gray-600 mb-1 font-light">{insight.label}</p>
                <p className="text-xs text-green-600 font-light">{insight.trend}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/journal" className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
            <Calendar className="w-7 h-7 text-[#b8a4d9] mb-3" />
            <h3 className="font-light text-gray-800 mb-1">Journal</h3>
            <p className="text-sm text-gray-600 font-light">Track progress</p>
          </Link>
          <Link href="/scan" className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
            <TrendingUp className="w-7 h-7 text-[#b8a4d9] mb-3" />
            <h3 className="font-light text-gray-800 mb-1">Products</h3>
            <p className="text-sm text-gray-600 font-light">Scan & discover</p>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-4 safe-area-inset-bottom">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <Link href="/" className="flex flex-col items-center gap-1 text-[#b8a4d9]">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-light">Home</span>
          </Link>
          <Link href="/routine" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#b8a4d9] transition-colors">
            <Calendar className="w-5 h-5" />
            <span className="text-xs font-light">Routine</span>
          </Link>
          <Link href="/scan" className="flex flex-col items-center -mt-8">
            <div className="bg-gradient-to-br from-[#b8a4d9] to-[#9b87c6] p-4 rounded-full shadow-lg">
              <Camera className="w-7 h-7 text-white" />
            </div>
          </Link>
          <Link href="/journal" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#b8a4d9] transition-colors">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-light">Journal</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#b8a4d9] transition-colors">
            <Star className="w-5 h-5" />
            <span className="text-xs font-light">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
