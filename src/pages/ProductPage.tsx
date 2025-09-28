import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Header from '@/components/Header';
import Cart from '@/components/Cart';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import teeFront from '@/assets/tee-front.png';
import teeBack from '@/assets/tee-back.png';
import teeFrontNew from '@/assets/tee-front-new.png';
import hoodieFront from '@/assets/hoodie-front.png';
import hoodieBack from '@/assets/hoodie-back.png';
import hoodieModel from '@/assets/hoodie-model.png';
import retroWaveTee from '@/assets/retro-wave-tee.png';
import starScriptTee from '@/assets/star-script-tee.png';
import timelessUtilityTee from '@/assets/timeless-utility-tee.png';
import manyMindsModel from '@/assets/many-minds-model.png';
import retroWaveModel from '@/assets/retro-wave-model.png';
import starScriptModel from '@/assets/star-script-model.png';
import timelessUtilityModel from '@/assets/timeless-utility-model.png';

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  images: {
    front: string;
    back: string;
    model: string;
  };
  sizes: string[];
  category: string;
  inStock: boolean;
  details: string;
  care: string;
}

const PRODUCTS: { [key: string]: Product } = {
  'many-minds-one-builder-tee': {
    id: 'many-minds-one-builder-tee',
    name: 'Many Minds One Builder Tee',
    price: 29.99,
    currency: '€',
    description: 'The Many Minds One Builder Tee represents the spirit of Altan — collaboration, creativity, and movement. Featuring a clean front with STAFF ONLY ©2025 branding, and a bold back print with the statement \'many minds, one builder\'.',
    images: {
      front: teeFront,
      back: teeBack,
      model: manyMindsModel,
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'Tees',
    inStock: true,
    details: 'Made from premium cotton with an oversized fit, this tee is designed for comfort and style. Features high-quality screen printing that maintains its vibrancy wash after wash.',
    care: 'Machine wash cold with like colors. Tumble dry low. Do not bleach. Iron inside out on low heat.',
  },
  'retro-wave-tee': {
    id: 'retro-wave-tee',
    name: 'Retro Wave Tee',
    price: 29.99,
    currency: '€',
    description: 'Dive into the future with a nostalgic twist. The \'AltanLabs Retro Wave Tee\' features a vibrant, retro-futuristic logo and inspiring text that speaks to the evolution of ideas. Crafted for those who build, endure, and imagine beyond the ordinary, this tee is a testament to progress and timeless utility.',
    images: {
      front: teeFrontNew,
      back: retroWaveTee,
      model: retroWaveModel,
    },
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tees',
    inStock: true,
    details: 'Made from premium cotton with an oversized fit, this tee is designed for comfort and style. Features high-quality screen printing that maintains its vibrancy wash after wash.',
    care: 'Machine wash cold with like colors. Tumble dry low. Do not bleach. Iron inside out on low heat.',
  },
  'star-script-tee': {
    id: 'star-script-tee',
    name: 'Star Script Tee',
    price: 29.99,
    currency: '€',
    description: 'Embrace the bold and the artistic with the \'AltanLabs Star Script Tee.\' This design combines a striking star graphic with an intricate, stylized \'AL\' script, creating a powerful visual statement. It\'s a perfect blend of streetwear edge and sophisticated design for those who stand out.',
    images: {
      front: teeFrontNew,
      back: starScriptTee,
      model: starScriptModel,
    },
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tees',
    inStock: true,
    details: 'Made from premium cotton with an oversized fit, this tee is designed for comfort and style. Features high-quality screen printing that maintains its vibrancy wash after wash.',
    care: 'Machine wash cold with like colors. Tumble dry low. Do not bleach. Iron inside out on low heat.',
  },
  'timeless-utility-tee': {
    id: 'timeless-utility-tee',
    name: 'Timeless Utility Tee',
    price: 29.99,
    currency: '€',
    description: 'Seize the moment with the \'AltanLabs Timeless Utility Tee.\' Featuring a classic, monochromatic watch graphic and the impactful reminder, \'Your Time Is Valuable, Don\'t Waste It,\' this tee embodies precision, purpose, and the enduring value of time. Designed for those who appreciate classic style and a meaningful message.',
    images: {
      front: teeFrontNew,
      back: timelessUtilityTee,
      model: timelessUtilityModel,
    },
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tees',
    inStock: true,
     details: 'Made from premium cotton with an oversized fit, this tee is designed for comfort and style. Features high-quality screen printing that maintains its vibrancy wash after wash.',
    care: 'Machine wash cold with like colors. Tumble dry low. Do not bleach. Iron inside out on low heat.',
  },
  'one-builder-core-hoodie': {
    id: 'one-builder-core-hoodie',
    name: 'One Builder Core Hoodie',
    price: 49.99,
    currency: '€',
    description: 'The One Builder Core Hoodie embodies the essence of Altan - collaboration, creativity, and the power of many minds working as one. Featuring a clean front with the iconic triangle logo and a bold back print with "many minds one builder" statement.',
    images: {
      front: hoodieFront,
      back: hoodieBack,
      model: hoodieModel,
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'Hoodies',
    inStock: true,
    details: 'Made from premium cotton blend with a soft fleece interior. Features a spacious front pocket and adjustable drawstring hood. Designed for ultimate comfort and warmth.',
    care: 'Machine wash cold with like colors. Tumble dry low. Do not bleach. Iron inside out on low heat.',
  },
};

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<'front' | 'back' | 'model'>('front');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [careOpen, setCareOpen] = useState(false);
  const { state, dispatch } = useCart();
  const { toast } = useToast();

  const product = productId ? PRODUCTS[productId] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemCount={state.itemCount} onCartClick={() => setShowCart(true)} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-serif text-2xl mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/')}>Return to Shop</Button>
        </div>
      </div>
    );
  }

  const images = [
    { key: 'front', src: product.images.front, alt: `${product.name} - Front` },
    { key: 'back', src: product.images.back, alt: `${product.name} - Back` },
    { key: 'model', src: product.images.model, alt: `${product.name} - Model` },
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          currency: product.currency,
          size: selectedSize,
          image: product.images.front,
        },
      });
    }

    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} (${selectedSize}) added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={state.itemCount} onCartClick={() => setShowCart(true)} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images - Left Side */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-secondary/20 rounded-lg overflow-hidden">
              <img
                src={images.find(img => img.key === selectedImage)?.src}
                alt={images.find(img => img.key === selectedImage)?.alt}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Image Thumbnails */}
            <div className="grid grid-cols-3 gap-2">
              {images.map((image) => (
                <button
                  key={image.key}
                  onClick={() => setSelectedImage(image.key as 'front' | 'back' | 'model')}
                  className={`aspect-square bg-secondary/20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === image.key ? 'border-primary' : 'border-transparent hover:border-border'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details - Right Side */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <h1 className="font-serif text-3xl lg:text-4xl font-semibold mb-2">
                {product.name}
              </h1>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-medium">
                  {product.currency}{product.price.toFixed(2)}
                </p>
                {product.inStock && (
                  <div className="flex items-center text-green-600">
                    <Check className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">IN STOCK</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium mb-3 text-sm uppercase tracking-wide">SIZE</h3>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 border rounded-lg text-center transition-colors font-medium ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3 text-sm uppercase tracking-wide">Quantity</h3>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              className="w-full"
              size="lg"
            >
              ADD TO CART - {product.currency}{(product.price * quantity).toFixed(2)}
            </Button>

            <Separator />

            {/* Product Details Sections */}
            <div className="space-y-4">
              <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                  <span className="font-medium text-sm uppercase tracking-wide">DETAILS</span>
                  <Plus className={`h-4 w-4 transition-transform ${detailsOpen ? 'rotate-45' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-3">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.details}
                  </p>
                </CollapsibleContent>
              </Collapsible>

              <Separator />

              <Collapsible open={careOpen} onOpenChange={setCareOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                  <span className="font-medium text-sm uppercase tracking-wide">CARE INSTRUCTIONS</span>
                  <Plus className={`h-4 w-4 transition-transform ${careOpen ? 'rotate-45' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-3">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.care}
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </main>

      {/* Cart Modal */}
      {showCart && (
        <Cart onClose={() => setShowCart(false)} />
      )}
    </div>
  );
};

export default ProductPage;