import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

function InviteFriend() {
  return (
    <div className="flex flex-col items-center mt-8 p-6 border-2 rounded-xl shadow-lg bg-card">
      <Image src={"/mail.png"} alt="mail" width={80} height={80} />
      <h2 className="text-2xl font-bold mt-4">Invite a Friend</h2>
      <p className="text-center text-muted-foreground mt-2 max-w-md">
        Having fun? Share the love with a friend! Enter their email and we'll
        send them a personal invite.
      </p>
      <div className="flex gap-2 items-center mt-5 w-full max-w-md">
        <Input placeholder="Enter friend's email" className="flex-1" />
        <Button variant={"pixel"} className="font-semibold">
          Invite
        </Button>
      </div>
    </div>
  );
}

export default InviteFriend;
