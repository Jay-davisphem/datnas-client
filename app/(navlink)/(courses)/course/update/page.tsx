"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { usePathname } from "next/navigation";
import {
  CourseContent,
  Preview,
  VideoState,
  VideoUpload,
} from "@/app/ui/body/home/courses/uploads";
import { RiVideoAddLine } from "react-icons/ri";
import Tooltip from "@/app/ui/ToolTip";
import { useConfirmBeforeUnload } from "@/app/hooks/useBeforeUnload";
import { useConfirm } from "@/app/hooks/useConfirm";
import { useConfirmRouteChange } from "@/app/hooks/useConfirmRouteChange";

interface EditCourseState extends Omit<VideoState, "id"> {
  id: number;
}

const EditCourse: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(
    null,
  );
  const [videos, setVideos] = useState<EditCourseState[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<
    Record<number, string | null>
  >({});
  const [videoThumbnailPreviews, setVideoThumbnailPreviews] = useState<
    Record<number, string | null>
  >({});
  const [nextVideoId, setNextVideoId] = useState(0);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const confirm = useConfirm();
  const pathname = usePathname();

  useConfirmBeforeUnload(isDirty);
  useConfirmRouteChange(isDirty);

  useEffect(() => {
    // Fetch and populate course data here (mocked example)
    const fetchData = async () => {
      const existingCourse = {
        title: "Database Internals 101",
        description: "A solid course on DBMS internals",
        category: "Database Systems",
        thumbnailUrl: "/heart.jpeg",
        videos: [
          {
            id: 0,
            title: "Intro to Buffer Pool",
            desc: "Learn how pages are cached.",
            thumbnailUrl: "/heart.jpeg",
            file: null,
            thumbnailFile: null,
          },
        ],
      };

      setTitle(existingCourse.title);
      setDescription(existingCourse.description);
      setCategory(existingCourse.category);
      setVideos(existingCourse.videos);
      setNextVideoId(existingCourse.videos.length);
      setThumbnailPreviewUrl(existingCourse.thumbnailUrl);
    };

    fetchData();
  }, []);

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setThumbnail(null);
      setThumbnailPreviewUrl(null);
    }
  };

  const handleVideoChange = (id: number, file: File | null) => {
    updateVideo(id, { file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setVideoPreviews((prev) => ({
          ...prev,
          [id]: reader.result as string,
        }));
      reader.readAsDataURL(file);
    }
  };

  const updateVideo = (id: number, data: Partial<EditCourseState>) => {
    setVideos((prev) =>
      prev.map((video) => (video.id === id ? { ...video, ...data } : video)),
    );
  };

  const handleVideoTitleChange = (id: number, title: string) =>
    updateVideo(id, { title });

  const handleVideoDescChange = (id: number, desc: string) =>
    updateVideo(id, { desc });

  const handleVideoThumbnailChange = (id: number, file: File | null) => {
    updateVideo(id, { thumbnailFile: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setVideoThumbnailPreviews((prev) => ({
          ...prev,
          [id]: reader.result as string,
        }));
      reader.readAsDataURL(file);
    }
  };

  const addAnotherVideo = () => {
    const last = videos[videos.length - 1];
    if (!last?.file || !last?.title?.trim()) {
      setVideoError("Please complete the last video before adding a new one.");
      return;
    }
    setVideoError(null);
    setVideos([
      ...videos,
      {
        id: nextVideoId,
        file: null,
        title: "",
        desc: "",
        thumbnailFile: null,
        thumbnailUrl: null,
      },
    ]);
    setNextVideoId(nextVideoId + 1);
  };

  const removeVideo = (id: number) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
    setVideoPreviews((prev) => {
      const clone = { ...prev };
      delete clone[id];
      return clone;
    });
    setVideoThumbnailPreviews((prev) => {
      const clone = { ...prev };
      delete clone[id];
      return clone;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Saved Draft:", {
      title,
      description,
      category,
      thumbnail,
      videos,
    });
    setIsDirty(false);
  };

  const handlePublish = async () => {
    const confirmed = await confirm("publish", "");
    if (confirmed) {
      console.log("Publishing Course:", {
        title,
        description,
        category,
        thumbnail,
        videos,
      });
    }
  };

  useEffect(() => {
    setIsDirty(true);
  }, [title, description, category, thumbnail, videos]);

  return (
    <div className="bg-gray-200 w-full md:px-16 lg:px-32 md:py-16">
      <div className="bg-white mx-auto px-6 md:px-16 py-6 rounded-lg drop-shadow-xl">
        <h1 className="text-2xl font-bold mb-6">Edit Course</h1>
        <form onSubmit={handleSubmit}>
          <CourseContent
            initialValues={{ title, description, category }}
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
                defaultTitle={video.title}
                defaultDesc={video.desc}
              />
            ))}
            {videoError && (
              <p className="text-red-500 text-sm mt-2">{videoError}</p>
            )}
            <button
              type="button"
              onClick={addAnotherVideo}
              className="cursor-pointer mt-4 flex justify-center items-center gap-2 p-4 md:px-16 bg-transparent border border-gray-400 text-base md:text-lg text-gray-700 rounded-md hover:bg-gray-300"
            >
              <RiVideoAddLine className="text-[2em]" />
              Add another video
            </button>
          </div>

          <div className="mb-8">
            {(thumbnailPreviewUrl || videos.length > 0) && (
              <h2 className="text-xl font-semibold mb-4">Previews</h2>
            )}
            <Preview
              type="Thumbnail"
              url={thumbnailPreviewUrl}
              title="Course Thumbnail"
            />
            {videos.map((video, id) => (
              <div key={video.id}>
                <Preview
                  type="Video"
                  url={videoPreviews[video.id]}
                  title={`#${id + 1}. ${video.title || "Video"}`}
                />
                <Preview
                  type="Video Thumbnail"
                  url={videoThumbnailPreviews[video.id]}
                  title={`#${id + 1}. ${video.thumbnailFile?.name || "Video Thumbnail"}`}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2 md:gap-8 justify-between">
            <Tooltip
              text="Save changes to draft. Not visible to students."
              width="w-full"
            >
              <button
                type="submit"
                className="text-[#1C1C1CE5] rounded-sm text-base md:text-lg py-2 px-3 md:py-4 md:px-6 w-full h-full border border-[#001A50] cursor-pointer hover:bg-gray-200"
              >
                Save Changes
              </button>
            </Tooltip>
            <Tooltip
              text="Ensure all information is accurate before publishing. Edit again if needed."
              width="w-full"
            >
              <button
                type="button"
                onClick={handlePublish}
                className="rounded-md bg-[#001A50] text-white text-base md:text-lg py-2 px-3 md:py-4 md:px-6 w-full h-full cursor-pointer hover:opacity-80"
              >
                Publish Changes
              </button>
            </Tooltip>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
