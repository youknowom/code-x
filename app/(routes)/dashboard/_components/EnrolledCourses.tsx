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
    GetUserEnrolledCourse;
  }, []);
  const GetUserEnrolledCourse = async () => {
    setLoading(true);
    const result = await axios.get("/api/course?.courseid=enrolled");
    setEnrolledCourses(result.data);
    setLoading(false);
  };
  return (
    <div className="mt-8">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-game mb-4">
        Your Enrolled Courses
      </h2>
      {loading && <Skeleton className="w-full rounded-2xl my-5" />}
      {enrolledCourses.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center gap-4 p-8 border rounded-2xl bg-zinc-900 text-center">
          <Image
            src="/books.png"
            alt="No courses"
            width={90}
            height={90}
            className="opacity-90"
          />
          <h2 className="font-game text-lg text-gray-300">
            You don’t have any enrolled courses yet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
            {enrolledCourses?.map((course, index) => {
              <div>
                <CourseProgressCard course-={course} />
              </div>;
            })}
          </div>
          :{" "}
          <Link href="/courses">
            <Button variant="pixel" size="lg" className="font-game">
              Browse All Courses
            </Button>
          </Link>
        </div>
      ) : (
        /* Course List (placeholder) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledCourses.map((course, index) => (
            <div key={index} className="p-4 border rounded-xl bg-zinc-800">
              Course Card
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EnrolledCourses;
