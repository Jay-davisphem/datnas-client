"use client";
import CourseCategories from "@/app/ui/body/home/CourseCategories";
import VideosCard from "@/app/ui/VideosCard";
import { useCourses } from "@/app/lib/contexts/CourseContext";
export default function Courses() {
  const { courses: categories } = useCourses();
  return (
    <div className="p-6 md:px-16 lg:px-32 bg-white pt-8 pb-16">
      <div className="text-black ">
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
