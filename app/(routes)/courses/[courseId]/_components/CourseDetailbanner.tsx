import React from "react";
import Image from "next/image";
import { Course } from "../../_components/CourseList";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type Props = {
  loading: boolean;
  courseDetail: Course | undefined;
};

function CourseDetailbanner({ loading, courseDetail }: Props) {
  if (loading) {
    return <Skeleton className="w-full h-[350px] rounded-2xl" />;
  }

  if (!courseDetail) {
    return null;
  }

  // ✅ Use cookie.png as fallback
  const imageSrc =
    courseDetail.bannerImage && courseDetail.bannerImage.trim() !== ""
      ? courseDetail.bannerImage
      : "/cookie.png";
  const EnrolledCourse = () => {};
  return (
    <div className="relative">
      <Image
        src={imageSrc}
        alt={courseDetail.title || "Course banner"}
        width={1400}
        height={300}
        className="w-full h-[350px] object-cover"
        priority
      />

      <div className="font-game absolute inset-0 pt-20 p-10 md:px-24 lg:px-36 bg-linear-to-r from-black/80 to-transparent">
        <h2 className="text-6xl">{courseDetail.title}</h2>

        <p className="text-3xl text-gray-300 mt-3">
          {courseDetail.description}
        </p>

        <Button
          variant="pixel"
          className="font-game text-2xl mt-7"
          size="lg"
          onClick={EnrolledCourse}
        >
          Enroll Now
        </Button>
      </div>
    </div>
  );
}

export default CourseDetailbanner;
