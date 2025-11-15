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
    <div className="min-h-screen pb-24 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#e8dff5] to-[#f5f0fa] px-6 pt-16 pb-10 rounded-b-[2.5rem]">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/" className="bg-white/60 backdrop-blur-sm p-2.5 rounded-full hover:bg-white/80 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-3xl font-light tracking-tight text-gray-800">My Routines</h1>
        </div>
        <p className="text-gray-600 font-light ml-14">Build your perfect skincare routine</p>
      </div>

      <div className="px-6 mt-8 space-y-6">
        {/* Time Selector */}
        <div className="bg-white rounded-3xl p-2 shadow-sm flex gap-2 border border-gray-100">
          <button
            onClick={() => setActiveTime('AM')}
            className={`flex-1 py-3.5 rounded-2xl font-light transition-all flex items-center justify-center gap-2 ${
              activeTime === 'AM'
                ? 'bg-gradient-to-r from-[#f4c790] to-[#f4a261] text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Sun className="w-5 h-5" />
            Morning
          </button>
          <button
            onClick={() => setActiveTime('PM')}
            className={`flex-1 py-3.5 rounded-2xl font-light transition-all flex items-center justify-center gap-2 ${
              activeTime === 'PM'
                ? 'bg-gradient-to-r from-[#9b87c6] to-[#7a6ba0] text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Moon className="w-5 h-5" />
            Evening
          </button>
        </div>

        {/* Routine Steps */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#b8a4d9]" />
              <span className="text-sm text-gray-600 font-light">Total time: ~4 minutes</span>
            </div>
            <button className="text-[#b8a4d9] text-sm font-light hover:text-[#9b87c6]">
              Edit Order
            </button>
          </div>

          <div className="space-y-3">
            {currentRoutine.map((step, index) => (
              <div key={step.id} className="relative">
                {index < currentRoutine.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-[#e8dff5] to-transparent"></div>
                )}
                <div className="flex gap-4 p-4 bg-gradient-to-br from-[#f5f0fa]/50 to-[#e8dff5]/30 rounded-2xl hover:shadow-sm transition-all border border-gray-100/50">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#b8a4d9] to-[#9b87c6] rounded-full flex items-center justify-center text-white font-light shadow-sm">
                      {step.order}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-light text-gray-800 mb-1 text-lg">{step.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 font-light">{step.brand}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 font-light">
                      <span className="bg-white px-3 py-1 rounded-full border border-gray-100">{step.category}</span>
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
        <div className="bg-gradient-to-br from-[#e8dff5]/50 to-[#f5f0fa]/50 border border-[#d4c5e8]/30 rounded-3xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-[#b8a4d9] flex-shrink-0" />
            <div>
              <h3 className="font-light text-gray-800 mb-2 text-lg">AI Suggestions</h3>
              <p className="text-sm text-gray-700 mb-3 font-light">
                Based on your skin analysis, consider adding these products:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700 font-light">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Hyaluronic Acid for extra hydration</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-light">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Salicylic Acid for pore refinement</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-white text-[#b8a4d9] py-3.5 rounded-2xl font-light border border-[#b8a4d9] hover:bg-[#f5f0fa] transition-all">
            View Recommended Products
          </button>
        </div>

        {/* Add Product Button */}
        <button className="w-full bg-gradient-to-r from-[#b8a4d9] to-[#9b87c6] text-white py-4 rounded-2xl font-light hover:shadow-md transition-all flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Add Product to Routine
        </button>

        {/* Reminder Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-light text-gray-800 mb-5 text-lg">Routine Reminders</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-light text-gray-800">Morning Reminder</p>
                <p className="text-sm text-gray-600 font-light">8:00 AM</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#e8dff5] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b8a4d9]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-light text-gray-800">Evening Reminder</p>
                <p className="text-sm text-gray-600 font-light">9:00 PM</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#e8dff5] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b8a4d9]"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
