"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { UserButton, useUser } from "@clerk/nextjs";
import { useParams, usePathname } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import { Course } from "../(routes)/courses/_components/CourseList";

// const courses = [
//   {
//     id: 1,
//     name: "HTML",
//     desc: "Learn the fundamentals of HTML and build the structure of modern web pages.",
//     path: "/course/1/detail",
//   },
//   {
//     id: 2,
//     name: "CSS",
//     desc: "Master CSS to style and design responsive, visually appealing web layouts.",
//     path: "/course/2/detail",
//   },
//   {
//     id: 3,
//     name: "React",
//     desc: "Build dynamic and interactive web applications using React.",
//     path: "/course/3/detail",
//   },
//   {
//     id: 4,
//     name: "React Advanced",
//     desc: "Deep dive into advanced React concepts.",
//     path: "/course/4/detail",
//   },
//   {
//     id: 5,
//     name: "Python",
//     desc: "Learn Python from basics to real-world applications.",
//     path: "/course/5/detail",
//   },
//   {
//     id: 6,
//     name: "Python Advanced",
//     desc: "Advanced Python concepts like OOP and APIs.",
//     path: "/course/6/detail",
//   },
//   {
//     id: 7,
//     name: "Generative AI",
//     desc: "Explore prompt engineering, LLMs, and GenAI apps.",
//     path: "/course/7/detail",
//   },
//   {
//     id: 8,
//     name: "Machine Learning",
//     desc: "Learn ML algorithms and deployment.",
//     path: "/course/8/detail",
//   },
//   {
//     id: 9,
//     name: "JavaScript",
//     desc: "Master modern JavaScript and async programming.",
//     path: "/course/9/detail",
//   },
// ];

export default function Header() {
  const { user } = useUser();
  const path = usePathname();
  const { exerciseslug } = useParams();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    GetCourses();
  }, []);

  const GetCourses = async () => {
    const result = await axios.get("/api/course");
    setCourses(result.data);
  };
  return (
    <div className="p-4 max-w-7xl mx-auto flex justify-between items-center w-full">
      {/* Logo */}
      <Link href="/" className="flex gap-2 items-center">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <h2 className="font-bold text-2xl font-game">CodeTree</h2>
      </Link>

      {/* Navigation */}
      {!exerciseslug && courses ? (
        <NavigationMenu>
          <NavigationMenuList className="gap-8">
            {/* Courses Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid md:grid-cols-2 sm:w-[400px] md:w-[500px] lg:w-[600px] p-4 gap-2">
                  {courses.map((course) => (
                    <li key={course.courseId}>
                      <Link
                        href={"/courses/" + course.courseId}
                        className="block rounded-md p-3 hover:bg-accent transition"
                      >
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {course.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Normal Links */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/projects">Projects</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/pricing">Pricing</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact">Contact Us</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ) : (
        <h2 className="text-2xl">
          {exerciseslug?.toString()?.replaceAll("-", " ").toUpperCase()}
        </h2>
      )}

      {/* CTA */}
      {!user ? (
        <Button asChild className="font-game text-2xl" variant="pixel">
          <Link href="/sign-in">Signup</Link>
        </Button>
      ) : (
        <div className="flex gap-4 items-center">
          <Button asChild className="font-game text-2xl" variant="pixel">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <UserButton />
        </div>
      )}
    </div>
  );
}
