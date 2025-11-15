'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Apple, Chrome, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // Simulate Google OAuth flow
    setTimeout(() => {
      localStorage.setItem('userAuthenticated', 'true');
      localStorage.setItem('authProvider', 'google');
      router.push('/onboarding');
    }, 1500);
  };

  const handleAppleLogin = async () => {
    setIsLoading(true);
    // Simulate Apple OAuth flow
    setTimeout(() => {
      localStorage.setItem('userAuthenticated', 'true');
      localStorage.setItem('authProvider', 'apple');
      router.push('/onboarding');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* Logo & Branding */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#b8a4d9] to-[#9b87c6] rounded-3xl mb-6 shadow-lg">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-light tracking-tight text-gray-800 mb-3">Welcome to Velvi</h1>
        <p className="text-gray-600 font-light max-w-sm mx-auto">
          Your AI-powered skincare companion for personalized routines and insights
        </p>
      </div>

      {/* Login Options */}
      <div className="w-full max-w-sm space-y-4">
        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full bg-white border-2 border-gray-200 hover:border-[#b8a4d9] rounded-2xl p-5 flex items-center justify-center gap-3 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <Chrome className="w-6 h-6 text-gray-700 group-hover:text-[#b8a4d9] transition-colors" />
          <span className="font-light text-gray-800">Continue with Google</span>
        </button>

        {/* Apple Login */}
        <button
          onClick={handleAppleLogin}
          disabled={isLoading}
          className="w-full bg-black hover:bg-gray-900 rounded-2xl p-5 flex items-center justify-center gap-3 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Apple className="w-6 h-6 text-white" />
          <span className="font-light text-white">Continue with Apple</span>
        </button>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center pt-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#b8a4d9] border-t-transparent"></div>
            <p className="text-sm text-gray-500 font-light mt-3">Signing you in...</p>
          </div>
        )}
      </div>

      {/* Terms & Privacy */}
      <div className="mt-12 text-center max-w-md">
        <p className="text-xs text-gray-500 font-light leading-relaxed">
          By continuing, you agree to Velvi's{' '}
          <a href="#" className="text-[#b8a4d9] hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-[#b8a4d9] hover:underline">Privacy Policy</a>
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-[#e8dff5] to-transparent rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-[#f5f0fa] to-transparent rounded-full blur-3xl opacity-50"></div>
    </div>
  );
}
