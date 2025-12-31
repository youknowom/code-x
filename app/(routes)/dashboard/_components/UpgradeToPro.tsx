"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Sparkles, Lock, Zap, Trophy } from "lucide-react";

function UpgradeToPro() {
  const { has } = useAuth();
  const hasPremiumAccess = has && has({ plan: "pro" });

  const proFeatures = [
    { icon: <Lock className="w-4 h-4" />, text: "Unlock all chapters" },
    { icon: <Sparkles className="w-4 h-4" />, text: "Exclusive content" },
    { icon: <Zap className="w-4 h-4" />, text: "Priority support" },
    { icon: <Trophy className="w-4 h-4" />, text: "Earn more XP" },
  ];

  return (
    !hasPremiumAccess && (
      <div
        className="
        w-full max-w-sm
        flex flex-col items-center gap-4
        p-6 sm:p-8
        border-4 border-zinc-700
        rounded-2xl
        bg-gradient-to-br from-zinc-900 to-zinc-950
        text-center
        transition-all duration-300
        hover:scale-[1.02]
        hover:border-yellow-400
        hover:shadow-2xl hover:shadow-yellow-400/20
        relative overflow-hidden
      "
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent pointer-events-none" />

        {/* Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 rounded-full bg-yellow-400 text-black text-xs font-bold">
            POPULAR
          </span>
        </div>

        {/* Logo */}
        <Image
          src="/logo.png"
          alt="CodeTree Pro Logo"
          width={70}
          height={70}
          className="select-none relative z-10"
        />

        {/* Title */}
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Upgrade to Pro
          </h2>
          <p className="text-yellow-400 text-sm font-semibold">
            First 2 chapters free ✨
          </p>
        </div>

        {/* Features List */}
        <div className="w-full space-y-2 my-2 relative z-10">
          {proFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-left text-sm text-gray-300"
            >
              <span className="text-yellow-400">{feature.icon}</span>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed relative z-10">
          Unlock{" "}
          <span className="text-yellow-400 font-semibold">
            unlimited access
          </span>{" "}
          to all courses, chapters 3+, and premium features
        </p>

        {/* CTA */}
        <Link href="/pricing" className="w-full relative z-10">
          <Button
            variant="pixel"
            size="lg"
            className="
            w-full font-semibold
            text-base sm:text-lg
            bg-yellow-400 hover:bg-yellow-500
            text-black
          "
          >
            Upgrade Now 🚀
          </Button>
        </Link>

        {/* Additional info */}
        <p className="text-xs text-gray-500 relative z-10">
          Cancel anytime • 30-day money-back guarantee
        </p>
      </div>
    )
  );
}

export default UpgradeToPro;
