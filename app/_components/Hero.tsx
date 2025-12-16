import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image src="/bg.gif" alt="hero" fill className="object-cover" priority />

      <div className="absolute mt-24 flex w-full flex-col items-center">
        <h2 className="font-game text-7xl font-bold">Start</h2>

        <h2
          className="font-game text-8xl font-bold leading-none text-yellow-400"
          style={{ textShadow: "2px 2px 0 #000, -2px -2px 0 #000" }}
        >
          Coding Adventure
        </h2>

        <h2 className="mt-5 font-game text-3xl">
          beginner-friendly coding courses and projects
        </h2>

        <Link href="/sign-up">
          <Button className="mt-6 font-game text-3xl p-6" variant="pixel">
            GET STARTED
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
