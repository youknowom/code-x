import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";

function CourseStatus() {
  return (
    <div className="font-game p-5 border-4 rounded-2xl bg-black/40 backdrop-blur-sm w-full">
      <h2 className="text-2xl mb-4">Course Progress</h2>

      {/* Exercises */}
      <div className="flex items-center gap-4 mb-6">
        <Image src="/book.png" alt="Exercises" width={42} height={42} />
        <div className="w-full">
          <div className="flex justify-between text-lg mb-1">
            <span>Exercises</span>
            <span className="text-muted-foreground">1 / 72</span>
          </div>
          <Progress value={37} />
        </div>
      </div>

      {/* XP */}
      <div className="flex items-center gap-4">
        <Image src="/star.png" alt="XP" width={42} height={42} />
        <div className="w-full">
          <div className="flex justify-between text-lg mb-1">
            <span>XP Earned</span>
            <span className="text-muted-foreground">1 / 72</span>
          </div>
          <Progress value={37} />
        </div>
      </div>
    </div>
  );
}

export default CourseStatus;
