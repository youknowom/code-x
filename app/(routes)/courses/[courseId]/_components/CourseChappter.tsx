import React from "react";
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
type Props = {
  loading: boolean;
  courseDetail: Course | undefined;
};

function CourseChapter({ loading, courseDetail }: Props) {
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
                {chapter?.exercises.map((exc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mb-7"
                  >
                    <div className="flex items-center gap-10 font-game">
                      <h2 className="text-3xl">Excercise {index + 1}</h2>
                      <h2 className="text-3xl">{exc.name}</h2>
                    </div>
                    {/* <Button variant={"pixel"}>{exc?.xp}xp</Button> */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="pixelDisabled">???</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-game text-lg">please Enroll First</p>
                      </TooltipContent>
                    </Tooltip>
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
