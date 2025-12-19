import React from "react";
import { Course } from "../../_components/CourseList";

type Props = {
  loading: boolean;
  courseDetail: Course | undefined;
};

function CourseChappter({ loading, courseDetail }: Props) {
  return <div>CourseChappter</div>;
}

export default CourseChappter;
