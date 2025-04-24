import { ChangeEvent } from 'react';
import Image from 'next/image';
import { FiTrash } from "react-icons/fi";
import { RiVideoUploadLine } from "react-icons/ri";
import { CiImageOn } from "react-icons/ci";
import ReactPlayer from 'react-player';

export interface PreviewProps {
  type: 'Thumbnail' | 'Video' | 'Video Thumbnail';
  url: string | null;
  title: string
}

export const Preview: React.FC<PreviewProps> = ({ type, url, title }) => {
  if (!url) return null;
  return (
    <div className="mb-4">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {type === 'Thumbnail' && (
        <div style={{ position: 'relative', width: '100%', maxWidth: '400px', height: 'auto' }}>
          <Image src={url} alt="Thumbnail Preview" layout="responsive" width={400} height={300} objectFit="contain" className="border rounded-md" />
        </div>
      )}
      {type === 'Video' && (
        <div className="relative aspect-video max-w-md h-full border rounded-md overflow-hidden">
          <ReactPlayer url={url} width="100%" height="100%" controls={true} />
        </div>
      )}
      {type === 'Video Thumbnail' && (
        <div style={{ position: 'relative', width: '100%', maxWidth: '200px', height: 'auto' }}>
          <Image src={url} alt="Video Thumbnail Preview" layout="responsive" width={200} height={150} objectFit="contain" className="border rounded-md" />
        </div>
      )}
    </div>
  );
};

export interface VideoUploadProps {
  id: number;
  onVideoChange: (id: number, file: File | null) => void;
  onTitleChange: (id: number, title: string) => void;
  onVideoDescChange: (id: number, desc: string) => void;
  onThumbnailChange: (id: number, file: File | null) => void;
  onDelete?: (id: number) => void;
}
export const VideoUpload: React.FC<VideoUploadProps> = ({
  id,
  onVideoChange,
  onTitleChange,
  onThumbnailChange,
  onVideoDescChange,
  onDelete,
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md">
      <div className="flex flex-col gap-2">
        <label htmlFor={`video-${id}`} className="block text-sm font-medium text-gray-700">
          Upload Video
        </label>
        <div className="flex cursor-pointer  justify-center rounded-md p-2 md:p-4 shadow-sm border gap-2 hover:border-gray-400">
          <div className="flex items-center justify-center">
           <RiVideoUploadLine size={40}/>
          </div>
          <input
required
            type="file"
            id={`video-${id}`}
            accept="video/*"
            onChange={(e) => onVideoChange(id, (e.target.files && e.target.files[0]) || null)}
            className="cursor-pointer p-2 items-end flex  w-full text-sm"
          />
          
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-4 justify-between w-full'>
        <div className="flex flex-col gap-2 w-full md:w-[45%]">
          <label htmlFor={`video-title-${id}`} className="block text-sm font-medium text-gray-700">
            Video Title
          </label>
          <textarea
required
            id={`video-title-${id}`}
            rows={3}
            className="resize-none p-2 text-sm shadow-sm border  focus:outline-none focus:outline-0 focus:ring-0  block w-full sm:text-sm border-black rounded-md"
            placeholder="Write a description about the course"
            onChange={(e) => onTitleChange(id, e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-[45%]">
          <label htmlFor={`video-description-${id}`} className="block text-sm font-medium text-gray-700">
            Video Description
          </label>
          <textarea
required
            id={`video-description-${id}`}
            rows={3}
            className="resize-none p-2 text-sm shadow-sm border  focus:outline-none focus:outline-0 focus:ring-0  block w-full sm:text-sm border-black rounded-md"
            placeholder="Write a description about the course"
            onChange={(e) => onVideoDescChange(id, e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor={`video-thumbnail-${id}`} className="block text-sm font-medium text-gray-700">
          Upload Video Thumbnail
        </label>
        <div className="flex rounded-md shadow-sm border p-2 md:p-4 cursor-pointer">
          <div className="flex items-center justify-center">
           <CiImageOn size={40}/>
          </div>
          <input
required
            type="file"
            id={`video-thumbnail-${id}`}
            accept="image/*"
            onChange={(e) => onThumbnailChange(id, (e.target.files && e.target.files[0]) || null)}
            className="p-2 block w-full text-sm cursor-pointer"
          />
        </div>
        {onDelete && (
          <div className='font-bold mt-2 md:mt-4 flex justify-end'>
            <button
              type='button'
              onClick={() => onDelete(id)}
              className='cursor-pointer text-sm md:text-base flex gap-1 items-center text-white rounded-md w-fit px-4 py-2 bg-red-500'>
                <FiTrash /> Delete
            </button>
              
          </div>
          )}
      </div>
    </div>
  );
};

export interface CourseContentProps {
  onTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onCategoryChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onThumbnailChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CourseContent: React.FC<CourseContentProps> = ({
  onTitleChange,
  onDescriptionChange,
  onCategoryChange,
  onThumbnailChange,
}) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Course Content</h2>
    <div className='flex flex-col gap-4'>

    <div className="flex flex-col gap-2">
      <label htmlFor="course-title" className="block text-sm font-medium text-gray-700">
        Course Title
      </label>
      <input
required
        type="text"
        id="course-title"
        className="focus:outline-none focus:outline-0 focus:ring-0  shadow-sm border block w-full text-sm border-black rounded-md p-2"
        placeholder="Enter the title of the course"
        onChange={onTitleChange}
      />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="course-description" className="block text-sm font-medium text-gray-700">
        Course Description
      </label>
      <textarea
required
        id="course-description"
        rows={3}
        className="resize-none focus:outline-none focus:outline-0 focus:ring-0  shadow-sm border  block w-full p-2 text-sm border-black rounded-md"
        placeholder="Write a description about the course"
        onChange={onDescriptionChange}
      ></textarea>
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="course-category" className="block text-sm font-medium text-gray-700">
        Category
      </label>
      <select
        id="course-category"
        className="shadow-sm border  block w-full p-2 text-sm border-black rounded-md"
        onChange={onCategoryChange}
        >
        <option value="">Select the category of course</option>
        <option value="NCLEX">NCLEX</option>
        <option value="Pharmacology">Pharmacology</option>
        <option value="Anatomy and Physiology">Anatomy and Physiology</option>
      </select>
    </div>
    <div className='flex flex-col gap-2'>
      <label htmlFor="course-thumbnail" className="block text-sm font-medium text-gray-700">
        Course Thumbnail
      </label>
      <div className="flex rounded-md shadow-sm border p-2 md:p-4 cursor-pointer">
        <div className="flex items-center justify-center">
            <CiImageOn size={40}/>
        </div>
        <input
required
          type="file"
          id="course-thumbnail"
          accept="image/*"
          onChange={onThumbnailChange}
          className="cursor-pointer block w-full p-2 text-sm"
        />
      </div>
    </div>
  </div>
  </div>
);

export interface VideoState {
  id: number;
  file: File | null;
  title: string;
  thumbnailUrl: string | null;
  thumbnailFile: File | null;
  desc: string
}

export interface CreateCourseState {
  title: string;
  description: string;
  category: string;
  thumbnail: File | null;
  thumbnailPreviewUrl: string | null;
  videos: VideoState[];
  videoPreviews: Record<number, string | null>;
  videoThumbnailPreviews: Record<number, string | null>;
  nextVideoId: number;
}