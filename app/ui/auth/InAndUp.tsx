'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function InAndUp() {
  const co1 = 'bg-[#001A50] text-white';
  const coh1 = 'hover:opacity-80 focus:opacity-80';
  const co2 = 'text-[#001A50] bg-white border border-[#001A50]';
  const coh2 = 'hover:shadow-md hover:bg-[#001A5033] focus:shadow';

  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-between items-center"> {/* Added items-center */}
      <Link
        href='/sign-up'
        className={`rounded-lg text-sm flex justify-center ${
          pathname === '/sign-up' ? co1 + ' ' + coh1 : co2 + ' ' + coh2
        } py-3  w-[48%] h-auto`} 
      >
        Sign up
      </Link>
      <Link href='/sign-in' className={`rounded-lg text-sm flex justify-center ${
          pathname === '/sign-in' ? co1 + ' ' + coh1 : co2 + ' ' + coh2
        } py-3 w-[48%] h-auto`} > 
        Sign in
      </Link>
    </div>
  );
}