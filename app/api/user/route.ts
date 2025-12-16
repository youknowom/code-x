import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  //If user already exists?

  const users = await db
    .select()
    .from(usersTable)
    //@ts-ignore
    .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));
  //if not then create user record
  if (users?.length <= 0) {
    const data = {
      name: user?.fullName ?? "",
      email: user?.primaryEmailAddress?.emailAddress ?? "",
    };

    const result = await db.insert(usersTable).values(data);
  }
  //return user info
}
