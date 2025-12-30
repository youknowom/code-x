import React from "react";
import { EnrolledCourseInfo } from "./EnrolledCourses";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

type Props = { courses: EnrolledCourseInfo };

function CourseProgressCard({ courses }: Props) {
  return (
    <Link href={"/courses/" + courses?.courseId}>
      <div className="border-4 object-cover rounded-t-xl">
        <Image
          src={courses?.bannerImage?.trimEnd()}
          alt={courses?.title}
          width={500}
          height={500}
          className="w-full h-[150px] rounded-xl object-cover"
        />
        <div className="font-game">
          <h2 className="text-lg font-thin">Course</h2>
          <h2 className="text-3xl">{courses?.title}</h2>
          <h2>
            {courses?.completedExercises}Completed
            <span>out of{courses?.totalExercises}</span>
          </h2>
          <Progress
            value={(courses?.completedExercises / courses?.totalExercises) * 1}
          />
        </div>
      </div>
    </Link>
  );
}

export default CourseProgressCard;
