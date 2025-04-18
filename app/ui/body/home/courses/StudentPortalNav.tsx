import { NavLink3 } from "@/app/ui/header/NavLink";
import Link from "next/link";

export default function StudentPortalNav({id}: {id?: string}) {
  return (
    <div className="flex gap-2 md:gap-8 lg:gap-16 justify-between md:justify-start bg-white pt-6 pb-3 px-3 rounded-md">
      <NavLink3 url='/classroom' name="Classroom" />
      <NavLink3 url='/profile' name="Profile"/>
      <NavLink3 url='/settings' name="Account settings"/>
    </div>
  )
}
