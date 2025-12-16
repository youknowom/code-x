"use client";

import React, { useState } from "react";

function EnrolledCourses() {
  const [EnrolledCourses, setEnrolledCourses] = useState([]);

  return (
    <div>
      {EnrolledCourses?.length == 0 ? <div>Empty</div> : <div>List</div>}
    </div>
  );
}

export default EnrolledCourses;
