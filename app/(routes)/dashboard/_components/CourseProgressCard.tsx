import React from "react";
import { EnrolledCourseInfo } from "./EnrolledCourses";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

type Props = { courses: EnrolledCourseInfo };

function CourseProgressCard({ courses }: Props) {
  const progress = courses?.totalExercises
    ? (courses.completedExercises / courses.totalExercises) * 100
    : 0;

  return (
    <Link href={"/courses/" + courses?.courseId}>
      <div className="group border-2 border-zinc-800 rounded-xl overflow-hidden bg-zinc-900 hover:border-zinc-700 transition-all hover:shadow-lg hover:shadow-zinc-900/50">
        {/* Course Image */}
        <div className="relative overflow-hidden">
          <Image
            src={courses?.bannerImage?.trimEnd() || "/cookie.png"}
            alt={courses?.title}
            width={500}
            height={200}
            className="w-full h-[180px] object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Progress Badge */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-sm font-semibold text-yellow-400">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Course Info */}
        <div className="p-5 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Course
            </p>
            <h2 className="text-xl font-bold line-clamp-1">{courses?.title}</h2>
          </div>

          {/* Progress Stats */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold">
                {courses?.completedExercises || 0} /{" "}
                {courses?.totalExercises || 0} exercises
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* XP Badge */}
          {courses?.xpEarned > 0 && (
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
              <span className="text-yellow-400 text-sm">⭐</span>
              <span className="text-sm text-muted-foreground">
                {courses.xpEarned} XP Earned
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CourseProgressCard;
