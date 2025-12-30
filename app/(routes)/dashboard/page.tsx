import React from "react";
import WelcomeBanner from "./_components/WelcomeBanner";
import EnrolledCourses from "./_components/EnrolledCourses";
import ExploreMore from "./_components/ExploreMore";
import InviteFriend from "./_components/InviteFriend";
import UserStatus from "./_components/UserStatus";
import UpgradeToPro from "./_components/UpgradeToPro";
import ExploreMoreCourse from "./_components/ExploreMoreCourse";

function page() {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10 lg:px-24 xl:px-32">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <WelcomeBanner />
          <EnrolledCourses />
          <ExploreMore />
          <ExploreMoreCourse />
          <InviteFriend />
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <UserStatus />
          <UpgradeToPro />
        </div>
      </div>
    </div>
  );
}

export default page;
