'use client'
import { CourseProvider } from "@/app/lib/contexts/CourseContext";
import StudentPortalNav from "@/app/ui/body/home/courses/StudentPortalNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CourseProvider>
      <div className="p-6 bg-gray-200 pt-8 pb-16">
        <StudentPortalNav />
        {children}
      </div>
    </CourseProvider>
  );
}
