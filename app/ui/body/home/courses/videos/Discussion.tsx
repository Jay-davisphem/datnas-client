import Link from "next/link";

export default function Discussion() {
  return (
    <div>
      <Link
        href="/home/courses/videos/discussions/"
        className="md:hidden text-sm hover:underline focus:underline"
      >
        Discussion
      </Link>
      <div className="bg-white hidden md:flex rounded-md">d</div>
    </div>
  );
}
