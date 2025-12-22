// import CourseChappter from "@/app/(routes)/courses/[courseId]/_components/CourseChappter";
// import { db } from "@/config/db";
// import { courseChaptersTable, coursesTable } from "@/config/schema";
// import { eq } from "drizzle-orm";
// import { NextRequest, NextResponse } from "next/server";

import { db } from "@/config/db";
import { courseChaptersTable, coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const courseId = searchParams.get("courseId");
//   if (courseId) {
//     const parsedCourseId = parseInt(courseId, 10);
//     const result = await db
//       .select()
//       .from(coursesTable)
//       .where(eq(coursesTable.courseId, parsedCourseId));
//     const chapterResult = await db.select().from(courseChaptersTable).where(eq);
//     return NextResponse.json(result[0]);
//   } else {
//     const result = await db.select().from(coursesTable);

//     return NextResponse.json(result);
//   }
// }

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseid");

  if (courseId) {
    const result = await db
      .select()
      .from(coursesTable)
      //@ts-ignore
      .where(eq(coursesTable.courseId, courseId));
    const chapterResult = await db
      .select()
      .from(courseChaptersTable)
      //@ts-ignore
      .where(eq(courseChaptersTable.courseId, courseId));
    return NextResponse.json({ ...result[0], chapters: chapterResult });
  } else {
    //fetch all courses

    const result = await db.select().from(coursesTable).orderBy;

    return NextResponse.json(result);
  }
}
