import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const result = await db.select().from(coursesTable);

  return NextResponse.json(result);
}
