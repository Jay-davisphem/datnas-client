'use client'
import { useEffect, useState, use } from "react";
import NotFound from "@/app/ui/NotFound";
import { useCourses } from "@/app/lib/contexts/CourseContext";
import StudentPortalNav from "@/app/ui/body/home/courses/StudentPortalNav";

interface Params extends Promise<{ slug: string }> {
  slug: string;
}

export default function CoursePage({ params }: { params: Params }) {

  const { slug } = use(params);
  const {getCourse} = useCourses()
  const [course, setCourse] = useState({})

  useEffect(() => {
    const fetchCourse = async () => {
      const fetchedCourse = await getCourse(slug);
      if (!fetchedCourse) setCourse([])
      else setCourse(fetchedCourse)
      console.log(fetchedCourse, 'fetched Course')
    }
    fetchCourse()
  }, [slug, getCourse])

  return (
    <div className="p-6 bg-gray-200 pt-8 pb-16">
      <StudentPortalNav />
    </div>
    );
}
