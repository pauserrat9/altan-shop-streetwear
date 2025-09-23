import { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ProductDetail from '@/components/ProductDetail';
import Cart from '@/components/Cart';
import { useCart } from '@/contexts/CartContext';
import teeFront from '@/assets/tee-front.png';
import teeBack from '@/assets/tee-back.png';

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
];

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);
  const { state } = useCart();

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
  };

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
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-2">
              Hoodies
              <span className="ml-2 text-xs">Coming Soon</span>
            </button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-2">
              Accessories
              <span className="ml-2 text-xs">Coming Soon</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewProduct={handleViewProduct}
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

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={handleCloseProduct}
        />
      )}

      {/* Cart Modal */}
      {showCart && (
        <Cart onClose={handleCloseCart} />
      )}
    </div>
  );
};

export default Shop;