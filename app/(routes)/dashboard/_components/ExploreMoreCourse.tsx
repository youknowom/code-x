import React from "react";
import CourseList from "../../courses/_components/CourseList";

function ExploreMoreCourse() {
  return (
    <div className="mt-12">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6">
        Explore Other Courses
      </h2>
      <CourseList smallerCard={true} />
    </div>
  );
}

export default ExploreMoreCourse;
