"use client";
import { useEffect, useState, use } from "react";
import { useCourses } from "@/app/lib/contexts/CourseContext";
import StudentPortalNav from "@/app/ui/body/home/courses/StudentPortalNav";
import VideosContainer from "@/app/ui/body/home/courses/videos/VideosContainer";
import { ICourseCategory } from "@/app/lib/contexts/data";

interface Params extends Promise<{ slug: string }> {
  slug: string;
}

export default function CoursePage({ params }: { params: Params }) {
  const { slug } = use(params);
  const { getCourse } = useCourses();
  const [course, setCourse] = useState<ICourseCategory | undefined>();

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
      <div>ffkdkdfsd fsfdjskfjsfsdj kjfkd dkjafdaj a kjdkdkds k</div>
      <VideosContainer course={course!} />
    </div>
  );
}
