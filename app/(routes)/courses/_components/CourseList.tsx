"use client";
import axios from "axios";
import React, { useEffect } from "react";

function CourseList() {
  useEffect(() => {
    GetAllCourse();
  }, []);

  const GetAllCourse = async () => {
    const result = await axios.get("/api/course");
    console.log(result);
  };
  return <div>CourseList</div>;
}

export default CourseList;
