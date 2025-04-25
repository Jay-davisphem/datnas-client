"use client";
import CourseCategories from "@/app/ui/body/home/CourseCategories";
import VideosCard from "@/app/ui/VideosCard";
import { useCourses } from "@/app/lib/contexts/CourseContext";
import Link from "next/link";
export default function Courses() {
  const { courses: categories } = useCourses();
  return (
    <div className="p-6 md:px-16 lg:px-32 bg-white pt-8 pb-16">
      <div className="text-black">
        <div className="md:justify-end flex flex-col md:flex-row gap-4 mb-4 md:mb-8">
          <Link
            href="/course/new"
            className="bg-[#004ce8] text-white drop-shadow-md hover:opacity-80 rounded-md w-full justify-center flex-wrap md:w-1/5 p-4 text-base flex items-center"
          >
            Create Course
          </Link>
          <Link
            href="/course/draft"
            className="bg-[#004ce8] text-white drop-shadow-md hover:opacity-80 rounded-md w-full justify-center flex-wrap md:w-1/5 p-4 text-base flex items-center"
          >
            Draft
          </Link>
          <Link
            href="/course/published"
            className="bg-[#004ce8] text-white drop-shadow-md hover:opacity-80 rounded-md w-full justify-center flex-wrap md:w-1/5 p-4 text-base flex items-center"
          >
            Published
          </Link>
        </div>
        <CourseCategories gray={true} />
        <div className="flex flex-col gap-8 md:gap-16 mt-8 md:mt-16">
          {categories.map((category, i) => (
            <div
              key={i}
              className="flex flex-col w-full justify-between md:flex-row flex-wrap gap-8"
            >
              <VideosCard key={i} category={category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
