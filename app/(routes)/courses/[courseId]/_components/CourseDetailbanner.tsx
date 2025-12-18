import React from "react";
import { Course } from "../../_components/CourseList";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
type Props = {
  loading: boolean;
  courseDetail: Course | undefined;
};
function CourseDetailbanner({ loading, courseDetail }: Props) {
  if (loading) {
    return <Skeleton className="w-full h-[350px] rounded-2xl" />;
  }

  if (!courseDetail) {
    return <Skeleton className="w-full h-[350px] rounded-2xl" />;
  }

  const bannerSrc = courseDetail.bannerImage?.trim();

  return (
    <div>
      {bannerSrc ? (
        <Image
          src={bannerSrc}
          alt={courseDetail.title}
          width={1400}
          height={300}
          className="w-full h-[350px] object-cover rounded-2xl"
        />
      ) : (
        <Skeleton className="w-full h-[350px] rounded-2xl" />
      )}
    </div>
  );
}

export default CourseDetailbanner;
