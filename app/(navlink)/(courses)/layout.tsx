'use client'
import { CourseProvider } from "@/app/lib/contexts/CourseContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CourseProvider>
      {children}
    </CourseProvider>
  );
}
