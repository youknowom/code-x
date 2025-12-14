import Image from "next/image";
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
      </div>
    </div>
  );
}

export default Hero;
