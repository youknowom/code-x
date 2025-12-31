import React, { useState } from "react";
import { Course } from "../../_components/CourseList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { fireConfetti } from "@/components/ConfettiBlast";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

type Props = {
  loading: boolean;
  courseDetail: Course | undefined;
  refreshData: () => void;
};

function CourseChapter({ loading, courseDetail, refreshData }: Props) {
  const { has } = useAuth();
  const hasPremiumAccess = has && has({ plan: "pro" });

  const [completingExercise, setCompletingExercise] = useState<string | null>(
    null
  );

  const handleCompleteExercise = async (
    chapterId: number,
    exerciseId: number,
    xp: number
  ) => {
    const key = `${chapterId}-${exerciseId}`;
    setCompletingExercise(key);

    try {
      const res = await axios.post("/api/complete-exercise", {
        courseId: courseDetail?.courseId,
        chapterId,
        exerciseId,
        xpEarned: xp,
      });
      const alreadyCompleted = res.data?.alreadyCompleted;

      // Only celebrate on first-time completion
      if (!alreadyCompleted) {
        fireConfetti();
        toast.success(`Exercise completed! +${xp}xp earned!`);
      }

      refreshData();
    } catch (error) {
      // Error handled by UI feedback
      toast.error("Failed to complete exercise");
    } finally {
      setCompletingExercise(null);
    }
  };

  const EnableExercise = (
    currentChapterId: number,
    currentExerciseId: number
  ) => {
    // User must be enrolled to do exercises
    if (!courseDetail?.userEnrolled) {
      return false;
    }

    // Check if chapter requires premium (chapters 2+ need pro)
    if (!courseDetail.chapters) {
      return false;
    }

    const chapterIndex = courseDetail.chapters.findIndex(
      (ch) => ch.chapterId === currentChapterId
    );
    if (chapterIndex >= 2 && !hasPremiumAccess) {
      return false;
    }

    const completed = courseDetail?.completedExcercises;

    // If nothing is completed, enable FIRST exercise of FIRST chapter ONLY
    if (!completed || completed.length === 0) {
      const firstChapter = courseDetail.chapters?.[0];
      return (
        firstChapter &&
        currentChapterId === firstChapter.chapterId &&
        currentExerciseId === 1
      );
    }

    // Check if this exercise is already completed
    const isAlreadyCompleted = completed.find(
      (item) =>
        item.chapterId === currentChapterId &&
        item.exerciseId === currentExerciseId
    );
    if (isAlreadyCompleted) {
      return true; // Already completed, can access
    }

    // Find the last completed exercise
    const last = completed[completed.length - 1];

    // Check if this is the next exercise after the last completed one
    const lastCompletedChapter = courseDetail.chapters?.find(
      (ch) => ch.chapterId === last.chapterId
    );

    if (!lastCompletedChapter) return false;

    // If it's the next exercise in the same chapter
    if (currentChapterId === last.chapterId) {
      return currentExerciseId === last.exerciseId + 1;
    }

    // If it's the first exercise of the next chapter
    if (currentChapterId === last.chapterId + 1) {
      // Check if all exercises in previous chapter are completed
      const allPrevCompleted =
        lastCompletedChapter.exercises.length === last.exerciseId;
      return allPrevCompleted && currentExerciseId === 1;
    }

    return false;
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="w-full h-[100px] rounded-2xl" />
        ))}
      </div>
    );
  }

  // No chapters
  if (!courseDetail?.chapters?.length) {
    return (
      <div className="p-6 border-2 border-zinc-800 rounded-2xl bg-zinc-900">
        <p className="text-muted-foreground text-center">
          No chapters available
        </p>
      </div>
    );
  }

  const isExerciseComplted = (chapterId: number, exceriseId: number) => {
    const completeChapterse = courseDetail?.completedExcercises;

    const foundExercise = completeChapterse?.find(
      (item) => item.chapterId == chapterId && item.exerciseId == exceriseId
    );
    return foundExercise ? true : false;
  };

  return (
    <div className="p-6 border-2 border-zinc-800 rounded-2xl bg-zinc-900 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Course Chapters</h2>
      <Accordion type="single" collapsible className="space-y-4">
        {courseDetail.chapters.map((chapter, index) => (
          <AccordionItem
            key={index}
            value={`chapter-${index}`}
            className="border-2 border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between w-full">
              <AccordionTrigger className="flex items-center gap-4 px-6 py-5 hover:bg-zinc-800/50 transition-all">
                {/* Chapter Number */}
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-linear-to-br from-zinc-700 to-zinc-800 text-white font-bold text-lg shadow-md">
                  {index + 1}
                </div>

                {/* Chapter Title */}
                <span className="text-lg font-bold text-left flex-1">
                  {chapter?.name}
                </span>
              </AccordionTrigger>
              {!hasPremiumAccess && index >= 2 && (
                <div className="flex items-center gap-2 mr-4">
                  <span className="px-3 py-1 rounded-full bg-yellow-400 text-black text-sm font-bold">
                    PRO
                  </span>
                </div>
              )}
            </div>

            <AccordionContent className="px-6 py-6 bg-zinc-950">
              <div className="space-y-4">
                {chapter?.exercises.map((exc, indexExc) => (
                  <div
                    key={`${chapter.chapterId}-${indexExc}`}
                    className="flex items-center justify-between p-5 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-yellow-400">
                        {indexExc + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold truncate">
                          {exc.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Exercise {indexExc + 1}
                        </p>
                      </div>
                    </div>

                    {isExerciseComplted(chapter?.chapterId, indexExc + 1) ? (
                      <Button
                        variant={"pixel"}
                        className="bg-green-600 hover:bg-green-600"
                        disabled
                      >
                        ✓ Completed
                      </Button>
                    ) : EnableExercise(chapter?.chapterId, indexExc + 1) ? (
                      <Link
                        href={
                          "/courses/" +
                          courseDetail?.courseId +
                          "/" +
                          chapter?.chapterId +
                          "/" +
                          exc?.slug
                        }
                      >
                        <Button variant={"pixel"}>{exc?.xp}xp</Button>
                      </Link>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="pixelDisabled"
                            className="cursor-not-allowed"
                          >
                            🔒
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm font-medium">
                            {!courseDetail?.userEnrolled
                              ? "⚠️ Please enroll in this course to start learning"
                              : index >= 2 && !hasPremiumAccess
                              ? "⭐ Upgrade to Pro to unlock chapters 3+"
                              : "⚠️ Complete previous exercises first to unlock"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default CourseChapter;
