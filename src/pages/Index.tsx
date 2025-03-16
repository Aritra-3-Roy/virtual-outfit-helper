
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import OutfitCard, { Outfit } from '@/components/OutfitCard';
import { useNavigate } from 'react-router-dom';

const featuredOutfits: Outfit[] = [
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

const Index = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className={`min-h-screen flex flex-col ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <Navbar />
      <Hero />
      
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Featured Collection
              </h2>
              <p className="mt-2 text-lg text-gray-600 max-w-2xl">
                Explore our latest styles you can try on virtually before purchasing.
              </p>
            </div>
            
            <button 
              onClick={() => navigate('/collection')}
              className="mt-4 md:mt-0 text-sm font-medium text-black hover:underline"
            >
              View all
              <span className="ml-1">→</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredOutfits.map((outfit) => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 order-2 md:order-1">
              <div className="inline-block mb-3 px-3 py-1 bg-gray-100 rounded-full">
                <span className="text-gray-800 text-sm font-medium">Revolutionary Technology</span>
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl mb-6">
                Virtual Try-On Experience
              </h2>
              
              <p className="text-lg text-gray-600 mb-8">
                Our advanced AI technology allows you to see how clothes fit on your body in real-time. No more uncertainty about how a piece will look on you – just enable your webcam and experience the future of shopping.
              </p>
              
              <button 
                onClick={() => navigate('/try-on')}
                className="px-6 py-3 bg-black text-white font-medium rounded-md transition-all hover:bg-gray-800"
              >
                Try It Now
              </button>
            </div>
            
            <div className="flex-1 order-1 md:order-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                  alt="Virtual Try-On Experience" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-6">
            Ready to transform your shopping experience?
          </h2>
          
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of customers who have discovered their perfect style using our virtual try-on technology.
          </p>
          
          <button 
            onClick={() => navigate('/try-on')}
            className="px-8 py-3 bg-white text-black font-medium rounded-md transition-all hover:bg-gray-200"
          >
            Start Now
          </button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
