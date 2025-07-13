 import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Camera, Zap } from 'lucide-react';
 
 interface DemoWidgetProps {
  onClose: () => void;
  isModal?: boolean;
 }
 
 const DemoWidget = ({ onClose, isModal = true }: DemoWidgetProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFactor, setSelectedFactor] = useState<string | null>(null);
  const [showRegionData, setShowRegionData] = useState(false);
 
  // Camera modal state
  const [cameraOpen, setCameraOpen] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [flashOn, setFlashOn] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
 
  const [playSound, setPlaySound] = useState(false);
  const popSound = useRef<HTMLAudioElement>(new Audio('/pop.mp3')); // Ensure pop.mp3 is in public directory
 
  useEffect(() => {
  if (playSound) {
  popSound.current.play().catch(error => console.error("Failed to play pop sound:", error));
  setPlaySound(false); // Reset the state
  }
  }, [playSound]);
 
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
  const reader = new FileReader();
  reader.onload = (e) => {
  setSelectedImage(e.target?.result as string);
  setAnalysisResults(null);
  setSelectedFactor(null);
  setShowRegionData(false);
  };
  reader.readAsDataURL(file);
  }
  };
 
  const runAnalysis = () => {
  setIsAnalyzing(true);
  // Simulate AI analysis
  setTimeout(() => {
  const dummyResults = {
    overallScore: 7.3,
    factors: {
      "Dark Circles": 6.5,
      "Dark Spots": 7.5,
      "Dryness": 4.0,
      "Glow Index": 8.0,
      "Oiliness": 5.0,
      "Wrinkles": 5.5,
    },
    regionData: {
      "Dark Circles": {
        "Forehead": 5.0,
        "Left Eye": 8.5,
        "Right Eye": 9.0,
        "Left Under Eye": 8.8,
        "Right Under Eye": 9.2,
        "Nose": 4.0,
        "Left Cheek": 6.0,
        "Right Cheek": 6.5,
        "Chin": 5.5,
      },
      "Dark Spots": {
        "Forehead": 7.0,
        "Left Eye": 6.0,
        "Right Eye": 5.5,
        "Left Under Eye": 6.2,
        "Right Under Eye": 5.8,
        "Nose": 8.0,
        "Left Cheek": 8.5,
        "Right Cheek": 7.5,
        "Chin": 6.5,
      },
      "Dryness": {
        "Forehead": 3.0,
        "Left Eye": 4.0,
        "Right Eye": 3.5,
        "Left Under Eye": 4.2,
        "Right Under Eye": 3.8,
        "Nose": 2.0,
        "Left Cheek": 4.5,
        "Right Cheek": 5.0,
        "Chin": 6.0,
      },
      "Glow Index": {
        "Forehead": 7.5,
        "Left Eye": 8.0,
        "Right Eye": 8.5,
        "Left Under Eye": 8.3,
        "Right Under Eye": 8.7,
        "Nose": 7.0,
        "Left Cheek": 9.0,
        "Right Cheek": 8.8,
        "Chin": 7.8,
      },
      "Oiliness": {
        "Forehead": 6.0,
        "Left Eye": 4.0,
        "Right Eye": 3.5,
        "Left Under Eye": 4.3,
        "Right Under Eye": 3.9,
        "Nose": 7.0,
        "Left Cheek": 5.0,
        "Right Cheek": 4.5,
        "Chin": 6.5,
      },
      "Wrinkles": {
        "Forehead": 6.5,
        "Left Eye": 5.0,
        "Right Eye": 4.5,
        "Left Under Eye": 5.2,
        "Right Under Eye": 4.8,
        "Nose": 3.0,
        "Left Cheek": 6.0,
        "Right Cheek": 5.5,
        "Chin": 8.0,
      }
    },
    issues: [
      { type: 'Dark Spots', severity: 6.5, count: 1.2, revenue: '$240' },
      { type: 'Fine Lines', severity: 4.5, count: 0.8, revenue: '$180' },
      { type: 'Pore Size', severity: 8.0, count: 2.5, revenue: '$320' },
      { type: 'Dryness', severity: 5.5, count: 0.1, revenue: '$150' }
    ],
    recommendations: [
      'HydraFacial Treatment - $180',
      'Microdermabrasion Session - $120',
      'Vitamin C Serum Application - $45',
      'LED Light Therapy - $90'
    ],
    potentialRevenue: '$890'
  };
  setAnalysisResults(dummyResults);
  setIsAnalyzing(false);
  setPlaySound(true); // Play the sound
  setSelectedFactor(null);
  setShowRegionData(false);
  }, 3000);
  };
 
  const handleFactorClick = (factor: string) => {
  setSelectedFactor(factor);
  setShowRegionData(true);
  };
 
  const handleBackClick = () => {
  setSelectedFactor(null);
  setShowRegionData(false);
  };
 
  const faceRegions = [
  "Forehead",
  "Left Eye",
  "Left Under Eye",
  "Right Under Eye",
  "Right Eye",
  "Nose",
  "Left Cheek",
  "Right Cheek",
  "Chin",
  ];
 
  // Open camera with selected facing mode
  const openCamera = async () => {
  setCameraError(null);
  if (stream) {
  stream.getTracks().forEach((t) => t.stop());
  setStream(null);
  }
  try {
  const constraints: MediaStreamConstraints = {
  video: {
  facingMode,
  width: { ideal: 1280 },
  height: { ideal: 720 },
  },
  audio: false,
  };
  const s = await navigator.mediaDevices.getUserMedia(constraints);
  setStream(s);
  setCameraOpen(true);
  setTimeout(() => {
  if (videoRef.current) videoRef.current.srcObject = s;
  }, 100);
  } catch (e) {
  setCameraError('Could not access camera.');
  }
  };
 
  // Close camera and stop stream
  const closeCamera = () => {
  if (stream) stream.getTracks().forEach((t) => t.stop());
  setStream(null);
  setCameraOpen(false);
  setCameraError(null);
  };
 
  // Switch camera (front/back)
  const handleSwitchCamera = () => {
  setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  setTimeout(openCamera, 200);
  };
 
  // Toggle flash (if supported)
  const handleToggleFlash = async () => {
    if (!stream) return;
    try {
      const videoTrack = stream.getVideoTracks()[0];
      const capabilities = videoTrack.getCapabilities?.();
      if (capabilities && 'torch' in capabilities) {
        await videoTrack.applyConstraints({ 
          advanced: [{ torch: !flashOn } as any] 
        });
        setFlashOn((f) => !f);
      }
    } catch (error) {
      console.log('Flash not supported on this device');
    }
  };
 
  // Capture photo from video
  const handleCapturePhoto = () => {
  if (!videoRef.current || !canvasRef.current) return;
  const video = videoRef.current;
  const canvas = canvasRef.current;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/jpeg');
  setSelectedImage(dataUrl);
  setAnalysisResults(null);
  closeCamera();
  };
 
  // When facingMode changes and camera is open, re-open camera
  React.useEffect(() => {
  if (cameraOpen) openCamera();
  // eslint-disable-next-line
  }, [facingMode]);
 
  React.useEffect(() => {
  return () => {
  if (stream) stream.getTracks().forEach((t) => t.stop());
  };
  }, [stream]);
 
  const containerClass = isModal
  ? "fixed inset-0 bg-black/80 mt-20 flex items-center justify-center z-50 p-4"
  : "w-full max-w-6xl mt-20 mx-auto";
 
  const contentClass = isModal
  ? "bg-navy-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
  : "bg-navy-900 rounded-2xl w-full";
 
  return (
  <div className={containerClass}>
  <div className={contentClass}>
  {isModal && (
  <div className="mt-10 p-6 border-b border-navy-800 flex justify-between items-center">
  <h2 className="text-2xl font-serif font-bold text-navy-50">
  AI Skin Analysis Demo
  </h2>
  <button
  onClick={onClose}
  className="p-2 hover:bg-navy-800 rounded-xl transition-colors"
  >
  <X className="h-6 w-6 text-navy-400" />
  </button>
  </div>
  )}
 
  <div className="p-4 sm:p-6">
  {!isModal && (
  <div className="text-center mb-8 sm:mb-12">
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6 text-navy-50 leading-tight">
  Experience Our
  <span className="gradient-text"> AI Analysis</span>
  </h2>
  <p className="text-lg sm:text-xl text-navy-300 max-w-3xl mx-auto px-4">
  Upload a photo and see how our AI identifies skin issues that drive additional revenue
  </p>
  </div>
  )}
 
  {/* Upload Section - now full width and on top */}
  <div className="glass-effect rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 w-full">
  <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-navy-50">
  Upload Client Photo
  </h3>
  <div className="border-2 border-dashed border-navy-600 rounded-xl p-4 sm:p-6 lg:p-8 text-center hover:border-coral-500 transition-colors">
  {selectedImage ? (
  <div className="space-y-4">
  <img
  src={selectedImage}
  alt="Selected"
  className="max-w-full h-48 sm:h-64 object-cover rounded-lg mx-auto"
  />
  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-center">
  <label className="btn-secondary cursor-pointer text-sm sm:text-base flex items-center">
    <Upload className="h-4 w-4 mr-2" />
    <span>Choose Another Photo</span>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="hidden"
    />
  </label>
  <button
  onClick={runAnalysis}
  disabled={isAnalyzing}
  className="btn-primary flex items-center justify-center space-x-2 text-sm sm:text-base"
  >
  {isAnalyzing ? (
  <>
  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
  <span>Analyzing...</span>
  </>
  ) : (
  <>
  <Zap className="h-4 w-4" />
  <span>Run AI Analysis</span>
  </>
  )}
  </button>
  </div>
  </div>
  ) : (
  <>
  <label className="cursor-pointer block">
  <Camera className="h-12 w-12 sm:h-16 sm:w-16 text-navy-400 mx-auto mb-3 sm:mb-4" />
  <div className="text-navy-200 font-medium mb-2 text-sm sm:text-base">
  Upload a photo to analyze
  </div>
  <div className="text-navy-400 text-xs sm:text-sm mb-3 sm:mb-4">
  JPG, PNG or GIF up to 10MB
  </div>
  <div className="btn-primary inline-flex items-center space-x-2 text-sm sm:text-base">
  <Upload className="h-4 w-4" />
  <span>Browse Photo</span>
  </div>
  <input
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
  className="hidden"
  />
  </label>
  <button
  type="button"
  className="btn-secondary flex items-center space-x-2 mt-3 sm:mt-4 mx-auto text-sm sm:text-base"
  onClick={openCamera}
  >
  <Camera className="h-4 w-4" />
  <span>Take Photo</span>
  </button>
  </>
  )}
  </div>
  </div>
 
  {/* Analysis Results or Sample Images */}
  {analysisResults && !showRegionData ? (
  <div className="space-y-4 sm:space-y-6 w-full mb-6 sm:mb-8">
  <div className="glass-effect rounded-2xl p-4 sm:p-6 lg:p-8">
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
  <h3 className="text-lg sm:text-xl font-semibold text-navy-50">
  Analysis Results
  </h3>
  <div className="text-left sm:text-right">
  <div className="text-xl sm:text-2xl font-bold text-coral-400">
  {analysisResults.overallScore}
  </div>
  <div className="text-navy-400 text-xs sm:text-sm">Skin Health Score</div>
  </div>
  </div>
  <div className="flex flex-wrap justify-center">
  {Object.entries(analysisResults.factors).map(([factor, score]: [string, any]) => (
  <div
  key={factor}
  className="m-2 cursor-pointer"
  onClick={() => handleFactorClick(factor)}
  >
    
  <div className="relative">
  <div className="w-24 h-24 rounded-full bg-navy-800 flex items-center justify-center">
  <span className="text-navy-50 text-sm font-bold">{factor}</span>
  </div>
  <div className="absolute top-1 right-1 bg-coral-500 text-white rounded-full px-2 py-1 text-xs">
  {score}
  </div>
  </div>
  
  </div>
  ))}
  </div>
  </div>
  <div className="mt-8">
          <h4 className="text-lg font-semibold text-navy-50 mb-2">Recommended Treatments</h4>
          <ul className="list-disc list-inside text-navy-200">
            {analysisResults.recommendations.map((rec: string, idx: number) => (
              <li key={idx} className="mb-1">{rec}</li>
            ))}
          </ul>
          <div className="mt-4 text-coral-400 font-bold">
            Potential Revenue: {analysisResults.potentialRevenue}
          </div>
        </div>
  </div>
  
  ) : analysisResults && showRegionData ? (
  <div className="space-y-4 sm:space-y-6 w-full mb-6 sm:mb-8">
  <div className="glass-effect rounded-2xl p-4 sm:p-6 lg:p-8">
  <button onClick={handleBackClick} className="btn-secondary mb-4">
    Back to Overview
  </button>
  <h3 className="text-lg sm:text-xl font-semibold text-navy-50 mb-4">
    {selectedFactor} Analysis by Face Region
  </h3>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {faceRegions.map(region => (
      <div key={region} className="flex flex-col items-center">
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-navy-800 via-navy-700 to-navy-900 shadow-lg flex flex-col items-center justify-center mb-2 border-4 border-coral-400/30">
          <h4 className="text-xs sm:text-sm text-navy-200 mb-1">{region}</h4>
          <p className="text-coral-400 font-bold text-lg sm:text-xl">
            {analysisResults.regionData[selectedFactor][region]}
          </p>
        </div>
      </div>
    ))}
  </div>
  </div>
  </div>
  ) : (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-8">
  <div className="glass-effect rounded-2xl p-6 flex flex-col justify-center">
  <h4 className="text-lg font-semibold mb-4 text-navy-50">
  Try Sample Images
  </h4>
  <div className="grid grid-cols-3 gap-4">
  {[1, 2, 3].map((i) => (
  <button
  key={i}
  onClick={() => setSelectedImage(`https://images.unsplash.com/photo-${1500000000000 + i}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`)}
  className="aspect-square bg-navy-800 rounded-lg hover:bg-navy-700 transition-colors flex items-center justify-center"
  >
  <span className="text-navy-400 text-sm">Sample {i}</span>
  </button>
  ))}
  </div>
  </div>
  <div className="glass-effect rounded-2xl p-8 text-center flex flex-col justify-center">
  <div className="text-navy-400 mb-4">
  <Zap className="h-16 w-16 mx-auto mb-4 opacity-50" />
  </div>
  <h3 className="text-xl font-semibold mb-2 text-navy-50">
  Ready for Analysis
  </h3>
  <p className="text-navy-400">
  Upload an image and click "Run AI Analysis" to see detailed skin assessment and revenue opportunities.
  </p>
  </div>
  </div>
  )}
 
  {/* Camera Modal */}
  {cameraOpen && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
  <div className="bg-navy-900 rounded-2xl w-full max-w-md p-6 relative">
  <button
  onClick={closeCamera}
  className="absolute top-4 right-4 p-2 hover:bg-navy-800 rounded-xl transition-colors z-10"
  >
  <X className="h-6 w-6 text-navy-400" />
  </button>
  <div className="flex flex-col items-center">
  <video
  ref={videoRef}
  autoPlay
  playsInline
  muted
  className="rounded-lg w-full max-h-80 bg-black"
  style={{ objectFit: 'cover' }}
  />
  <canvas ref={canvasRef} style={{ display: 'none' }} />
  {cameraError && <div className="text-red-500 mt-2">{cameraError}</div>}
  <div className="flex justify-center gap-4 mt-4">
  <button
  type="button"
  className="btn-secondary flex items-center space-x-2"
  onClick={handleSwitchCamera}
  >
  <span>Switch Camera</span>
  </button>
  <button
  type="button"
  className={`btn-secondary flex items-center space-x-2 ${flashOn ? 'bg-yellow-400/80' : ''}`}
  onClick={handleToggleFlash}
  >
  <span>Flash {flashOn ? 'On' : 'Off'}</span>
  </button>
  <button
  type="button"
  className="btn-primary flex items-center space-x-2"
  onClick={handleCapturePhoto}
  >
  <span>Capture</span>
  </button>
  </div>
  </div>
  </div>
  </div>
  )}
  </div>
  </div>
  </div>
  );
 };
 
 export default DemoWidget;