"use client";
import Image from "next/image";
import Link from "next/link";
import { MdOutlinePlayCircle } from "react-icons/md";
import { GrView } from "react-icons/gr";
import dynamic from "next/dynamic";

const StarRating = dynamic(
  () => import("@/app/ui/body/home/courses/StarRating"),
  { ssr: false },
);

export type IVideoCard = {
  thumbnail: string;
  category: string;
  videoTitle: string;
  rating: number;
  view: number;
  courseTitle?: string;
  videoUrl?: string;
  description?: string;
};
export default function VideoCard({
  thumbnail,
  category,
  videoTitle,
  rating,
  view,
  courseTitle,
}: IVideoCard) {
  return (
    <Link
      className="flex flex-col justify-between rounded shadow-md w-full  hover:shadow-lg pb-4"
      href="/courses"
    >
      <div className="relative">
        <Image
          src={thumbnail}
          alt={category + videoTitle + thumbnail}
          width={200}
          height={100}
          objectFit="cover"
          className="rounded-t w-full h-40 text-sm"
        />
        <div className="absolute text-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <div className="bg-[#00000005] rounded-full p-2">
            <MdOutlinePlayCircle className="text-white text-4xl rounded-full" />
          </div>
        </div>
      </div>
      <div className="px-2 mt-4 ">
        <div className="flex justify-start">
          <p className="text-[10px]">
            <span className="text-gray-500">Course Title: </span>
            {courseTitle}
          </p>
        </div>
      </div>
      <h2 className="px-2 text-lg text-[#001A50] font-bold mt-3">
        {videoTitle}
      </h2>
      <div className="px-2 flex justify-between items-center text-sm mt-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <GrView />
            <span>{view}</span>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-center">{rating}</span>
          <div className="text-center">
            <StarRating value={rating} size={15} />
          </div>
        </div>
      </div>
    </Link>
  );
}
