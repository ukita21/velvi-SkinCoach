'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Sun, Moon, Clock, ChevronRight, Sparkles, Check } from 'lucide-react';

export default function RoutinePage() {
  const [activeTime, setActiveTime] = useState<'AM' | 'PM'>('AM');

  const amRoutine = [
    { id: 1, name: 'Gentle Cleanser', brand: 'CeraVe', category: 'Cleanser', time: '30 sec', order: 1 },
    { id: 2, name: 'Vitamin C Serum', brand: 'The Ordinary', category: 'Serum', time: '1 min', order: 2 },
    { id: 3, name: 'Moisturizing Cream', brand: 'CeraVe', category: 'Moisturizer', time: '30 sec', order: 3 },
    { id: 4, name: 'Sunscreen SPF 50', brand: 'La Roche-Posay', category: 'Sunscreen', time: '1 min', order: 4 },
  ];

  const pmRoutine = [
    { id: 5, name: 'Gentle Cleanser', brand: 'CeraVe', category: 'Cleanser', time: '30 sec', order: 1 },
    { id: 6, name: 'Niacinamide Serum', brand: 'The Ordinary', category: 'Serum', time: '1 min', order: 2 },
    { id: 7, name: 'Retinol Treatment', brand: 'The Ordinary', category: 'Treatment', time: '2 min', order: 3 },
    { id: 8, name: 'Moisturizing Cream', brand: 'CeraVe', category: 'Moisturizer', time: '30 sec', order: 4 },
  ];

  const currentRoutine = activeTime === 'AM' ? amRoutine : pmRoutine;

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/" className="p-2 hover:bg-white/20 rounded-full transition-all">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">My Routines</h1>
        </div>
        <p className="text-pink-100">Build your perfect skincare routine</p>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Time Selector */}
        <div className="bg-white rounded-2xl p-2 shadow-sm flex gap-2">
          <button
            onClick={() => setActiveTime('AM')}
            className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              activeTime === 'AM'
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Sun className="w-5 h-5" />
            Morning
          </button>
          <button
            onClick={() => setActiveTime('PM')}
            className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              activeTime === 'PM'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Moon className="w-5 h-5" />
            Evening
          </button>
        </div>

        {/* Routine Steps */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-600">Total time: ~4 minutes</span>
            </div>
            <button className="text-purple-500 text-sm font-medium hover:text-purple-600">
              Edit Order
            </button>
          </div>

          <div className="space-y-3">
            {currentRoutine.map((step, index) => (
              <div key={step.id} className="relative">
                {index < currentRoutine.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 to-transparent"></div>
                )}
                <div className="flex gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-all">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      {step.order}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{step.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{step.brand}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="bg-white px-2 py-1 rounded-full">{step.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {step.time}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 self-center" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-purple-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">AI Suggestions</h3>
              <p className="text-sm text-gray-700 mb-3">
                Based on your skin analysis, consider adding these products:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Hyaluronic Acid for extra hydration</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Salicylic Acid for pore refinement</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-white text-purple-500 py-3 rounded-xl font-medium border-2 border-purple-500 hover:bg-purple-50 transition-all">
            View Recommended Products
          </button>
        </div>

        {/* Add Product Button */}
        <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Add Product to Routine
        </button>

        {/* Reminder Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Routine Reminders</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Morning Reminder</p>
                <p className="text-sm text-gray-600">8:00 AM</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Evening Reminder</p>
                <p className="text-sm text-gray-600">9:00 PM</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
