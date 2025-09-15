import React, { useState } from 'react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('Starter');

  const calculatePrice = (monthlyPrice: number) => {
    if (billingCycle === 'monthly') return `$${monthlyPrice}/mo`;
    const annualPrice = (monthlyPrice * 10); // 10% discount
    return `$${annualPrice}/yr`;
  };

  const plans = [
    {
      name: 'Free',
      monthlyPrice: 0,
      description: 'Perfect to get started and explore the basics.',
      features: [
        '1 Portfolio Template',
        'Basic Customization',
        'Basic AI Suggestions',
        'Platform Subdomain',
        'Community Support',
      ],
      cta: 'Join Waitlist',
      badge: null,
    },
    {
      name: 'Starter',
      monthlyPrice: 4.00,
      description: 'Ideal for professionals who want more control.',
      features: [
        'All Free features',
        '3 Premium Templates',
        'Custom Domain Support',
        'Basic Analytics',
        'Email Support',
      ],
      cta: 'Join Waitlist',
      badge: 'Most Popular',
    },
    {
      name: 'Pro',
      monthlyPrice: 8.00,
      description: 'For power users who want to maximize impact.',
      features: [
        'All Starter features',
        'Unlimited Templates',
        'Advanced Analytics',
        'Priority Support',
        'AI Resume → Portfolio Import',
      ],
      cta: 'Join Waitlist',
      badge: 'Hot',
    },
  ];

  return (
    <section className="relative z-10 max-w-[85rem] mx-auto md:px-6 md:py-20 pt-20">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm md:text-lg">
          Choose the plan that fits your career goals. Upgrade anytime as you grow.
        </p>

        {/* Billing Toggle */}
        <div className="mt-6 inline-flex items-center bg-white/10 border border-white/20 rounded-lg p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`text-sm md:text-lg px-4 py-2 rounded-md font-medium transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`text-sm md:text-lg px-4 py-2 rounded-md font-medium transition-colors ${
              billingCycle === 'annual'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Annual
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 md:gap-8 gap-13 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === plan.name;
          return (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border transition-all duration-300 backdrop-blur-sm cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-400 shadow-xl scale-105'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
              onClick={() => setSelectedPlan(plan.name)}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {plan.badge}
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
              <div className="text-4xl font-extrabold text-cyan-400 mb-2">
                {calculatePrice(plan.monthlyPrice)}
              </div>
              {billingCycle === 'annual' && plan.monthlyPrice > 0 && (
                <div className="text-sm text-gray-400 mb-4">
                  Equivalent to ${(plan.monthlyPrice * 0.844).toFixed(2)}/mo — save 16.6%
                </div>
              )}
              <p className="text-gray-300 mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <span className="text-cyan-400 mr-2">✔</span> {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Pricing;
