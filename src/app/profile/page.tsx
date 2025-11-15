'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Crown, Check, Sparkles, Camera, Calendar, Scan, TrendingUp, Shield, Bell, LogOut, ChevronRight } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [userTier, setUserTier] = useState<'free' | 'premium'>('free');
  const [showPricing, setShowPricing] = useState(false);

  const handleSignOut = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('hasCompletedOnboarding');
    localStorage.removeItem('userEmail');
    
    // Redirect to login page
    router.push('/login');
  };

  const handleNotifications = () => {
    // Navigate to notifications settings
    alert('Notifications settings - Coming soon!');
  };

  const handlePrivacySecurity = () => {
    // Navigate to privacy & security settings
    alert('Privacy & Security settings - Coming soon!');
  };

  const handleAboutVelvi = () => {
    // Navigate to about page
    alert('About Velvi - Version 1.0.0\n\nYour AI-powered skincare companion designed to help you achieve your best skin through personalized insights and recommendations.');
  };

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
    <div className="min-h-screen pb-24 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#e8dff5] to-[#f5f0fa] px-6 pt-16 pb-8 rounded-b-[2.5rem]">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="bg-white/60 backdrop-blur-sm p-2.5 rounded-full hover:bg-white/80 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-3xl font-light tracking-tight text-gray-800">Profile</h1>
        </div>

        {/* User Info */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-[#d4c5e8] to-[#b8a4d9] rounded-full flex items-center justify-center text-white text-2xl font-light shadow-sm">
              JD
            </div>
            <div>
              <h2 className="text-xl font-light text-gray-800 mb-1">Jane Doe</h2>
              <p className="text-gray-600 text-sm font-light">jane.doe@example.com</p>
              <div className="flex items-center gap-2 mt-2">
                {userTier === 'premium' ? (
                  <span className="bg-[#f4c790] text-[#8b6914] px-3 py-1 rounded-full text-xs font-light flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Premium
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-light">
                    Free Plan
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-8 space-y-6">
        {/* Membership Section */}
        {userTier === 'free' ? (
          <div className="bg-gradient-to-br from-[#f4c790] to-[#f4a261] rounded-3xl p-6 text-white shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <Crown className="w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-light mb-2">Unlock Premium Features</h3>
                <p className="text-white/90 text-sm mb-4 font-light">
                  Get unlimited scans, daily journaling, and AI-powered insights
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPricing(!showPricing)}
              className="w-full bg-white text-[#f4a261] py-3.5 rounded-2xl font-light hover:shadow-md transition-all"
            >
              View Premium Plans
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-[#f4c790] to-[#f4a261] rounded-3xl p-6 text-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Crown className="w-6 h-6" />
                <h3 className="text-lg font-light">Premium Active</h3>
              </div>
              <span className="text-sm text-white/80 font-light">Renews Feb 15, 2024</span>
            </div>
            <p className="text-white/90 text-sm mb-4 font-light">
              You're enjoying all premium features!
            </p>
            <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3.5 rounded-2xl font-light hover:bg-white/30 transition-all">
              Manage Subscription
            </button>
          </div>
        )}

        {/* Pricing Plans (Conditional) */}
        {showPricing && userTier === 'free' && (
          <div className="space-y-4">
            <h3 className="text-xl font-light text-gray-800">Choose Your Plan</h3>
            {pricingPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-3xl p-6 shadow-sm border-2 border-[#d4c5e8] hover:border-[#b8a4d9] transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-light text-gray-800">{plan.name}</h4>
                    {plan.badge && (
                      <span className="inline-block mt-1 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-light">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-light text-gray-800">${plan.price}</p>
                    <p className="text-sm text-gray-600 font-light">/{plan.period}</p>
                    {plan.pricePerMonth && (
                      <p className="text-xs text-[#b8a4d9] font-light mt-1">
                        ${plan.pricePerMonth}/month
                      </p>
                    )}
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-[#b8a4d9] to-[#9b87c6] text-white py-3.5 rounded-2xl font-light hover:shadow-md transition-all">
                  Subscribe Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Features Comparison */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-light text-gray-800 mb-5">
            {userTier === 'premium' ? 'Your Premium Features' : 'Your Current Plan'}
          </h3>
          <div className="space-y-3">
            {(userTier === 'premium' ? premiumFeatures : freeFeatures).map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-br from-gray-50/80 to-gray-100/50 rounded-2xl border border-gray-100/50">
                <div className="w-10 h-10 bg-[#e8dff5] rounded-full flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-[#b8a4d9]" />
                </div>
                <span className="flex-1 text-gray-700 font-light">{feature.label}</span>
                <Check className="w-5 h-5 text-green-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-3xl shadow-sm divide-y divide-gray-100 border border-gray-100">
          <button 
            onClick={handleNotifications}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-light">Notifications</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button 
            onClick={handlePrivacySecurity}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-light">Privacy & Security</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button 
            onClick={handleAboutVelvi}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-light">About Velvi</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Logout */}
        <button 
          onClick={handleSignOut}
          className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-light hover:bg-red-100 transition-all flex items-center justify-center gap-2 border border-red-100"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>

        {/* App Info */}
        <div className="text-center text-sm text-gray-500 pb-4 font-light">
          <p>Velvi v1.0.0</p>
          <p className="mt-1">Your AI-powered skincare companion</p>
        </div>
      </div>
    </div>
  );
}
