import Link from 'next/link';
import Image from 'next/image';
import Button from '../../Button';

export default function AboutUs1() {
  return (
    <div className="relative w-full flex flex-col items-center text-center p-6 md:p-16 lg:p-32 pb-40 lg:pb-64">
      {/* Image Container */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-35">
        <Image 
          src="/hero-page-doc.png" 
          alt="About Us"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="opacity-80"
          priority
        />
      </div>

      {/* Content */}
      <div className="text-white flex flex-col items-center gap-8 max-w-4xl brightness-125 drop-shadow-lg">
        <h1 className='text-3xl md:text-6xl font-black'>About Us</h1>
        <p className='text-base md:px-16 lg:px-20'>
          Unlock limitless learning with our educational platform. Explore, discover, and achieve your goals with personalized learning experiences tailored just for you.
        </p>
        <div className="flex gap-4 md:gap-8">
          <Link href='/about-us' className="hover:opacity-80 active:opacity-80">
            <Button className="text-sm font-bold md:px-8 lg:px-16 lg:text-xl px-6 md:py-4" variant="accent">
              Learn More
            </Button>
          </Link>
          <Link href='/sign-up' className="hover:opacity-80 active:opacity-80">
            <Button className="text-sm font-bold md:px-8 lg:px-16 lg:text-xl px-6 md:py-4" variant="secondary">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
