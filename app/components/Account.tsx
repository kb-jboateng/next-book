'use client';

import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { signOut } from "next-auth/react";
import { useBookContext } from "../context/BookContext";

export default function Account() {

    const { user } = useBookContext();

    return (
        <>
            {
                user && 
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <Popover.Button 
                            className={`py-2 text-light focus:outline-none min-w-fit`}>
                                <Image src={user.image} width={50} height={50} alt="" className="rounded-full"/>
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-in duration-200"
                                enterFrom="opacity-0 translate-y-0"
                                enterTo="opacity-100 translate-y-1"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-1"
                                leaveTo="opacity-0 translate-y-0"
                            >
                                <Popover.Panel className="absolute mt-2 z-10 right-0 w-screen max-w-xs px-4">
                                    <div className="overflow-hidden rounded-lg shadow-lg border-[1.5px] border-gray-lighter">
                                        <div className="relative bg-gray px-4 py-2 divide-y-[1px] divide-gray-light">
                                            <div className="flex items-center gap-4 py-3 cursor-pointer" onClick={() => signOut({callbackUrl: '/books'})}>
                                                <LogoutIcon/>
                                                <p className="text-gray-lighter">Logout</p>
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
            }
        </>
    )
}

function LogoutIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-orange-dark">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>

    )
}