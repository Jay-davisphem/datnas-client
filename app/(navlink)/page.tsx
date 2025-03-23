import Image from "next/image";
import Button from "../ui/Button";

export default function Home() { 
  return (
      <main className="flex flex-col">
        <div className="mt-4 p-6 md:p-16 lg:p-32 flex flex-col items-center  md:flex-row md:justify-between gap-18 md:gap-0">
          <div className="md:w-[45%] flex flex-col text-white text-center md:text-start gap-8 md:items-start mx-auto">
            <h1 className="md:transform md:scale-y-110 text-3xl lg:text-6xl font-black">Tutoring Platform for Nursing and Allied Health Students</h1>
            <p className="text-sm lg:text-2xl">Unlock limitless learning with our educational platform. Explore, discover, and achieve your goals with personalized learning experiences tailored just for you.</p>
            <div className="flex justify-center gap-8 md:gap-16">
              <Button className="text-sm md:px-8 lg:px-16 lg:text-xl px-6" variant="accent">Learn More</Button>
              <Button className="text-sm md:px-8 lg:px-16 lg:text-xl px-6" variant="secondary">Sign up</Button>
            </div>
          </div>
          <div className="md:w-[45%] relative md:self-center mx-auto">
            <Image className="w-full h-full object-cover" src='/stethoscope.svg' priority width={200} height={200} alt="students+stethoscope"/>
            <Image className="absolute w-full h-full top-[-5%] left-0 object-cover" src='/students.svg' priority width={200} height={200} alt="students+stethoscope"/>
          </div>
        </div>
        <div className="p-6 md:p-16 lg:p-32 flex flex-col items-center md:flex-row md:justify-between">
        </div>
        <div className="p-6 md:p-16 lg:p-32 flex flex-col items-center md:flex-row md:justify-between">
        </div>
        <div className="p-6 md:p-16 lg:p-32 flex flex-col items-center md:flex-row md:justify-between">
        </div>
        <div className="p-6 md:p-16 lg:p-32 flex flex-col items-center md:flex-row md:justify-between">
        </div>
        <div className="p-6 md:p-16 lg:p-32 flex flex-col items-center md:flex-row md:justify-between">
        
        </div>
      </main>
  );
}
