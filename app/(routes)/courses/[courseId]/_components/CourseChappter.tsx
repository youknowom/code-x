// import React from "react";
// import { Course } from "../../_components/CourseList";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Skeleton } from "@/components/ui/skeleton";

// type Props = {
//   loading: boolean;
//   courseDetail: Course | undefined;
// };

// function CourseChapter({ loading, courseDetail }: Props) {
//   // Loading state
//   if (loading) {
//     return (
//       <div className="space-y-4">
//         <Skeleton className="w-full h-[100px] rounded-2xl" />
//         <Skeleton className="w-full h-[100px] rounded-2xl" />
//         <Skeleton className="w-full h-[100px] rounded-2xl" />
//       </div>
//     );
//   }

//   // No chapters
//   if (!courseDetail?.chapters?.length) {
//     return (
//       <div className="p-5 border-4 rounded-2xl">
//         <p className="text-muted-foreground">No chapters available</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-5 border-4 rounded-2xl">
//       <Accordion type="single" collapsible>
//         {courseDetail.chapters.map((chapter, index) => (
//           <AccordionItem key={index} value={`chapter-${index}`}>
//             <AccordionTrigger className="p-3 hover:bg-zinc-800 text-3xl">
//               {" "}
//               <div>
//                 <h2 className="h-12 p-2  w-10 rounded-full bg-zinc-700">
//                   {index + 1}
//                 </h2>
//               </div>
//               {chapter?.name}
//             </AccordionTrigger>
//             <AccordionContent>
//               Yes. It adheres to the WAI-ARIA design pattern.
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </div>
//   );
// }

// export default CourseChapter;

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
              <div>
                {chapter?.exercises.map((exc, index) => (
                  <div key={index}>
                    <div>
                      <h2>Excercise {index + 1}</h2>
                      <h2>{exc.name}</h2>
                    </div>
                    <Button variant={"pixel"}>{exc?.xp}xp</Button>
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
