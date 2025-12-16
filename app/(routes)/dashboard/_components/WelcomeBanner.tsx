import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

function WelcomeBanner() {
  return (
    <div>
      <Image src={"/machine.webp"} alt="robo" width={120} height={120}></Image>

      <h2>Welcome Back, {User?.fullname}</h2>
    </div>
  );
}

export default WelcomeBanner;
