import { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import { useCart } from '@/contexts/CartContext';
import teeFront from '@/assets/tee-front.png';
import teeBack from '@/assets/tee-back.png';
import retroWaveTee from '@/assets/retro-wave-tee.png';
import starScriptTee from '@/assets/star-script-tee.png';
import timelessUtilityTee from '@/assets/timeless-utility-tee.png';

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  images: {
    front: string;
    back: string;
  };
  sizes: string[];
  category: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'many-minds-one-builder-tee',
    name: 'Many Minds One Builder Tee',
    price: 29.99,
    currency: '€',
    description: 'The Many Minds One Builder Tee represents the spirit of Altan — collaboration, creativity, and movement. Featuring a clean front with STAFF ONLY ©2025 branding, and a bold back print with the statement \'many minds, one builder\'. Made from premium cotton with an oversized fit, this tee is designed for comfort and style.',
    images: {
      front: teeFront,
      back: teeBack,
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'Tees',
  },
  {
    id: 'retro-wave-tee',
    name: 'Retro Wave Tee',
    price: 29.99,
    currency: '€',
    description: 'Dive into the future with a nostalgic twist. The \'AltanLabs Retro Wave Tee\' features a vibrant, retro-futuristic logo and inspiring text that speaks to the evolution of ideas. Crafted for those who build, endure, and imagine beyond the ordinary, this tee is a testament to progress and timeless utility.',
    images: {
      front: retroWaveTee,
      back: retroWaveTee,
    },
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tees',
  },
  {
    id: 'star-script-tee',
    name: 'Star Script Tee',
    price: 29.99,
    currency: '€',
    description: 'Embrace the bold and the artistic with the \'AltanLabs Star Script Tee.\' This design combines a striking star graphic with an intricate, stylized \'AL\' script, creating a powerful visual statement. It\'s a perfect blend of streetwear edge and sophisticated design for those who stand out.',
    images: {
      front: starScriptTee,
      back: starScriptTee,
    },
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tees',
  },
  {
    id: 'timeless-utility-tee',
    name: 'Timeless Utility Tee',
    price: 29.99,
    currency: '€',
    description: 'Seize the moment with the \'AltanLabs Timeless Utility Tee.\' Featuring a classic, monochromatic watch graphic and the impactful reminder, \'Your Time Is Valuable, Don\'t Waste It,\' this tee embodies precision, purpose, and the enduring value of time. Designed for those who appreciate classic style and a meaningful message.',
    images: {
      front: timelessUtilityTee,
      back: timelessUtilityTee,
    },
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tees',
  },
];

const Shop = () => {
  const [showCart, setShowCart] = useState(false);
  const { state } = useCart();

  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={state.itemCount} 
        onCartClick={handleCartClick}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
            AltanShop
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Luxury streetwear and premium merch. Clean designs, quality materials, and timeless style.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <button className="text-sm font-medium text-foreground border-b-2 border-primary pb-2">
              Tees
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* Empty State for Coming Soon */}
        {PRODUCTS.length === 0 && (
          <div className="text-center py-16">
            <h3 className="font-serif text-2xl mb-4">Coming Soon</h3>
            <p className="text-muted-foreground">
              New products are on their way. Stay tuned!
            </p>
          </div>
        )}
      </main>

      {/* Cart Modal */}
      {showCart && (
        <Cart onClose={handleCloseCart} />
      )}
    </div>
  );
};

export default Shop;