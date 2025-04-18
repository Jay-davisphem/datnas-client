"use client";
import { FaArrowRight } from "react-icons/fa6";
import { ICourseCategory } from "../CourseCategory";
import VideoItem from "./VideoItem";
import { useRouter } from "next/navigation";

export default function VideoList({
  course,
  onVideoSelect,
  playingVideoUrl, // Receive the playing video URL
}: {
  course: ICourseCategory;
  onVideoSelect: (
    url: string,
    title: string,
    desc: string,
    thumbnail: string,
  ) => void;
  playingVideoUrl: string | null;
}) {
  const router = useRouter();
  return (
    <div className="bg-white md:pt-4 md:col-span-4 rounded-md flex flex-col md:gap-4 h-[calc(100vh - 150px)] overflow-y-auto">
      <div className="hidden md:flex flex-col gap-1 sticky bg-white z-10 pb-2">
        <h2 className="text-2xl font-bold">Course Videos</h2>
        <span className="flex gap-1 items-end justify-between text-sm md:text-base">
          <span className="flex gap-2 items-center">
            <span className="">{course?.category}</span>
            <FaArrowRight className="" />
            <span className="text-gray-400">{course?.courseTitle}</span>
          </span>
          <span className="focus:underline hover:underline text-[10px] cursor-pointer text-[#004CE8]">
            course description
          </span>
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-3 md:gap-5">
          {course?.videos?.map((video, i) => {
            video.thumbnail = course.thumbnail;
            return (
              <div
                key={i}
                onClick={() => {
                  if (video.videoUrl) {
                    onVideoSelect(
                      video.videoUrl,
                      video.videoTitle,
                      video.description || "No description available",
                      video.thumbnail,
                    );
                  } else {
                    console.warn(`Video URL not found for ${video.videoTitle}`);
                  }
                }}
                className="cursor-pointer rounded-2xl"
              >
                <VideoItem
                  video={video}
                  isPlaying={video.videoUrl === playingVideoUrl}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
