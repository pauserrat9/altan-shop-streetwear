import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  images: {
    front: string;
    back: string;
  };
  sizes: string[];
}

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
}

const ProductCard = ({ product, onViewProduct }: ProductCardProps) => {
  return (
    <Card className="group cursor-pointer overflow-hidden border-border/50 hover:shadow-subtle transition-all duration-300">
      <CardContent className="p-0">
        {/* Product Images */}
        <div className="relative aspect-square overflow-hidden bg-secondary/20">
          <img
            src={product.images.front}
            alt={`${product.name} - Front`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          <img
            src={product.images.back}
            alt={`${product.name} - Back`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {product.currency}{product.price.toFixed(2)}
          </p>
          
          {/* Sizes Preview */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {product.sizes.slice(0, 3).map((size) => (
                <span
                  key={size}
                  className="text-xs px-2 py-1 border border-border rounded text-muted-foreground"
                >
                  {size}
                </span>
              ))}
              {product.sizes.length > 3 && (
                <span className="text-xs px-2 py-1 text-muted-foreground">
                  +{product.sizes.length - 3}
                </span>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewProduct(product)}
              className="hover:bg-primary hover:text-primary-foreground"
            >
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;