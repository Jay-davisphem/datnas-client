import Image from "next/image";
import Link from "next/link";
import { openSans } from "../../fonts";

export type ICourseCategory = {slug: string, name: string, imgUrl: string }

export function CourseCategory({slug, name, imgUrl}: ICourseCategory) {
  return (
    <Link href={`/courses?cat=${slug}`} className={`rounded-lg flex flex-row items-center justify-between w-full ${openSans.className} bg-white h-20 hover:opaque-80 active:opaque-80`}>
        <Image alt={name} width={100} height={100} src={imgUrl} className="rounded-lg h-full w-[20%] object-cover"/>
            <div className="text-lg p-8 text-start self-center w-[80%]">
                <p className="w-[70%]">
                    {name}
                </p>
        </div>
</Link>
  )
}
