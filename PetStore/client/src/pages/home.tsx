import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const DISCORD_URL = import.meta.env.VITE_DISCORD_URL || 'https://discord.gg/gardenvault';

export default function Home() {
  const openDiscord = () => {
    window.open(DISCORD_URL, '_blank');
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="hero-title">
            Premium Virtual Items
          </h1>
          <p className="text-xl mb-8 opacity-90" data-testid="hero-subtitle">
            The most trusted source for Grow a Garden pets, sheckles, and exclusive deals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button 
                size="lg" 
                className="btn-gold-brick text-lg px-8 py-4"
                data-testid="hero-shop-button"
              >
                🛍️ Shop Deals
              </Button>
            </Link>
            <Button 
              size="lg" 
              className="btn-secondary-brick text-lg px-8 py-4" 
              onClick={openDiscord}
              data-testid="hero-discord-button"
            >
              💬 Join Discord
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-8 bg-brick-red rounded-lg brick-texture brick-studs transition-all duration-200 hover:transform hover:-translate-y-1 border-4 border-transparent hover:border-gray-200">
              <div className="text-5xl mb-4">🔥</div>
              <h3 className="text-xl font-bold text-white mb-2">24H Flash Sales</h3>
              <p className="text-white opacity-90">Limited time offers with massive savings</p>
            </div>
            <div className="text-center p-8 bg-gold rounded-lg brick-texture brick-studs transition-all duration-200 hover:transform hover:-translate-y-1 border-4 border-transparent hover:border-gray-200">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sheckles Packages</h3>
              <p className="text-gray-700">Bulk sheckles with up to 67% discount</p>
            </div>
            <div className="text-center p-8 bg-leaf-green rounded-lg brick-texture brick-studs transition-all duration-200 hover:transform hover:-translate-y-1 border-4 border-transparent hover:border-gray-200">
              <div className="text-5xl mb-4">🐾</div>
              <h3 className="text-xl font-bold text-white mb-2">All Pets Available</h3>
              <p className="text-white opacity-90">From common to huge legendary pets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Discord CTA Section */}
      <section className="discord-gradient text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="bg-white bg-opacity-10 rounded-lg p-8 backdrop-blur-sm border border-white border-opacity-20">
            <h2 className="text-3xl font-bold mb-4" data-testid="discord-cta-title">
              💬 Join Our Discord Community
            </h2>
            <p className="text-lg mb-6 opacity-90" data-testid="discord-cta-description">
              Get instant support, exclusive deals, and connect with fellow gardeners. Complete your purchases safely through our verified Discord server.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 font-bold hover:bg-gray-100"
              onClick={openDiscord}
              data-testid="discord-cta-button"
            >
              🚀 Join Discord Server
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
