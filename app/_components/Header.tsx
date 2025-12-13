import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div>
      <Image src={"/logo.png"} alt="logo" width={40} height={40} />
    </div>
  );
}

export default Header;
