import { db } from "@/config/db";
import {
  completedExercisesTable,
  usersTable,
  courseChaptersTable,
  enrolledCoursesTable,
} from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { courseId, chapterId, exerciseId, xpEarned } = await req.json();
    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Get or create user in database
    let dbUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.primaryEmailAddress.emailAddress))
      .limit(1);

    if (!dbUser || dbUser.length === 0) {
      const newUser = await db
        .insert(usersTable)
        .values({
          email: user.primaryEmailAddress.emailAddress,
          name: user.fullName || user.firstName || "User",
        })
        .returning();
      dbUser = newUser;
    }

    // Get the actual chapter table ID (not logical chapterId)
    const chapter = await db
      .select()
      .from(courseChaptersTable)
      .where(
        and(
          eq(courseChaptersTable.courseId, courseId),
          eq(courseChaptersTable.chapterId, chapterId)
        )
      )
      .limit(1);

    if (!chapter || chapter.length === 0) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    // Check if already completed
    const existing = await db
      .select()
      .from(completedExercisesTable)
      .where(
        and(
          eq(completedExercisesTable.userId, dbUser[0].id),
          eq(completedExercisesTable.courseId, courseId),
          eq(completedExercisesTable.chapterId, chapter[0].id),
          eq(completedExercisesTable.exerciseId, exerciseId)
        )
      )
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json({
        alreadyCompleted: true,
        message: "Exercise already completed",
      });
    }

    // Insert completion record
    const result = await db
      .insert(completedExercisesTable)
      .values({
        chapterId: chapter[0].id, // Use actual DB id, not logical chapterId
        courseId: courseId,
        exerciseId: exerciseId,
        userId: dbUser[0].id,
      })
      .returning();

    //Update Course XP Earned
    await db
      .update(enrolledCoursesTable)
      .set({ xpEarned: sql`${enrolledCoursesTable.xpEarned}+${xpEarned}` })
      .where(eq(enrolledCoursesTable?.courseId, courseId));

    //Update User XP Earn Points
    await db
      .update(usersTable)
      .set({
        points: sql`${usersTable.points}+${xpEarned}`,
      })
      .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));
    return NextResponse.json({
      success: true,
      alreadyCompleted: false,
      data: result,
    });
  } catch (error: any) {
    console.error("Error completing exercise:", error);
    return NextResponse.json(
      {
        error: "Failed to complete exercise",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
