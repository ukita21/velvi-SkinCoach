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
      case 'great': return <Smile className="w-5 h-5 text-green-500" />;
      case 'good': return <Smile className="w-5 h-5 text-blue-500" />;
      case 'okay': return <Meh className="w-5 h-5 text-yellow-500" />;
      case 'bad': return <Frown className="w-5 h-5 text-red-500" />;
      default: return <Meh className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/" className="p-2 hover:bg-white/20 rounded-full transition-all">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Skin Journal</h1>
        </div>
        <p className="text-pink-100">Track your skin's journey</p>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Add Entry Button */}
        <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
          <Camera className="w-5 h-5" />
          Add New Entry
        </button>

        {/* Progress Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Progress Overview</h2>
            <div className="flex gap-2">
              {(['week', 'month', 'all'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    selectedPeriod === period
                      ? 'bg-purple-500 text-white'
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
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{item.previous} → {item.current}</span>
                    <span className="text-sm font-bold text-green-500">{item.change}</span>
                  </div>
                </div>
                <div className="relative w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="absolute top-0 left-0 bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.current}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-purple-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">AI Insights</h3>
              <p className="text-sm text-gray-700 mb-3">
                Your skin has improved by <span className="font-bold text-purple-500">15%</span> this month! 
                Keep up your routine for best results.
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p>✨ Hydration levels are excellent</p>
                <p>📈 Texture improving steadily</p>
                <p>🎯 Consider adding vitamin C for brightness</p>
              </div>
            </div>
          </div>
        </div>

        {/* Journal Entries */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Your Entries</h2>
          {journalEntries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={entry.photoUrl} alt="Journal entry" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    {getMoodIcon(entry.mood)}
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{entry.notes}</p>
                  <div className="flex gap-2">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                      Hydration {entry.scores.hydration}
                    </span>
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
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
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Unlock Daily Journaling</h3>
          <p className="text-amber-50 mb-4 text-sm">
            Premium members can add daily photos and get detailed AI comparisons
          </p>
          <Link href="/profile" className="block w-full bg-white text-orange-500 py-3 rounded-xl font-medium text-center hover:shadow-lg transition-all">
            Upgrade to Premium
          </Link>
        </div>
      </div>
    </div>
  );
}
