import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div>
      <Image src={"/logo.png"} alt="logo" width={40} height={40} />{" "}
      <h2 className="font-bold text-2xl font-game">CodeTree</h2>
    </div>
  );
}

export default Header;
