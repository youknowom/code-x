import { Button } from "@/components/ui/button";
import Image from "next/image";

function Header() {
  return (
    <div className="p-4 max-w-7xl flex justify-center items-center w-full">
      <div className="flex gap-2 items-center cursor-pointer">
        <Image src={"/logo.png"} alt="logo" width={40} height={40} />
        <h2 className="font-bold text-2xl font-game">CodeTree</h2>
      </div>
      {/* Navbar */}

      {/* Signuo Button */}
      <Button className="font-game text-2xl" variant={"pixel"}>
        Signup
      </Button>
    </div>
  );
}

export default Header;
