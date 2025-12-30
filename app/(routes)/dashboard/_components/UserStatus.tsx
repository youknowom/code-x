"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";

function UserStatus() {
  const { user } = useUser();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <div className="p-6 border-2 rounded-2xl shadow-lg bg-card">
      <div className="flex gap-3 items-center mb-6 pb-4 border-b">
        <Image
          src={"/alex_walk.gif"}
          alt="walking user"
          width={70}
          height={70}
          className="rounded-full"
        />
        <h2 className="text-lg font-semibold truncate">
          {user?.primaryEmailAddress?.emailAddress}
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex gap-3 items-center">
          <Image src={"/star.png"} alt="rewards" width={35} height={35} />
          <div>
            <h2 className="text-3xl font-bold">{userDetail?.points || 0}</h2>
            <p className="text-sm text-muted-foreground">Total Rewards</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Image src={"/badge.png"} alt="badges" width={35} height={35} />
          <div>
            <h2 className="text-3xl font-bold">20</h2>
            <p className="text-sm text-muted-foreground">Badges</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Image src={"/fire.png"} alt="streak" width={35} height={35} />
          <div>
            <h2 className="text-3xl font-bold">20</h2>
            <p className="text-sm text-muted-foreground">Daily Streak</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserStatus;
