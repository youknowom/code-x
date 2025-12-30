"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseDetailbanner from "./_components/CourseDetailbanner";
import { Course } from "../_components/CourseList";
import CourseChappter from "./_components/CourseChappter";
import CourseStatus from "./_components/CourseStatus";
import UpgradeToPro from "../../dashboard/_components/UpgradeToPro";
import CommunityHelpSection from "./_components/CommunityHelpSection";

function CourseDetail() {
  const params = useParams();
  const courseId = params?.courseId as string;

  const [courseDetail, setCourseDetail] = useState<Course | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) getCourseDetail();
  }, [courseId]);

  const getCourseDetail = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/course?courseId=${courseId}`);
      setCourseDetail(res.data);
    } catch (error) {
      // Error handled by UI feedback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <CourseDetailbanner
        loading={loading}
        courseDetail={courseDetail}
        refreshData={getCourseDetail}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 px-4 sm:px-6 md:px-12 lg:px-24 py-8 lg:py-12 max-w-[1600px] mx-auto">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <CourseChappter
            loading={loading}
            courseDetail={courseDetail}
            refreshData={getCourseDetail}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-6 lg:self-start space-y-6">
          <CourseStatus courseDetail={courseDetail} loading={loading} />
          <UpgradeToPro />
          <CommunityHelpSection />
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
