'use client'

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { IoMenu, IoClose } from "react-icons/io5";
import {NavLink2 as NavLink} from './NavLink';
import { Fragment } from 'react';

export default function MenuI() {
  return (
    <Menu as="div" className="relative">
        <MenuButton className='cursor-pointer rounded-full transform transition-colors duration-200 hover:scale-105 active:scale-105 hover:border active:rounded-none hover:rounded-none hover:border-white active:border active:border-white focus:border focus:border-white' aria-label="Main menu">
            {({ open }) => (
                open
                ? <IoClose className="w-12 h-12 transform transition-transform duration-200 scale-95" />
                : <IoMenu className="w-12 h-12 transform transition-transform duration-200" />
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

            <MenuItems anchor='bottom' className='font-bold w-full flex flex-col bg-white mt-6 h-full shadow-lg'>
            <MenuItem>
            <NavLink name='Home' url='/' />
            </MenuItem>
            <MenuItem>
            <NavLink name='About Us' url='/about-us' />
            </MenuItem>
            <MenuItem>
                <NavLink name='Course' url='/courses' />
            </MenuItem>
            <MenuItem>
                <NavLink name='Contact' url='/contact-us' />
            </MenuItem>
            <MenuItem>
                <NavLink name='Sign UP' url='/sign-up' />
            </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  )
}