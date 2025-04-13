'use client'
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import { TbUserFilled, TbLogout2 } from "react-icons/tb";
import Button from "../Button";
import NavLink from "./NavLink";
import Menu from "./Menu";
import Link from "next/link";
import { useAuth } from "@/app/lib/contexts/AuthContext";
import { useRouter } from "next/navigation"; 

export default function Navbar() {
  const { accessToken, signOut } = useAuth(); 
  const router = useRouter(); 

  const handleLogout = async () => {
    await signOut(); 
    router.push("/");
  };

  return (
    <nav className="px-6 md:px-16 lg:px-32 py-3 md:py-6">
      <div className="lg:hidden flex justify-between items-center">
        <Logo />
        <Menu />
      </div>
      <div className="hidden lg:grid grid-cols-[auto_1fr_auto_auto] items-center gap-12">
        <Logo width={150} height={50} />
        <SearchInput className="w-[70%]" pClassName="justify-end" />
        <div className="flex gap-6 font-bold">
          <NavLink name="Home" url="/" />
          <NavLink name="About Us" url="/about-us" />
          <NavLink name="Course" url="/courses" />
          <NavLink name="Contact" url="/contact-us" />
        </div>
        <div>
          {accessToken ? (
            <Button
              icon={TbLogout2}
              className="text-sm rounded-lg hover:text-[var(--accent-color)] hover:bg-white hover:border"
              iconSize={25}
              variant="accent"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Link href="/sign-up">
              <Button
                icon={TbUserFilled}
                className="text-sm rounded-lg hover:text-[var(--accent-color)] hover:bg-white hover:border"
                iconSize={25}
                variant="accent"
              >
                Sign Up
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
