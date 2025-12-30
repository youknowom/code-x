import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image src="/bg.gif" alt="hero" fill className="object-cover" priority />

      <div className="absolute mt-24 flex w-full flex-col items-center px-4">
        <h2 className="text-5xl sm:text-7xl font-bold">Start Your</h2>

        <h2
          className="text-6xl sm:text-8xl font-extrabold leading-none text-yellow-400 mt-2"
          style={{ textShadow: "3px 3px 0 #000, -2px -2px 0 #000" }}
        >
          Coding Adventure
        </h2>

        <p className="mt-6 text-xl sm:text-3xl text-center max-w-3xl text-gray-200">
          Master coding with beginner-friendly courses and hands-on projects
        </p>

        <Link href="/sign-up">
          <Button
            className="mt-8 text-xl sm:text-2xl px-8 py-6 font-semibold"
            variant="pixel"
          >
            GET STARTED
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
