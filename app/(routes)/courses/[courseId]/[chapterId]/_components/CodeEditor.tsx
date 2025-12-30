import React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import dynamic from "next/dynamic";
import "react-splitter-layout/lib/index.css";
import { CourseExercise } from "../[exerciseslug]/page";
import { Button } from "@/components/ui/button";
import { nightOwl } from "@codesandbox/sandpack-themes";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const SplitterLayout = dynamic(() => import("react-splitter-layout"), {
  ssr: false,
});

type Props = {
  courseExerciseData: CourseExercise | undefined;
  loading: boolean;
};

const CodeEditorChildren = ({ onCompleteExercise, IsCompleted }: any) => {
  const { sandpack } = useSandpack();
  return (
    <div className="absolute bottom-40 flex gap-5 right-5">
      <Button
        variant={"pixel"}
        className="text-xl"
        onClick={() => sandpack.runSandpack()}
        size={"lg"}
      >
        Run code
      </Button>
      <Button
        variant={"pixel"}
        size={"lg"}
        className="bg-[#a3e534] text-xl"
        onClick={() => onCompleteExercise()}
        disabled={IsCompleted}
      >
        {IsCompleted ? "Already completed !" : "mark completed"}
      </Button>
    </div>
  );
};

function CodeEditor({ courseExerciseData, loading }: Props) {
  const { exerciseslug } = useParams();
  const exerciseIndex = courseExerciseData?.exercises?.findIndex(
    (item) => item.slug == exerciseslug
  );

  const IsCompleted = courseExerciseData?.completedExercise?.find(
    (item) => item?.exerciseId == Number(exerciseIndex) + 1
  );

  const onCompleteExercise = async () => {
    if (exerciseIndex === undefined || !courseExerciseData) {
      return;
    }

    try {
      const result = await axios.post("/api/exercise/complete", {
        courseId: courseExerciseData.courseId,
        chapterId: courseExerciseData.chapterId,
        exerciseId: exerciseIndex + 1,
        xpEarned: courseExerciseData.exercises[exerciseIndex].xp,
      });

      toast.success("Exercise Completed!");
    } catch (error) {
      // Error handled by toast notification
      toast.error("Failed to complete exercise");
    }
  };

  return (
    <div className="relative h-full">
      <SandpackProvider
        theme={nightOwl}
        //@ts-ignore
        template={courseExerciseData?.editorType}
        style={{ height: "100vh" }}
        files={
          courseExerciseData?.ExerciseData?.exerciseContent?.startCode || {}
        }
        options={{ autorun: false, autoReload: false }}
      >
        <SandpackLayout style={{ height: "100%" }}>
          <SplitterLayout>
            <div className="relative">
              <SandpackCodeEditor showTabs style={{ height: "100%" }} />
              <CodeEditorChildren
                onCompleteExercise={onCompleteExercise}
                IsCompleted={IsCompleted}
              />
            </div>
            <SandpackPreview
              showNavigator
              showOpenInCodeSandbox={false}
              showOpenNewtab
              style={{ height: "100%" }}
            />
          </SplitterLayout>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodeEditor;
