import { db } from "@/config/db";
import {
  completedExercisesTable,
  enrolledCoursesTable,
  usersTable,
} from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { courseId, chapterId, exerciseId, xpEarned } = await req.json();

  if (!courseId || !chapterId || !exerciseId || !xpEarned) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  if (!user || !email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user from database
  const dbUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!dbUser.length) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userId = dbUser[0].id;

  // Check if already completed
  const existingCompletion = await db
    .select()
    .from(completedExercisesTable)
    .where(
      and(
        eq(completedExercisesTable.userId, userId),
        eq(completedExercisesTable.courseId, courseId),
        eq(completedExercisesTable.chapterId, chapterId),
        eq(completedExercisesTable.exerciseId, exerciseId)
      )
    );

  if (existingCompletion.length > 0) {
    return NextResponse.json({ message: "Already completed" }, { status: 200 });
  }

  // Mark exercise as completed
  await db.insert(completedExercisesTable).values({
    courseId,
    chapterId,
    exerciseId,
    userId,
  });

  // Update XP in enrolled courses
  const enrolledCourse = await db
    .select()
    .from(enrolledCoursesTable)
    .where(
      and(
        eq(enrolledCoursesTable.userId, userId),
        eq(enrolledCoursesTable.courseId, courseId)
      )
    );

  if (enrolledCourse.length > 0) {
    const currentXp = enrolledCourse[0].xpEarned || 0;
    await db
      .update(enrolledCoursesTable)
      .set({ xpEarned: currentXp + xpEarned })
      .where(eq(enrolledCoursesTable.id, enrolledCourse[0].id));
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
