import { db } from "@/config/db";
import { courseChaptersTable, exercisesTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { courseId, chapterId, exerciseId } = await req.json();

  const courseResult = await db
    .select()
    .from(courseChaptersTable)
    .where(
      and(
        eq(courseChaptersTable.courseId, courseId),
        eq(courseChaptersTable.chapterId, chapterId)
      )
    );

  const exerciseResult = await db
    .select()
    .from(exercisesTable)
    .where(
      and(
        eq(exercisesTable.chapterId, chapterId),
        eq(exercisesTable.exerciseId, exerciseId)
      )
    );

  const exercise = exerciseResult[0];

  return NextResponse.json({
    ...courseResult[0],
    ExerciseData: {
      chapterId: exercise?.chapterId,
      courseId: exercise?.courseId,
      exerciseId: exercise?.exerciseId,
      exerciseName: exercise?.exerciseName,
      exerciseContent: exercise?.exercisesContent,
    },
  });
}
