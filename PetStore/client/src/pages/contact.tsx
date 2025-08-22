import { Button } from '@/components/ui/button';

const DISCORD_URL = import.meta.env.VITE_DISCORD_URL || 'https://discord.gg/gardenvault';

export default function Contact() {
  const openDiscord = () => {
    window.open(DISCORD_URL, '_blank');
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-8 text-3xl font-bold text-gray-900" data-testid="contact-title">
            📞 Contact Us
          </h2>
          
          <div className="text-center max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3" data-testid="contact-main-title">
                Get in Touch
              </h3>
              <p className="text-gray-700 leading-7 mb-6" data-testid="contact-description">
                The fastest way to reach us is through our Discord server. Our support team is available 12+ hours daily to help with orders, technical issues, and general questions.
              </p>
              <Button 
                className="btn-secondary-brick text-lg px-8 py-4"
                onClick={openDiscord}
                data-testid="contact-discord-button"
              >
                💬 Contact via Discord
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3" data-testid="support-hours-title">
                  Support Hours
                </h3>
                <p className="text-gray-700" data-testid="support-hours-content">
                  Monday - Sunday: 8 AM - 11 PM EST<br />
                  Response time: Usually within 1-3 hours
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3" data-testid="order-status-title">
                  Order Status
                </h3>
                <p className="text-gray-700" data-testid="order-status-content">
                  Check your order status anytime in our Discord server using the #order-status channel or by messaging our support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
