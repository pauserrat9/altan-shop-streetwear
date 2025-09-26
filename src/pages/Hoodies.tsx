import { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import { useCart } from '@/contexts/CartContext';
import hoodieFront from '@/assets/hoodie-front.png';
import hoodieBack from '@/assets/hoodie-back.png';
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
const HOODIES: Product[] = [{
  id: 'one-builder-core-hoodie',
  name: 'One Builder Core Hoodie',
  price: 49.99,
  currency: '€',
  description: 'The One Builder Core Hoodie embodies the essence of Altan - collaboration, creativity, and the power of many minds working as one. Featuring a clean front with the iconic triangle logo and a bold back print with "many minds one builder" statement.',
  images: {
    front: hoodieFront,
    back: hoodieBack
  },
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  category: 'Hoodies'
}];
const Hoodies = () => {
  const [showCart, setShowCart] = useState(false);
  const {
    state
  } = useCart();
  const handleCartClick = () => {
    setShowCart(true);
  };
  const handleCloseCart = () => {
    setShowCart(false);
  };
  return <div className="min-h-screen bg-background">
      <Header cartItemCount={state.itemCount} onCartClick={handleCartClick} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">AltanShop</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <button className="text-sm font-medium text-foreground border-b-2 border-primary pb-2">
              Hoodies
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOODIES.map(product => <ProductCard key={product.id} product={product} />)}
        </div>

        {/* Empty State for Coming Soon */}
        {HOODIES.length === 0 && <div className="text-center py-16">
            <h3 className="font-serif text-2xl mb-4">Coming Soon</h3>
            <p className="text-muted-foreground">
              New hoodies are on their way. Stay tuned!
            </p>
          </div>}
      </main>

      {/* Cart Modal */}
      {showCart && <Cart onClose={handleCloseCart} />}
    </div>;
};
export default Hoodies;