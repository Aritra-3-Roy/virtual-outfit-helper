import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outfit } from '@/data';

interface OutfitCardProps {
  outfit: Outfit;
}

const OutfitCard = ({ outfit }: OutfitCardProps) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white hover-lift"
      onClick={() => navigate(`/try-on?outfitId=${outfit.id}`)}
    >
      <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
        <img
          src={outfit.image}
          alt={outfit.name}
          className={`object-cover transition-all duration-300 ${
            imageLoaded ? 'image-loaded' : 'image-loading'
          }`}
          style={{ height: '100%', width: '100%' }}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
          <button 
            className="w-full bg-white font-medium text-sm py-2 rounded-md transition-all hover:bg-gray-100"
          >
            Try On
          </button>
        </div>
      </div>
      
      <div className="flex flex-col space-y-1 p-4">
        <h3 className="text-sm font-medium text-gray-900">{outfit.name}</h3>
        <p className="text-xs text-gray-500">{outfit.category}</p>
        <p className="text-sm font-medium text-gray-900">{outfit.price}</p>
      </div>
    </div>
  );
};

export default OutfitCard;
