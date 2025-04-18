import React from "react";
import Image from "next/image";
import { IVideoCard } from "@/app/ui/VideoCard";

interface VideoItemProps {
  video: IVideoCard;
  isPlaying?: boolean; // Receive the isPlaying prop
}

export default function VideoItem({ video, isPlaying }: VideoItemProps) {
  const backgroundColor = isPlaying ? "bg-[#001A50]" : "bg-gray-200"; // Example background color
  const color = isPlaying ? "text-white" : "bg-black";
  return (
    <div
      className={`p-1 rounded flex items-center drop-shadow-sm border  md:border-none border-gray-150 gap-4 ${backgroundColor} ${color}`}
    >
      {" "}
      {/* Apply conditional class */}
      <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden md:w-20 md:h-20">
        <Image
          src={video.thumbnail}
          alt={video.videoTitle}
          width={80}
          height={80}
          className="object-cover"
        />
      </div>
      {/* Text Content */}
      <div className="flex-grow min-w-0 justify-between">
        <h3 className="text-sm font-semibold truncate md:text-base">
          {video.videoTitle}
        </h3>
        <div className="text-xs md:text-sm ">
          <p
            className="overflow-hidden text-ellipsis display-webkit-box webkit-line-clamp-2 webkit-box-orient-vertical"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {video.description ||
              "Shortened Description of a course dolor sit amet consectetur....."}
          </p>
          <p className="text-end mt-1">{video.view} views</p>
        </div>
      </div>
    </div>
  );
}
