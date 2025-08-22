import { Product } from './catalog';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class CartStore {
  private cart: CartItem[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    try {
      const saved = localStorage.getItem('gardenVaultCart');
      if (saved) {
        this.cart = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
      this.cart = [];
    }
  }

  private saveCart() {
    try {
      localStorage.setItem('gardenVaultCart', JSON.stringify(this.cart));
      this.notifyListeners();
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  addToCart(product: Product) {
    const existingItem = this.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }

    this.saveCart();
  }

  removeFromCart(productId: string) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId: string, newQuantity: number) {
    if (newQuantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = newQuantity;
      this.saveCart();
    }
  }

  getCart(): CartItem[] {
    return [...this.cart];
  }

  getItemCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }
}

export const cartStore = new CartStore();
