import React from "react";
import { Button } from "@/components/ui/button";

function CommunityHelpSection() {
  return (
    <div className="font-game border-4 rounded-2xl p-6 md:p-8 bg-black/40 backdrop-blur-sm">
      <h2 className="text-2xl md:text-3xl mb-2">Need Help?</h2>

      <p className="text-muted-foreground text-base md:text-lg mb-6">
        Ask your questions and get help from the community.
      </p>

      <Button className="text-lg px-6 py-5 rounded-xl">Go to Community</Button>
    </div>
  );
}

export default CommunityHelpSection;
