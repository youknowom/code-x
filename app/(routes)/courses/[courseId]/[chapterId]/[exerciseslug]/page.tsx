"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-splitter-layout/lib/index.css";
import axios from "axios";
import {
  completedExcercises,
  exercises,
} from "../../../_components/CourseList";
import ContentSection from "../_components/ContentSection";
import CodeEditor from "../_components/CodeEditor";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export type CourseExercise = {
  chapterId: number;
  courseId: number;
  desc: string;
  name: string;
  exercises: exercises[];
  ExerciseData: ExerciseData;
  completedExercise: completedExcercises[];
  editorType?: string;
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
  const [nextButtonRoute, setNextButtonRoute] = useState<string>();
  const [prevButtonRoute, setPrevButtonRoute] = useState<string>();
  const [exerciseInfo, setexerciseInfo] = useState<exercises>();
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
      const exerciseInfo = result.data?.exercises?.find(
        (item: exercises) => item.slug == exerciseslug
      );
      setexerciseInfo(exerciseInfo);
    } catch (error) {
      console.error("Error fetching exercise:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "empty";
    };
  }, []);

  const GetExerciseDetail = () => {
    const exerciseInfo = courseExerciseData?.exercises?.find(
      (item) => item.slug == exerciseslug
    );
    setexerciseInfo(exerciseInfo);
  };

  const GetPrevNextButtonRoute = () => {
    //cuurent index of exe

    const CurrentExerciseIndex =
      courseExerciseData?.exercises?.findIndex(
        (item) => item.slug == exerciseslug
      ) ?? 0;

    const NextExercise =
      courseExerciseData?.exercises[CurrentExerciseIndex + 1].slug;

    const PrevExercise =
      courseExerciseData?.exercises[CurrentExerciseIndex - 1].slug;

    setNextButtonRoute(
      NextExercise
        ? "/courses/" + courseId + "/" + chapterId + "/" + NextExercise
        : undefined
    );

    setPrevButtonRoute(
      PrevExercise
        ? "/courses/" + courseId + "/" + chapterId + "/" + PrevExercise
        : undefined
    );
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

      <div className="font-game fixed bottom-0 w-full bg-zinc-900 flex p-4 justify-between items-center">
        <Link href={prevButtonRoute ?? "/courses/" + courseId}>
          <Button variant={"pixel"} className="text-xl">
            Previos
          </Button>
        </Link>
        <div className="flex gap-3 items-center">
          <Image src={"/star.png"} alt="start" width={40} height={40} />
          <h2 className="text-2xl">
            You can earn{exerciseInfo?.xp} <span className="text-3xl">XP</span>
          </h2>
        </div>
        <Link href={nextButtonRoute ?? "/courses" + courseId}>
          <Button variant={"pixel"} className="text-xl">
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default playground;
