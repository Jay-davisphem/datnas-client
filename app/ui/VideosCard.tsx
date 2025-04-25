"use client";
import { IC } from "../lib/contexts/data";
import { motion, AnimatePresence } from "framer-motion";
import { ICourseCategory, IVideoCard } from "../lib/contexts/data";
import VideoCard from "./VideoCard";
import { FaArrowRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";
import Link from "next/link";
import { toSlug } from "../utils";

interface CourseWithPaginationProps {
  course: ICourseCategory;
  videosPerPage: number;
}

function CourseWithPagination({
  course,
  videosPerPage,
}: CourseWithPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const videos = course?.videos || [];
  const totalVideos = videos.length;
  const totalPages = Math.ceil(totalVideos / videosPerPage);

  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const currentVideos = videos.slice(startIndex, endIndex);

  const sectionRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div
      ref={sectionRef}
      className="flex flex-col gap-2 text-sm font-bold scroll-mt-20"
    >
      {/* Course Title */}
      <Link
        href={`/course/${toSlug(course?.courseTitle)}`}
        className="flex gap-1 items-center focus:border-b hover:border-b max-w-max"
      >
        <span className="text-gray-400">Course</span>
        <FaArrowRight className="text-gray-400" />
        <span>{course?.courseTitle}</span>
      </Link>

      {/* Animated Video Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8"
        >
          {currentVideos.map(({ thumbnail, ...others }: IVideoCard) => (
            <VideoCard
              key={others.videoTitle}
              {...others}
              thumbnail={course.thumbnail || ""}
              courseTitle={course.courseTitle || ""}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
// The main VideosCard component remains the same:

interface VideosCardProps {
  category: IC;
  videosPerPage?: number;
}

export default function VideosCard({
  category,
  videosPerPage = 6,
}: VideosCardProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Category Title */}
      <div className="text-sm font-bold flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-gray-400">Category</span>
          <span className="font-black text-4xl" id={`${category.name}`}>
            {category?.name}
          </span>
        </div>
      </div>
      {/* Course Grouping */}
      {category?.courses?.map((course) => (
        <CourseWithPagination
          key={course.courseTitle}
          course={course}
          videosPerPage={videosPerPage}
        />
      ))}
    </div>
  );
}
