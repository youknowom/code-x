import { PricingTable } from "@clerk/nextjs";
import React from "react";
import {
  CheckCircle2,
  Sparkles,
  Zap,
  Trophy,
  Lock,
  Unlock,
} from "lucide-react";
import { Card } from "@/components/ui/card";

function Pricing() {
  const features = [
    {
      title: "Unlimited Course Access",
      description: "Access all courses and future releases",
      icon: <Unlock className="w-5 h-5 text-yellow-400" />,
    },
    {
      title: "Exclusive Content",
      description: "Premium exercises and advanced topics",
      icon: <Sparkles className="w-5 h-5 text-yellow-400" />,
    },
    {
      title: "Priority Support",
      description: "Get help faster with dedicated support",
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
    },
    {
      title: "Earn More XP",
      description: "Unlock achievements and compete on leaderboards",
      icon: <Trophy className="w-5 h-5 text-yellow-400" />,
    },
  ];

  const freeFeatures = [
    "First 2 chapters of every course",
    "Basic exercises and tutorials",
    "Community access",
    "Progress tracking",
  ];

  const proFeatures = [
    "All course chapters unlocked",
    "Unlimited exercises & challenges",
    "Premium content & updates",
    "Priority support",
    "Exclusive community access",
    "Downloadable resources",
    "Certificate of completion",
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">
              Unlock Your Potential
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Choose Your Learning Path
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start learning for free, upgrade to Pro for unlimited access to all
            courses and exclusive content
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-zinc-900 border-2 border-zinc-800 hover:border-yellow-400/50 transition-all duration-300"
            >
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Free Plan */}
          <Card className="p-8 bg-zinc-900 border-2 border-zinc-800">
            <div className="text-center mb-6">
              <Lock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-gray-400">Perfect for getting started</p>
            </div>
            <div className="space-y-3">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Pro Plan */}
          <Card className="p-8 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 border-2 border-yellow-400 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full bg-yellow-400 text-black text-xs font-bold">
                POPULAR
              </span>
            </div>
            <div className="text-center mb-6">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-gray-300">Unlimited learning experience</p>
            </div>
            <div className="space-y-3">
              {proFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Pricing Table */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Ready to Upgrade?</h2>
            <p className="text-gray-400">Choose a plan that works for you</p>
          </div>
          <PricingTable />
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            All plans include a 30-day money-back guarantee. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
