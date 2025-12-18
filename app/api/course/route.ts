import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseid");
  if (courseId) {
    const result = await db
      .select()
      .from(coursesTable)
      //@ts-ignore
      .where(eq(coursesTable.courseId, courseId));
    return NextResponse.json(result[0]);
  } else {
    const result = await db.select().from(coursesTable);

    return NextResponse.json(result);
  }
}
