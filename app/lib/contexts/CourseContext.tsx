"use client";
import { createContext, useState, useEffect, useContext } from "react";
import coursesCategories, {IC} from "@/app/lib/contexts/data";
import { toSlug } from "@/app/utils";
import { ICourseCategory } from "@/app/ui/body/home/CourseCategory";

interface CourseContextType {
  loading: boolean;
  courses: IC[],
  getCourse: (slug: string) => Promise<ICourseCategory | {}>
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const [courses, setCourses]  = useState<IC[]>([])
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try{
        // will later fetch, use dummy now
        setCourses(coursesCategories)
      } catch(err){
        setCourses([])
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [courses])

  
  const getCourse = async (slug: string) => {
    let retCourse: ICourseCategory | {} = {}
    courses.find((_course) => {
        return _course?.courses?.map((course) => {
        if (toSlug(course.courseTitle) === slug) {
          retCourse = course
          return course
        }
      })
    })
    return retCourse
  }
  
  const value: CourseContextType = {
    loading,
    courses,
    getCourse
  };

  return (
    <CourseContext.Provider value={value}>
      {!loading && children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourses must be used within an CourseProvider");
  }
  return context;
};
