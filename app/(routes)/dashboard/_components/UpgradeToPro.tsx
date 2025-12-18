import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function UpgradeToPro() {
  return (
    <div
      className="flex items-center flex-col p-5 border-4
     rounded-2xl"
    >
      <Image src={"/logo.png"} alt="logo" width={70} height={70} />
      <h2 className="text-3xl font-game">Upgrade to pro</h2>{" "}
      <p className="font-game text-gray-500 text-x text-center">
        Join Pro Membership and get all course accesee
      </p>
      <Link href={"/pricing"}>
        <Button className="font-game" variant={"pixel"} size={"lg"}>
          Upgrade
        </Button>
      </Link>
    </div>
  );
}

export default UpgradeToPro;
