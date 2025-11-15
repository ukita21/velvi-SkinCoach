'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Camera, TrendingUp, Calendar, Smile, Meh, Frown, ChevronRight } from 'lucide-react';

export default function JournalPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('month');

  const journalEntries = [
    {
      id: 1,
      date: '2024-01-15',
      photoUrl: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?w=400&h=400&fit=crop',
      mood: 'great',
      notes: 'Skin feels amazing today! New serum is working.',
      scores: { hydration: 85, texture: 78, redness: 72 }
    },
    {
      id: 2,
      date: '2024-01-08',
      photoUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=400&fit=crop',
      mood: 'good',
      notes: 'Slight improvement in texture.',
      scores: { hydration: 78, texture: 72, redness: 68 }
    },
    {
      id: 3,
      date: '2024-01-01',
      photoUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop',
      mood: 'okay',
      notes: 'Starting new routine today.',
      scores: { hydration: 70, texture: 65, redness: 65 }
    },
  ];

  const progressData = [
    { label: 'Hydration', current: 85, previous: 70, change: '+15%' },
    { label: 'Texture', current: 78, previous: 65, change: '+13%' },
    { label: 'Redness', current: 72, previous: 65, change: '+7%' },
  ];

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'great': return <Smile className="w-5 h-5 text-green-600" />;
      case 'good': return <Smile className="w-5 h-5 text-[#7eb8da]" />;
      case 'okay': return <Meh className="w-5 h-5 text-[#f4c790]" />;
      case 'bad': return <Frown className="w-5 h-5 text-red-500" />;
      default: return <Meh className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#e8dff5] to-[#f5f0fa] px-6 pt-16 pb-10 rounded-b-[2.5rem]">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/" className="bg-white/60 backdrop-blur-sm p-2.5 rounded-full hover:bg-white/80 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-3xl font-light tracking-tight text-gray-800">Skin Journal</h1>
        </div>
        <p className="text-gray-600 font-light ml-14">Track your skin's journey</p>
      </div>

      <div className="px-6 mt-8 space-y-6">
        {/* Add Entry Button */}
        <button className="w-full bg-gradient-to-r from-[#b8a4d9] to-[#9b87c6] text-white py-4 rounded-2xl font-light hover:shadow-md transition-all flex items-center justify-center gap-2">
          <Camera className="w-5 h-5" />
          Add New Entry
        </button>

        {/* Progress Overview */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-light text-gray-800">Progress Overview</h2>
            <div className="flex gap-2">
              {(['week', 'month', 'all'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1.5 rounded-xl text-sm font-light transition-all ${
                    selectedPeriod === period
                      ? 'bg-[#b8a4d9] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period === 'week' ? '7D' : period === 'month' ? '30D' : 'All'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {progressData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-light text-gray-700">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 font-light">{item.previous} → {item.current}</span>
                    <span className="text-sm font-light text-green-600">{item.change}</span>
                  </div>
                </div>
                <div className="relative w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="absolute top-0 left-0 bg-gradient-to-r from-[#b8a4d9] to-[#9b87c6] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.current}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-[#e8dff5]/50 to-[#f5f0fa]/50 border border-[#d4c5e8]/30 rounded-3xl p-6">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-[#b8a4d9] flex-shrink-0" />
            <div>
              <h3 className="font-light text-gray-800 mb-2 text-lg">AI Insights</h3>
              <p className="text-sm text-gray-700 mb-3 font-light">
                Your skin has improved by <span className="font-normal text-[#b8a4d9]">15%</span> this month! 
                Keep up your routine for best results.
              </p>
              <div className="space-y-2 text-sm text-gray-700 font-light">
                <p>✨ Hydration levels are excellent</p>
                <p>📈 Texture improving steadily</p>
                <p>🎯 Consider adding vitamin C for brightness</p>
              </div>
            </div>
          </div>
        </div>

        {/* Journal Entries */}
        <div className="space-y-4">
          <h2 className="text-xl font-light text-gray-800">Your Entries</h2>
          {journalEntries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                  <img src={entry.photoUrl} alt="Journal entry" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-light text-gray-700">
                        {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    {getMoodIcon(entry.mood)}
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 font-light">{entry.notes}</p>
                  <div className="flex gap-2">
                    <span className="text-xs bg-[#e8f4f8] text-[#7eb8da] px-2.5 py-1 rounded-full font-light">
                      Hydration {entry.scores.hydration}
                    </span>
                    <span className="text-xs bg-[#f5f0fa] text-[#b8a4d9] px-2.5 py-1 rounded-full font-light">
                      Texture {entry.scores.texture}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 self-center" />
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade Prompt for Free Users */}
        <div className="bg-gradient-to-r from-[#f4c790] to-[#f4a261] rounded-3xl p-6 text-white shadow-sm">
          <h3 className="text-xl font-light mb-2">Unlock Daily Journaling</h3>
          <p className="text-white/90 mb-4 text-sm font-light">
            Premium members can add daily photos and get detailed AI comparisons
          </p>
          <Link href="/profile" className="block w-full bg-white text-[#f4a261] py-3.5 rounded-2xl font-light text-center hover:shadow-md transition-all">
            Upgrade to Premium
          </Link>
        </div>
      </div>
    </div>
  );
}
