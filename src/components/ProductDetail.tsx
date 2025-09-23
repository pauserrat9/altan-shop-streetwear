import { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

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
}

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState<'front' | 'back'>('front');
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();
  const { toast } = useToast();

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

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="font-serif text-2xl font-semibold">Product Details</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-secondary"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-secondary/20 rounded-lg overflow-hidden">
                <img
                  src={selectedImage === 'front' ? product.images.front : product.images.back}
                  alt={`${product.name} - ${selectedImage}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Selector */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedImage('front')}
                  className={`flex-1 aspect-square bg-secondary/20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === 'front' ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={product.images.front}
                    alt={`${product.name} - Front`}
                    className="w-full h-full object-cover"
                  />
                </button>
                <button
                  onClick={() => setSelectedImage('back')}
                  className={`flex-1 aspect-square bg-secondary/20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === 'back' ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={product.images.back}
                    alt={`${product.name} - Back`}
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-3xl font-semibold mb-2">
                  {product.name}
                </h1>
                <p className="text-2xl font-medium">
                  {product.currency}{product.price.toFixed(2)}
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Size Selection */}
              <div>
                <h3 className="font-medium mb-3">Size</h3>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 border rounded-lg text-center transition-colors ${
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
                <h3 className="font-medium mb-3">Quantity</h3>
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
                Add to Cart - {product.currency}{(product.price * quantity).toFixed(2)}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetail;