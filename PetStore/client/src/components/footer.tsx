import { Link } from 'wouter';

const DISCORD_URL = import.meta.env.VITE_DISCORD_URL || 'https://discord.gg/gardenvault';

interface FooterProps {
  onFilterSelect?: (filter: string) => void;
}

export function Footer({ onFilterSelect }: FooterProps) {
  const openDiscord = () => {
    window.open(DISCORD_URL, '_blank');
  };

  const handleFilterClick = (filter: string) => {
    if (onFilterSelect) {
      onFilterSelect(filter);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white text-lg font-bold mb-4">
              🧱 The Garden Vault
            </h4>
            <p>
              Your trusted source for premium Grow a Garden virtual items. Fast, safe, and reliable service since 2023.
            </p>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/shop" className="block text-gray-300 hover:text-leaf-green transition-colors">
                Shop All Items
              </Link>
              <Link href="/faq" className="block text-gray-300 hover:text-leaf-green transition-colors">
                FAQ
              </Link>
              <Link href="/policies" className="block text-gray-300 hover:text-leaf-green transition-colors">
                Policies
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-leaf-green transition-colors">
                Contact Support
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Categories</h4>
            <div className="space-y-2">
              <button 
                onClick={() => handleFilterClick('sales')}
                className="block text-gray-300 hover:text-leaf-green transition-colors text-left"
                data-testid="footer-filter-sales"
              >
                24H Flash Sales
              </button>
              <button 
                onClick={() => handleFilterClick('limited')}
                className="block text-gray-300 hover:text-leaf-green transition-colors text-left"
                data-testid="footer-filter-limited"
              >
                Limited Deals
              </button>
              <button 
                onClick={() => handleFilterClick('sheckles')}
                className="block text-gray-300 hover:text-leaf-green transition-colors text-left"
                data-testid="footer-filter-sheckles"
              >
                Sheckles Packages
              </button>
              <button 
                onClick={() => handleFilterClick('regular')}
                className="block text-gray-300 hover:text-leaf-green transition-colors text-left"
                data-testid="footer-filter-regular"
              >
                Regular Pets
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Community</h4>
            <div className="space-y-2">
              <button 
                onClick={openDiscord}
                className="block text-gray-300 hover:text-leaf-green transition-colors text-left"
                data-testid="footer-discord"
              >
                Join Discord Server
              </button>
              <a href="#" className="block text-gray-300 hover:text-leaf-green transition-colors">
                Customer Reviews
              </a>
              <a href="#" className="block text-gray-300 hover:text-leaf-green transition-colors">
                Trading Tips
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2024 The Garden Vault. Not affiliated with Roblox Corporation. Virtual items only - no real world value.</p>
        </div>
      </div>
    </footer>
  );
}
