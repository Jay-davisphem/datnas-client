import Image from "next/image";
import Link from "next/link";
import { openSans } from "../../fonts";
import { ICourseCategory as ICourse } from "./courses/CourseCategory";

export type ICourseCategory = { slug: string; name: string; imgUrl: string, courses?: ICourse[] };

export function CourseCategory({ slug, name, imgUrl }: ICourseCategory) {
  return (
    <Link
      href={`/courses/#${slug}`}
      className={`rounded-lg flex flex-row items-center lg:w-3/10 xl:w-4/20 md:w-4/20 ${openSans.className} bg-white h-20 hover:opaque-80 active:opaque-80`}
    >
      <Image
        alt={name}
        width={100}
        height={100}
        src={imgUrl}
        className="rounded-lg h-full w-16 object-cover"
      />
      <div className="text-lg text-start self-center">
        <p className="p-6">{name}</p>
      </div>
    </Link>
  );
}
