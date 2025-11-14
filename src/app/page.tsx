'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Camera, Sparkles, TrendingUp, Calendar, Flame, ChevronRight, Star, Droplets, Sun } from 'lucide-react';

export default function Home() {
  const [streak, setStreak] = useState(7);
  const [todayCompleted, setTodayCompleted] = useState(false);

  const todayRoutine = [
    { name: 'Gentle Cleanser', brand: 'CeraVe', completed: true },
    { name: 'Vitamin C Serum', brand: 'The Ordinary', completed: true },
    { name: 'Moisturizer', brand: 'CeraVe', completed: false },
    { name: 'Sunscreen SPF 50', brand: 'La Roche-Posay', completed: false },
  ];

  const insights = [
    { icon: Droplets, label: 'Hydration', value: '78%', trend: '+5%', color: 'text-blue-500' },
    { icon: Sun, label: 'Texture', value: '82%', trend: '+12%', color: 'text-amber-500' },
    { icon: Sparkles, label: 'Clarity', value: '85%', trend: '+8%', color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Good Morning ✨</h1>
            <p className="text-pink-100">Your skin is glowing today!</p>
          </div>
          <Link href="/profile" className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all">
            <Star className="w-6 h-6" />
          </Link>
        </div>

        {/* Streak */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-3 rounded-full">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">{streak} Day Streak</p>
              <p className="text-sm text-pink-100">Keep it going!</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6" />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 mt-6 space-y-6">
        {/* Quick Scan Button */}
        <Link href="/scan" className="block">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">AI Skin Scan</h3>
                <p className="text-pink-100">Get instant analysis</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <Camera className="w-8 h-8" />
              </div>
            </div>
          </div>
        </Link>

        {/* Today's Routine */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Today's Routine</h2>
            <Link href="/routine" className="text-purple-500 text-sm font-medium hover:text-purple-600">
              Edit
            </Link>
          </div>
          <div className="space-y-3">
            {todayRoutine.map((step, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  checked={step.completed}
                  onChange={() => {}}
                  className="w-5 h-5 rounded-full border-2 border-purple-500 text-purple-500 focus:ring-purple-500"
                />
                <div className="flex-1">
                  <p className={`font-medium ${step.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                    {step.name}
                  </p>
                  <p className="text-sm text-gray-500">{step.brand}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all">
            Mark All Complete
          </button>
        </div>

        {/* Skin Insights */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Skin Insights</h2>
            <Link href="/journal" className="text-purple-500 text-sm font-medium hover:text-purple-600">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {insights.map((insight, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center">
                <insight.icon className={`w-6 h-6 mx-auto mb-2 ${insight.color}`} />
                <p className="text-2xl font-bold text-gray-900">{insight.value}</p>
                <p className="text-xs text-gray-600 mb-1">{insight.label}</p>
                <p className="text-xs text-green-600 font-medium">{insight.trend}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/journal" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <Calendar className="w-8 h-8 text-purple-500 mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Journal</h3>
            <p className="text-sm text-gray-600">Track progress</p>
          </Link>
          <Link href="/scan" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <TrendingUp className="w-8 h-8 text-pink-500 mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Products</h3>
            <p className="text-sm text-gray-600">Scan & discover</p>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 safe-area-inset-bottom">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <Link href="/" className="flex flex-col items-center gap-1 text-purple-500">
            <Sparkles className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link href="/routine" className="flex flex-col items-center gap-1 text-gray-400 hover:text-purple-500 transition-colors">
            <Calendar className="w-6 h-6" />
            <span className="text-xs font-medium">Routine</span>
          </Link>
          <Link href="/scan" className="flex flex-col items-center -mt-8">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-full shadow-lg">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </Link>
          <Link href="/journal" className="flex flex-col items-center gap-1 text-gray-400 hover:text-purple-500 transition-colors">
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs font-medium">Journal</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-gray-400 hover:text-purple-500 transition-colors">
            <Star className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
