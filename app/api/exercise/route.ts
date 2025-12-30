import { db } from "@/config/db";
import {
  completedExercisesTable,
  courseChaptersTable,
  coursesTable,
  exercisesTable,
} from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { courseId, chapterId, exerciseId } = await req.json();

  const courseInfo = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.courseId, chapterId));
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
  const completedExercise = await db
    .select()
    .from(completedExercisesTable)
    .where(
      and(
        eq(completedExercisesTable?.courseId, courseId),
        eq(completedExercisesTable?.chapterId, chapterId)
      )
    );

  return NextResponse.json({
    ...courseResult[0],
    ExerciseData: {
      chapterId: exercise?.chapterId,
      courseId: exercise?.courseId,
      exerciseId: exercise?.exerciseId,
      exerciseName: exercise?.exerciseName,
      exerciseContent: exercise?.exercisesContent,
      completedExercise: completedExercise,
      editorType: courseInfo[0]?.editorType,
    },
  });
}
