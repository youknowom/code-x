import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CourseExercise } from "../[exerciseslug]/page";
import { Button } from "@/components/ui/button";
import { nightOwl } from "@codesandbox/sandpack-themes";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Play, CheckCircle2 } from "lucide-react";

type Props = {
  courseExerciseData: CourseExercise | undefined;
  loading: boolean;
};

const CodeEditorChildren = ({ onCompleteExercise, IsCompleted }: any) => {
  const { sandpack } = useSandpack();
  const [running, setRunning] = useState(false);

  const handleRun = async () => {
    setRunning(true);
    await sandpack.runSandpack();
    setTimeout(() => setRunning(false), 500);
  };

  return (
    <div className="border-t border-zinc-800 bg-zinc-900 px-4 py-3 flex justify-end items-center gap-3 relative z-10">
      <Button
        variant={"pixel"}
        onClick={handleRun}
        disabled={running}
        className="flex items-center gap-2"
      >
        <Play className="w-4 h-4" />
        {running ? "Running..." : "Run Code"}
      </Button>
      <Button
        variant={"pixel"}
        className={`flex items-center gap-2 ${
          IsCompleted
            ? "bg-green-600 hover:bg-green-600"
            : "bg-[#a3e534] hover:bg-[#92d42d]"
        }`}
        onClick={() => onCompleteExercise()}
        disabled={IsCompleted}
      >
        <CheckCircle2 className="w-4 h-4" />
        {IsCompleted ? "Completed ✓" : "Mark Completed"}
      </Button>
    </div>
  );
};

function CodeEditor({ courseExerciseData, loading }: Props) {
  const { exerciseslug, chapterId } = useParams();
  const exerciseIndex = courseExerciseData?.exercises?.findIndex(
    (item) => item.slug == exerciseslug
  );

  const IsCompleted = courseExerciseData?.completedExercise?.find(
    (item) =>
      item?.chapterId == Number(chapterId) &&
      item?.exerciseId == Number(exerciseIndex) + 1
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

      toast.success("Exercise Completed! 🎉");
    } catch (error) {
      // Error handled by toast notification
      toast.error("Failed to complete exercise");
    }
  };

  return (
    <div className="h-full flex flex-col">
      <SandpackProvider
        theme={nightOwl}
        //@ts-ignore
        template={courseExerciseData?.editorType || "static"}
        files={
          courseExerciseData?.ExerciseData?.exerciseContent?.startCode || {}
        }
        options={{
          autorun: false,
          autoReload: false,
          activeFile:
            Object.keys(
              courseExerciseData?.ExerciseData?.exerciseContent?.startCode || {}
            )[0] || "/index.html",
        }}
      >
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full overflow-hidden">
                <SandpackCodeEditor
                  showTabs
                  showLineNumbers
                  style={{ height: "100%" }}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50} minSize={20}>
              <div className="h-full overflow-hidden">
                <SandpackPreview
                  showNavigator
                  showOpenInCodeSandbox={false}
                  showOpenNewtab
                  showRefreshButton
                  style={{ height: "100%" }}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <CodeEditorChildren
          onCompleteExercise={onCompleteExercise}
          IsCompleted={IsCompleted}
        />
      </SandpackProvider>
    </div>
  );
}

export default CodeEditor;
