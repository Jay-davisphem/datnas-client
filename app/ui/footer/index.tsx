import Info from "./Info";
import NewslettterSub from "./NewslettterSub";
import SiteUtilities from "./SiteUtilities";
import Socials from "./Socials";

export default function Footer() {
  const publishYear = 2025
  const yearNow = (new Date()).getFullYear()
  return (
    <footer className="pt-16 text-sm text-white">
        <div className="flex flex-col md:hidden px-6 gap-4">
          <NewslettterSub />
          <Info />
          <Socials />
          <SiteUtilities />
        </div>
        <div className="hidden md:flex md:px-16 lg:px-32 justify-between">
          <div className="flex flex-col gap-4 w-2/5">
            <Info />
            <Socials />
          </div>
          <div className="flex flex-col w-3/5 2xl:w-2/5 px-18 gap-8 ">
            <NewslettterSub />
            <SiteUtilities />
          </div>
        </div>
        <div className="border-t mx-6 md:mx-16 my-6 lg:my-8 2xl:my-16 lg:mx-32 pt-8 flex flex-col md:flex-row gap-y-2 items-center justify-center gap-x-1">
          <p>Copyright © {publishYear >= yearNow? yearNow: `${publishYear} - ${yearNow}`} DATNAS.org</p>
          <p>All rights reserved</p>
        </div>
    </footer>
  )
}
