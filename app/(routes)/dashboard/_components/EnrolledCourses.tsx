"use client";

import Image from "next/image";
import React, { useState } from "react";

function EnrolledCourses() {
  const [EnrolledCourses, setEnrolledCourses] = useState([]);

  return (
    <div>
      {EnrolledCourses?.length == 0 ? (
        <div>
          <Image src={"/book.png"} alt="book" width={90} height={90} />
        </div>
      ) : (
        <div>List</div>
      )}
    </div>
  );
}

export default EnrolledCourses;
