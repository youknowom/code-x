import React from "react";
import CourseList from "../../courses/_components/CourseList";

function ExploreMoreCourse() {
  return (
    <div>
      <h2 className="text-3xl sm:text-4xl font-game mb-4">
        Explore Other Courses
        <CourseList smallerCard={true} />
      </h2>
    </div>
  );
}

export default ExploreMoreCourse;
