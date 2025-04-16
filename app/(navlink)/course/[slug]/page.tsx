import { IC } from "@/app/(navlink)/courses/data";
import { notFound } from "next/navigation";
import VideosCard from "@/app/ui/VideosCard";
import categories from "@/app/(navlink)/courses/data" 
import NotFound from "@/app/ui/NotFound";

interface Params {
  slug: string;
}

const allData: IC[] = [];
categories.forEach((category: any) => {
  const videos = category.videos?.map((video: any) => ({
    ...video,
    thumbnail: category.thumbnail,
    courseTitle: category.courseTitle,
  }));
    allData.push({
        ...category,
        videos,
    });
    }
);

const VIDEOS_PER_PAGE = 6;

export default function CoursePage({ params }: { params: Params }) {
  const currentPage = parseInt(params.slug, 10);
console.log(currentPage, "currentPage");
  if (isNaN(currentPage) || currentPage < 1) {
    return <NotFound />
  }

  const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
  const paginated = allData.slice(startIndex, startIndex + VIDEOS_PER_PAGE);

  if (paginated.length === 0) {
    return <NotFound />
  }

  return (
    <div className="p-6">
      {paginated.map((category) => (
        <VideosCard
          key={category.name}
          category={category}
          videosPerPage={VIDEOS_PER_PAGE}
        />
      ))}

      {/* Pagination controls */}
      <div className="mt-8 flex justify-center gap-4 text-sm font-bold">
        {currentPage > 1 && (
          <a href={`/courses/page/${currentPage - 1}`} className="hover:underline">
            ← Previous
          </a>
        )}
        {startIndex + VIDEOS_PER_PAGE < allData.length && (
          <a href={`/courses/page/${currentPage + 1}`} className="hover:underline">
            Next →
          </a>
        )}
      </div>
    </div>
  );
}
