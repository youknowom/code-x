import React, { useState } from "react";
import Image from "next/image";
import { Course } from "../../_components/CourseList";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { tr } from "date-fns/locale";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

type Props = {
  loading: boolean;
  courseDetail: Course | undefined;
  refreshData: () => void;
};

function CourseDetailbanner({ loading, courseDetail, refreshData }: Props) {
  if (loading) {
    return <Skeleton className="w-full h-[350px] rounded-2xl" />;
  }

  if (!courseDetail) {
    return null;
  }
  const [loading_, setLoading_] = useState(false);
  const EnrolledCourse = async () => {
    setLoading_(true);
    const result = await axios.post("/api/enroll-course", {
      courseId: courseDetail?.courseId,
    });
    toast.success("course enrolled!");
    refreshData(true);
    setLoading_(false);
  };
  // ✅ Use cookie.png as fallback
  const imageSrc =
    courseDetail.bannerImage && courseDetail.bannerImage.trim() !== ""
      ? courseDetail.bannerImage
      : "/cookie.png";

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

        {!courseDetail?.userEnrolled ? (
          <Button
            variant="pixel"
            className="font-game text-2xl mt-7"
            size="lg"
            disabled={loading_}
            onClick={EnrolledCourse}
          >
            {loading_ && <Loader2Icon className="animate-spin" />}
            Enroll Now
          </Button>
        ) : (
          <Button className="text-2xl mt-7" size={"lg"} variant={"pixel"}>
            Continue Learning{" "}
          </Button>
        )}
      </div>
    </div>
  );
}

export default CourseDetailbanner;
