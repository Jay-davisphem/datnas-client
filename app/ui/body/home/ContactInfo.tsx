import Image from "next/image";
import ScaleUpParagraph from "../../AnimatedP";
import Link from "next/link";
import Button from "../../Button";

export default function ContactInfo() {
  return (
         <div className="prelative w-full flex flex-col items-center text-center p-6 md:p-16 lg:p-32 pb-40">
              {/* Image Container */}
              <div className="absolute inset-0 -z-10 overflow-hidden py-20 md:py-32">
                <Image 
                  src="/analytics.jpeg" 
                  alt="Contact us(Analytics image)"
                  layout="fill" // Important: Makes the image fill the parent container
                  objectFit="cover h-fit w-fit" // Ensures the image covers the area, potentially cropping it
                  priority
                />
              </div>
              <div className="text-white bg-[#001A50B2] flex flex-col gap-4 justify-center items-center py-16 px-8 md:p-24">
                <h1 className='text-3xl md:text-6xl font-black'>Contact Information</h1>
                <ScaleUpParagraph className='max-w-2xl text-[8px] md:text-base mt-4 md:mt-5 '>
                    Unlock limitless learning with our  educational platform. Explore, discover, and achieve your goals with personalized learning experiences tailored just for you.
                </ScaleUpParagraph>
                <div className="flex gap-4 md:gap-8">
                <Link href='/about-us' className="hover:opacity-80 active:opacity-80">
                    <Button className="text-sm font-bold md:px-8 lg:px-16 lg:text-xl px-6 md:py-4" variant="accent">
                    Contact Us
                    </Button>
                </Link>
                </div>
              </div>

        </div>
  )
}
