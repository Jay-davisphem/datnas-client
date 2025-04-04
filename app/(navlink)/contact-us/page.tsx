'use client'
import ContactInfo from "@/app/ui/body/home/ContactInfo";
import GetInTouch from "@/app/ui/body/home/GetInTouch";

export default function Contact() {
  return (
    <div className="flex flex-col">
      <ContactInfo />
      <GetInTouch />
    </div>
  )
}
