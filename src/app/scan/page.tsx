'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Camera, Upload, ArrowLeft, Sparkles, AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function ScanPage() {
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        simulateScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  const analysisResults = [
    { label: 'Acne', score: 72, trend: 'up', color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Texture', score: 68, trend: 'up', color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Redness', score: 55, trend: 'down', color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Pigmentation', score: 78, trend: 'up', color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Pores', score: 65, trend: 'same', color: 'text-gray-500', bg: 'bg-gray-50' },
    { label: 'Hydration', score: 82, trend: 'up', color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Oiliness', score: 60, trend: 'same', color: 'text-gray-500', bg: 'bg-gray-50' },
    { label: 'Fine Lines', score: 70, trend: 'up', color: 'text-green-500', bg: 'bg-green-50' },
  ];

  const recommendations = [
    'Use a gentle cleanser twice daily',
    'Apply niacinamide serum for redness',
    'Add vitamin C for pigmentation',
    'Use SPF 50 sunscreen every morning',
    'Consider retinol for texture improvement'
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/" className="p-2 hover:bg-white/20 rounded-full transition-all">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">AI Skin Scan</h1>
        </div>
        <p className="text-pink-100">Take a selfie for instant analysis</p>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {!scanComplete ? (
          <>
            {/* Upload Area */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-center">
                {!imagePreview ? (
                  <>
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                      <Camera className="w-16 h-16 text-purple-500" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Take Your Selfie</h2>
                    <p className="text-gray-600 mb-6">Make sure your face is well-lit and centered</p>
                    
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        capture="user"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-8 rounded-xl font-medium cursor-pointer hover:shadow-lg transition-all inline-flex items-center gap-2">
                        <Camera className="w-5 h-5" />
                        Take Photo
                      </div>
                    </label>

                    <div className="mt-4">
                      <label className="block">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <div className="text-purple-500 py-3 px-6 rounded-xl font-medium cursor-pointer hover:bg-purple-50 transition-all inline-flex items-center gap-2">
                          <Upload className="w-5 h-5" />
                          Upload from Gallery
                        </div>
                      </label>
                    </div>
                  </>
                ) : scanning ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-48 h-48 mx-auto rounded-2xl object-cover mb-6" />
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
                      <h2 className="text-xl font-bold text-gray-900">Analyzing Your Skin...</h2>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                    </div>
                    <p className="text-gray-600">This will take just a moment</p>
                  </>
                ) : null}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-1">Tips for Best Results</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Use natural lighting</li>
                    <li>• Remove makeup if possible</li>
                    <li>• Face the camera directly</li>
                    <li>• Keep a neutral expression</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Analysis Results */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-24 h-24 rounded-xl overflow-hidden">
                  <img src={imagePreview!} alt="Scan" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Analysis Complete!</h2>
                  <p className="text-gray-600">Your skin score: <span className="font-bold text-purple-500">72/100</span></p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {analysisResults.map((result, index) => (
                  <div key={index} className={`${result.bg} rounded-xl p-4`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{result.label}</span>
                      {result.trend === 'up' && <TrendingUp className={`w-4 h-4 ${result.color}`} />}
                      {result.trend === 'down' && <TrendingDown className={`w-4 h-4 ${result.color}`} />}
                      {result.trend === 'same' && <Minus className={`w-4 h-4 ${result.color}`} />}
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{result.score}</p>
                    <div className="w-full bg-white rounded-full h-1.5 mt-2">
                      <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-1.5 rounded-full" style={{ width: `${result.score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-purple-50 rounded-xl">
                    <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link href="/routine" className="block w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-medium text-center hover:shadow-lg transition-all">
                View Recommended Products
              </Link>
              <Link href="/journal" className="block w-full bg-white text-purple-500 py-4 rounded-xl font-medium text-center border-2 border-purple-500 hover:bg-purple-50 transition-all">
                Save to Journal
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
