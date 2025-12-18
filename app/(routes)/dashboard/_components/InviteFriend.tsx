import Image from "next/image";
import React from "react";

function InviteFriend() {
  return (
    <div>
      <Image src={"/mail.png"} alt="mail" width={80} height={80} />
      <h2 className="font-3xl font-game">Invite Frined</h2>{" "}
      <p>
        Having Fun? Share the love with a friend ! Enter an amil and we will
        send them a personal invite
      </p>
    </div>
  );
}

export default InviteFriend;
