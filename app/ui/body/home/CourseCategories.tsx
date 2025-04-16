import { ICourseCategory, CourseCategory } from "./CourseCategory";
import coursesCategories from "@/app/(navlink)/courses/data";
export default function CourseCategories({gray = false}) {
  return (
    <div className={`flex flex-col items-start md:justify-between ${gray?'gap-2 lg:gap-4':'gap-6 lg:gap-8'}`}>
      <h2 className={`${gray?'font-medium':'underline font-bold'} text-3xl`}>
        Course Categories
      </h2>
      <div className={`${gray ? 'bg-gray-100 shadow-sm p-[2px]' : ''} flex flex-col w-full justify-between flex-wrap lg:flex-row gap-4 text-black`}> 
        {coursesCategories.map(({ name, slug, imgUrl }) => (
            <CourseCategory 
              key={name + slug + imgUrl}
              name={name} 
              slug={slug} 
              imgUrl={imgUrl} 
            />
        ))}
      </div>
    </div>
  );
}
