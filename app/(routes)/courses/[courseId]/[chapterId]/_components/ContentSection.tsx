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
    <div className="p-10">
      {loading || !contentInfo ? (
        <Skeleton className="h-full w-full m-10 rounded-2xl" />
      ) : (
        <div>
          <h2 className="font-game text-3xl my-3">
            {courseExerciseData?.ExerciseData?.exerciseName}
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: contentInfo?.exerciseContent?.content,
            }}
          />

          <div className="mt-6">
            <h2 className="font-game text-3xl">Task</h2>
            <p className="mt-2 text-muted-foreground">
              {contentInfo?.exerciseContent?.task}
            </p>
            <div
              className="p-4 border-2xl bg-zinc-800"
              dangerouslySetInnerHTML={{
                __html: contentInfo?.exerciseContent?.task,
              }}
            />
          </div>

          <div>
            <h2 className="font-game text-3xl mt-4 flex gap-2 items-center text-yellow-400">
              <Lightbulb />
              Hint
            </h2>
            <div
              className="p-4 border rounded-2xl bg-zinc-800"
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
