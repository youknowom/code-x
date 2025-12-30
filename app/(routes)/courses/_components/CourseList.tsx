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

export type completedExcercises = {
  chapterId: number;
  courseId: number;
  exerciseId: number;
};

export type courseEnrolledInfo = {
  xpEarned: number;
  enrolledDate: any;
};
export type chapter = {
  chapterId: number;
  courseId: number;
  description: string;
  name: string;
  id: number;
  exercises: exercises[];
};

export type exercises = {
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
type Props = {
  smallerCard?: boolean;
};
function CourseList({ smallerCard = false }: Props) {
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
      // Error handled by UI feedback
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
          className="group border-2 border-zinc-800 rounded-xl overflow-hidden bg-zinc-900 hover:border-zinc-600 hover:shadow-xl hover:shadow-zinc-900/50 transition-all duration-300 block"
        >
          {/* Image */}
          <div className="relative overflow-hidden">
            <Image
              src={course.bannerImage}
              alt={course.title}
              width={400}
              height={220}
              className={`w-full ${
                smallerCard ? "h-[120px]" : "h-[200px]"
              } object-cover transition-transform duration-300 group-hover:scale-110`}
            />

            {/* LEVEL BADGE */}
            {course.level && (
              <div className="absolute top-3 left-3">
                <span
                  className={`
                  inline-flex items-center gap-1
                  px-3 py-1.5
                  text-xs font-bold uppercase tracking-wider
                  rounded-full
                  text-white
                  shadow-lg backdrop-blur-sm
                  ${levelColorMap[course.level]}
                `}
                >
                  {course.level}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h2 className="text-xl font-bold mb-3 line-clamp-1 group-hover:text-yellow-400 transition-colors">
              {course.title}
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
              {course.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CourseList;
