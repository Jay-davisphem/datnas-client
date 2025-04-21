'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import { CourseContent, Preview, VideoState, VideoUpload } from '@/app/ui/body/home/courses/uploads';
import { RiVideoAddLine } from "react-icons/ri";
import Tooltip from '@/app/ui/ToolTip';

interface CreateCourseState {
  title: string;
  description: string;
  category: string;
  thumbnail: File | null;
  thumbnailPreviewUrl: string | null;
  videos: VideoState[];
  videoPreviews: Record<number, string | null>;
  videoThumbnailPreviews: Record<number, string | null>;
  nextVideoId: number;
  videoError: string | null; // State to hold video-related errors
}

const CreateCourse: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null);
  const [videos, setVideos] = useState<VideoState[]>([
    { id: 0, file: null, title: '', desc: '', thumbnailUrl: null, thumbnailFile: null }, // Initialize with desc
  ]);
  const [videoPreviews, setVideoPreviews] = useState<Record<number, string | null>>({});
  const [videoThumbnailPreviews, setVideoThumbnailPreviews] = useState<Record<number, string | null>>({});
  const [nextVideoId, setNextVideoId] = useState<number>(1);
  const [videoError, setVideoError] = useState<string | null>(null);

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files && e.target.files[0]) || null;
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setThumbnail(null);
      setThumbnailPreviewUrl(null);
    }
  };

  const handleVideoChange = (id: number, file: File | null) => {
    const updatedVideos = videos.map((video) =>
      video.id === id ? { ...video, file } : video
    );
    setVideos(updatedVideos);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreviews((prev) => ({ ...prev, [id]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setVideoPreviews((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleVideoTitleChange = (id: number, title: string) => {
    const updatedVideos = videos.map((video) =>
      video.id === id ? { ...video, title } : video
    );
    setVideos(updatedVideos);
  };

  const handleVideoDescChange = (id: number, desc: string) => {
    const updatedVideos = videos.map((video) =>
      video.id === id ? { ...video, desc } : video
    );
    setVideos(updatedVideos);
  };

  const handleVideoThumbnailChange = (id: number, file: File | null) => {
    const updatedVideos = videos.map((video) =>
      video.id === id ? { ...video, thumbnailFile: file } : video
    );
    setVideos(updatedVideos);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoThumbnailPreviews((prev) => ({ ...prev, [id]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setVideoThumbnailPreviews((prev) => ({ ...prev, [id]: null }));
    }
  };

  const canAddAnotherVideo = (): boolean => {
    if (videos.length > 0) {
      const lastVideo = videos[videos.length - 1];
      if (!lastVideo.file || !lastVideo.title.trim()) {
        setVideoError('Please upload a video and provide a title before adding another.');
        return false;
      }
    }
    setVideoError(null);
    return true;
  };

  const addAnotherVideo = () => {
    if (canAddAnotherVideo()) {
      setVideos([...videos, { id: nextVideoId, file: null, title: '', desc: '', thumbnailUrl: null, thumbnailFile: null }]); // Initialize desc here too
      setNextVideoId(nextVideoId + 1);
    }
  };

  const removeVideo = (id: number) => {
    setVideos(videos.filter((video) => video.id !== id));
    const newVideoPreviews = { ...videoPreviews };
    delete newVideoPreviews[id];
    setVideoPreviews(newVideoPreviews);
    const newVideoThumbnailPreviews = { ...videoThumbnailPreviews };
    delete newVideoThumbnailPreviews[id];
    setVideoThumbnailPreviews(newVideoThumbnailPreviews);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({
      title,
      description,
      category,
      thumbnail,
      videos: videos.map((v) => ({ file: v.file, title: v.title, thumbnailFile: v.thumbnailFile })),
    });
    // In a real application, you would send this data to your backend
  };

  return (
    <div className='bg-gray-200 w-full md:px-16 lg:px-32 md:py-16'>
      <div className="bg-white mx-auto px-6 md:px-16 py-6 rounded-lg drop-shadow-xl">
        <h1 className="text-2xl font-bold mb-6">Create New Course</h1>
        <form onSubmit={handleSubmit}>
          <CourseContent
            onTitleChange={(e) => setTitle(e.target.value)}
            onDescriptionChange={(e) => setDescription(e.target.value)}
            onCategoryChange={(e) => setCategory(e.target.value)}
            onThumbnailChange={handleThumbnailChange}
          />

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Course Videos</h2>
            {videos.map((video, index) => (
              <VideoUpload
                key={video.id}
                id={video.id}
                onVideoChange={handleVideoChange}
                onTitleChange={handleVideoTitleChange}
                onVideoDescChange={handleVideoDescChange}
                onThumbnailChange={handleVideoThumbnailChange}
                onDelete={videos.length > 1 ? removeVideo : undefined}
              />
            ))}
            {videoError && <p className="text-red-500 text-sm mt-2">{videoError}</p>}
            <button
              type="button"
              onClick={addAnotherVideo}
              className="cursor-pointer mt-4 flex justify-center items-center gap-2 p-4 md:px-16  bg-transparent border border-gray-400 text-base md:text-lg text-gray-700 rounded-md hover:bg-gray-300"
            >
              <RiVideoAddLine  className='text-[2em]'/>
              Add another video
            </button>
          </div>

          <div className="mb-8">
            {(thumbnailPreviewUrl || videos.length > 0) && <h2 className="text-xl font-semibold mb-4">Previews</h2>}
            <Preview type="Thumbnail" url={thumbnailPreviewUrl} title='Course Thumbnail'/>
            {videos.map((video, id) => (
              <div key={video.id}>
                <Preview type="Video" url={videoPreviews[video.id]} title={`#${id+1}. ${video.title || 'Video'}`}/>
                <Preview type="Video Thumbnail" url={videoThumbnailPreviews[video.id]} title={`#${id+1}. ${video.thumbnailFile?.name || 'Video Thumbnail'}`}/>
              </div>
            ))}
          </div>
          <div className='flex gap-2 md:gap-4 justify-between'>
            <Tooltip text="Students won't be able to see the course, but you can publish it in your draft page!" width='w-full'>
                <button
                type='button'
                className="text-[#1C1C1CE5] rounded-sm text-base md:text-2xl py-2 px-3 md:py-4 md:px-6 w-full h-full border border-[#001A50] cursor-pointer hover:bg-gray-200 focu:bg-gray-200"
                >
                  Save To Draft
                </button>
            </Tooltip>
            <Tooltip position='top' text='Do well to ensure that the information provided and file uploaded are accurate and corelate with one another, if you have any information wrongly uploaded, go back and re-edit now.' width='w-full'>
              <button
              type='button'
                className="rounded-md bg-[#001A50] text-white text-base md:text-2xl py-2 px-3 md:py-4 md:px-6 w-full h-full cursor-pointer hover:opacity-80 focus:opacity-80"
              >
                Publish
              </button>
            </Tooltip>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;