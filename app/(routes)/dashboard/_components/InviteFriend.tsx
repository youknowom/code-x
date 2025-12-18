import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

function InviteFriend() {
  return (
    <div className="flex flex-col items-center mt-8 p-4 border rounded-xl">
      <Image src={"/mail.png"} alt="mail" width={80} height={80} />
      <h2 className="font-3xl font-game">Invite Frined</h2>{" "}
      <p>
        Having Fun? Share the love with a friend ! Enter an amil and we will
        send them a personal invite
      </p>
      <div>
        <Input placeholder="Enter Invite Email" />
        <Button variant={"pixel"} className="font-game">
          Invite
        </Button>
      </div>
    </div>
  );
}

export default InviteFriend;
