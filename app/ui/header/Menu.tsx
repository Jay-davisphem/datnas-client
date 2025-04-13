"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { IoMenu, IoClose } from "react-icons/io5";
import { NavLink2 as NavLink } from "./NavLink";

export default function MenuI() {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <MenuButton
            className="cursor-pointer rounded-full transform transition-colors duration-200 hover:scale-105 active:scale-105 hover:border active:rounded-none hover:rounded-none hover:border-white active:border active:border-white focus:border focus:border-white"
            aria-label="Main menu"
          >
            {open ? (
              <IoClose className="w-12 h-12 transform transition-transform duration-200 scale-95" />
            ) : (
              <IoMenu className="w-12 h-12 transform transition-transform duration-200" />
            )}
          </MenuButton>

          <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <MenuItems
              static
              anchor="bottom"
              className="inset-0 z-50 font-bold w-full flex flex-col bg-white mt-6 shadow-lg"
            >
              {[
                { name: "Home", url: "/" },
                { name: "About Us", url: "/about-us" },
                { name: "Course", url: "/courses" },
                { name: "Contact", url: "/contact-us" },
                { name: "Sign UP", url: "/sign-up" },
              ].map(({ name, url }) => (
                <MenuItem key={name}>
                  {({ close }) => (
                    <NavLink
                      name={name}
                      url={url}
                      onClick={() => {
                        close();
                      }}
                    />
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
}
