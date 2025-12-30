import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Course } from "../../_components/CourseList";

type Props = {
  courseDetail: Course | undefined;
  loading: boolean;
};

function CourseStatus({ courseDetail, loading }: Props) {
  const [counts, setCounts] = useState({
    totalExce: 0,
    totalXp: 0,
  });

  useEffect(() => {
    if (courseDetail) getCounts();
  }, [courseDetail]);

  const getCounts = () => {
    let totalExercises = 0;
    let totalXp = 0;

    courseDetail?.chapters?.forEach((chapter: any) => {
      const exercises = chapter?.exercises || [];
      totalExercises += exercises.length;

      exercises.forEach((exc: any) => {
        totalXp += exc?.xp || 0;
      });
    });

    setCounts({
      totalExce: totalExercises,
      totalXp: totalXp,
    });
  };
  const UpdateProgress = (currentValue: number, totalValue: number) => {
    if (currentValue && totalValue) {
      const perc = (currentValue * 100) / totalValue;
      return perc;
    }
    return 0;
  };
  return (
    <div className="p-6 border-2 border-zinc-800 rounded-2xl bg-zinc-900 w-full shadow-lg space-y-6">
      <h2 className="text-2xl font-bold">Your Progress</h2>

      {/* Exercises */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <div className="shrink-0 w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
            <Image src="/book.png" alt="Exercises" width={32} height={32} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Exercises</span>
              <span className="text-sm font-bold">
                {courseDetail?.completedExcercises?.length || 0} /{" "}
                {counts.totalExce}
              </span>
            </div>
            <Progress
              value={UpdateProgress(
                courseDetail?.completedExcercises?.length ?? 0,
                counts?.totalExce
              )}
              className="h-3"
            />
          </div>
        </div>
      </div>

      {/* XP */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <div className="shrink-0 w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
            <Image src="/star.png" alt="XP" width={32} height={32} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">XP Earned</span>
              <span className="text-sm font-bold text-yellow-400">
                {courseDetail?.courseEnrolledInfo?.xpEarned || 0} /{" "}
                {counts.totalXp} XP
              </span>
            </div>
            <Progress
              value={UpdateProgress(
                courseDetail?.courseEnrolledInfo?.xpEarned ?? 0,
                counts.totalXp
              )}
              className="h-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseStatus;
