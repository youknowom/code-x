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
    </div>
  );
}

export default Hero;
