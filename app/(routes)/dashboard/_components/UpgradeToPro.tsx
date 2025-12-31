"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function UpgradeToPro() {
  const { has } = useAuth();
  const hasPremiumAccess = has && has({ plan: "pro" });
  return (
    !hasPremiumAccess && (
      <div
        className="
        w-full max-w-sm
        flex flex-col items-center gap-4
        p-6 sm:p-8
        border-4 border-zinc-700
        rounded-2xl
        bg-zinc-900
        text-center
        transition-all duration-300
        hover:scale-[1.02]
        hover:border-yellow-400
      "
      >
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="CodeTree Pro Logo"
          width={70}
          height={70}
          className="select-none"
        />

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Upgrade to Pro
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          Join the Pro Membership and unlock
          <span className="text-white"> all courses</span>, exclusive content,
          and future updates.
        </p>

        {/* CTA */}
        <Link href="/pricing" className="w-full">
          <Button
            variant="pixel"
            size="lg"
            className="
            w-full font-semibold
            text-base sm:text-lg
          "
          >
            Upgrade Now 🚀
          </Button>
        </Link>
      </div>
    )
  );
}

export default UpgradeToPro;
