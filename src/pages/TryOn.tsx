
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "sonner";

// Dummy outfits data - this would typically come from an API
const outfits = [
  {
    id: '1',
    name: 'Casual Summer Dress',
    category: 'Dresses',
    description: 'Lightweight summer dress perfect for hot days.',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    price: '$89.99'
  },
  {
    id: '2',
    name: 'Business Suit',
    category: 'Formal',
    description: 'Professional suit for business meetings and formal events.',
    image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    price: '$249.99'
  },
  {
    id: '3',
    name: 'Casual Jacket',
    category: 'Outerwear',
    description: 'Stylish jacket for casual everyday wear.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
    price: '$129.99'
  },
  {
    id: '4',
    name: 'Summer T-Shirt',
    category: 'Casual',
    description: 'Lightweight t-shirt for summer days.',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    price: '$39.99'
  }
];

const TryOn = () => {
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<any>(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Check for outfitId in URL params
    const searchParams = new URLSearchParams(location.search);
    const outfitId = searchParams.get('outfitId');
    
    if (outfitId) {
      const outfit = outfits.find(o => o.id === outfitId);
      if (outfit) {
        setSelectedOutfit(outfit);
      }
    }
    
    // Clean up camera on component unmount
    return () => {
      stopCamera();
    };
  }, [location.search]);
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        toast.success("Camera started successfully");
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Failed to access camera. Please check permissions.");
    }
  };
  
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };
  
  const handleTryOnClick = () => {
    if (!selectedOutfit) {
      toast.error("Please select an outfit first");
      return;
    }
    
    setShowWebcam(true);
    
    setTimeout(() => {
      startCamera();
    }, 500);
  };
  
  const handleCloseWebcam = () => {
    stopCamera();
    setShowWebcam(false);
  };
  
  return (
    <div className={`min-h-screen flex flex-col ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-12 pt-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Virtual Try-On</h1>
            <p className="text-lg text-gray-600">
              Experience how our clothes look on you before purchasing.
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-semibold mb-6">Select an Outfit</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {outfits.map(outfit => (
                  <div 
                    key={outfit.id}
                    className={`cursor-pointer border rounded-lg overflow-hidden transition-all ${
                      selectedOutfit?.id === outfit.id 
                        ? 'ring-2 ring-black shadow-md transform scale-[1.02]' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedOutfit(outfit)}
                  >
                    <div className="aspect-square relative">
                      <img 
                        src={outfit.image} 
                        alt={outfit.name} 
                        className="object-cover h-full w-full"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{outfit.name}</h3>
                      <p className="text-sm text-gray-600">{outfit.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <button
                  onClick={handleTryOnClick}
                  disabled={!selectedOutfit}
                  className={`w-full py-3 rounded-md font-medium transition-all ${
                    selectedOutfit
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Try On Selected Outfit
                </button>
              </div>
            </div>
            
            <div>
              {!showWebcam ? (
                <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
                  <div className="text-center max-w-md">
                    <h3 className="text-xl font-medium mb-2">Virtual Try-On Experience</h3>
                    <p className="text-gray-600 mb-6">
                      Select an outfit and click "Try On" to see how it looks on you using your webcam.
                    </p>
                    
                    {selectedOutfit ? (
                      <div className="p-4 bg-white border rounded-lg mb-6">
                        <p className="text-sm text-gray-600">Selected:</p>
                        <p className="font-medium">{selectedOutfit.name}</p>
                      </div>
                    ) : null}
                    
                    <button
                      onClick={handleTryOnClick}
                      disabled={!selectedOutfit}
                      className={`px-6 py-2 rounded-md font-medium transition-all ${
                        selectedOutfit
                          ? 'bg-black text-white hover:bg-gray-800'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Start Try-On
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden bg-black relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-auto"
                    style={{ maxHeight: '600px' }}
                  />
                  
                  {/* Virtual outfit overlay would normally go here */}
                  
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={handleCloseWebcam}
                      className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  {selectedOutfit && (
                    <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/80 backdrop-blur-sm rounded-lg">
                      <div className="flex items-center gap-4">
                        <img 
                          src={selectedOutfit.image}
                          alt={selectedOutfit.name}
                          className="h-16 w-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-medium">{selectedOutfit.name}</h3>
                          <p className="text-sm text-gray-600">{selectedOutfit.price}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TryOn;
