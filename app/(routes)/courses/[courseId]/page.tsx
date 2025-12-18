"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import CourseDetailbanner from "./_components/CourseDetailbanner";
import axios from "axios";

function CourseDetail() {
  const { courseId } = useParams();

  useEffect(() => {
    courseId && GetCourseDetail();
  }, [courseId]);
  const GetCourseDetail = async () => {
    const result = await axios.get("/api/course?courseid=" + courseId);
  };

  return (
    <div>
      <CourseDetailbanner />
    </div>
  );
}

export default CourseDetail;
