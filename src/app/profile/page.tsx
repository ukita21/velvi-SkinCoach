'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Crown, Check, Sparkles, Camera, Calendar, Scan, TrendingUp, Shield, Bell, LogOut, ChevronRight } from 'lucide-react';

export default function ProfilePage() {
  const [userTier, setUserTier] = useState<'free' | 'premium'>('free');
  const [showPricing, setShowPricing] = useState(false);

  const freeFeatures = [
    { icon: Camera, label: '3 AI scans per month', available: true },
    { icon: Calendar, label: 'Weekly journal entries', available: true },
    { icon: Scan, label: '5 product scans per day', available: true },
    { icon: TrendingUp, label: 'Basic skin insights', available: true },
  ];

  const premiumFeatures = [
    { icon: Camera, label: 'Unlimited AI scans', available: true },
    { icon: Calendar, label: 'Daily journal entries', available: true },
    { icon: Scan, label: 'Unlimited product scanning', available: true },
    { icon: TrendingUp, label: 'Deep AI insights & coaching', available: true },
    { icon: Sparkles, label: 'Climate-based recommendations', available: true },
    { icon: Shield, label: 'Ad-free experience', available: true },
  ];

  const pricingPlans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: 7.99,
      period: 'month',
      badge: null,
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: 59.99,
      period: 'year',
      badge: 'Save 37%',
      pricePerMonth: 4.99,
    },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 pt-12 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="p-2 hover:bg-white/20 rounded-full transition-all">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>

        {/* User Info */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Jane Doe</h2>
              <p className="text-pink-100 text-sm">jane.doe@example.com</p>
              <div className="flex items-center gap-2 mt-2">
                {userTier === 'premium' ? (
                  <span className="bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Premium
                  </span>
                ) : (
                  <span className="bg-white/30 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Free Plan
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Membership Section */}
        {userTier === 'free' ? (
          <div className="bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              <Crown className="w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Unlock Premium Features</h3>
                <p className="text-amber-50 text-sm mb-4">
                  Get unlimited scans, daily journaling, and AI-powered insights
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPricing(!showPricing)}
              className="w-full bg-white text-orange-500 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              View Premium Plans
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Crown className="w-6 h-6" />
                <h3 className="text-lg font-bold">Premium Active</h3>
              </div>
              <span className="text-sm text-amber-100">Renews Feb 15, 2024</span>
            </div>
            <p className="text-amber-50 text-sm mb-4">
              You're enjoying all premium features!
            </p>
            <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 rounded-xl font-medium hover:bg-white/30 transition-all">
              Manage Subscription
            </button>
          </div>
        )}

        {/* Pricing Plans (Conditional) */}
        {showPricing && userTier === 'free' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Choose Your Plan</h3>
            {pricingPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-200 hover:border-purple-400 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{plan.name}</h4>
                    {plan.badge && (
                      <span className="inline-block mt-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-900">${plan.price}</p>
                    <p className="text-sm text-gray-600">/{plan.period}</p>
                    {plan.pricePerMonth && (
                      <p className="text-xs text-purple-600 font-medium mt-1">
                        ${plan.pricePerMonth}/month
                      </p>
                    )}
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                  Subscribe Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {userTier === 'premium' ? 'Your Premium Features' : 'Your Current Plan'}
          </h3>
          <div className="space-y-3">
            {(userTier === 'premium' ? premiumFeatures : freeFeatures).map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-purple-500" />
                </div>
                <span className="flex-1 text-gray-700">{feature.label}</span>
                <Check className="w-5 h-5 text-green-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900 font-medium">Notifications</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900 font-medium">Privacy & Security</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900 font-medium">About Velvi</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Logout */}
        <button className="w-full bg-red-50 text-red-600 py-4 rounded-xl font-medium hover:bg-red-100 transition-all flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>

        {/* App Info */}
        <div className="text-center text-sm text-gray-500 pb-4">
          <p>Velvi v1.0.0</p>
          <p className="mt-1">Your AI-powered skincare companion</p>
        </div>
      </div>
    </div>
  );
}
