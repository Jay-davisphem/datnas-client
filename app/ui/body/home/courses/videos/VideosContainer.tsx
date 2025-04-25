"use client";
import { ICourseCategory } from "../CourseCategory";
import Discussion from "./Discussion";
import VideoContainer from "./VideoContainer";
import VideoList from "./VideoList";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";

export default function VideosContainer({
  course,
}: {
  course: ICourseCategory;
}) {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState<string | null>(
    null,
  );
  const [selectedVideoDescription, setSelectedVideoDescription] = useState<
    string | null
  >(null);
  const [selectedVideoThumbnail, setSelectedVideoThumbnail] = useState<
    string | null
  >(null);
  const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null); // State for the currently playing video
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleVideoSelect = (
    url: string,
    title: string,
    desc: string,
    thumbnail: string,
  ) => {
    setSelectedVideoUrl(url);
    setSelectedVideoTitle(title);
    setSelectedVideoDescription(desc);
    setSelectedVideoThumbnail(thumbnail);
    setPlayingVideoUrl(url); // Update the playing video URL
    const params = new URLSearchParams();
    params.set("videoUrl", url);
    params.set("videoTitle", title);
    params.set("videoDescription", desc);
    params.set("videoThumbnail", thumbnail);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const urlParam = searchParams.get("videoUrl");
    const titleParam = searchParams.get("videoTitle");
    const descParam = searchParams.get("videoDescription");
    const thumbnailParam = searchParams.get("videoThumbnail");

    if (urlParam) {
      setSelectedVideoUrl(urlParam);
      setSelectedVideoTitle(titleParam);
      setSelectedVideoDescription(descParam);
      setSelectedVideoThumbnail(thumbnailParam);
      setPlayingVideoUrl(urlParam); // Set playing video on load
    }
  }, [searchParams]);

  return (
    <>
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-5">
        <VideoList
          course={course}
          onVideoSelect={handleVideoSelect}
          playingVideoUrl={playingVideoUrl} // Pass the playing video URL
        />
        {/* want to delete or update */}
        <div className="md:col-span-8 flex flex-col gap-3">
          <div className="px-1 flex md:hidden flex-col gap-1 sticky bg-white z-10 pb-2">
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
          <VideoContainer
            videoUrl={selectedVideoUrl}
            videoTitle={selectedVideoTitle}
            videoDescription={selectedVideoDescription}
            customThumbnail={selectedVideoThumbnail}
          />
          <Discussion />
        </div>
      </div>
    </>
  );
}
