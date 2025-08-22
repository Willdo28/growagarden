export default function Policies() {
  const policies = [
    {
      title: "Terms of Service",
      content: "By using The Garden Vault, you agree to our terms of service. All virtual items are sold for the Roblox game \"Grow a Garden\" and have no real-world value. We reserve the right to refuse service and modify prices. All sales are final unless otherwise stated."
    },
    {
      title: "Privacy Policy",
      content: "We collect minimal personal information required for transactions. Discord usernames and Roblox usernames are stored securely for delivery purposes. We do not share information with third parties and do not store payment details."
    },
    {
      title: "Refund Policy",
      content: "Full refunds available for undelivered items within 48 hours of purchase. Partial refunds may be considered for legitimate issues. Refunds are processed through the original payment method within 3-5 business days. Store credit may be offered as an alternative."
    }
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-8 text-3xl font-bold text-gray-900" data-testid="policies-title">
            📋 Policies
          </h2>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {policies.map((policy, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm"
                data-testid={`policy-item-${index}`}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3" data-testid="policy-title">
                  {policy.title}
                </h3>
                <p className="text-gray-700 leading-7" data-testid="policy-content">
                  {policy.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
