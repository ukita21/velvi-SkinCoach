'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Camera, ArrowLeft, Sparkles, AlertCircle, TrendingUp, TrendingDown, Minus, X, Check, RotateCcw } from 'lucide-react';

export default function ScanPage() {
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Unable to access camera. Please grant camera permissions and try again.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setError(null);
    setScanComplete(false);
    setAnalysisData(null);
    startCamera();
  };

  const confirmPhoto = async () => {
    if (!capturedImage) return;
    
    setScanning(true);
    setError(null);

    try {
      // Step 1: Check if image contains a face
      const faceCheckResponse = await fetch('/api/check-face', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: capturedImage })
      });

      const faceCheckData = await faceCheckResponse.json();

      if (!faceCheckData.isFace) {
        setScanning(false);
        setError('No face detected in the image. Please retake the photo with your face clearly visible.');
        return;
      }

      // Step 2: Analyze skin with ChatGPT
      const analysisResponse = await fetch('/api/analyze-skin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: capturedImage })
      });

      const analysisResult = await analysisResponse.json();

      if (analysisResult.error) {
        throw new Error(analysisResult.error);
      }

      setAnalysisData(analysisResult);
      setScanning(false);
      setScanComplete(true);
    } catch (err) {
      console.error('Analysis error:', err);
      setScanning(false);
      setError('Failed to analyze image. Please try again.');
    }
  };

  const cancelPhoto = () => {
    setCapturedImage(null);
    setError(null);
  };

  return (
    <div className="min-h-screen pb-24 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#e8dff5] to-[#f5f0fa] px-6 pt-16 pb-10 rounded-b-[2.5rem]">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/" className="bg-white/60 backdrop-blur-sm p-2.5 rounded-full hover:bg-white/80 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-3xl font-light tracking-tight text-gray-800">AI Skin Scan</h1>
        </div>
        <p className="text-gray-600 font-light ml-14">Take a selfie for instant analysis</p>
      </div>

      <div className="px-6 mt-8 space-y-6">
        {!scanComplete ? (
          <>
            {/* Camera/Upload Area */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="text-center">
                {!cameraActive && !capturedImage && !scanning ? (
                  <>
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#e8dff5] to-[#f5f0fa] rounded-full flex items-center justify-center shadow-sm">
                      <Camera className="w-14 h-14 text-[#b8a4d9]" />
                    </div>
                    <h2 className="text-2xl font-light text-gray-800 mb-2">Take Your Selfie</h2>
                    <p className="text-gray-600 font-light mb-8">Make sure your face is well-lit and centered</p>
                    
                    <button
                      onClick={startCamera}
                      className="bg-gradient-to-r from-[#b8a4d9] to-[#9b87c6] text-white py-4 px-8 rounded-2xl font-light hover:shadow-md transition-all inline-flex items-center gap-2"
                    >
                      <Camera className="w-5 h-5" />
                      Open Camera
                    </button>
                  </>
                ) : cameraActive ? (
                  <>
                    <div className="relative w-full max-w-md mx-auto">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-3xl shadow-lg border border-gray-200"
                      />
                      <div className="absolute inset-0 border-4 border-[#b8a4d9]/30 rounded-3xl pointer-events-none"></div>
                    </div>
                    <div className="flex gap-3 justify-center mt-6">
                      <button
                        onClick={stopCamera}
                        className="bg-gray-100 text-gray-700 py-3 px-6 rounded-2xl font-light hover:bg-gray-200 transition-all inline-flex items-center gap-2"
                      >
                        <X className="w-5 h-5" />
                        Cancel
                      </button>
                      <button
                        onClick={capturePhoto}
                        className="bg-gradient-to-r from-[#b8a4d9] to-[#9b87c6] text-white py-3 px-8 rounded-2xl font-light hover:shadow-md transition-all inline-flex items-center gap-2"
                      >
                        <Camera className="w-5 h-5" />
                        Capture
                      </button>
                    </div>
                  </>
                ) : capturedImage && !scanning ? (
                  <>
                    <img src={capturedImage} alt="Captured" className="w-full max-w-md mx-auto rounded-3xl shadow-lg border border-gray-200 mb-6" />
                    <h2 className="text-2xl font-light text-gray-800 mb-2">Confirm Your Photo</h2>
                    <p className="text-gray-600 font-light mb-6">Is this photo clear and well-lit?</p>
                    
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={retakePhoto}
                        className="bg-gray-100 text-gray-700 py-3 px-6 rounded-2xl font-light hover:bg-gray-200 transition-all inline-flex items-center gap-2"
                      >
                        <RotateCcw className="w-5 h-5" />
                        Retake
                      </button>
                      <button
                        onClick={confirmPhoto}
                        className="bg-gradient-to-r from-[#b8a4d9] to-[#9b87c6] text-white py-3 px-8 rounded-2xl font-light hover:shadow-md transition-all inline-flex items-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        Confirm & Analyze
                      </button>
                    </div>
                  </>
                ) : scanning ? (
                  <>
                    <img src={capturedImage!} alt="Analyzing" className="w-48 h-48 mx-auto rounded-3xl object-cover mb-6 shadow-sm border border-gray-100" />
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Sparkles className="w-6 h-6 text-[#b8a4d9] animate-pulse" />
                      <h2 className="text-2xl font-light text-gray-800">Analyzing Your Skin...</h2>
                    </div>
                    <div className="w-full max-w-md mx-auto bg-gray-100 rounded-full h-1.5 mb-4">
                      <div className="bg-gradient-to-r from-[#b8a4d9] to-[#9b87c6] h-1.5 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                    </div>
                    <p className="text-gray-600 font-light">This will take just a moment</p>
                  </>
                ) : null}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-3xl p-5">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-light text-red-800 mb-1">Error</h3>
                    <p className="text-sm text-red-600 font-light">{error}</p>
                    <button
                      onClick={retakePhoto}
                      className="mt-3 bg-red-500 text-white py-2 px-4 rounded-xl text-sm font-light hover:bg-red-600 transition-all"
                    >
                      Retake Photo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tips */}
            {!cameraActive && !capturedImage && (
              <div className="bg-[#e8f4f8]/50 border border-[#b8d8e8]/30 rounded-3xl p-5">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-[#7eb8da] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-light text-gray-800 mb-2">Tips for Best Results</h3>
                    <ul className="text-sm text-gray-600 space-y-1 font-light">
                      <li>• Use natural lighting</li>
                      <li>• Remove makeup if possible</li>
                      <li>• Face the camera directly</li>
                      <li>• Keep a neutral expression</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Analysis Results */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <img src={capturedImage!} alt="Scan" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-light text-gray-800 mb-1">Analysis Complete!</h2>
                  <p className="text-gray-600 font-light">Your skin analysis is ready</p>
                </div>
              </div>

              {/* AI Analysis */}
              {analysisData && (
                <div className="space-y-4">
                  {/* Good Points */}
                  {analysisData.goodPoints && analysisData.goodPoints.length > 0 && (
                    <div className="bg-green-50/50 border border-green-100 rounded-2xl p-4">
                      <h3 className="text-lg font-light text-gray-800 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        What's Good
                      </h3>
                      <ul className="space-y-2">
                        {analysisData.goodPoints.map((point: string, index: number) => (
                          <li key={index} className="text-gray-700 font-light flex gap-2">
                            <span className="text-green-600">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Areas for Improvement */}
                  {analysisData.concerns && analysisData.concerns.length > 0 && (
                    <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4">
                      <h3 className="text-lg font-light text-gray-800 mb-3 flex items-center gap-2">
                        <TrendingDown className="w-5 h-5 text-orange-600" />
                        Areas to Improve
                      </h3>
                      <ul className="space-y-2">
                        {analysisData.concerns.map((concern: string, index: number) => (
                          <li key={index} className="text-gray-700 font-light flex gap-2">
                            <span className="text-orange-600">•</span>
                            <span>{concern}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Overall Assessment */}
                  {analysisData.overallAssessment && (
                    <div className="bg-[#f5f0fa]/50 border border-[#e8dff5] rounded-2xl p-4">
                      <h3 className="text-lg font-light text-gray-800 mb-2">Overall Assessment</h3>
                      <p className="text-gray-700 font-light">{analysisData.overallAssessment}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Recommendations */}
            {analysisData && analysisData.recommendations && analysisData.recommendations.length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-light text-gray-800 mb-4">AI Recommendations</h3>
                <div className="space-y-3">
                  {analysisData.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex gap-3 p-4 bg-[#f5f0fa]/50 rounded-2xl border border-[#e8dff5]/50">
                      <Sparkles className="w-5 h-5 text-[#b8a4d9] flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 font-light">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <Link href="/routine" className="block w-full bg-gradient-to-r from-[#b8a4d9] to-[#9b87c6] text-white py-4 rounded-2xl font-light text-center hover:shadow-md transition-all">
                View Recommended Products
              </Link>
              <button
                onClick={() => {
                  setCapturedImage(null);
                  setScanComplete(false);
                  setAnalysisData(null);
                  setError(null);
                }}
                className="block w-full bg-white text-[#b8a4d9] py-4 rounded-2xl font-light text-center border border-[#b8a4d9] hover:bg-[#f5f0fa] transition-all"
              >
                Take Another Scan
              </button>
            </div>
          </>
        )}
      </div>

      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
