"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseDetailbanner from "./_components/CourseDetailbanner";
import { Course } from "../_components/CourseList";

function CourseDetail() {
  const params = useParams();
  const courseId = params?.courseId as string;

  const [courseDetail, setCourseDetail] = useState<Course | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      getCourseDetail();
    }
  }, [courseId]);

  const getCourseDetail = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`/api/course?courseId=${courseId}`);
      setCourseDetail(result.data);
    } catch (error) {
      console.error("Failed to fetch course detail", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CourseDetailbanner loading={loading} courseDetail={courseDetail} />
    </div>
  );
}

export default CourseDetail;
