'use client'
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { PiTreePalmFill } from "react-icons/pi";
import GetInTouchCard, { IGetInTouchCard } from "./GetInTouchCard";
import CustomInput, { ICustomInputProps } from "./Input";
import { openSans } from "../../fonts";
import dynamic from "next/dynamic";
import { Button } from "@headlessui/react";

// Dynamically import OpenStreetMap with SSR disabled
const OpenStreetMap = dynamic(() => import("./OpenStreetMap"), { ssr: false });


export default function GetInTouch() {
    const infos: IGetInTouchCard[] = [
        { h: "Phone Number", s: "+232-128-3844-293", Icon: FaPhoneAlt, color: "#0FA958" },
        { h: "Email Address", s: "datnas@info.mail", Icon: SiGmail, color: "#C5221F" },
        { h: "Location", s: "23A Anderson street", Icon: PiTreePalmFill, color: "#C5221F" },
        { h: "Office Address", s: "+232-128-3844-293", Icon: FaLocationDot, color: "#FFC700" }
    ];
    const inputs: ICustomInputProps[] = [
        { label: "Fullname", placeholder: "Provide your full name", type: "text" },
        { label: "Email Address", placeholder: "Provide your email address", type: "email" },
        { label: "Message", placeholder: "Write your message here", isTextArea: true }
    ];
    return (
        <div className="flex flex-col bg-white md:bg-[#EEEEEE] ">
            <div className="gap-10 flex flex-col md:flex-row p-6 md:p-16 lg:p-32 pb-40 justify-between">
                <div className="w-full md:w-7/20 flex md:flex-col gap-3 flex-wrap">
                    {infos.map((info, index) => <GetInTouchCard key={index} {...info} />)}
                </div>
                <div className="w-full md:w-11/20 flex flex-col rounded bg-white md:px-7 gap-4 md:py-12 justify-start">
                    <div className="self-start flex flex-col gap-4 md:gap-8 p-0">
                        <h3 className="font-bold text-lg md:text-4xl">Get in Touch</h3>
                        <p className={`${openSans.className} md:text-base text-xs`}>Lorem ipsum dolor sit amet consectetur. Lacus in ultrices vestibulum netus molestie non auctor justo. Sed commodo ut ut vehicula malesuada. Sapien gravida pharetra</p>
                    </div>
                    <div className="flex flex-col gap-4 md:gap-6">
                        {inputs.map((inp, index) => <CustomInput key={index} {...inp} />)}
                    <div className="flex">
                        <Button className='text-white bg-[#001A50] px-20 py-2 md:py-3 md:px-40 text-xs md:text-xl'>
                            Submit
                        </Button>
                    </div>
                    </div>
                </div>
            </div>
            <OpenStreetMap />
        </div>
    );
}
