"use client";
import { ICourseCategory } from "../CourseCategory";
import Discussion from "./Discussion";
import VideoContainer from "./VideoContainer";
import VideoList from "./VideoList";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
    <div className="flex flex-col-reverse md:grid md:grid-cols-12 gap-5">
      <VideoList
        course={course}
        onVideoSelect={handleVideoSelect}
        playingVideoUrl={playingVideoUrl} // Pass the playing video URL
      />
      <div className="md:col-span-8 flex flex-col gap-3">
        <VideoContainer
          videoUrl={selectedVideoUrl}
          videoTitle={selectedVideoTitle}
          videoDescription={selectedVideoDescription}
          customThumbnail={selectedVideoThumbnail}
        />
        <Discussion />
      </div>
    </div>
  );
}
