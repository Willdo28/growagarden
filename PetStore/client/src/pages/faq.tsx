export default function FAQ() {
  const faqs = [
    {
      question: "How do I receive my items?",
      answer: "All items are delivered via in-game trade or approved methods. After purchase confirmation through Discord, our team will coordinate delivery within 24 hours during business hours."
    },
    {
      question: "How long does delivery take?",
      answer: "Most deliveries are completed within 1-24 hours. Limited items and bulk orders may require additional processing time. You'll receive updates through Discord."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer full refunds for items not delivered within 48 hours or if there are technical issues preventing delivery. Refunds are processed within 3-5 business days."
    },
    {
      question: "Is this safe and legitimate?",
      answer: "Yes! We've been serving the Grow a Garden community for years with thousands of satisfied customers. All transactions are secure, and we follow Roblox's terms of service."
    },
    {
      question: "Can I trade items back later?",
      answer: "We occasionally accept trade-backs for store credit, but this is evaluated case-by-case. Please contact us through Discord to discuss specific situations."
    }
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-8 text-3xl font-bold text-gray-900" data-testid="faq-title">
            ❓ Frequently Asked Questions
          </h2>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm"
                data-testid={`faq-item-${index}`}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3" data-testid="faq-question">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-7" data-testid="faq-answer">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
