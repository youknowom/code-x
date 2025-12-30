import Image from "next/image";
import React from "react";
import CourseList from "./_components/CourseList";

export default function Page() {
  return (
    <div>
      {/* Banner */}
      <div className="relative w-full h-[300px] md:h-[380px]">
        <Image
          src="/course-banner.gif"
          alt="Course banner"
          fill
          unoptimized
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-24 lg:px-36 bg-linear-to-r from-black/90 via-black/60 to-transparent">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white">
            Explore All Courses
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mt-4 max-w-2xl">
            Discover courses to learn, build skills, and advance your career.
          </p>
        </div>
      </div>

      {/* Course List */}
      <div className="mt-10 px-6 sm:px-10 md:px-24 lg:px-36">
        <h2 className="text-4xl font-bold mb-6">All Courses</h2>
        <CourseList />
      </div>
    </div>
  );
}
