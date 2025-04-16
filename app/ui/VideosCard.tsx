import { ICourseCategory, IVideoCard } from "../(navlink)/courses/data";
import VideoCard from "./VideoCard";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";

interface CourseWithPaginationProps {
  course: ICourseCategory;
  videosPerPage: number;
}

function CourseWithPagination({ course, videosPerPage }: CourseWithPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const videos = course?.videos || [];
  const totalVideos = videos.length;
  const totalPages = Math.ceil(totalVideos / videosPerPage);

  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const currentVideos = videos.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col gap-2 text-sm font-bold">
      {/* Course Title */}
      <div className="flex gap-1 items-center">
        <span className="text-gray-400">Course</span>
        <FaArrowRight className="text-gray-400" />
        <span>{course?.courseTitle}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {currentVideos.map(({ thumbnail, ...others }: IVideoCard, index) => (
          <VideoCard
            key={index}
            {...others}
            thumbnail={course.thumbnail || ""}
            courseTitle={course.courseTitle || ""}
          />
        ))}
      </div>

      {/* Pagination Controls for each course */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

// The main VideosCard component remains the same:
import { IC } from "../(navlink)/courses/data";

interface VideosCardProps {
  category: IC;
  videosPerPage?: number; 
}

export default function VideosCard({ category, videosPerPage = 5 }: VideosCardProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Category Title */}
      <div className="text-sm font-bold flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-gray-400">Category</span>
          <span className="font-black text-4xl">{category?.name}</span>
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