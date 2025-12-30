import React from "react";
import { Button } from "@/components/ui/button";

function CommunityHelpSection() {
  return (
    <div className="border-2 border-zinc-800 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-zinc-900 to-zinc-950 shadow-lg">
      <div className="flex items-start gap-4 mb-6">
        <div className="shrink-0 w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
          <span className="text-2xl">👥</span>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Need Help?</h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Join our community to ask questions and get help from fellow
            learners and mentors.
          </p>
        </div>
      </div>

      <Button
        variant={"pixel"}
        className="text-lg font-semibold px-6 py-5 w-full md:w-auto"
      >
        💬 Go to Community
      </Button>
    </div>
  );
}

export default CommunityHelpSection;
