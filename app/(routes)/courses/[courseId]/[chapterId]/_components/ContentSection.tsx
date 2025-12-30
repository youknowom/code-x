import React from "react";
import { CourseExercise } from "../[exerciseslug]/page";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb } from "lucide-react";

type Props = {
  courseExerciseData: CourseExercise | undefined;
  loading: boolean;
};
function ContentSection({ courseExerciseData, loading }: Props) {
  const contentInfo = courseExerciseData?.ExerciseData;

  return (
    <div className="p-6 md:p-10 mb-28 max-w-4xl mx-auto">
      {loading || !contentInfo ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4 rounded-lg" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Exercise Title */}
          <div className="border-l-4 border-yellow-400 pl-6">
            <h1 className="text-3xl md:text-4xl font-bold">
              {courseExerciseData?.ExerciseData?.exerciseName}
            </h1>
          </div>

          {/* Exercise Content */}
          <div
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: contentInfo?.exerciseContent?.content,
            }}
          />

          {/* Task Section */}
          <div className="bg-zinc-900 border-2 border-zinc-800 rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-blue-400">🎯</span> Task
            </h2>
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: contentInfo?.exerciseContent?.task,
              }}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-yellow-500/5 border-2 border-yellow-500/20 rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-bold flex gap-2 items-center text-yellow-400">
              <Lightbulb className="w-6 h-6" />
              Hint
            </h2>
            <div
              className="prose prose-invert max-w-none text-gray-300"
              dangerouslySetInnerHTML={{
                __html: contentInfo?.exerciseContent?.hint,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentSection;
