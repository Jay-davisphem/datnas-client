import React from "react";
import Image from "next/image";
import { IVideoCard } from "@/app/ui/VideoCard";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface VideoItemProps {
  video: IVideoCard;
  isPlaying?: boolean;
  onEdit?: (video: IVideoCard) => void;
  onDelete?: (video: IVideoCard) => void;
}

export default function VideoItem({
  video,
  isPlaying,
  onEdit,
  onDelete,
}: VideoItemProps) {
  const backgroundColor = isPlaying ? "bg-[#001A50]" : "bg-gray-200";
  const textColor = isPlaying ? "text-white" : "text-black";
  const router = useRouter();

  return (
    <div
      className={`group p-1 rounded flex items-center drop-shadow-sm border md:border-none border-gray-150 gap-4 ${backgroundColor} ${textColor}`}
    >
      {/* Thumbnail */}
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
      <div className="flex-grow min-w-0">
        <h3 className="text-xs font-semibold truncate 2xl:text-base flex justify-between items-center">
          <div>{video.videoTitle}</div>
          <div className="p-1">
            {/* Desktop-only action buttons */}
            <div className="hidden md:flex gap-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <FiEdit
                size={16}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/course/update");
                  // onEdit?.(video);
                }}
                className="bg-transparent cursor-pointer  hover:bg-slate-300 text-slate-700"
              />

              <FiTrash2
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(video);
                }}
                size={16}
                className="bg-transparent cursor-pointer hover:bg-red-200 text-red-600"
              />
            </div>

            {/* Mobile-always-visible action buttons */}
            <div className="md:hidden flex gap-2 ml-2">
              <FiEdit
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/course/update");
                  // onEdit?.(video);
                }}
                size={16}
                className="bg-transparent cursor-pointer  hover:bg-slate-300 text-slate-700"
              />

              <FiTrash2
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(video);
                }}
                size={16}
                className="bg-transparent cursor-pointer hover:bg-red-200 text-red-600"
              />
            </div>
          </div>
        </h3>

        <div className="text-xs md:text-sm">
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
