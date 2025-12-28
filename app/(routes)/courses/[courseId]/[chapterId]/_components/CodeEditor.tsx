import React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import { CourseExercise } from "../[exerciseslug]/page";
import { Button } from "@/components/ui/button";
type Props = {
  courseExerciseData: CourseExercise | undefined;
  loading: boolean;
};

const CodeEditorChildren = () => {
  return (
    <div className="font-game absolute bottom-20 flex gap-5 right-5">
      <Button variant={"pixel"} className="text-xl" size={"lg"}>
        Run code
      </Button>
      <Button variant={"pixel"} size={"lg"} className="bg-[#a3e534] text-xl">
        Mark Completed
      </Button>
    </div>
  );
};
function CodeEditor({ courseExerciseData, loading }: Props) {
  return (
    <div className="relative h-full">
      <SandpackProvider
        template="static"
        style={{
          height: "100vh",
        }}
        files={
          courseExerciseData?.ExerciseData?.exerciseContent?.startCode || {}
        }
      >
        <SandpackLayout
          style={{
            height: "100%",
          }}
        >
          <SplitterLayout>
            <div className="relative">
              <SandpackCodeEditor
                style={{
                  height: "100%",
                }}
              />
              <CodeEditorChildren />
            </div>
            <SandpackPreview
              style={{
                height: "100%",
              }}
            />
          </SplitterLayout>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodeEditor;
