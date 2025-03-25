import Image from "next/image";
import Logo from "../header/Logo";

export default function Info() {
  return (
    <div className="flex flex-col gap-4">
        <div className="bg-white w-full rounded md:w-fit px-4 py-2">
            <Logo />
        </div>
        <div className="flex flex-col gap-4">
            <p className="text-2xl hidden md:block">Your go-to Platform for Nursing and Allied Health Students tutoring</p>
            <p><span className="font-black hidden md:inline">DATNAS </span>Unlock limitless learning with our Health Sciences educational platform. Explore</p>
        </div>
        
    </div>
  )
}
