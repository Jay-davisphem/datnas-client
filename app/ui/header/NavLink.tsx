'use client'
import Link from "next/link";
import Button from "../Button";
import { usePathname } from "next/navigation";

export default function NavLink({name, url}: {name: string, url: string}) {
  const pathname = usePathname();
  return (
    <Link href={url} className={`flex ${pathname === url? 'bg-white px-6 rounded-xl ':''}`}>
        <Button variant='none' className={`${pathname === url? 'text-[var(--accent-color)]': 'text-[#777777]' }  text-lg`}>{name}</Button>
    </Link>
  )
}

export function NavLink2({name, url}: {name: string, url: string}) {
  const pathname = usePathname();
  return (
    <Link href={url} className={`flex ${pathname === url? 'bg-white':''}`}>
        <Button variant='none' className={`${pathname === url? 'text-[var(--accent-color)]': 'text-[#777777]' }  text-lg`}>{name}</Button>
    </Link>
  )
}