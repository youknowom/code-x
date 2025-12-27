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

type Props = {
  loading: boolean;
  courseDetail: Course | undefined;
  refreshData: () => void;
};

function CourseChapter({ loading, courseDetail, refreshData }: Props) {
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
      console.error(error);
      toast.error("Failed to complete exercise");
    } finally {
      setCompletingExercise(null);
    }
  };

  const EnableExercise = (
    chapterIndex: number,
    exerciseIndex: number,
    chapterExercisesLength: number
  ) => {
    const completed = courseDetail?.completedExcercises;

    // If nothing is completed, enable FIRST exercise ONLY
    if (!completed || completed.length === 0) {
      return chapterIndex === 0 && exerciseIndex === 0;
    }

    // last completed
    const last = completed[completed.length - 1];

    // Convert to global exercise number
    const currentExerciseNumber =
      chapterIndex * chapterExercisesLength + exerciseIndex + 1;

    const lastCompletedNumber =
      (last.chapterId - 1) * chapterExercisesLength + last.exerciseId;

    return currentExerciseNumber === lastCompletedNumber + 2;
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
    <div className="p-6 border-2 border-zinc-800 rounded-2xl bg-zinc-900">
      <Accordion type="single" collapsible className="space-y-3">
        {courseDetail.chapters.map((chapter, index) => (
          <AccordionItem
            key={index}
            value={`chapter-${index}`}
            className="border border-zinc-800 rounded-xl overflow-hidden"
          >
            <AccordionTrigger className="flex items-center gap-4 px-4 py-4 hover:bg-zinc-800 transition">
              {/* Chapter Number */}
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-700 text-white font-bold">
                {index + 1}
              </div>

              {/* Chapter Title */}
              <span className="text-xl font-semibold text-left flex-1">
                {chapter?.name}
              </span>
            </AccordionTrigger>

            <AccordionContent className="px-6 py-4 text-gray-400 bg-zinc-950">
              <div className="p-7 bg-zinc-900 rounded-2xl">
                {chapter?.exercises.map((exc, indexExc) => (
                  <div
                    key={`${chapter.chapterId}-${indexExc}`}
                    className="flex items-center justify-between mb-7"
                  >
                    <div className="flex items-center gap-10 font-game">
                      <h2 className="text-3xl">Excercise {indexExc + 1}</h2>
                      <h2 className="text-3xl">{exc.name}</h2>
                    </div>

                    {isExerciseComplted(chapter?.chapterId, indexExc + 1) ? (
                      <Button
                        variant={"pixel"}
                        className="bg-green-600"
                        disabled
                      >
                        Completed
                      </Button>
                    ) : EnableExercise(
                        index,
                        indexExc,
                        chapter?.exercises?.length
                      ) ? (
                      <Button
                        variant={"pixel"}
                        onClick={() =>
                          handleCompleteExercise(
                            chapter?.chapterId,
                            indexExc + 1,
                            exc?.xp
                          )
                        }
                        disabled={
                          completingExercise ===
                          `${chapter?.chapterId}-${indexExc + 1}`
                        }
                      >
                        {completingExercise ===
                        `${chapter?.chapterId}-${indexExc + 1}` ? (
                          <Loader2Icon className="animate-spin" />
                        ) : (
                          `${exc?.xp}xp`
                        )}
                      </Button>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="pixelDisabled">???</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-game text-lg">
                            {courseDetail?.userEnrolled
                              ? "Complete previous exercises first"
                              : "Please Enroll First"}
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
