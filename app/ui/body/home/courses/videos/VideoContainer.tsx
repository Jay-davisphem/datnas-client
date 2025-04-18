import React, { useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import { FiPlay } from "react-icons/fi";

interface VideoContainerProps {
  videoUrl: string | null;
  videoTitle: string | null;
  videoDescription: string | null;
  customThumbnail: string | null;
}

export default function VideoContainer({
  videoUrl,
  videoTitle,
  videoDescription,
  customThumbnail,
}: VideoContainerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="bg-white rounded-lg relative">
      {videoTitle && (
        <div className="p-4 text-xl font-semibold text-black">{videoTitle}</div>
      )}

      {videoUrl && !isPlaying && customThumbnail ? (
        <div
          className="w-full rounded-lg aspect-video overflow-hidden relative cursor-pointer"
          onClick={handlePlay}
        >
          <Image
            src={customThumbnail}
            alt={`Thumbnail for ${videoTitle}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-3">
            <FiPlay className="h-6 w-6" />
          </div>
        </div>
      ) : videoUrl ? (
        <div className="w-full rounded-lg aspect-video overflow-hidden">
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            playing={isPlaying}
            controls={true}
          />
        </div>
      ) : (
        <div className="text-base md:text-lg flex items-center aspect-video justify-center h-full bg-gray-100 text-gray-500">
          Click on a video from the list to play it here.
        </div>
      )}

      {videoDescription && (
        <div className="p-4 text-sm text-gray-600">{videoDescription}</div>
      )}
    </div>
  );
}
