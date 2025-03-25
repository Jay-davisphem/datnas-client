'use client'
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Socials() {
  return (
    <div className="flex flex-col gap-3">
        <div className="flex gap-4 cursor-pointer">
            <Link href={process.env.X_HANDLE!} target="_blank">
                <FaXTwitter className="hover:shadow hover:shadow-white"/>
            </Link>
            <Link href={process.env.FB_HANDLE!} target="_blank">
                <FaFacebook className="hover:shadow hover:shadow-white"/>
            </Link>
            <Link href={process.env.IN_HANDLE!}  target="_blank">
                <FaInstagram className="hover:shadow hover:shadow-white"/>
            </Link>
            <Link href={process.env.LK_HANDLE!} target="_blank">
                <FaLinkedin className="hover:shadow hover:shadow-white"/>
            </Link>
        </div>
        <p>Email: <a href={`mailto:${process.env.CONTACT_MAIL!}`} className="hover:underline active:underline">info@Datnas.org</a></p>
    </div>
  )
}
