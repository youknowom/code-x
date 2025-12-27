import { db } from "@/config/db";
import {
  completedExercisesTable,
  courseChaptersTable,
  coursesTable,
  enrolledCoursesTable,
  usersTable,
} from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");
  const user = await currentUser();

  if (courseId) {
    const parsedCourseId = parseInt(courseId, 10);
    const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseId, parsedCourseId));
    const chapterResult = await db
      .select()
      .from(courseChaptersTable)
      .where(eq(courseChaptersTable.courseId, parsedCourseId));

    let isEnrolledCourse = false;
    let enrollCourse: any[] = [];
    let completedExcercises: any[] = [];

    if (user?.primaryEmailAddress?.emailAddress) {
      const dbUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, user.primaryEmailAddress.emailAddress));

      if (dbUser.length > 0) {
        enrollCourse = await db
          .select()
          .from(enrolledCoursesTable)
          .where(
            and(
              eq(enrolledCoursesTable.courseId, parsedCourseId),
              eq(enrolledCoursesTable.userId, dbUser[0].id)
            )
          );
        isEnrolledCourse = enrollCourse?.length > 0 ? true : false;

        // Fetch completed exercises using numeric IDs
        completedExcercises = await db
          .select()
          .from(completedExercisesTable)
          .where(
            and(
              eq(completedExercisesTable.courseId, parsedCourseId),
              eq(completedExercisesTable.userId, dbUser[0].id)
            )
          )
          .orderBy(
            desc(completedExercisesTable.courseId),
            desc(completedExercisesTable.exerciseId)
          );
      }
    }
    return NextResponse.json({
      ...result[0],
      chapters: chapterResult,
      userEnrolled: isEnrolledCourse,
      courseEnrolledInfo: enrollCourse[0],
      completedExcercises: completedExcercises,
    });
  } else {
    //fetch all courses
    const result = await db.select().from(coursesTable);
    return NextResponse.json(result);
  }
}
