"use client";
import { useEffect, useState, use } from "react";
import { useCourses } from "@/app/lib/contexts/CourseContext";
import StudentPortalNav from "@/app/ui/body/home/courses/StudentPortalNav";
import VideosContainer from "@/app/ui/body/home/courses/videos/VideosContainer";
import { ICourseCategory } from "@/app/lib/contexts/data";
import DraftsOrPubs from "./DraftsOrPubs";
import { useModal } from "@/app/lib/contexts/ModalContext";

interface Params extends Promise<{ slug: string }> {
  slug: string;
}

export default function CoursePage({ params }: { params: Params }) {
  const { slug } = use(params);
  const { getCourse } = useCourses();
  const [course, setCourse] = useState<ICourseCategory | undefined>();
  const { showModal } = useModal();

  if (slug?.toLowerCase() === "published" || slug?.toLowerCase() === "draft") {
    return <DraftsOrPubs />;
  }

  useEffect(() => {
    const fetchCourse = async () => {
      const fetchedCourse = await getCourse(slug);
      if (!fetchedCourse) setCourse(undefined);
      else setCourse(fetchedCourse as unknown as ICourseCategory);
      console.log(fetchedCourse, "fetched Course");
    };
    fetchCourse();
  }, [slug, getCourse]);

  return (
    <div className="p-6 bg-gray-200 pt-8 pb-16 px-6 md:px-16 lg:px-32 flex flex-col gap-4 md:gap-5">
      <StudentPortalNav />
      <VideosContainer course={course!} />
      <div className="mt-4 bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Course Settings
          </h3>
          <p className="text-sm text-gray-500">
            Make changes to this course, or perform destructive actions.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium px-4 py-2 rounded-lg text-sm"
            onClick={() =>
              showModal({
                type: "warning",
                title: "Rename functionality here",
                showCancel: true,
              })
            }
          >
            Rename
          </button>

          <button
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium px-4 py-2 rounded-lg text-sm"
            onClick={() => alert("Edit metadata functionality here")}
          >
            Edit Metadata
          </button>

          <button
            className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-medium px-4 py-2 rounded-lg text-sm"
            onClick={() => alert("Toggle publish state")}
          >
            {course ? "Unpublish" : "Publish"}
          </button>

          <button
            className="bg-red-100 hover:bg-red-200 text-red-800 font-medium px-4 py-2 rounded-lg text-sm"
            onClick={() => alert("Open delete confirmation modal")}
          >
            Delete Course
          </button>
        </div>
      </div>
    </div>
  );
}
