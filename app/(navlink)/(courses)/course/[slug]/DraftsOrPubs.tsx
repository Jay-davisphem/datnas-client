"use client";
import { useCourses } from "@/app/lib/contexts/CourseContext";
import CourseCategories from "@/app/ui/body/home/CourseCategories";
import VideosCard from "@/app/ui/VideosCard";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DraftsOrPubs() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const { personalizedCourses: categories } = useCourses();

  return (
    <div className="bg-gray-200 w-full md:px-16 lg:px-32 md:py-16">
      <div className="md:justify-end flex flex-col md:flex-row gap-4 mb-4 md:mb-8 px-6 md:px-0 py-8">
        <Link
          href="/course/new"
          className={`rounded-md w-full justify-center flex-wrap md:w-1/5 p-4 text-base flex items-center
            ${isActive("/course/new") ? "bg-gray-400 text-white cursor-not-allowed opacity-50" : "bg-[#004ce8] text-white hover:opacity-80 drop-shadow-md"}`}
          aria-disabled={isActive("/course/new")}
          onClick={(e) => {
            if (isActive("/course/new")) {
              e.preventDefault();
            }
          }}
          tabIndex={isActive("/course/new") ? -1 : 0}
        >
          Create New Course
        </Link>
        <Link
          href="/course/draft"
          className={`rounded-md w-full justify-center flex-wrap md:w-1/5 p-4 text-base flex items-center
            ${isActive("/course/draft") ? "bg-gray-400 text-white cursor-not-allowed opacity-50" : "bg-[#004ce8] text-white hover:opacity-80 drop-shadow-md"}`}
          aria-disabled={isActive("/course/draft")}
          onClick={(e) => {
            if (isActive("/course/draft")) {
              e.preventDefault();
            }
          }}
          tabIndex={isActive("/course/draft") ? -1 : 0}
        >
          Draft
        </Link>

        <Link
          href="/course/published"
          className={`rounded-md w-full justify-center flex-wrap md:w-1/5 p-4 text-base flex items-center
            ${isActive("/course/published") ? "bg-gray-400 text-white cursor-not-allowed opacity-50" : "bg-[#004ce8] text-white hover:opacity-80 drop-shadow-md"}`}
          aria-disabled={isActive("/course/published")}
          onClick={(e) => {
            if (isActive("/course/published")) {
              e.preventDefault();
            }
          }}
          tabIndex={isActive("/course/published") ? -1 : 0}
        >
          Published
        </Link>
      </div>
      <div>
        <div className="px-6 md:px-16 py-6 bg-white">
          <CourseCategories gray={true} url={pathname} />
        </div>
        <div className="bg-white mx-auto px-6 md:px-16 py-6 rounded-lg drop-shadow-xl">
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
