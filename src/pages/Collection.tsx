import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OutfitCard from '@/components/OutfitCard';
import { outfits, Outfit } from '@/data';

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
