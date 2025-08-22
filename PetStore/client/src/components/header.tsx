import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { cartStore } from '@/lib/cart-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const DISCORD_URL = import.meta.env.VITE_DISCORD_URL || 'https://discord.gg/gardenvault';

export function Header({ onSearch }: HeaderProps) {
  const [location] = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(cartStore.getItemCount());
    };

    updateCartCount();
    return cartStore.subscribe(updateCartCount);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const openDiscord = () => {
    window.open(DISCORD_URL, '_blank');
  };

  return (
    <>
      {/* Legal Banner */}
      <div className="bg-gold text-gray-900 text-center py-2 text-sm font-semibold">
        🌱 Fan-run shop for virtual items. Not affiliated with Roblox. 🌱
      </div>

      {/* Header */}
      <header className="bg-white border-b-4 border-leaf-green shadow-sm sticky top-0 z-40">
        <nav className="container mx-auto px-4 flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold text-leaf-green no-underline">
            🧱 The Garden Vault
          </Link>
          
          <ul className="hidden md:flex items-center gap-6 list-none">
            <li>
              <Link 
                href="/" 
                className={`text-gray-700 no-underline font-medium transition-colors hover:text-leaf-green ${location === '/' ? 'text-leaf-green' : ''}`}
                data-testid="nav-home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/shop" 
                className={`text-gray-700 no-underline font-medium transition-colors hover:text-leaf-green ${location === '/shop' ? 'text-leaf-green' : ''}`}
                data-testid="nav-shop"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link 
                href="/faq" 
                className={`text-gray-700 no-underline font-medium transition-colors hover:text-leaf-green ${location === '/faq' ? 'text-leaf-green' : ''}`}
                data-testid="nav-faq"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link 
                href="/policies" 
                className={`text-gray-700 no-underline font-medium transition-colors hover:text-leaf-green ${location === '/policies' ? 'text-leaf-green' : ''}`}
                data-testid="nav-policies"
              >
                Policies
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className={`text-gray-700 no-underline font-medium transition-colors hover:text-leaf-green ${location === '/contact' ? 'text-leaf-green' : ''}`}
                data-testid="nav-contact"
              >
                Contact
              </Link>
            </li>
          </ul>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-40 md:w-48"
                data-testid="search-input"
              />
            </div>
            <div className="relative">
              <Link href="/cart">
                <Button variant="outline" size="sm" data-testid="cart-button">
                  🛒 Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brick-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold" data-testid="cart-count">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
            <Button 
              size="sm" 
              className="btn-secondary-brick" 
              onClick={openDiscord}
              data-testid="discord-button"
            >
              Join Discord
            </Button>
          </div>
        </nav>
      </header>
    </>
  );
}
