'use client'
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Socials() {
  return (
    <div className="flex flex-col gap-3">
        <div className="flex gap-4 cursor-pointer">
            <Link href={process.env.NEXT_PUBLICX_HANDLE!} target="_blank">
                <FaXTwitter className="hover:shadow hover:shadow-white"/>
            </Link>
            <Link href={process.env.NEXT_PUBLICFB_HANDLE!} target="_blank">
                <FaFacebook className="hover:shadow hover:shadow-white"/>
            </Link>
            <Link href={process.env.NEXT_PUBLICIN_HANDLE!}  target="_blank">
                <FaInstagram className="hover:shadow hover:shadow-white"/>
            </Link>
            <Link href={process.env.NEXT_PUBLICLK_HANDLE!} target="_blank">
                <FaLinkedin className="hover:shadow hover:shadow-white"/>
            </Link>
        </div>
        <p>Email: <Link href={`mailto:${process.env.NEXT_PUBLICCONTACT_MAIL!}`} className="hover:underline active:underline">{process.env.NEXT_PUBLICCONTACT_MAIL!}</Link></p>
    </div>
  )
}
