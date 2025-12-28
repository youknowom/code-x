"use client";
import { useParams } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";
import "react-splitter-layout/lib/index.css";

const SplitterLayout = dynamic(() => import("react-splitter-layout"), {
  ssr: false,
});

function playground() {
  //
  const { courseId, chapterId, exerciseslug } = useParams();

  console.log("courseId", courseId);
  console.log("chapterId", chapterId);
  console.log("exercseId", exerciseslug);
  return (
    <div className="border-t-4">
      <SplitterLayout percentage primaryMinSize={40} secondaryInitialSize={60}>
        <div>pane 1</div>
        <div>pane 2</div>
      </SplitterLayout>
    </div>
  );
}

export default playground;
