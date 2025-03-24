import Image from "next/image";
import Button from "../ui/Button";
import { openSans } from "../ui/fonts";
import Link from "next/link";

export default function Home() { 
  return (
      <main className="flex flex-col">
        <div className="mt-4 p-6 md:p-16 lg:p-32 flex flex-col items-center  md:flex-row md:justify-between gap-18 md:gap-0">
          <div className="md:w-[45%] flex flex-col text-white text-center md:text-start gap-8 md:items-start mx-auto">
            <h1 className="md:transform md:scale-y-110 text-3xl lg:text-6xl font-black">Tutoring Platform for Nursing and Allied Health Students</h1>
            <p className="text-sm lg:text-2xl">Unlock limitless learning with our educational platform. Explore, discover, and achieve your goals with personalized learning experiences tailored just for you.</p>
            <div className="flex justify-center gap-8 md:gap-16">
              <Button className="text-sm font-bold md:px-8 lg:px-16 lg:text-xl px-6 md:py-4" variant="accent">Learn More</Button>
              <Button className="text-sm font-bold md:px-8 lg:px-16 lg:text-xl px-6 md:py-4" variant="secondary">Sign up</Button>
            </div>
          </div>
          <div className="md:w-[45%] relative md:self-center mx-auto">
            <Image className="w-full h-full object-cover" src='/stethoscope.svg' priority width={200} height={200} alt="students+stethoscope"/>
            <Image className="absolute w-full h-full top-[-5%] left-0 object-cover" src='/students.svg' priority width={200} height={200} alt="students+stethoscope"/>
          </div>
        </div>
        <div className="p-6 md:p-16 lg:p-32 flex flex-col md:justify-between bg-white gap-8 md:flex-row-reverse">
          <div className="flex flex-col gap-4 text-center items-center lg:text-start lg:items-start md:w-1/2 self-center lg:gap-8">
            <h1 className="font-black text-3xl lg:text-6xl">Personalised professional online tutor on your schedule</h1>
            <p className={`text-sm lg:text-xl ${openSans.className}`}>Lorem ipsum dolor sit amet consectetur. Vel quis velit integer massa eget nibh viverra. Consequat dictum aliquam aliquam pellentesque morbi habitant. Molestie ipsum sed pharetra faucibus ac ac penatibus feugiat. Facilisis eget nunc pellentesque vitae.</p>
            <div className="lg:hidden">
              <Button className="text-sm w-fit border px-16 rounded-lg" variant="primary">Learn more</Button>
            </div>
            <div className="hidden lg:block">
              <Button className="text-lg font-bold w-fit border px-30 py-4 rounded-lg" variant="accent">Learn more</Button>
            </div>
          </div>
          <div className="flex justify-between w-94 h-96 md:w-[40%] lg:h-164">
            <Image className="w-[48%] self-start" src='/work3.svg' alt="working students" width={200} height={200} priority/>
            <Image className="w-[48%] self-end" src='/work2.svg' alt="working students" width={200} height={200} priority/>
          </div>
        </div>
        <div className="p-6 md:p-16 lg:p-32 flex flex-col items-center md:flex-row md:justify-between gap-8">
          <div className="md:w-[45%] flex flex-col text-white text-center md:text-start gap-8 md:items-start mx-auto">
            <h1 className="md:transform md:scale-y-110 text-3xl lg:text-6xl font-black">All in one platform for your learning need</h1>
            <p className={`text-sm lg:text-2xl ${openSans.className}`}>This platform aims to empower nursing students by providing comprehensive resources, engaging modules, and practical insights.</p>
            <div className="flex justify-center gap-8 md:gap-16">
              <Button className="text-sm font-bold md:px-8 lg:px-16 lg:text-xl px-6 md:py-4" variant="secondary">Sign up</Button>
            </div>
          </div>
          <div className="md:w-[45%] relative md:self-center mx-auto">
              <Image className="w-[95%] md:w-full md:h-full object-cover top-6 left-5 absolute lg:top-15 lg:left-10 opacity-30" src='/reading.svg' priority width={200} height={200} alt="shadow reading students"/>
              <Image className="w-[95%] md:w-full md:h-full object-cover" src='/reading.svg' priority width={200} height={200} alt="reading students"/>
          </div>
        </div>
        <div className="p-6 md:p-16 lg:p-32 flex flex-col items-start md:flex-row md:justify-between gap-6">
          <h2 className="text-white underline text-3xl font-bold">Course Categories</h2>
          <div className="w-full">
            <Link href='/courses?cat=digestive-syestem' className={`rounded-lg flex flex-row items-center justify-between w-full ${openSans.className} bg-white h-20`}>
              <Image alt='The Digestive System' width={100} height={100} src='/cardio.svg' className="rounded-lg h-full w-[20%] object-cover"/>
              <div className="text-lg p-8 text-start self-center w-[80%]">
                <p className="w-[70%]">
                  The Digestive System
                </p>
                </div>
            </Link>
            
            
          </div>
        </div>
        <div className="p-6 md:p-16 lg:p-32 flex flex-col items-center md:flex-row md:justify-between">
        </div>
        <div className="p-6 md:p-16 lg:p-32 flex flex-col items-center md:flex-row md:justify-between">
        
        </div>
      </main>
  );
}
