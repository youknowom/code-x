"use client";

import Image from "next/image";
import React from "react";
import { useUser } from "@clerk/nextjs";

function WelcomeBanner() {
  const { user } = useUser();

  return (
    <div className="flex gap-4 items-center flex-wrap">
      <Image
        src="/machine.webp"
        alt="robo"
        width={120}
        height={120}
        className="rounded-lg"
      />

      <div className="flex-1 min-w-[250px]">
        <h2 className="text-2xl sm:text-3xl font-bold p-4 border-2 bg-zinc-800 rounded-xl rounded-bl-none shadow-lg">
          Welcome Back,{" "}
          <span className="text-yellow-400">{user?.fullName ?? "Learner"}</span>
          !
          <br />
          <span className="text-lg sm:text-xl text-gray-300 font-normal">
            Start Learning Something New 🚀
          </span>
        </h2>
      </div>
    </div>
  );
}

export default WelcomeBanner;
