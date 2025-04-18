"use client";
import { createContext, useState, useEffect, useContext } from "react";
import coursesCategories, { IC } from "@/app/lib/contexts/data";
import { toSlug } from "@/app/utils";
import { ICourseCategory } from "@/app/ui/body/home/CourseCategory";

interface CourseContextType {
  loading: boolean;
  courses: IC[];
  lastViewedCourseSlug?: string;
  getCourse: (slug: string) => Promise<ICourseCategory | undefined>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const [courses, setCourses] = useState<IC[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastViewedCourseSlug, setLastViewedCourseSlug] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // will later fetch, use dummy now
        setCourses(coursesCategories);
      } catch (err) {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [courses]);
  // use loca l storage to store last viewed course slug
  useEffect(() => {
    const storedSlug = localStorage.getItem("lastViewedCourseSlug");
    if (storedSlug) {
      setLastViewedCourseSlug(storedSlug);
    }
  }, []);

  const getCourse = async (slug: string) => {
    let retCourse: ICourseCategory | undefined = undefined;
    courses.find((_course) => {
      return _course?.courses?.find((course) => {
        if (toSlug(course.courseTitle) === slug) {
          retCourse = course as unknown as ICourseCategory;
          localStorage.setItem("lastViewedCourseSlug", slug);
          setLastViewedCourseSlug(slug);
          return course;
        }
      });
    });
    return retCourse;
  };

  const value: CourseContextType = {
    loading,
    courses,
    getCourse,
    lastViewedCourseSlug,
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
