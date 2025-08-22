import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { cartStore, type CartItem } from '@/lib/cart-store';
import { toastManager } from '@/components/toast-manager';
import { Button } from '@/components/ui/button';

const DISCORD_URL = import.meta.env.VITE_DISCORD_URL || 'https://discord.gg/gardenvault';

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      setCartItems(cartStore.getCart());
      setSubtotal(cartStore.getSubtotal());
    };

    updateCart();
    return cartStore.subscribe(updateCart);
  }, []);

  const handleRemoveItem = (productId: string) => {
    cartStore.removeFromCart(productId);
    toastManager.show('Item removed from cart', 'success');
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    cartStore.updateQuantity(productId, newQuantity);
  };

  const openDiscord = () => {
    window.open(DISCORD_URL, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <main className="bg-white min-h-screen">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-8 text-3xl font-bold text-gray-900" data-testid="cart-title">
              🛒 Your Cart
            </h2>
            
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2" data-testid="empty-cart-title">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-6" data-testid="empty-cart-message">
                Add some items to get started!
              </p>
              <Link href="/shop">
                <Button className="btn-primary-brick" data-testid="continue-shopping-button">
                  🛍️ Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-8 text-3xl font-bold text-gray-900" data-testid="cart-title">
            🛒 Your Cart
          </h2>
          
          <div className="space-y-3 mb-6" data-testid="cart-items">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border-2 border-gray-200 rounded-md gap-4"
                data-testid={`cart-item-${item.id}`}
              >
                <div className="flex-1">
                  <div className="font-semibold mb-1" data-testid="cart-item-name">
                    {item.name}
                  </div>
                  <div className="text-gray-600 text-sm" data-testid="cart-item-price">
                    ${item.price.toFixed(2)} each
                  </div>
                </div>
                
                <div className="flex items-center gap-2" data-testid="cart-quantity-controls">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 p-0"
                    data-testid="quantity-decrease"
                  >
                    −
                  </Button>
                  <span className="min-w-10 text-center font-semibold" data-testid="item-quantity">
                    {item.quantity}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 p-0"
                    data-testid="quantity-increase"
                  >
                    +
                  </Button>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-leaf-green mb-1" data-testid="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemoveItem(item.id)}
                    data-testid="remove-item-button"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Subtotal:</span>
              <span className="text-xl font-bold text-leaf-green" data-testid="cart-subtotal">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span>Fees:</span>
              <span>$0.00</span>
            </div>
            <hr className="my-4 border-gray-200" />
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-leaf-green" data-testid="cart-total">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            
            <div className="text-center">
              <p className="mb-4 text-gray-600 text-sm">
                Complete purchase via Discord or approved in-game method—see instructions
              </p>
              <Button 
                className="btn-secondary-brick text-lg px-8 py-4"
                onClick={openDiscord}
                disabled={cartItems.length === 0}
                data-testid="checkout-button"
              >
                💬 Proceed via Discord
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
