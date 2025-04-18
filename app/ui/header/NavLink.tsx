"use client";
import Link from "next/link";
import Button from "../Button";
import { usePathname } from "next/navigation";

export default function NavLink({ name, url }: { name: string; url: string }) {
  const pathname = usePathname();
  const isActive =
    (url === "/course" || url === "/courses") &&
    (pathname.startsWith("/course") || pathname.startsWith("/courses"))
      ? true
      : pathname === url;
  return (
    <Link
      href={url}
      className={`flex ${isActive ? "bg-white px-6 rounded-xl " : ""}`}
    >
      <Button
        variant="none"
        className={`${isActive ? "text-[var(--accent-color)]" : "text-[#777777]"}  text-lg`}
      >
        {name}
      </Button>
    </Link>
  );
}

// <Link href='/settings'>Account settings</Link>

export function NavLink2({
  name,
  url,
  onClick = undefined,
}: {
  name: string;
  url: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    (url === "/course" || url === "/courses") &&
    (pathname.startsWith("/course") || pathname.startsWith("/courses"))
      ? true
      : pathname === url;
  return (
    <Link
      href={url}
      className={`flex ${isActive ? "bg-white" : ""}`}
      onClick={onClick}
    >
      <Button
        variant="none"
        className={`${isActive ? "text-[var(--accent-color)]" : "text-[#777777]"}  text-lg`}
      >
        {name}
      </Button>
    </Link>
  );
}

export function NavLink3({
  name,
  url,
  onClick = undefined,
}: {
  name: string;
  url: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    pathname.startsWith("/course") && url === "/classroom"
      ? true
      : pathname === url;
  return url === "/classroom" ? (
    <p
      className={`text-sm cursor-pointer ${isActive ? "border-b-2" : ""}`}
      onClick={() => onClick && onClick()}
    >
      {name}
    </p>
  ) : (
    <Link
      href={url}
      className={`text-sm lg:text-base text ${isActive ? "border-b-2" : ""}`}
      onClick={onClick}
    >
      {name}
    </Link>
  );
}
