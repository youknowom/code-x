import React from "react";
import { Course } from "../../_components/CourseList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  loading: boolean;
  courseDetail: Course | undefined;
};

function CourseChapter({ loading, courseDetail }: Props) {
  // Loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="w-full h-[100px] rounded-2xl" />
        <Skeleton className="w-full h-[100px] rounded-2xl" />
        <Skeleton className="w-full h-[100px] rounded-2xl" />
      </div>
    );
  }

  // No chapters
  if (!courseDetail?.chapters?.length) {
    return <p className="text-muted-foreground">No chapters available</p>;
  }

  return (
    <Accordion type="single" collapsible>
      {courseDetail.chapters.map((chapter, index) => (
        <AccordionItem key={index} value={`chapter-${index}`}>
          <AccordionTrigger>{chapter?.name}</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default CourseChapter;
