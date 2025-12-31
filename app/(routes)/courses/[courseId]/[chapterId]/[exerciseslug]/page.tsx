"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

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
      // Exercise data fetched successfully
      setCourseExerciseData(result.data);
      const exerciseInfo = result.data?.exercises?.find(
        (item: exercises) => item.slug == exerciseslug
      );
      setexerciseInfo(exerciseInfo);
    } catch (error) {
      // Error fetching exercise - handled by toast
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
    <div className="border-t-4 pb-20">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40} minSize={30}>
          <ContentSection
            courseExerciseData={courseExerciseData}
            loading={loading}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60} minSize={40}>
          <CodeEditor
            courseExerciseData={courseExerciseData}
            loading={loading}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

      <div className="fixed bottom-0 w-full bg-zinc-900 flex p-4 justify-between items-center shadow-lg z-20 border-t-2 border-zinc-800">
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
