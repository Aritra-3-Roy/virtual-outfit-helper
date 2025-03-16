
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OutfitCard, { Outfit } from '@/components/OutfitCard';

const outfits: Outfit[] = [
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
  },
  {
    id: '5',
    name: 'Evening Gown',
    category: 'Formal',
    description: 'Elegant evening gown for special occasions.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=830&q=80',
    price: '$299.99'
  },
  {
    id: '6',
    name: 'Casual Jeans',
    category: 'Casual',
    description: 'Comfortable jeans for everyday wear.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    price: '$79.99'
  },
  {
    id: '7',
    name: 'Winter Coat',
    category: 'Outerwear',
    description: 'Warm coat for cold winter days.',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    price: '$199.99'
  },
  {
    id: '8',
    name: 'Casual Shirt',
    category: 'Casual',
    description: 'Stylish shirt for casual occasions.',
    image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    price: '$59.99'
  }
];

const categories = ['All', 'Casual', 'Formal', 'Dresses', 'Outerwear'];

const Collection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredOutfits, setFilteredOutfits] = useState(outfits);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredOutfits(outfits);
    } else {
      setFilteredOutfits(outfits.filter(outfit => outfit.category === selectedCategory));
    }
  }, [selectedCategory]);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className={`min-h-screen flex flex-col ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-12 pt-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Collection</h1>
            <p className="text-lg text-gray-600">Browse our latest styles and try them on virtually.</p>
          </header>
          
          <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide">
            <div className="flex space-x-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredOutfits.map(outfit => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Collection;
