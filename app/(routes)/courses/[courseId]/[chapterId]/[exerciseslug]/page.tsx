"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-splitter-layout/lib/index.css";
import axios from "axios";
import { exercises } from "../../../_components/CourseList";
import ContentSection from "../_components/ContentSection";
import CodeEditor from "../_components/CodeEditor";

export type CourseExercise = {
  chapterId: number;
  courseId: number;
  desc: string;
  name: string;
  exercises: exercises[];
  ExerciseData: ExerciseData;
};
type ExerciseData = {
  chapterId: number;
  courseId: number;
  exerciseId: string;
  exerciseName: string;
  exerciseContent: ExerciseContent;
};

type ExerciseContent = {
  content: string;
  hint: string;
  hintXp: string;
  startCode: any;
  task: string;
};
const SplitterLayout = dynamic(() => import("react-splitter-layout"), {
  ssr: false,
});

function playground() {
  //
  const { courseId, chapterId, exerciseslug } = useParams();
  const [loading, setLoading] = useState(false);

  const [courseExerciseData, setCourseExerciseData] =
    useState<CourseExercise>();
  useEffect(() => {
    GetExerciseCourseDetail();
  }, [courseId, chapterId, exerciseslug]);

  const GetExerciseCourseDetail = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/exercise", {
        courseId: parseInt(courseId as string),
        chapterId: parseInt(chapterId as string),
        exerciseId: exerciseslug,
      });
      console.log("Exercise data:", result.data);
      setCourseExerciseData(result.data);
    } catch (error) {
      console.error("Error fetching exercise:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="border-t-4">
      <SplitterLayout percentage primaryMinSize={40} secondaryInitialSize={60}>
        <div>
          <ContentSection
            courseExerciseData={courseExerciseData}
            loading={loading}
          />
        </div>
        <div>
          <CodeEditor
            courseExerciseData={courseExerciseData}
            loading={loading}
          />
        </div>
      </SplitterLayout>
    </div>
  );
}

export default playground;
