import React from "react";
import { Course } from "../../_components/CourseList";
type Props = {
  loading: boolean;
  courseDetail: Course | undefined;
};
function CourseDetailbanner({ loading, courseDetail }: Props) {
  return <div>CourseDetailbanner</div>;
}

export default CourseDetailbanner;
