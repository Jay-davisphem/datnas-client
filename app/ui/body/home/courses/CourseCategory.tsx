'use client'
import Image from "next/image"
import Link from "next/link"
import { IoThumbsUpOutline } from "react-icons/io5";
import { BiCommentDetail } from "react-icons/bi";
import StarRating from "./StarRating";
export type ICourseCategory = {
    thumbnail: string,
    category: string,
    courseTitle: string,
    rating: number,
    discussionLikes: number,
    discussionComments: number
}
export default function CourseCategory({thumbnail, category, courseTitle, rating, discussionComments, discussionLikes}: ICourseCategory){
    return <Link className="flex flex-col rounded shadow-md w-full min-sm:w-2/5 lg:w-3/10 xl:w-2/10 hover:shadow-lg pb-4" href='/courses'>
        <Image src={thumbnail} alt={category+courseTitle+thumbnail} width={200} height={100} className="rounded-t w-full h-40"/>
        <div className="px-2 mt-4 ">
            <div className="flex justify-start"><p className="text-[10px]">{category}</p></div>
        </div>
        <h2 className="px-2 text-lg text-[#001A50] font-bold mt-3">{courseTitle}</h2>
        <div className="px-2 flex justify-between items-center text-sm mt-3">
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><IoThumbsUpOutline /><span>{discussionLikes}</span></span>
                <span className="flex items-center gap-1"><BiCommentDetail /><span>{discussionComments}</span></span>
            </div>
            <div className="flex items-center gap-1">
                <span className='text-center'>{rating}</span>
                <div className="text-center">
                    <StarRating value={rating} size={15}/>
                </div>
            </div>
        </div>
    </Link>
}