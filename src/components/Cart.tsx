import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface CartProps {
  onClose: () => void;
}

const Cart = ({ onClose }: CartProps) => {
  const { state, dispatch } = useCart();
  const { toast } = useToast();

  const updateQuantity = (id: string, size: string, newQuantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, size, quantity: newQuantity },
    });
  };

  const removeItem = (id: string, size: string) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id, size },
    });
    
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    if (state.items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    // For now, just show a success message
    // In a real app, this would redirect to payment processing
    toast({
      title: "Proceeding to checkout",
      description: "Redirecting to secure payment...",
    });
    
    // Simulate checkout process
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. You'll receive a confirmation email shortly.",
      });
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="font-serif text-xl">
              Shopping Cart ({state.itemCount})
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-secondary"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button variant="outline" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg bg-secondary/20"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                    <p className="text-sm font-medium">
                      {item.currency}{item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <span className="text-sm font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id, item.size)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        {state.items.length > 0 && (
          <div className="flex-shrink-0 p-6 border-t space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total:</span>
              <span className="font-serif text-xl font-semibold">
                €{state.total.toFixed(2)}
              </span>
            </div>
            
            <Button
              onClick={handleCheckout}
              className="w-full"
              size="lg"
            >
              Checkout
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Cart;