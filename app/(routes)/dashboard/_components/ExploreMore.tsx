"use client";

import Image from "next/image";
import React from "react";

const ExploreMoreOptions = [
  {
    id: 1,
    title: "Quiz Pack",
    desc: "Practice what you learned with bite-sized code challenges.",
    icon: "/tree.png",
  },
  {
    id: 2,
    title: "Video Courses",
    desc: "Learn with structured video lessons taught step-by-step.",
    icon: "/game.png",
  },
  {
    id: 3,
    title: "Community Projects",
    desc: "Build real-world apps by collaborating with the community.",
    icon: "/growth.png",
  },
  {
    id: 4,
    title: "Explore Apps",
    desc: "Try prebuilt apps, explore demos, and build them yourself.",
    icon: "/start-up.png",
  },
];

function ExploreMore() {
  return (
    <section className="mt-12">
      <h2 className="text-4xl font-game mb-8">Explore More</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ExploreMoreOptions.map((option) => (
          <div
            key={option.id}
            className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition cursor-pointer"
          >
            <Image
              src={option.icon}
              alt={option.title}
              width={80}
              height={80}
              className="mb-4"
            />

            <h3 className="text-xl font-semibold mb-2">{option.title}</h3>

            <p className="text-sm text-zinc-400">{option.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExploreMore;
