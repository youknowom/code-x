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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CourseDetailbanner loading={loading} courseDetail={courseDetail} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 md:px-24 lg:px-36 py-10">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <CourseChappter loading={loading} courseDetail={courseDetail} />
        </div>

        {/* RIGHT */}
        <div className="lg:sticky lg:top-24 h-fit space-y-6">
          <CourseStatus courseDetail={courseDetail} />
          <UpgradeToPro />
          <CommunityHelpSection />
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
