"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export type Course = {
  id: number;
  courseId: number;
  title: string;
  description: string;
  bannerImage: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  tags?: string;
  chapters?: chapter[];
  userEnrolled?: boolean;
  courseEnrolledInfo?: courseEnrolledInfo;
  completedExcercises: completedExcercises[];
};

type completedExcercises = {
  chapterId: number;
  courseId: number;
  exerciseId: number;
};
type courseEnrolledInfo = {
  xpEarned: number;
  enrolledDate: any;
};
type chapter = {
  chapterId: number;
  courseId: number;
  description: string;
  name: string;
  id: number;
  exercises: exercises[];
};

type exercises = {
  name: string;
  slug: string;
  xp: number;
  difficulty: string;
};
const levelColorMap: Record<NonNullable<Course["level"]>, string> = {
  Beginner: "bg-green-600",
  Intermediate: "bg-yellow-500 text-black",
  Advanced: "bg-red-600",
};

function CourseList() {
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/course");
      setCourseList(res.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-[260px] bg-zinc-800 animate-pulse rounded-xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courseList.map((course) => (
        <Link
          key={course.id}
          href={`/courses/${course.id}`}
          className="
          border rounded-xl overflow-hidden
          bg-zinc-900
          hover:scale-[1.02]
          transition cursor-pointer
          block
        "
        >
          {/* Image */}
          <div className="relative">
            <Image
              src={course.bannerImage}
              alt={course.title}
              width={400}
              height={220}
              className="w-full h-[220px] object-cover"
            />

            {/* LEVEL BADGE */}
            {course.level && (
              <span
                className={`
                absolute top-3 left-3
                px-3 py-1
                text-xs font-semibold
                rounded-full
                text-white
                shadow-md
                ${levelColorMap[course.level]}
              `}
              >
                {course.level}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h2 className="font-game text-xl mb-2">{course.title}</h2>

            <p className="text-gray-400 text-sm line-clamp-2">
              {course.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CourseList;
