import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="w-full relative h-screen overflow-hidden">
      <Image
        src={"/bg.gif"}
        alt="hero"
        width={1000}
        height={1000}
        className="w-full h-full object-cover absolute inset-0"
      ></Image>

      <div className="absolute w-full flex flex-col items-center mt-24">
        <h2 className="font-bold text-7xl font-game">Start</h2>
        <h2
          className=" font-game text-[48px] leading-[1] font-bold text-8xl font-game text-yellow-400"
          style={{ textShadow: "2px 2px 0 #000,-2px -2px 0 #000" }}
        >
          Coding Adventure
        </h2>
        <h2 className="mt-5 font-game text-3xl">
          beginner-friendly coding courses and projects
        </h2>
        <Link href={"/sing-up"}>
          <Button className="font-game text-3xl p-6" variant={"pixel"}>
            GET STARTED
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
