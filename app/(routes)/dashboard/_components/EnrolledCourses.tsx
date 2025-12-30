"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Course } from "../../courses/_components/CourseList";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import CourseProgressCard from "./CourseProgressCard";

export type EnrolledCourseInfo = {
  bannerImage: string;
  CourseDetail: number;
  completedExercises: number;
  title: string;
  level: string;
  totalExercises: number;
  xpEarned: number;
  courseId: number;
};
function EnrolledCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourseInfo[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetUserEnrolledCourse();
  }, []);
  const GetUserEnrolledCourse = async () => {
    setLoading(true);
    const result = await axios.get("/api/course?courseId=enrolled");
    setEnrolledCourses(result.data);
    setLoading(false);
  };
  return (
    <div className="mt-8">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-6">
        Your Enrolled Courses
      </h2>
      {loading && <Skeleton className="w-full h-[200px] rounded-2xl my-5" />}
      {!loading && enrolledCourses.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center gap-4 p-8 border rounded-2xl bg-zinc-900 text-center">
          <Image
            src="/books.png"
            alt="No courses"
            width={90}
            height={90}
            className="opacity-90"
          />
          <h2 className="text-lg text-gray-400">
            You don't have any enrolled courses yet
          </h2>
          <Link href="/courses">
            <Button variant="pixel" size="lg" className="font-semibold">
              Browse All Courses
            </Button>
          </Link>
        </div>
      ) : (
        /* Course List */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {enrolledCourses.map((course, index) => (
            <div key={index}>
              <CourseProgressCard courses={course} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EnrolledCourses;
